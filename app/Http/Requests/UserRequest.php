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

    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        if ($this->isMethod('post')) {
            $authenticatedUser = auth()->user();
            $validated['id'] = \Illuminate\Support\Str::uuid()->toString();
            $validated['email_verified_at'] = null;
            $validated['created_by'] = $authenticatedUser->id;
            $validated['updated_by'] = $authenticatedUser->id;
            $validated['password'] = \Illuminate\Support\Facades\Hash::make($validated['password']);
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $validated['company_name'] = $this->input('company_name');
            $validated['company_number'] = $this->input('company_number');
            $validated['updated_by'] = auth()->user()->id;
        }

        return $validated;
    }
}
