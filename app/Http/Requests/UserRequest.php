<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\Role;

class UserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $userId = $this->route('user')?->id;

        $rules = [
            'name' => 'required|string|max:255',
            'role' => ['required', new Enum(Role::class)],
        ];

        if ($this->isMethod('post')) {

            $rules['email'] = 'required|email|unique:users,email';
            $rules['password'] = 'required|string|min:8';
            $rules['client_company_name'] = 'required_if:role,Client|string|nullable';
            $rules['client_company_number'] = 'required_if:role,Client|string|nullable';
        } elseif ($this->isMethod('put') || $this->isMethod('patch')) {
            $rules['email'] = 'required|email|unique:users,email,' . $userId;
            $rules['password'] = 'nullable|string|min:8';
        }

        return $rules;
    }
}
