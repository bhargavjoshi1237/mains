<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
       protected $keyType = 'string';

       protected $fillable = [
        'id',   
        'name',
        'description',
        'client_id',
        'start_date',
        'end_date',
        'created_by',
        'updated_by',
    ];

    public function employees()
    {
        return $this->belongsToMany(User::class, 'project_employees', 'project_id', 'user_id');
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
