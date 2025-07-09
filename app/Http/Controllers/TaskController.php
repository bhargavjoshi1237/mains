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

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(public TaskRepository $taskRepository)
    {
        $this->middleware('rolecheck:admin')->only(['destroy']);
    }
    public function index()
    {
        $user = Auth::user();
        if ($user->role === Role::Admin->value) {
            $tasks = Task::with(['project', 'assignedTo', 'createdBy'])->get();
        } elseif ($user->role === Role::Client->value) {
            $projectIds = Project::where('client_id', $user->id)->pluck('id');
            $tasks = Task::with(['project', 'assignedTo'])
                ->whereIn('project_id', $projectIds)
                ->get();
        } else {
            $projectIds = $user->projectsAsEmployee()->pluck('projects.id');
            $tasks = Task::with(['project', 'assignedTo'])
                ->whereIn('project_id', $projectIds)
                ->get();
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $statuses = array_column(Status::cases(), 'value');
        $user = Auth::user();
        $projects = $user->role === Role::Admin->value
            ? Project::all()
            : $user->projectsAsEmployee()->get();

        return Inertia::render('Tasks/Create', [
            'users' => $users,
            'employees' => $user->role === Role::Admin->value ?
                User::where('role', Role::Employee->value)->get() :
                $user->projectsAsEmployee()->with('users')->get()->pluck('users')->flatten(),
            'projects' => $projects,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TaskRequest $request)
    {
        $repo = new TaskRepository(new Task());
        try {
            $data = $request->validated();

            $task = $repo->addTask($data);
            return redirect()->route('task.index')->with('success', 'Task created successfully.');
        } catch (\Exception $e) {
            return back()->withInput()->withErrors('Failed to create task: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load(['project', 'assignedTo', 'createdBy']);
        return Inertia::render('Tasks/Show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $task->load(['project', 'assignedTo', 'createdBy']);
        $users = Auth::user()->role === Role::Admin->value ?
            User::all() :
            Auth::user()->projectsAsEmployee()->with('users')->get()->pluck('users')->flatten();
        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
            'statuses' => array_column(Status::cases(), 'value'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskRequest $request, Task $task)
    {
        $repo = new TaskRepository(new Task());
        try {
            $updatedTask = $repo->updateTask($task->id, $request->validated());
            // Redirect to show page after update
            return redirect()->route('task.show', ['task' => $updatedTask->id])->with('success', 'Task updated successfully.');
        } catch (\Exception $e) {
            return back()->withInput()->withErrors('Failed to update task: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $repo = new TaskRepository(new Task());
        try {
            $repo->destroy($task->id);
            return redirect()->route('task.index')->with('success', 'Task deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors('Failed to delete task: ' . $e->getMessage());
        }
    }
}
