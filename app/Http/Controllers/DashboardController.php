<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\Issue;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $totalTasks = Task::count();
            $totalUsers = User::count();
            $totalProjects = Project::count();
            $totalEmployees = User::where('role', 'employee')->count();
            $totalClients = User::where('role', 'client')->count();

            // Total issues created in last 30 days
            $totalIssuesLast30Days = Issue::where('created_at', '>=', now()->subDays(30))->count();

            // Fetch only the latest 5 activities
            $recentActivities = Activity::orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Fetch all users' id and name for mapping
            $users = User::select('id', 'name')->get();

            return Inertia::render('Dashboard', [
                'user' => auth()->user(),
                'totalTasks' => $totalTasks,
                'totalUsers' => $totalUsers,
                'totalProjects' => $totalProjects,
                'totalEmployees' => $totalEmployees,
                'totalClients' => $totalClients,
                'totalIssuesLast30Days' => $totalIssuesLast30Days,
                'recentActivities' => $recentActivities,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
