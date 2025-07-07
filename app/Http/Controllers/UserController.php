<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Enums\Role;
use App\Enums\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Middleware\RoleCheck;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\Rules\Enum;

class UserController extends Controller
{

    public function __construct(public UserRepository $userRepository)
    {
        $this->middleware('rolecheck:admin')->only(['create', 'store']);
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
    public function store(Request $request)
    {
        // if (Auth::user()->role !== Role::Admin->value) {
        //     abort(403, 'You are not authorized to perform this action.');
        // }

        $userdata = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', new Enum(Role::class)],
            'client_company_name' => 'required_if:role,Client|string|nullable',
            'client_company_number' => 'required_if:role,Client|string|nullable',
        ]);

        $this->userRepository->addUser($userdata);

        return redirect()->route('dashboard')->with('success', 'User created successfully.');
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
    public function update(Request $request, User $user)
    {
        $updateddata = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => ['required', new Enum(Role::class)],
        ]);

        $this->userRepository->updateUser($user, $updateddata);

        return redirect()->route('dashboard')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->userRepository->destroy($user->id);
        return redirect()->route('dashboard')->with('success', 'User deleted successfully.');
    }
}
