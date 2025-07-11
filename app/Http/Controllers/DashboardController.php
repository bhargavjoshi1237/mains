<?php

namespace App\Http\Controllers;

use App\Repositories\ActivityRepository;
use App\Repositories\IssueRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $taskRepository;
    protected $userRepository;
    protected $projectRepository;
    protected $issueRepository;
    protected $activityRepository;

    public function __construct(
        TaskRepository $taskRepository,
        UserRepository $userRepository,
        ProjectRepository $projectRepository,
        IssueRepository $issueRepository,
        ActivityRepository $activityRepository
    ) {
        $this->taskRepository = $taskRepository;
        $this->userRepository = $userRepository;
        $this->projectRepository = $projectRepository;
        $this->issueRepository = $issueRepository;
        $this->activityRepository = $activityRepository;
    }

    public function index()
    {
        try {
            $totalTasks = $this->taskRepository->countAll();
            $totalUsers = $this->userRepository->countAll();
            $totalProjects = $this->projectRepository->countAll();
            $totalEmployees = $this->userRepository->newQuery()->where('role', 'employee')->count();
            $totalClients = $this->userRepository->newQuery()->where('role', 'client')->count();

            // Total issues created in last 30 days
            $totalIssuesLast30Days = $this->issueRepository->newQuery()
                ->where('created_at', '>=', now()->subDays(30))
                ->count();

            // Fetch only the latest 5 activities
            $recentActivities = $this->activityRepository->newQuery()
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Fetch all users' id and name for mapping
            $users = $this->userRepository->newQuery()->select('id', 'name')->get();

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
