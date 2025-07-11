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
       
        return [];
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        return $data;
    }
}
