<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use Inertia\Inertia;
use App\Repositories\ProjectRepository;
use App\Repositories\ProjectEmployeeRepository;
use App\Repositories\UserRepository;
use App\Http\Requests\ProjectRequest;
use App\Repositories\TaskRepository;
use App\Models\Project;

use Illuminate\Support\Facades\DB;


class ProjectController extends BaseController
{

    public function __construct(

        public ProjectRepository $projects,
        public ProjectEmployeeRepository $projectEmployees,
        public UserRepository $users,
        public TaskRepository $tasksrepository

    ) {}

    public function index()
    {
        $user = auth()->user();
        $projects = $this->projects->getProjectsForUser($user);

        return inertia('Project/Index', [
            'projects' => $projects,
            'userauth' => $user,
            'user_role' => $user->role,
        ]);
    }

    public function create()
    {
        $clients = $this->users->getUsersByRoleBasic(Role::Client->value);
        $employees = $this->users->getUsersByRoleBasic(Role::Employee->value);
        return Inertia::render('Project/Create', [
            'clients' => $clients,
            'employees' => $employees,
        ]);
    }

    public function store(ProjectRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $employeeIds = $request->input('employee_ids', []);
            $project = $this->projects->store($validated);
            $this->projects->attachEmployees($project, (array) $employeeIds);
            DB::commit();
            return $this->sendRedirectResponse(route('project.index'), 'Project created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function show(Project $project)
    {
        $project->load(['client:id,name', 'createdByUser:id,name', 'updatedByUser:id,name', 'employees:id,name']);
        $user = auth()->user();
        $tasks = $project->tasks()->with(['assignedTo', 'createdBy'])->get();
        $employees = $project->employees;

        return Inertia::render('Project/Show', [
            'project' => $project,
            'tasks' => $tasks,
            'employees' => $employees,
            'userauth' => $user,
            'user_role' => $user->role,
        ]);
    }

    public function edit(Project $project)
    {
        $project->load(['employees']);
        $employees = $this->users->getUsersByRoleBasic(\App\Enums\Role::Employee->value);
        $user = auth()->user();
        return Inertia::render('Project/Edit', [
            'project' => $project,
            'employees' => $employees,
            'user_role' => $user->role,
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        DB::beginTransaction();
        try {
            $fields = $request->getUpdatableFields();
            $employeeIds = $request->input('employee_ids', []);
            $this->projects->update($project->id, $fields);
            $project->employees()->sync($employeeIds);
            DB::commit();
            return $this->sendRedirectResponse(route('project.index'), 'Project updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function destroy( Project $project)
    {
        DB::beginTransaction();
        try {
            $project->employees()->detach();
            $this->projects->destroy($project->id);
            DB::commit();
            return $this->sendRedirectResponse(route('project.index'), 'Project deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}

