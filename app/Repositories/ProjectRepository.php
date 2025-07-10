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

    public function formatProjects($projects): array
    {
        return $projects->map(function ($project) {
            return [
                ...$project->toArray(),
                'employees' => collect($project->employees ?? [])->values()->all()
            ];
        })->values()->all();
    }

    public function getByClientId($clientId)
    {
        return $this->model->where('client_id', $clientId)->with(['employees:id,name'])->get();
    }

    public function getByEmployeeId($employeeId)
    {
        return $this->model
            ->whereHas('employees', function ($query) use ($employeeId) {
                $query->where('users.id', $employeeId);
            })
            ->with(['employees:id,name'])
            ->get();
    }
}
