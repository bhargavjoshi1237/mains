<?php

namespace App\Repositories;

use App\Models\Project;

class ProjectRepository extends BaseRepository
{
    protected $project;

    public function __construct(Project $project)
    {
        parent::__construct($project);
        $this->project = $project;
    }

    public function addProject(array $newUserData)
    {
        return $this->project->create($newUserData);
    }
     
    public function updateProject($id, array $updateduserData)
    {
        $project = $this->project->findOrFail($id);
        return $project->update($updateduserData);
    }


 
}
