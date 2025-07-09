<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleCheck
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();
        
        // Allow admin to bypass all checks
        if ($user && $user->role === 'admin') {
            return $next($request);
        }

        // Check if user has any of the required roles
        if (!$user || !in_array($user->role, $roles)) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}