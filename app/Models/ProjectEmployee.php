<?php

namespace App\Models;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class ProjectEmployee extends Model
{
    protected $table = 'project_employees';
    protected $fillable = ['project_id', 'user_id'];
    public $timestamps = false;
    public $incrementing = false;

     

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
