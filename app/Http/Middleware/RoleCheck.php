<?php

namespace App\Http\Middleware;
use App\Enums\Role;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = auth()->user();  
        // Check if user has any of the required roles
        if (!$user || !in_array($user->role, $roles)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}