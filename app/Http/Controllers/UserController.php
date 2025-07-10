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
use App\Models\ClientDetail;
use App\Repositories\ActivityRepository;

class UserController extends Controller
{

    public function __construct(public UserRepository $userRepository)
    {
        $this->middleware('rolecheck:admin');
    }

    /** 
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return Inertia::render('User/Index', [
                'users' => $this->userRepository->getAll(),
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('User/Create', [
                'roles' => array_column(Role::cases(), 'value'),
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        try {
            $userdata = $request->validated();
            $user = $this->userRepository->addUser($userdata);

            // Log activity
            ActivityRepository::log('user', 'created', $user->id, $user->name);

            return redirect()->route('user.index')->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            $clientDetail = null;
            if ($user->role === 'client') {
                $clientDetail =  ClientDetail::where('user_id', $user->id)->first();
            }

            return Inertia::render('User/Show', [
                'user' => $user,
                'createdBy' => User::find($user->created_by) ?: null,
                'clientDetail' => $clientDetail,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        try {
            $clientDetail = null;
            if ($user->role === 'client') {
                $clientDetail = ClientDetail::where('user_id', $user->id)->first();
            }
            return Inertia::render('User/Edit', [
                'user' => $user,
                'roles' => array_column(Role::cases(), 'value'),
                'currentRole' => $user->role,
                'clientDetail' => $clientDetail,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        try {
            $updateddata = $request->validated();
            $this->userRepository->updateUser($user->id, $updateddata);

            // Log activity
            ActivityRepository::log('user', 'updated', $user->id, $user->name);

            // Handle client details if user is client
            if (($updateddata['role'] ?? $user->role) === 'client') {
                $clientData = [
                    'user_id' => $user->id,
                    'company_name' => $request->input('company_name'),
                    'company_number' => $request->input('company_number'),
                ];
                ClientDetail::updateOrCreate(
                    ['user_id' => $user->id],
                    $clientData
                );
            }

            return redirect()->route('user.index')->with('success', 'User updated successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $this->userRepository->destroy($user->id);

            // Log activity
            ActivityRepository::log('user', 'deleted', $user->id, $user->name);

            return redirect()->route('dashboard')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
