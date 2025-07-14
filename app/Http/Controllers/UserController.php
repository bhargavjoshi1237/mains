<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Middleware\RoleCheck;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserRepository;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Access\AuthorizationException;
use App\Repositories\ActivityRepository;
use App\Repositories\ClientDetailsRepository;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class UserController extends BaseController
{

    public function __construct(
        public UserRepository $userRepository,
        public ClientDetailsRepository $clientDetailsRepository
    ){

    }
    

    public function index()
    {
            return Inertia::render('User/Index', [
                'users' => $this->userRepository->getAll(),
            ]);
    }

    public function create()
    {
        $clients = $this->userRepository->getUsersByRoleBasic(Role::Client->value);
        $employees = $this->userRepository->getUsersByRoleBasic(Role::Employee->value);

        return Inertia::render('User/Create', [
            'roles' => array_column(Role::cases(), 'value'),
            'clients' => $clients,
            'employees' => $employees,
        ]);
    }

    public function store(UserRequest $request)
    {   DB::beginTransaction();
        try {
            $userdata = $request->validated();
            $user = $this->userRepository->addUser($userdata);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function show(User $user)
    {
        $user = $user->load(['clientDetail', 'createdBy']);
         return Inertia::render('User/Show', [
            'user' => $user,
            
        ]);
    }


    public function edit(User $user)
    {
        $clientDetail = $user->clientDetail;  

        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => array_column(Role::cases(), 'value'),
            'currentRole' => $user->role,
            'clientDetail' => $clientDetail,
        ]);
    }


    public function update(UserRequest $request, User $user)
    {   
        DB::beginTransaction();
        try {
            $updateddata = $request->getUpdatableFields();
            $this->userRepository->updateUser($user->id, $updateddata);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }


    public function destroy(User $user)
    {   
        DB::beginTransaction();
        try {
            $this->userRepository->destroy($user->id);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}

