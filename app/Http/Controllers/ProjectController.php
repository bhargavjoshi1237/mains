<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Enums\Role;

use App\Models\Project;
use App\Repositories\ProjectRepository;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\ProjectRequest;
use App\Models\ProjectEmployee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Repositories\ActivityRepository;

class ProjectController extends Controller
{
    protected $projects;

    public function __construct(ProjectRepository $projects)
    {   
        $this->projects = $projects;
   
    }

    public function index()
    {
        try {
            $user = auth()->user();

            if ($user->role === Role::Admin->value) {
                $projects = Project::with(['client:id,name', 'createdByUser:id,name'])->get();
            } elseif ($user->role === Role::Client->value) {
                $projects = Project::with(['client:id,name', 'createdByUser:id,name'])
                    ->where('client_id', $user->id)
                    ->get();
            } elseif ($user->role === Role::Employee->value) {
                // Show only projects assigned to this employee
                $projects = $user->projectsAsEmployee()->with(['client:id,name', 'createdByUser:id,name'])->get();
            } else {
                $projects = collect(); // or handle other roles as needed
            }

            return inertia('Project/Index', [
                'projects' => $projects,
                'userauth' => $user,
                'user_role' => $user->role,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        try {
            $clients = User::where('role', 'client')->get(['id', 'name']);
            $employees = User::where('role', Role::Employee->value)->get(['id', 'name']);
            return Inertia::render('Project/Create', [
                'clients' => $clients,
                'employees' => $employees,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function store(ProjectRequest $request)
    {
        try {
            $validated = $request->validated();
            $employeeIds = $request->input('employee_ids', []);
            $project = $this->projects->addProject($validated);

            if (!$project) {
                throw new \Exception('Project creation failed - addProject returned null');
            }

            if (!empty($employeeIds) && is_array($employeeIds)) {
                foreach ($employeeIds as $empId) {
                    \App\Models\ProjectEmployee::create([
                        'project_id' => $project->id,
                        'user_id' => $empId,
                    ]);
                }
            }

            // Log activity
            ActivityRepository::log('project', 'created', $project->id, $project->name);

            return redirect()->route('project.index')->with('success', 'Project created successfully.');
        } catch (\Exception $e) {
            \Log::error('Failed to create project or assign employee', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $project = $this->projects->getProjectById($id);
            $user = auth()->user();
            $project->load(['client:id,name', 'createdByUser:id,name', 'updatedByUser:id,name']);

            $tasks = Task::with(['assignedTo', 'createdBy'])
                ->where('project_id', $id)
                ->get();

            $employees = $project->employees()->get(['id', 'name']);

            return Inertia::render('Project/Show', [
                'project' => $project,
                'tasks' => $tasks,
                'employees' => $employees,
                'userauth' => $user,
                'user_role' => $user->role,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        try {
            $project = $this->projects->getProjectById($id);
            $employees = User::where('role', \App\Enums\Role::Employee->value)->get(['id', 'name']);
            $project->load('employees');
            $user = auth()->user();
            return Inertia::render('Project/Edit', [
                'project' => $project,
                'employees' => $employees,
                'user_role' => $user->role,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function update(ProjectRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $employeeIds = $request->input('employee_ids', []);
            $this->projects->updateProject($id, $validated);

            $project = $this->projects->getProjectById($id);
            $project->employees()->sync($employeeIds);

            // Log activity
            ActivityRepository::log('project', 'updated', $project->id, $project->name);

            return redirect()->route('project.index')->with('success', 'Project updated successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $project = $this->projects->getProjectById($id);
            $this->projects->destroy($id);

            // Log activity
            ActivityRepository::log('project', 'deleted', $project->id, $project->name);

            return redirect()->route('project.index')->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
