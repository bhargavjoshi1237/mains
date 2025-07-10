<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Activity;
use App\Models\User;
use Carbon\Carbon;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::where('created_at', '>=', Carbon::now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->get();

        $users = User::select('id', 'name')->get();

        return Inertia::render('Activity/Activity', [
            'activities' => $activities,
            'users' => $users,
        ]);
    }
}
