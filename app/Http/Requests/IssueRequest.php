<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IssueRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string|max:255',
            'project_id' => 'required|uuid|exists:projects,id',
            'assigned_to' => 'nullable|uuid|exists:users,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }
}
