<?php

namespace App\Http\Controllers;

use App\Models\User;
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


class UserController extends Controller
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
            $clients = $this->userRepository->getClients();
            $employees = $this->userRepository->getEmployees();

            return Inertia::render('User/Create', [
                'roles' => array_column(Role::cases(), 'value'),
                'clients' => $clients,
                'employees' => $employees,
            ]);
    }


    public function store(UserRequest $request)
    {
        try {
            $userdata = $request->validated();
            $user = $this->userRepository->addUser($userdata);
            return redirect()->route('user.index')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }


    public function show(User $user)
    {
            $clientDetail = $this->userRepository->getClientDetailForUser($user->id);

            $createdBy = $user->created_by ? $this->userRepository->getById($user->created_by) : null;

            return Inertia::render('User/Show', [
                'user' => $user,
                'createdBy' => $createdBy,
                'clientDetail' => $clientDetail,
            ]);
    }


    public function edit(User $user)
    {
        try {
            $clientDetail = $this->userRepository->getClientDetailForUser($user->id);
            $employees = $this->userRepository->getEmployees();

            return Inertia::render('User/Edit', [
                'user' => $user,
                'roles' => array_column(Role::cases(), 'value'),
                'currentRole' => $user->role,
                'clientDetail' => $clientDetail,
                'employees' => $employees,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }


    public function update(UserRequest $request, User $user)
    {
        try {
            $updateddata = $request->validated();
            $updateddata['company_name'] = $request->input('company_name');
            $updateddata['company_number'] = $request->input('company_number');

            $this->userRepository->updateUser($user->id, $updateddata);
            return redirect()->route('user.index')->with('success', 'User updated successfully.');

        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }


    public function destroy(User $user)
    {
        try {
            $this->userRepository->destroy($user->id);
            return redirect()->route('user.index')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
