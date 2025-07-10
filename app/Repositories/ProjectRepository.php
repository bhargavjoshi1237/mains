<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use App\Enums\Role;

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

    public function getByEmployeeId($employeeId)
    {
        return $this->model
            ->whereHas('employees', function ($query) use ($employeeId) {
                $query->where('users.id', $employeeId);
            })
            ->with(['employees:id,name'])
            ->get();
    }

    public function getProjectsForUser($user)
    {
        if ($user->role ===  Role::Admin->value) {
            return $this->getAll(['client:id,name', 'createdByUser:id,name']);
        } elseif ($user->role ===  Role::Client->value) {
            return $this->newQuery()
                ->where('client_id', $user->id)
                ->with(['client:id,name', 'createdByUser:id,name'])
                ->get();
        } elseif ($user->role ===  Role::Employee->value) {
            return $user->projectsAsEmployee()
                ->with(['client:id,name', 'createdByUser:id,name'])
                ->get();
        } else {
            return collect();
        }
    }
}
