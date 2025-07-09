<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        if ($this->isMethod('post')) {
            
            return [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'client_id' => 'required|uuid|exists:users,id',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
            ];
        } elseif ($this->isMethod('put') || $this->isMethod('patch')) {
           
            return [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'client_id' => 'required|uuid|exists:users,id',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
            ];
        }
        // Default rules
        return [];
    }
}
