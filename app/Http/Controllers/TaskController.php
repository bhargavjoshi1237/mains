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
use App\Models\Task;

class TaskController extends BaseController
{

    public function __construct(
        public TaskRepository $taskRepository,
        public UserRepository $userRepository
    ) {}

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
        DB::beginTransaction();
        try {
            $task = $this->taskRepository->store($request->validated());
            DB::commit();
            return $this->sendRedirectResponse(route('task.index'), 'Task created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function show(Task $task): Response
    {
        $task->load(['project', 'assignedTo', 'createdBy']);
        return Inertia::render('Tasks/Show', [
            'task' => $task,
            'user_role' => Auth::user()->role,
        ]);
    }

    public function edit(Task $task): Response
    {
        $task->load(['project', 'assignedTo', 'createdBy']);
        $project = $task->project;
        $users = $project ? $project->employees : collect();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
            'statuses' => array_column(Status::cases(), 'value'),
        ]);
    }

    public function update(TaskRequest $request, Task $task): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $updatedTask = $this->taskRepository->update($task->id, $request->getUpdatableFields());
            DB::commit();
            return $this->sendRedirectResponse(route('task.show', ['task' => $updatedTask->id]), 'Task updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function destroy(Task $task): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $this->taskRepository->destroy($task->id);
            DB::commit();
            return $this->sendRedirectResponse(route('task.index'), 'Task deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}
