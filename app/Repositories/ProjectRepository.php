<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class ProjectRepository extends BaseRepository
{
    protected $project;

    public function __construct(Project $project)
    {
        parent::__construct($project);
        $this->project = $project;
    }

    // Create a new project
    public function addProject(array $projectData): Project
    {
        $user = Auth::user();
        $projectData['id'] = (string) \Str::uuid();
        $projectData['created_by'] = $user->id;
        $projectData['updated_by'] = $user->id;
        return $this->project->create($projectData);
    }

    // Update existing project
    public function updateProject(string $id, array $updatedData): bool
    {
        $project = $this->project->findOrFail($id);
        $user = Auth::user();
        $updatedData['updated_by'] = $user->id;
        return $project->update($updatedData);
    }

    // Get all projects
    public function getAllProjects(): Collection
    {
        return $this->project->all();
    }

    // Get single project by ID
    public function getProjectById(string $id): Project
    {
        return $this->project->findOrFail($id);
    }

    // Delete a project
    public function deleteProject(string $id): bool
    {
        $project = $this->project->findOrFail($id);
        return $project->delete();
    }
}
