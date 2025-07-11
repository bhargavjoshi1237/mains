<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Role;
use App\Http\Requests\TaskRequest;
use App\Repositories\ActivityRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository; 
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
 
class TaskController extends BaseController
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
        try {
            $task = $this->taskRepository->addTask($request->validated());
            return $this->sendRedirectResponse(route('task.index'), 'Task created successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
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
        try {
            $validatedData = $request->validated();
            $task = $this->taskRepository->update($id, [
                ...$validatedData,
                'updated_by' => Auth::id()
            ]);

            return $this->sendRedirectResponse(route('task.show', ['task' => $task->id]), 'Task updated successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $this->taskRepository->destroy($id);
            return $this->sendRedirectResponse(route('task.index'), 'Task deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}

