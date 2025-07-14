<?php

namespace App\Http\Controllers;

use App\Repositories\IssueRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\IssueRequest;
use Illuminate\Support\Facades\DB;
use App\Models\Issue;

class IssueController extends BaseController
{
   
    public function __construct(
       public IssueRepository $issueRepository,
       public ProjectRepository $projectRepository,
       public UserRepository $userRepository
    ) {
       
    }

    public function index()
    {
        $issues = $this->issueRepository->getAllWithRelations(['project', 'assignedTo', 'createdBy']);
        $user = auth()->user();
        return Inertia::render('Issues/Index', [
            'issues' => $issues,
            'user_role' => $user ? $user->role : null,
        ]);
    }

    public function create()
    {
        $projects = $this->projectRepository->getAll();
        $users = $this->userRepository->getAll();
        return Inertia::render('Issues/Create', [
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    public function store(IssueRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $this->issueRepository->store($data);
            DB::commit();
            return $this->sendRedirectResponse(route('issues.index'), 'Issue created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function show(Issue $issue)
    {
        $issue->load(['project', 'assignedTo', 'createdBy']);
        $user = auth()->user();
        return Inertia::render('Issues/Show', [
            'issue' => $issue,
            'user_role' => $user ? $user->role : null,
        ]);
    }

    public function edit(Issue $issue)
    {
        DB::beginTransaction();
        try {
            $projects = $this->projectRepository->getAll();
            $users = $this->userRepository->getAll();
            $issue->load(['project', 'assignedTo', 'createdBy']);
            DB::commit();
            return Inertia::render('Issues/Edit', [
                'issue' => $issue,
                'projects' => $projects,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function update(IssueRequest $request, Issue $issue)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $this->issueRepository->update($issue->id, $data);
            DB::commit();
            return $this->sendRedirectResponse(route('issues.index'), 'Issue updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function destroy(Issue $issue)
    {
        DB::beginTransaction();
        try {
            $issue->delete();
            DB::commit();
            return $this->sendRedirectResponse(route('issues.index'), 'Issue deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}
