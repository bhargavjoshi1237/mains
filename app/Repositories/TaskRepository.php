<?php

namespace App\Repositories;

use App\Models\Task;

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
        return $this->task->create($newTaskData);
    }

    public function updateTask($id, array $updatedTaskData)
    {
        $task = $this->task->findOrFail($id);
        return $task->update($updatedTaskData);
    }

    
}
