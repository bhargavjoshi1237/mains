<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class TaskRequest extends FormRequest
{

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'assigned_to' => 'required|uuid|exists:users,id',
            'project_id' => 'required|uuid|exists:projects,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }

    public function getUpdatableFields(): array
    {
        $fields = $this->only([
            'name',
            'description',
            'status',
            'assigned_to',
            'project_id',
            'start_date',
            'end_date',
        ]);
        $fields['updated_by'] = Auth::id();
        return $fields;
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        if ($this->isMethod('post')) {
            $data['id'] = (string) Str::uuid();
            $data['created_by'] = Auth::id();
            $data['updated_by'] = Auth::id();
        }
        return $data;
    }
}
