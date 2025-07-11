<?php

namespace App\Repositories;

use App\Models\ProjectEmployee;

class ProjectEmployeeRepository extends BaseRepository
{
    public function __construct(ProjectEmployee $model)
    {
        parent::__construct($model);
    }
}
