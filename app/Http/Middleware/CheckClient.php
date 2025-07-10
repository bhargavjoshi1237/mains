<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckClient
{
    public function handle($request, Closure $next)
    {
        if (!Auth::check() || Auth::user()->role !== 'client') {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}
