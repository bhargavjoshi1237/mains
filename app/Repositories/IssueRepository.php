<?php

namespace App\Repositories;

use App\Models\Issue;

class IssueRepository extends BaseRepository
{
    public function __construct(Issue $model)
    {
        parent::__construct($model);
    }

    public function getAllWithRelations(array $relations = [])
    {
        return $this->getAll($relations);
    }

    public function findWithRelations($id, array $relations = [])
    {
        return $this->getById($id, $relations);
    }
}
