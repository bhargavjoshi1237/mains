<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Str;

use App\Repositories\ClientDetailsRepository;

class UserRepository extends BaseRepository
{
    protected $user;

    public function __construct(User $user)
    {
        parent::__construct($user);
        $this->user = $user;
    }

    public function addUser(array $newuserdata)
    {
        $user = $this->user->create($newuserdata);
        $savedUser = $this->user->where('email', $newuserdata['email'])->first();

        if ($newuserdata['role'] === Role::Client->value) {
            app(ClientDetailsRepository::class)->store([
            'id' => (string) Str::uuid(),
            'user_id' => (string) $savedUser->id,
            'company_name' => $newuserdata['client_company_name'] ?? null,
            'company_number' => $newuserdata['client_company_number'] ?? null,
            ]);
        }

        return $savedUser;
    }

    public function updateUser($id, array $userdata)
    {
        $user = $this->user->find($id);
        if (!$user) {
            return null;
        }          
        $user->update($userdata);
        
        if (isset($userdata['company_name']) || isset($userdata['company_number'])) {
            $clientDetail = $user->clientDetail;
            if ($clientDetail) {
                $clientDetail->update([
                    'company_name' => $userdata['company_name'] ?? $clientDetail->company_name,
                    'company_number' => $userdata['company_number'] ?? $clientDetail->company_number,
                ]);
            }
        }
        return $user->fresh();
    }

    // public function getEmployees()
    // {
    //     return $this->user->where('role', Role::Employee->value)->get();
    // }

    public function getUsersByRoleBasic($role)
    {
        return $this->user->where('role', $role)->get(['id', 'name']);
    }

    
}
   
    
