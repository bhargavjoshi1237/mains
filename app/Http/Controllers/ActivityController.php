<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Repositories\ActivityRepository;  
use App\Repositories\UserRepository;  
use Carbon\Carbon;

class ActivityController extends Controller
{
    protected $activityRepository;
    protected $userRepository;

    public function __construct(ActivityRepository $activityRepository, UserRepository $userRepository)
    {
        $this->activityRepository = $activityRepository;
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        // Use repository to fetch activities
        $activities = $this->activityRepository->newQuery()
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->orderBy('created_at', 'desc')
            ->get();

        $users = $this->userRepository->newQuery()->select('id', 'name')->get();

        return Inertia::render('Activity/Activity', [
            'activities' => $activities,
            'users' => $users,
        ]);
    }
}
