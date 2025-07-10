<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class IssueController extends Controller
{
    public function __construct()
    {
         
    }

    public function index()
    {
        try {
            $issues = Issue::with(['project', 'assignedTo', 'createdBy'])->get();
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

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'nullable|string|max:255',
                'project_id' => 'required|string',
                'assigned_to' => 'nullable|string',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date',
            ]);
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
            $user = auth()->user();
            return Inertia::render('Issues/Show', [
                'issue' => $issue,
                'user_role' => $user ? $user->role : null,
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

    public function update(Request $request, Issue $issue)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'nullable|string|max:255',
                'project_id' => 'required|string',
                'assigned_to' => 'nullable|string',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date',
            ]);
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
