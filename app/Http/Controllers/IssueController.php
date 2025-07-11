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

class IssueController extends BaseController
{
    protected $issueRepository;
    protected $projectRepository;
    protected $userRepository;

    public function __construct(
        IssueRepository $issueRepository,
        ProjectRepository $projectRepository,
        UserRepository $userRepository
    ) {
        $this->issueRepository = $issueRepository;
        $this->projectRepository = $projectRepository;
        $this->userRepository = $userRepository;
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
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $data['id'] = (string) Str::uuid();
            $data['created_by'] = Auth::id();
            $this->issueRepository->store($data);
            DB::commit();
            return $this->sendRedirectResponse(route('issues.index'), 'Issue created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function show($id)
    {
        $issue = $this->issueRepository->findWithRelations($id, ['project', 'assignedTo', 'createdBy']);
        $user = auth()->user();
        return Inertia::render('Issues/Show', [
            'issue' => $issue,
            'user_role' => $user ? $user->role : null,
        ]);
    }

    public function edit($id)
    {
        try {
            DB::beginTransaction();
            $projects = $this->projectRepository->getAll();
            $users = $this->userRepository->getAll();
            $issue = $this->issueRepository->findWithRelations($id, ['project', 'assignedTo', 'createdBy']);
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

    public function update(IssueRequest $request, $id)
    {
        try {
            DB::beginTransaction();
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $this->issueRepository->update($id, $data);
            DB::commit();
            return $this->sendRedirectResponse(route('issues.show', $id), 'Issue updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            $this->issueRepository->destroy($id);
            DB::commit();
            return $this->sendRedirectResponse(route('issues.index'), 'Issue deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendRedirectError('/dashboard', $e->getMessage());
        }
    }
}
