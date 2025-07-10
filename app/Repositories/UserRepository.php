<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Str;
use App\Repositories\ClientDetailsRepository;
use App\Models\ClientDetail;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;


class UserRepository extends BaseRepository
{
    protected $user;
    protected ClientDetailsRepository $clientDetailsRepository;

    public function __construct(User $user, ClientDetailsRepository $clientDetailsRepository)
    {
        parent::__construct($user);
        $this->user = $user;
        $this->clientDetailsRepository = $clientDetailsRepository;
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

        $user = $this->store($newuser);

        if ($newuserdata['role'] === Role::Client->value) {
            $this->clientDetailsRepository->store([
                'id' => Str::uuid()->toString(),
                'user_id' => (string) $user->id,
                'company_name' => $newuserdata['client_company_name'] ?? null,
                'company_number' => $newuserdata['client_company_number'] ?? null,
            ]);
        }

        return $user;
    }

    public function updateUser($id, array $userdata)
    {
        $user = $this->getById($id);
        if (!$user) {
            return null;
        }
        $authenticatedUser = Auth::user();

        $updateData = [
            'name' => $userdata['name'] ?? $user->name,
            'email' => $userdata['email'] ?? $user->email,
            'role' => $userdata['role'] ?? $user->role,
            'updated_by' => $authenticatedUser->id,
        ];

        if (!empty($userdata['password'])) {
            $updateData['password'] = Hash::make($userdata['password']);
        }
        $user->update($updateData);

        if (($userdata['role'] ?? $user->role) === Role::Client->value) {
            ClientDetail::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'user_id' => $user->id,
                    'company_name' => $userdata['company_name'] ?? null,
                    'company_number' => $userdata['company_number'] ?? null,
                ]
            );
        } else {
            ClientDetail::where('user_id', $user->id)->delete();
        }
        return $user->fresh();
    }

    public function getClientDetailForUser(string $userId): ?ClientDetail
    {
        return ClientDetail::where('user_id', $userId)->first();
    }

    public function getClients(): EloquentCollection
    {
        return $this->newQuery()->where('role', Role::Client->value)->get(['id', 'name']);
    }

    public function getEmployees(): EloquentCollection
    {
        return $this->newQuery()->where('role', Role::Employee->value)->get(['id', 'name']);
    }
}
