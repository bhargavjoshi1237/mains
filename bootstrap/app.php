<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\RoleCheck;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        // Register middleware aliases here
        $middleware->alias([
           'role' => RoleCheck::class
        ]);
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();

/*
|--------------------------------------------------------------------------
| Register Route Middleware
|--------------------------------------------------------------------------
|
| Here you may register all of the route middleware for your application.
| These middleware may be assigned to groups or used individually.
|
*/
