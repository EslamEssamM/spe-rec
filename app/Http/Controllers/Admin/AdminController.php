<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Committee;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        // Get basic statistics
        $totalApplications = Application::count();
        $pendingApplications = Application::where('status', 'pending')->count();
        $reviewedApplications = Application::where('status', 'reviewed')->count();
        $acceptedApplications = Application::where('status', 'accepted')->count();
        $rejectedApplications = Application::where('status', 'rejected')->count();

        // Applications by status
        $applicationsByStatus = Application::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();


        // Applications by committee (count applications where committee name is in committee_choices)
        $committees = Committee::orderBy('name')->get();
        $applicationsByCommittee = $committees->map(function ($committee) {
            $count = Application::whereJsonContains('committee_choices', $committee->name)->count();
            return [
                'name' => $committee->name,
                'count' => $count,
                'is_open' => $committee->is_open,
            ];
        });


        // Recent applications (no committee relationship)
        $recentApplications = Application::orderBy('submitted_at', 'desc')
            ->limit(10)
            ->get();

        // Applications per day for the last 30 days
        $applicationsPerDay = Application::select(
            DB::raw('DATE(submitted_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('submitted_at', '>=', now()->subDays(30))
            ->groupBy(DB::raw('DATE(submitted_at)'))
            ->orderBy('date')
            ->get()
            ->pluck('count', 'date')
            ->toArray();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total' => $totalApplications,
                'pending' => $pendingApplications,
                'reviewed' => $reviewedApplications,
                'accepted' => $acceptedApplications,
                'rejected' => $rejectedApplications,
            ],
            'applicationsByStatus' => $applicationsByStatus,
            'applicationsByCommittee' => $applicationsByCommittee,
            'recentApplications' => $recentApplications,
            'applicationsPerDay' => $applicationsPerDay,
        ]);
    }
}
