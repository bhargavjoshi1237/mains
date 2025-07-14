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
        $routeUser = $this->route('user');
        $userId = is_object($routeUser) ? $routeUser->id : $routeUser;

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

    public function getUpdatableFields(): array
    {
        $fields = $this->only([
            'name',
            'email',
            'role',
            'password',
            'company_name',
            'company_number',
        ]);

        $fields['updated_by'] = auth()->user()->id;

        return $fields;
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        return $data;
    }

    // Remove validated() if you don't need to add/modify fields.
    // If you need created_by, keep and add logic as shown previously.
}
