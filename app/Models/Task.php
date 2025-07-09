<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $keyType = 'string';
    protected $fillable = [
    'id',
    'name',
    'description',
    'status',
    'project_id',
    'assigned_to', 
    'created_by',
    'updated_by',
    'start_date',
    'end_date',
];
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
