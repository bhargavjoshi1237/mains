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


class UserController extends BaseController
{
    protected UserRepository $userRepository;
    protected ClientDetailsRepository $clientDetailsRepository;

    public function __construct(UserRepository $userRepository, ClientDetailsRepository $clientDetailsRepository)
    {
        $this->userRepository = $userRepository;
        $this->clientDetailsRepository = $clientDetailsRepository;

    }

    public function index()
    {
            return Inertia::render('User/Index', [
                'users' => $this->userRepository->getAll(),
            ]);
    }

    public function create()
    {
        $clients = $this->userRepository->newQuery()->where('role', Role::Client->value)->get(['id', 'name']);
        $employees = $this->userRepository->newQuery()->where('role', Role::Employee->value)->get(['id', 'name']);

        return Inertia::render('User/Create', [
            'roles' => array_column(Role::cases(), 'value'),
            'clients' => $clients,
            'employees' => $employees,
        ]);
    }


    public function store(UserRequest $request)
    {
        try {
            DB::beginTransaction();
            $userdata = $request->validated();
            $user = $this->userRepository->addUser($userdata);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }


    public function show($id)
    {
        $user = $this->userRepository->getById($id);
        $clientDetail = $this->userRepository->getClientDetailForUser($user->id);
        $createdBy = $user->created_by ? $this->userRepository->getById($user->created_by) : null;

        return Inertia::render('User/Show', [
            'user' => $user,
            'createdBy' => $createdBy,
            'clientDetail' => $clientDetail,
        ]);
    }


    public function edit($id)
    {
        $user = $this->userRepository->getById($id);
        $clientDetail = $this->userRepository->getClientDetailForUser($user->id);
        $employees = $this->userRepository->newQuery()->where('role', Role::Employee->value)->get(['id', 'name']);

        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => array_column(Role::cases(), 'value'),
            'currentRole' => $user->role,
            'clientDetail' => $clientDetail,
            'employees' => $employees,
        ]);
    }


    public function update(UserRequest $request, $id)
    {
        try {
            DB::beginTransaction();
            $user = $this->userRepository->getById($id);
            $updateddata = $request->validated();
            $updateddata['company_name'] = $request->input('company_name');
            $updateddata['company_number'] = $request->input('company_number');

            $this->userRepository->updateUser($user->id, $updateddata);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User updated successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }


    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $this->userRepository->destroy($id);
            DB::commit();
            return $this->sendRedirectResponse(route('user.index'), 'User deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}
