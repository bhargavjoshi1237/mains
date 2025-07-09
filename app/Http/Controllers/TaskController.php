<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Enums\Status;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Enums\Role;
use App\Models\User;
use App\Http\Requests\TaskRequest;
use App\Repositories\TaskRepository;
use App\Repositories\ActivityRepository;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(public TaskRepository $taskRepository)
    {
        
        
    }
    public function index()
    {
        try {
            $user = Auth::user();
            if ($user->role === Role::Admin->value) {
                $tasks = Task::with(['project', 'assignedTo', 'createdBy'])->get();
            } elseif ($user->role === Role::Client->value) {
                $projectIds = Project::where('client_id', $user->id)->pluck('id');
                $tasks = Task::with(['project', 'assignedTo'])
                    ->whereIn('project_id', $projectIds)
                    ->get();
            } elseif ($user->role === Role::Employee->value) {
                $projectIds = $user->projectsAsEmployee()->pluck('projects.id');
                $tasks = Task::with(['project', 'assignedTo'])
                    ->whereIn('project_id', $projectIds)
                    ->get();
            } else {
                $tasks = collect();
            }

            return Inertia::render('Tasks/Index', [
                'tasks' => $tasks,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            $users = User::all();
            $statuses = array_column(Status::cases(), 'value');
            $user = Auth::user();

            $projects = $user->role === Role::Admin->value
                ? Project::with(['employees:id,name'])->get()
                : $user->projectsAsEmployee()->with(['employees:id,name'])->get();
        
            $projectsArr = $projects->map(function ($project) {
                $arr = $project->toArray();
                $arr['employees'] = collect($arr['employees'] ?? [])->values()->all();
                return $arr;
            })->values()->all();

            return Inertia::render('Tasks/Create', [
                'users' => $users,
                'employees' => $user->role === Role::Admin->value ?
                    User::where('role', Role::Employee->value)->get() :
                    $user->projectsAsEmployee()->with('users')->get()->pluck('users')->flatten(),
                'projects' => $projectsArr,
                'statuses' => $statuses,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        try {
            $repo = new TaskRepository(new Task());
            $data = $request->validated();

            $task = $repo->addTask($data);

            // Log activity
            ActivityRepository::log('task', 'created', $task->id, $task->name);

            return redirect()->route('task.index')->with('success', 'Task created successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        try {
            $user = Auth::user();
            $task->load(['project', 'assignedTo', 'createdBy']);
            return Inertia::render('Tasks/Show', [
                'task' => $task,
                'user_role' => $user->role,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        try {
            $task->load(['project', 'assignedTo', 'createdBy']);
            $users = Auth::user()->role === Role::Admin->value
                ? User::all()
                : Auth::user()->projectsAsEmployee()->with('employees')->get()->pluck('employees')->flatten();
            return Inertia::render('Tasks/Edit', [
                'task' => $task,
                'users' => $users,
                'statuses' => array_column(Status::cases(), 'value'),
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        try {
            $repo = new TaskRepository(new Task());
            $updatedTask = $repo->updateTask($task->id, $request->validated());

            // Log activity
            ActivityRepository::log('task', 'updated', $updatedTask->id, $updatedTask->name);

            return redirect()->route('task.show', ['task' => $updatedTask->id])->with('success', 'Task updated successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            $repo = new TaskRepository(new Task());
            $repo->destroy($task->id);

            // Log activity
            ActivityRepository::log('task', 'deleted', $task->id, $task->name);

            return redirect()->route('task.index')->with('success', 'Task deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
