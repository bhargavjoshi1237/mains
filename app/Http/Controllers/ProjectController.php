<?php

namespace App\Http\Controllers;
use App\Enums\Role;
use App\Models\Project;
use App\Repositories\ProjectRepository;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected $projects;

    public function __construct(ProjectRepository $projects)
    {
        $this->projects = $projects;
    }

    public function index()
    {
        $user = auth()->user();

        if ($user->role === Role::Admin->value) {
            $projects = Project::with(['client:id,name', 'createdByUser:id,name'])->get();
        } elseif ($user->role === Role::Client->value) {
            $projects = Project::with(['client:id,name', 'createdByUser:id,name'])
                ->where('client_id', $user->id)
                ->get();
        } else {
            $projects = collect(); // or handle other roles as needed
        }

        return inertia('Project/Index', [
            'projects' => $projects,
        ]);
    }


    public function create()
    {
        $clients = User::where('role', 'client')->get(['id', 'name']);
        return Inertia::render('Project/Create', [
            'clients' => $clients
        ]);
    }


    public function store(ProjectRequest $request)
    {
        try {
            $validated = $request->validated();
            $this->projects->addProject($validated);
            return redirect()->route('project.index')->with('success', 'Project created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create project: ' . $e->getMessage());
        }
    }


    public function show($id)
    {
        $project = $this->projects->getProjectById($id);
        $tasks = \App\Models\Task::with(['assignedTo', 'createdBy'])
            ->where('project_id', $id)
            ->get();
        return Inertia::render('Project/Show', [
            'project' => $project,
            'tasks' => $tasks,
        ]);
    }


    public function edit($id)
    {
        $project = $this->projects->getProjectById($id);
        return Inertia::render('Project/Edit', [
            'project' => $project
        ]);
    }


    public function update(ProjectRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $this->projects->updateProject($id, $validated);
            return redirect()->route('project.index')->with('success', 'Project updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update project: ' . $e->getMessage());
        }
    }


    public function destroy($id)
    {
        try {
            $this->projects->destroy($id);
            return redirect()->route('project.index')->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete project: ' . $e->getMessage());
        }
    }
}
