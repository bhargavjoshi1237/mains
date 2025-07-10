<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Role;
use App\Http\Requests\TaskRequest;
use App\Repositories\ActivityRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository; 
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
 
class TaskController extends Controller
{
    protected TaskRepository $taskRepository;
    protected UserRepository $userRepository;  

    public function __construct(TaskRepository $taskRepository, UserRepository $userRepository)
    {
        $this->taskRepository = $taskRepository;
        $this->userRepository = $userRepository;
    }

    public function index(): Response
    {
        $user = Auth::user();
        $tasks = $this->taskRepository->getTasksForUser($user);
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function create(): Response
    {
        $user = Auth::user();
        $statuses = array_column(Status::cases(), 'value');

        $projectsArr = $this->taskRepository->getProjectsForTaskCreation($user);
       
        $allUsers = $this->userRepository->getAll();
        $employees = $this->taskRepository->getAllEmployees();

        return Inertia::render('Tasks/Create', [
            'users' => $allUsers,
            'employees' => $employees,
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

        $users = $this->taskRepository->getUsersForTaskEdit($user);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
            'statuses' => array_column(Status::cases(), 'value'),
        ]);
    }

    public function update(TaskRequest $request, string $id): RedirectResponse
    {
        $validatedData = $request->validated();
        $task = $this->taskRepository->update($id, [
            ...$validatedData,
            'updated_by' => Auth::id()
        ]);

        return redirect()->route('task.show', ['task' => $task->id])
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->taskRepository->destroy($id);
        return redirect()->route('task.index')->with('success', 'Task deleted successfully.');
    }
}
