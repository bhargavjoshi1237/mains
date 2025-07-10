<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Role;
use App\Http\Requests\TaskRequest;
use App\Repositories\ActivityRepository;
use App\Repositories\TaskRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Project;
use App\Models\User;

class TaskController extends Controller
{
    public function __construct(protected TaskRepository $taskRepository) {}

    public function index(): Response
    {
        $user = Auth::user();
        $relations = ['project', 'assignedTo', 'createdBy'];
        if ($user->role === Role::Admin->value) {
            $tasks = $this->taskRepository->getAll($relations);
        } elseif ($user->role === Role::Client->value) {
            $projectIds = $this->taskRepository->newQuery()
                ->where('client_id', $user->id)
                ->pluck('id');

            $tasks = $this->taskRepository->newQuery()
                ->with($relations)
                ->whereIn('project_id', $projectIds)
                ->get();
        } elseif ($user->role === Role::Employee->value) {
            $projectIds = $user->projectsAsEmployee()->pluck('projects.id');
            $tasks = $this->taskRepository->newQuery()
                ->with($relations)
                ->whereIn('project_id', $projectIds)
                ->get();
        } else {
            $tasks = collect();
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create(): Response
    {
        $user = Auth::user();
        $statuses = array_column(Status::cases(), 'value');
        $projects = $user->role === Role::Admin->value
            ? Project::with(['employees:id,name'])->get()
            : $user->projectsAsEmployee()->with(['employees:id,name'])->get();

        $projectsArr = $projects->map(function ($project) {
            $arr = $project->toArray();
            $arr['employees'] = collect($arr['employees'] ?? [])->values()->all();
            return $arr;
        })->values()->all();

        return Inertia::render('Tasks/Create', [
            'users' => User::all(),
            'employees' => User::where('role', Role::Employee->value)->get(),
            'projects' => $projectsArr,
            'statuses' => $statuses,
        ]);
    }

    public function store(TaskRequest $request): RedirectResponse
    {
        $task = $this->taskRepository->addTask($request->validated());
        return redirect()->route('task.index')->with('success', 'Task created successfully.');
    }

    public function show(string $id): Response
    {
        $task = $this->taskRepository->getById($id, ['project', 'assignedTo', 'createdBy']);
        return Inertia::render('Tasks/Show', [
            'task' => $task,
            'user_role' => Auth::user()->role,
        ]);
    }

    public function edit(string $id): Response
    {
        $task = $this->taskRepository->getById($id, ['project', 'assignedTo', 'createdBy']);
        $user = Auth::user();
        $users = $user->role === Role::Admin->value
            ? $this->taskRepository->newQuery()->get()
            : $user->projectsAsEmployee()->with('employees')->get()->pluck('employees')->flatten();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
            'statuses' => array_column(Status::cases(), 'value'),
        ]);
    }

    public function update(TaskRequest $request, string $id): RedirectResponse
    {
        $task = $this->taskRepository->updateTask($id, $request->validated());
        return redirect()->route('task.show', ['task' => $task->id])
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $task = $this->taskRepository->getById($id);
        $this->taskRepository->deleteTask($id);



        return redirect()->route('task.index')->with('success', 'Task deleted successfully.');
    }
}
