<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Committee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminCommitteeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $committees = Committee::orderBy('name')
            ->get()
            ->map(function ($committee) {
                $applications_count = \App\Models\Application::whereJsonContains('committee_choices', $committee->name)->count();
                $pending_count = \App\Models\Application::whereJsonContains('committee_choices', $committee->name)->where('status', 'pending')->count();
                $accepted_count = \App\Models\Application::whereJsonContains('committee_choices', $committee->name)->where('status', 'accepted')->count();
                
                return [
                    'id' => $committee->id,
                    'name' => $committee->name,
                    'description' => $committee->description,
                    'is_open' => $committee->is_open,
                    'applications_count' => $applications_count,
                    'pending_count' => $pending_count,
                    'accepted_count' => $accepted_count,
                ];
            });

        return Inertia::render('Admin/Committees/Index', [
            'committees' => $committees,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Committees/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:committees',
            'description' => 'required|string',
            'is_open' => 'boolean',
        ]);

        Committee::create([
            'name' => $request->name,
            'description' => $request->description,
            'is_open' => $request->boolean('is_open', true),
        ]);

        return redirect()->route('admin.committees.index')->with('success', 'Committee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Committee $committee): Response
    {
        $applications = \App\Models\Application::whereJsonContains('committee_choices', $committee->name)
            ->orderBy('submitted_at', 'desc')
            ->get();

        $stats = [
            'total' => $applications->count(),
            'pending' => $applications->where('status', 'pending')->count(),
            'reviewed' => $applications->where('status', 'reviewed')->count(),
            'accepted' => $applications->where('status', 'accepted')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/Committees/Show', [
            'committee' => $committee,
            'applications' => $applications,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Committee $committee): Response
    {
        return Inertia::render('Admin/Committees/Edit', [
            'committee' => $committee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Committee $committee): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:committees,name,'.$committee->id,
            'description' => 'required|string',
            'is_open' => 'boolean',
        ]);

        $committee->update([
            'name' => $request->name,
            'description' => $request->description,
            'is_open' => $request->boolean('is_open'),
        ]);

        return redirect()->route('admin.committees.index')->with('success', 'Committee updated successfully.');
    }

    /**
     * Toggle committee open/closed status.
     */
    public function toggleStatus(Committee $committee): RedirectResponse
    {
        $committee->update([
            'is_open' => ! $committee->is_open,
        ]);

        $status = $committee->is_open ? 'opened' : 'closed';

        return redirect()->back()->with('success', "Committee {$status} successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Committee $committee): RedirectResponse
    {
        // Check if committee has applications (check in committee_choices JSON)
        $hasApplications = \App\Models\Application::whereJsonContains('committee_choices', $committee->name)->exists();
        
        if ($hasApplications) {
            return redirect()->back()->with('error', 'Cannot delete committee with existing applications.');
        }

        $committee->delete();

        return redirect()->route('admin.committees.index')->with('success', 'Committee deleted successfully.');
    }
}
