<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectEmployee extends Model
{
    protected $keyType = 'string';
    protected $table = 'project_employees';
    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = ['project_id', 'user_id'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
