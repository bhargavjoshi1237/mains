<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Http\Requests\IssueRequest;

class IssueController extends Controller
{
    public function index()
    {
        try {
            $issues = Issue::with(['project', 'assignedTo', 'createdBy'])->get();
            return Inertia::render('Issues/Index', [
                'issues' => $issues,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function create()
    {
        try {
            $projects = Project::all();
            $users = User::all();
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
            $issue = Issue::create($data);
            return redirect()->route('issues.index')->with('success', 'Issue created successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function show(Issue $issue)
    {
        try {
            $issue->load(['project', 'assignedTo', 'createdBy']);
            return Inertia::render('Issues/Show', [
                'issue' => $issue,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function edit(Issue $issue)
    {
        try {
            $projects = Project::all();
            $users = User::all();
            $issue->load(['project', 'assignedTo', 'createdBy']);
            return Inertia::render('Issues/Edit', [
                'issue' => $issue,
                'projects' => $projects,
                'users' => $users,
            ]);
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function update(IssueRequest $request, Issue $issue)
    {
        try {
            $data = $request->validated();
            $data['updated_by'] = Auth::id();
            $issue->update($data);
            return redirect()->route('issues.show', $issue->id)->with('success', 'Issue updated successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }

    public function destroy(Issue $issue)
    {
        try {
            $issue->delete();
            return redirect()->route('issues.index')->with('success', 'Issue deleted successfully.');
        } catch (\Exception $e) {
            return redirect('/dashboard')->with('error', $e->getMessage());
        }
    }
}
      