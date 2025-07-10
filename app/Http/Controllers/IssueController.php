<?php

namespace App\Http\Controllers;

use App\Repositories\IssueRepository;
use App\Repositories\ProjectRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\IssueRequest;

class IssueController extends Controller
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
        try {
            $issues = $this->issueRepository->getAllWithRelations(['project', 'assignedTo', 'createdBy']);
            $user = auth()->user();
            return Inertia::render('Issues/Index', [
                'issues' => $issues,
                'user_role' => $user ? $user->role : null,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        try {
            $projects = $this->projectRepository->getAll();
            $users = $this->userRepository->getAll();
            return Inertia::render('Issues/Create', [
                'projects' => $projects,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function store(IssueRequest $request)
    {
        try {
            $data = $request->validated();
            $data['id'] = (string) Str::uuid();
            $data['created_by'] = Auth::id();
            $this->issueRepository->store($data); 
            return redirect()->route('issues.index')->with('success', 'Issue created successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $issue = $this->issueRepository->findWithRelations($id, ['project', 'assignedTo', 'createdBy']);
            $user = auth()->user();
            return Inertia::render('Issues/Show', [
                'issue' => $issue,
                'user_role' => $user ? $user->role : null,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        try {
            $projects = $this->projectRepository->getAll();
            $users = $this->userRepository->getAll();
            $issue = $this->issueRepository->findWithRelations($id, ['project', 'assignedTo', 'createdBy']);
            return Inertia::render('Issues/Edit', [
                'issue' => $issue,
                'projects' => $projects,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function update(IssueRequest $request, $id)
    {
        try {
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $this->issueRepository->update($id, $data);  
            return redirect()->route('issues.show', $id)->with('success', 'Issue updated successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $this->issueRepository->destroy($id);  
            return redirect()->route('issues.index')->with('success', 'Issue deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
