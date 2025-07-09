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
    public function addProject(array $projectData): Project
    {
        $user = Auth::user();


        $projectData['created_by'] = $user->id;
        $projectData['updated_by'] = $user->id;

        $project = $this->project->create($projectData);
        return $project;
    }


    public function updateProject(string $id, array $updatedData): bool
    {
        $project = $this->project->findOrFail($id);
        $user = Auth::user();
        $updatedData['updated_by'] = $user->id;
        return $project->update($updatedData);
    }


    public function getAllProjects(): Collection
    {
        return $this->project->all();
    }


    public function getProjectById(string $id): Project
    {
        return $this->project->with('employees')->findOrFail($id);
    }

    public function deleteProject(string $id): bool
    {
        $project = $this->project->findOrFail($id);
        return $project->delete();
    }
}
