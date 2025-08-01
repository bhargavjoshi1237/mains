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
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
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
        $user = auth()->user();
        $tasks = $this->taskRepository->getTasksForUser($user);
        $statuses = array_column(Status::cases(), 'value');
        $employees = $this->taskRepository->getAllEmployees();
        $projectsArr = $this->taskRepository->getProjectsForTaskCreation($user);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'statuses' => $statuses,
            'employees' => $employees,
            'projects' => $projectsArr,
            'user_role' => $user->role,
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            // Redirect back with validation errors
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['general' => $e->getMessage()])->withInput();
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
            $this->taskRepository->update($task->id, $request->getUpdatableFields());
            DB::commit();
            return $this->sendRedirectResponse(route('task.index'), 'Task updated successfully.');
        } catch (ValidationException $e) {
            DB::rollBack();
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['general' => $e->getMessage()])->withInput();
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

    public function batchUpdate(TaskRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $this->taskRepository->batchUpdateTasks($data);
            DB::commit();
            return redirect()->route('task.index')->with('success', 'Batch update successful.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            // Only show validation errors, not generic batch error
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            DB::rollBack();
            // Only show generic error if not validation
            return redirect()->back()->withErrors(['batch' => $e->getMessage()])->withInput();
        }
    }
}
