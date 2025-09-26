<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class AdminApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

    $query = Application::query();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by committee (by name in committee_choices array)
        if ($request->has('committee') && $request->committee !== 'all') {
            $committeeName = \App\Models\Committee::find($request->committee)?->name;
            if ($committeeName) {
                $query->whereJsonContains('committee_choices', $committeeName);
            }
        }

        // Search by name or email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sort by submitted date (newest first by default)
        $sortBy = $request->get('sort_by', 'submitted_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $applications = $query->paginate(20)->withQueryString();

        // Get committees for filter dropdown
    $committees = \App\Models\Committee::select('id', 'name')->get();

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'committees' => $committees,
            'filters' => [
                'status' => $request->get('status', 'all'),
                'committee' => $request->get('committee', 'all'),
                'search' => $request->get('search', ''),
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application): Response
    {
        return Inertia::render('Admin/Applications/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Update the application status.
     */
    public function updateStatus(Request $request, Application $application): RedirectResponse
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ]);

        $application->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Application status updated successfully.');
    }

    /**
     * Export applications to Excel.
     */
    public function export(Request $request): BinaryFileResponse
    {
        try {
            $query = Application::query();

            // Apply same filters as index
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            if ($request->has('committee') && $request->committee !== 'all') {
                $committeeName = \App\Models\Committee::find($request->committee)?->name;
                if ($committeeName) {
                    $query->whereJsonContains('committee_choices', $committeeName);
                }
            }

            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }

            $applications = $query->orderBy('submitted_at', 'desc')->get();

            // Create CSV content
            $csvData = [];

            // Headers
            $csvData[] = [
                'ID',
                'Full Name',
                'Email',
                'Mobile',
                'Facebook Link',
                'University',
                'Faculty',
                'Department',
                'Academic Year',
                'Committee Choices',
                'Status',
                'Why Applying',
                'How Benefit',
                'Why Committee',
                'Committee Responsibilities',
                'Previous Experience',
                'Open Space',
                'Submitted At',
            ];

            // Data rows
            foreach ($applications as $application) {
                $csvData[] = [
                    $application->id,
                    $application->full_name,
                    $application->email,
                    $application->mobile ?? '',
                    $application->facebook_link ?? '',
                    $application->university,
                    $application->faculty,
                    $application->department,
                    $application->academic_year,
                    is_array($application->committee_choices) ? implode('; ', $application->committee_choices) : $application->committee_choices,
                    $application->status,
                    $application->why_applying ?? '',
                    $application->how_benefit ?? '',
                    $application->why_committee ?? '',
                    $application->committee_responsibilities ?? '',
                    $application->previous_experience ?? '',
                    $application->open_space ?? '',
                    $application->submitted_at?->format('Y-m-d H:i:s'),
                ];
            }

            // Create temporary file
            $filename = 'spe_applications_'.now()->format('Y-m-d_H-i-s').'.csv';
            $tempFile = tempnam(sys_get_temp_dir(), 'spe_export_');

            if ($tempFile === false) {
                throw new \Exception('Could not create temporary file');
            }

            $handle = fopen($tempFile, 'w');
            if ($handle === false) {
                throw new \Exception('Could not open temporary file for writing');
            }

            foreach ($csvData as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);

            return response()->download($tempFile, $filename)->deleteFileAfterSend();

        } catch (\Exception $e) {
            // Log the error and return a user-friendly response
            Log::error('Export failed: ' . $e->getMessage());
            
            // Create an empty CSV as fallback
            $filename = 'spe_applications_error_'.now()->format('Y-m-d_H-i-s').'.csv';
            $tempFile = tempnam(sys_get_temp_dir(), 'spe_export_error_');
            
            $handle = fopen($tempFile, 'w');
            fputcsv($handle, ['Error', 'Export failed. Please contact administrator.']);
            fclose($handle);
            
            return response()->download($tempFile, $filename)->deleteFileAfterSend();
        }
    }
}
