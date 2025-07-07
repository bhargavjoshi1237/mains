<?php

namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use App\Models\ClientDetail;
use Illuminate\Support\Str;

class ClientDetailsRepository extends BaseRepository
{
    public function __construct(ClientDetail $model)
    {
        parent::__construct($model);
    }

    public function store(array $inputs): Model|Builder|null
    {
        $data = [
            'id' => !empty($inputs['id']) ? $inputs['id'] : (string) Str::uuid(),
            'user_id' => $inputs['user_id'] ?? null,
            'company_name' => $inputs['company_name'] ?? null,
            'company_number' => $inputs['company_number'] ?? null,
        ];
        return $this->model->create($data);
    }
}


