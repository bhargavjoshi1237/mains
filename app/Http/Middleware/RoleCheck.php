<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        $user = $request->user();
        // Debug: Log user role and required role
        // \Log::info('RoleCheck', ['user_role' => $user?->role, 'required_role' => $role]);
        // dd($user?->role, $role); // Uncomment for debugging

        if (!$user || $user->role !== $role) {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}
