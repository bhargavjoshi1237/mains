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
        protected ProjectRepository $projectRepository,
        protected UserRepository $userRepository
    ) {
        parent::__construct($task);
    }


    public function addTask(array $newTaskData): Task
    {
        $requiredFields = ['name', 'project_id'];
        $missingFields = array_diff($requiredFields, array_keys($newTaskData));
        if (!empty($missingFields)) {
            throw ValidationException::withMessages([
                'missing_fields' => 'Missing required fields: ' . implode(', ', $missingFields)
            ]);
        }

        return $this->store([
            ...$newTaskData,
            'id' => Str::uuid()->toString(),
            'created_by' => Auth::id(),
            'updated_by' => Auth::id()
        ]);
    }

    public function getTasksForUser($user): EloquentCollection
    {
        $relations = ['project', 'assignedTo', 'createdBy'];

        if ($user->role === \App\Enums\Role::Admin->value) {
            return $this->getAll($relations);
        }

        if ($user->role === \App\Enums\Role::Client->value) {
            $projectIds = $user->projectsAsClient()->pluck('projects.id');
            return $this->newQuery()
                ->with($relations)
                ->whereIn('project_id', $projectIds)
                ->get();
        }

        if ($user->role === \App\Enums\Role::Employee->value) {
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
        // Use ProjectRepository instead of direct model
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
}
