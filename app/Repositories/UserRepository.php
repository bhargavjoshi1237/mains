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
        $authenticatedUser = Auth::user();
        
        $newuser = [
            'name' => $newuserdata['name'],
            'email' => $newuserdata['email'],
            'role' => $newuserdata['role'],
            'id' => Str::uuid()->toString(),
            'email_verified_at' => null,
            'created_by' => $authenticatedUser->id,
            'updated_by' => $authenticatedUser->id,
            'password' => Hash::make($newuserdata['password']),
        ];

        $user = $this->user->create($newuser);
        $savedUser = $this->user->where('email', $newuserdata['email'])->first();

        if ($newuserdata['role'] === Role::Client->value) {
            $clientDetailsRepo = app(ClientDetailsRepository::class);
            $clientDetailsRepo->store([
                'id' => Str::uuid()->toString(),
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
        $authenticatedUserxx = Auth::user();

        $updateData = [
            'name' => $userdata['name'] ?? $user->name,
            'email' => $userdata['email'] ?? $user->email,
            'role' => $userdata['role'] ?? $user->role,
            'updated_by' => $authenticatedUserxx->id,
        ];

        // Optionally update password if provided
        if (!empty($userdata['password'])) {
            $updateData['password'] = Hash::make($userdata['password']);
        }

        $user->update($updateData);

        return $user->fresh();
    }
}

