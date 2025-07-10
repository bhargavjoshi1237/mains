<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use Inertia\Inertia;
use App\Repositories\ProjectRepository;
use App\Repositories\ProjectEmployeeRepository;
use App\Repositories\UserRepository;
use App\Http\Requests\ProjectRequest;
use App\Repositories\TaskRepository;

class ProjectController extends Controller
{
    protected $projects;
    protected $projectEmployees;
    protected $users;

    public function __construct(ProjectRepository $projects, ProjectEmployeeRepository $projectEmployees, UserRepository $users)
    {
        $this->projects = $projects;
        $this->projectEmployees = $projectEmployees;
        $this->users = $users;
    }

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
        $clients = $this->users->newQuery()->where('role', Role::Client->value)->get(['id', 'name']);
        $employees = $this->users->newQuery()->where('role', Role::Employee->value)->get(['id', 'name']);
        return Inertia::render('Project/Create', [
            'clients' => $clients,
            'employees' => $employees,
        ]);
    }

    public function store(ProjectRequest $request)
    {
        $validated = $request->validated();
        $employeeIds = $request->input('employee_ids', []);
        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();
        $project = $this->projects->store($validated);

        if ($project && !empty($employeeIds) && is_array($employeeIds)) {
            foreach ($employeeIds as $empId) {
                $this->projectEmployees->store([
                    'project_id' => $project->id,
                    'user_id' => $empId,
                ]);
            }
        }

        return redirect()->route('project.index')->with('success', 'Project created successfully.');
    }

    public function show($id)
    {
        $project = $this->projects->getById($id, ['client:id,name', 'createdByUser:id,name', 'updatedByUser:id,name', 'employees:id,name']);
        $user = auth()->user();

        $tasks = app(TaskRepository::class)->newQuery()
            ->with(['assignedTo', 'createdBy'])
            ->where('project_id', $id)
            ->get();

        $employees = $project->employees;

        return Inertia::render('Project/Show', [
            'project' => $project,
            'tasks' => $tasks,
            'employees' => $employees,
            'userauth' => $user,
            'user_role' => $user->role,
        ]);
    }

    public function edit($id)
    {
        $project = $this->projects->getById($id, ['employees']);
        $employees = $this->users->newQuery()->where('role', Role::Employee->value)->get(['id', 'name']);
        $user = auth()->user();
        return Inertia::render('Project/Edit', [
            'project' => $project,
            'employees' => $employees,
            'user_role' => $user->role,
        ]);
    }

    public function update(ProjectRequest $request, $id)
    {
        $validated = $request->validated();
        $employeeIds = $request->input('employee_ids', []);
        $this->projects->update($id, $validated);

        $project = $this->projects->getById($id);
        $project->employees()->sync($employeeIds);

        return redirect()->route('project.index')->with('success', 'Project updated successfully.');
    }

    public function destroy($id)
    {
        $this->projectEmployees->newQuery()->where('project_id', $id)->delete();
        $this->projects->destroy($id);

        return redirect()->route('project.index')->with('success', 'Project deleted successfully.');
    }
}
