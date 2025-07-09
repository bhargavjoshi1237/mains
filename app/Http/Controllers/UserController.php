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

class UserController extends Controller
{

    public function __construct(public UserRepository $userRepository)
    {
        $this->middleware('rolecheck:admin')->only(['create', 'store','index', 'edit', 'update', 'destroy']);
    }

    /** 
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => $this->userRepository->getAll(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create', [
            'roles' => array_column(Role::cases(), 'value'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            $userdata = $request->validated();
            $this->userRepository->addUser($userdata);
            return redirect()->route('dashboard')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to create user: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {

        return Inertia::render('User/Show', [
            'user' => $user,
            'createdBy' => User::find($user->created_by) ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => array_column(Role::cases(), 'value'),
            'currentRole' => $user->role,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        try {
            $updateddata = $request->validated();
            $this->userRepository->updateUser($user->id, $updateddata);
            return redirect()->route('dashboard')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Failed to update user: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $this->userRepository->destroy($user->id);
            return redirect()->route('dashboard')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete user: ' . $e->getMessage());
        }
    }
}
