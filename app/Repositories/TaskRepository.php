<?php

namespace App\Repositories;

use App\Models\Task;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use App\Models\Project;
use App\Models\User;

class TaskRepository extends BaseRepository
{

    public function __construct(
        Task $task,
        public ProjectRepository $projectRepository,
        public UserRepository $userRepository
    ) {
        parent::__construct($task);
    }

    public function getTasksForUser($user): EloquentCollection
    {
        $relations = ['project', 'assignedTo', 'createdBy'];

        if ($user->role === Role::Admin->value) {
            return $this->getAll($relations);
        }

        if ($user->role ===  Role::Client->value) {
            $projectIds = $user->projectsAsClient()->pluck('projects.id');
            return $this->newQuery()
                ->with($relations)
                ->whereIn('project_id', $projectIds)
                ->get();
        }

        if ($user->role ===  Role::Employee->value) {
            $projectIds = $user->projectsAsEmployee()->pluck('projects.id');
            return $this->newQuery()
                ->with($relations)
                ->whereIn('project_id', $projectIds)
                ->get();
        }

        return collect();
    }


    public function getProjectsForTaskCreation($user): array
    {
        
        $projects = $user->role === Role::Admin->value
            ? $this->projectRepository->getAll(['employees:id,name'])
            : $user->projectsAsEmployee()->with(['employees:id,name'])->get(); // Still using user relationship here

        $projectsArr = $projects->map(function ($project) {
            $arr = $project->toArray();
            $arr['employees'] = collect($arr['employees'] ?? [])->values()->all();
            return $arr;
        })->values()->all();

        return $projectsArr;
    }

    public function getAllEmployees(): EloquentCollection
    {
        return $this->userRepository->newQuery()->where('role', Role::Employee->value)->get();
    }

    public function getUsersForTaskEdit($currentUser): EloquentCollection
    {

        if ($currentUser->role === Role::Admin->value) {
            return $this->userRepository->getAll();
        } else {
            $employeeIds = $currentUser->projectsAsEmployee()
                ->with('employees')
                ->get()
                ->pluck('employees')
                ->flatten()
                ->unique('id')
                ->pluck('id')
                ->all();

            return User::whereIn('id', $employeeIds)->get();
        }
    }

    public function update($id, array $inputs): mixed
    {
        $inputs['updated_by'] = Auth::id();
        return parent::update($id, $inputs);
    }

    public function batchUpdateTasks(array $data, $userId): void
    {
        $creates = $data['creates'] ?? [];
        $updates = $data['updates'] ?? [];
        $deletes = $data['deletes'] ?? [];

     
        foreach ($creates as $taskData) {
            if (!isset($taskData['created_by'])) {
                $taskData['created_by'] = $userId;
            }
            if (!isset($taskData['updated_by'])) {
                $taskData['updated_by'] = $userId;
            }
            $this->store($taskData);
        }
  
        foreach ($updates as $taskData) {
            $id = $taskData['id'];
            unset($taskData['id']);
            if (!isset($taskData['updated_by'])) {
                $taskData['updated_by'] = $userId;
            }
            $this->update($id, $taskData);
        }
       
        foreach ($deletes as $id) {
            $this->destroy($id);
        }
    }

    // public function getTasksForProject($projectId): EloquentCollection
    // {
    //     return $this->newQuery()
    //         ->with(['assignedTo', 'createdBy'])
    //         ->where('project_id', $projectId)
    //         ->get();
    // }
}

