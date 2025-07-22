<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\ActivityController;
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

Route::get('/activity', [ActivityController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('activity');


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/test', function () {
    return Inertia::render('Test', [
        'user' => auth()->user(),
    ]);
})->middleware('rolecheck:admin')->name('test');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/activity', [ActivityController::class, 'index'])->name('activity.index');
});

// User routes (admin only)
Route::resource('user', UserController::class)->middleware('rolecheck:admin');
Route::resource('/user', UserController::class);
Route::get('/user', [UserController::class, 'index'])->name('user.index');

// Task routes
Route::get('/task', [TaskController::class, 'index'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('task.index');

Route::get('/task/create', [TaskController::class, 'create'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.create');
Route::post('/task', [TaskController::class, 'store'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.store');
Route::get('/task/{task}', [TaskController::class, 'show'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('task.show');
Route::get('/task/{task}/edit', [TaskController::class, 'edit'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.edit');
Route::put('/task/{task}', [TaskController::class, 'update'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.update');
Route::patch('/task/{task}', [TaskController::class, 'update'])
    ->middleware('rolecheck:admin,employee')
    ->name('task.patch');
Route::delete('/task/{task}', [TaskController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('task.destroy');

Route::resource('task', TaskController::class)->except(['index']);
Route::resource('issues', IssueController::class);

// Allow both admin and employee to access the edit page for issues

Route::get('/issues/create', [IssueController::class, 'create'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.create');
Route::get('/issues', [IssueController::class, 'index'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.index');
Route::get('/issues/{issue}', [IssueController::class, 'show'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.show');
Route::delete('/issues/{issue}', [IssueController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('issues.destroy');
Route::get('/issues/{issue}/edit', [IssueController::class, 'edit'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.edit');
Route::put('/issues/{issue}', [IssueController::class, 'update'])
    ->middleware('rolecheck:admin,employee')
    ->name('issues.update');





Route::get('/project/create', [ProjectController::class, 'create'])
    ->middleware('rolecheck:admin,employee')
    ->name('project.create');
Route::post('/project', [ProjectController::class, 'store'])
    ->middleware('rolecheck:admin')
    ->name('project.store');
Route::get('/project', [ProjectController::class, 'index'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('project.index');
Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])
    ->middleware('rolecheck:admin')
    ->name('project.edit');
Route::put('/project/{project}', [ProjectController::class, 'update'])
    ->middleware('rolecheck:admin')
    ->name('project.update');
Route::get('/project/{project}', [ProjectController::class, 'show'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('project.show');
Route::delete('/project/{project}', [ProjectController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('project.destroy');




// Route::resource('project', ProjectController::class);

require __DIR__ . '/auth.php';
Route::get('/project/{project}', [ProjectController::class, 'show'])
    ->middleware('rolecheck:admin,employee,client')
    ->name('project.show');
Route::delete('/project/{project}', [ProjectController::class, 'destroy'])
    ->middleware('rolecheck:admin')
    ->name('project.destroy');

// In your routes file (web.php or api.php)
Route::post('/tasks/bulk-sync', [TaskController::class, 'bulkSync'])->name('tasks.bulkSync');
Route::post('/task/batch-update', [TaskController::class, 'batchUpdate'])->name('task.batchUpdate');

Route::get('/ui', function () {
    return Inertia::render('ui/ui');
})->name('ui');

Route::get('/xd', function () {
    return Inertia::render('ui/xd');
})->name('xd');
// Route::resource('project', ProjectController::class);

require __DIR__ . '/auth.php';