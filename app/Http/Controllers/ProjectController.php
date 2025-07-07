<?php

namespace App\Http\Controllers;
use App\Models\Project;
use App\Repositories\ProjectRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class ProjectController extends Controller
{
    protected $projects;

    public function __construct(ProjectRepository $projects)
    {
        $this->projects = $projects;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with(['client:id,name', 'createdByUser:id,name'])->get();

        return inertia('Project/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $clients = User::where('role', 'client')->get(['id', 'name']);
        return Inertia::render('Project/Create', [
            'clients' => $clients
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'required|uuid|exists:users,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $this->projects->addProject($validated);

        return redirect()->route('project.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = $this->projects->getProjectById($id);
        return Inertia::render('Project/Show', [
            'project' => $project
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $project = $this->projects->getProjectById($id);
        return Inertia::render('Project/Edit', [
            'project' => $project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'client_id' => 'required|uuid|exists:users,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $this->projects->updateProject($id, $validated);

        return redirect()->route('project.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->projects->deleteProject($id);
        return redirect()->route('project.index')->with('success', 'Project deleted successfully.');
    }
}
