<?php

namespace App\Repositories;

use App\Models\Task;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class TaskRepository extends BaseRepository
{
    public function __construct(Task $task)
    {
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

    public function updateTask(string $id, array $updatedTaskData): Task
    {

        return $this->update($id, [
            ...$updatedTaskData,
            'updated_by' => Auth::id()
        ]);
    }

    public function deleteTask(string $id): bool
    {

        return $this->destroy($id);
    }

    public function getTasksForUser($user)
    {
        $relations = ['project', 'assignedTo', 'createdBy'];

        if ($user->role === \App\Enums\Role::Admin->value) {

            return $this->getAll($relations);
        }

        if ($user->role === \App\Enums\Role::Client->value) {
            $projectIds = $this->model->newQuery()
                ->where('client_id', $user->id)
                ->pluck('id');

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

    public function getByIdWithRelations($id)
    {
        $relations = ['project', 'assignedTo', 'createdBy'];

        return $this->getById($id, $relations);
    }
}
