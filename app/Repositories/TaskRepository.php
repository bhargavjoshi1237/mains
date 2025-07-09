<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class TaskRepository extends BaseRepository
{
    protected $task;

    public function __construct(Task $task)
    {
        parent::__construct($task);
        $this->task = $task;
    }

    public function addTask(array $newTaskData)
    {
        // Only require these two fields from request
        $requiredFields = ['name', 'project_id'];

        // Check for missing required fields
        $missingFields = [];
        foreach ($requiredFields as $field) {
            if (!array_key_exists($field, $newTaskData)) {
                $missingFields[] = $field;
            }
        }

        if (!empty($missingFields)) {
            throw ValidationException::withMessages([
                'missing_fields' => 'Missing required fields: ' . implode(', ', $missingFields)
            ]);
        }

        // Generate UUID for id
        $newTaskData['id'] = Str::uuid()->toString();
        $newTaskData['created_by'] = Auth::id();
        $newTaskData['updated_by'] = Auth::id();

        return $this->task->create($newTaskData);
    }

    public function updateTask($id, array $updatedTaskData)
    {
        $task = $this->task->findOrFail($id);
        $updatedTaskData['updated_by'] = Auth::id();
        $task->update($updatedTaskData);
        return $task->refresh();
    }

    public function deleteTask($id)
    {
        $task = $this->task->findOrFail($id);
        return $task->delete();
    }
}
