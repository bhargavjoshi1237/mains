<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IssueController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test', function () {
    return Inertia::render('Test', [
        'user' => auth()->user(),
    ]);
})->middleware('rolecheck:Admin')->name('test');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User routes (admin only)
Route::resource('user', UserController::class)->middleware('rolecheck:admin');
Route::resource('/user', UserController::class);
Route::get('/user', [UserController::class, 'index'])->name('user.index');

// Task routes
Route::get('/task', [TaskController::class, 'index'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('task.index');
Route::get('/task/{task}', [TaskController::class, 'show'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('task.show');

// Create: admin, employee
Route::get('/task/create', [TaskController::class, 'create'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.create');
Route::post('/task', [TaskController::class, 'store'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.store');

// Edit/Update: admin, employee
Route::get('/task/{task}/edit', [TaskController::class, 'edit'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.edit');
Route::put('/task/{task}', [TaskController::class, 'update'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.update');
Route::patch('/task/{task}', [TaskController::class, 'update'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.patch');

// Destroy: admin only
Route::delete('/task/{task}', [TaskController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('task.destroy');

Route::resource('task', TaskController::class)->except(['index']);
Route::resource('issues', IssueController::class);

// Allow both admin and employee to access the edit page for issues
Route::get('/issues/{issue}/edit', [IssueController::class, 'edit'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.edit');
Route::get('/issues/create', [IssueController::class, 'create'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.create');
Route::get('/issues', [IssueController::class, 'index'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.index');
    Route::get('/issues/{issue}', [IssueController::class, 'view'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.view');

 

    // Project routes
Route::get('/project', [ProjectController::class, 'index'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('project.index');
Route::get('/project/{project}', [ProjectController::class, 'show'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('project.show');
Route::get('/project/create', [ProjectController::class, 'create'])
    ->middleware('rolecheck:admin')
    ->name('project.create');
Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])
    ->middleware('rolecheck:admin')
    ->name('project.edit');
Route::post('/project', [ProjectController::class, 'store'])
    ->middleware('rolecheck:admin')
    ->name('project.store');
Route::put('/project/{project}', [ProjectController::class, 'update'])
    ->middleware('rolecheck:admin')
    ->name('project.update');
Route::patch('/project/{project}', [ProjectController::class, 'update'])
    ->middleware('rolecheck:admin')
    ->name('project.patch');
Route::delete('/project/{project}', [ProjectController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('project.destroy');


require __DIR__ . '/auth.php';
