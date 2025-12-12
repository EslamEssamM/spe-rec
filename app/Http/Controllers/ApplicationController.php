<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Mail\ApplicationSubmittedMail;
use App\Models\Application;
use App\Models\Committee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;


class ApplicationController extends Controller
{
    public function create(): Response
    {
        // Check if recruitment is currently closed
        $recruitmentOpensAt = now()->parse(config('recruitment.opens_at', '2025-12-05 00:00:00'));
        $isRecruitmentOpen = config('recruitment.is_open', false) || now()->isAfter($recruitmentOpensAt);

        if (!$isRecruitmentOpen) {
            return Inertia::render('Application/Closed', [
                'type' => 'recruitment_closed',
                'title' => 'Recruitment Currently Closed',
                'message' => config('recruitment.closed_message', 'SPE Suez Student Chapter recruitment is currently closed.'),
                'reopenDate' => $recruitmentOpensAt->format('F j, Y'),
                'reopenDateTime' => $recruitmentOpensAt->toISOString(),
                'contactEmail' => config('recruitment.contact_email', 'spesusc.hrm2026@gmail.com'),
            ]);
        }

        $committees = Committee::orderBy('name')->get();

        // Check if any committees are available
        // if ($committees->where('is_open', true)->isEmpty()) {
        //     return Inertia::render('Application/Closed', [
        //         'type' => 'committees_closed',
        //         'title' => 'Applications Currently Closed',
        //         'message' => config('recruitment.committees_closed_message', 'Applications are currently closed. All committees have reached their capacity.'),
        //         'contactEmail' => config('recruitment.contact_email', 'spesusc.hrm2026@gmail.com'),
        //     ]);
        // }
        return Inertia::render('Application/Create', [
            'committees' => $committees,
            'academicYears' => [
                'First' => 'First Year',
                'Second' => 'Second Year',
                'Third' => 'Third Year',
                'Fourth' => 'Fourth Year',
                'Fifth' => 'Fifth Year',
            ],
            'formInstructions' => [
                'section1' => [
                    'title' => 'SPE Suez Recruitment',
                    'subtitle' => 'Please, read the following very carefully.',
                    'tips' => [
                        'Read the questions very carefully, think about them, then type your answer.',
                        'Make sure your answer is clear as possible as you can.',
                        'Take all the time you need to answer the questions, your answers represent you!',
                    ],
                    'note' => 'If you are currently an Executive Board or High Board member at another Student Chapter in Suez University, you\'re not allowed to join SPE Suez.',
                    'contact' => 'spesusc.hrm2026@gmail.com',
                ],
            ],
        ]);
    }

    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Handle photo upload
        if ($request->hasFile('personal_photo')) {
            $photoPath = $request->file('personal_photo')->store('applications/photos', 'public');
            $validated['personal_photo'] = $photoPath;
        }

        // Create the application
        $application = Application::create(array_merge(
            $validated,
            ['submitted_at' => now()]
        ));

        // Send confirmation email to the applicant
        try {
            Log::info('Sending application confirmation email to ' . $application->email);
            Mail::to($application->email)->send(new ApplicationSubmittedMail($application));
        } catch (\Exception $e) {
            // Log email error but don't fail the application submission
            Log::error('Failed to send application confirmation email: ' . $e->getMessage());
        }

        // Redirect to success page
        return redirect()->route('applications.success')->with([
            'application' => $application->toArray(),
            'success' => 'Your application has been submitted successfully! Check your email for confirmation.',
        ]);
    }

    public function success(): Response
    {
        // Get the application data from session (if available)
        $application = session('application');

        return Inertia::render('Application/Success', [
            'application' => $application,
            'message' => session('success', 'Your application has been submitted successfully!'),
            'nextSteps' => [
                'We will review your application carefully.',
                'You will receive an email notification about your application status.',
                'The review process may take 1-2 weeks.',
                'For any inquiries, contact us at spesusc.hrm2026@gmail.com',
            ],
            'contactInfo' => [
                'email' => 'spesusc.hrm2026@gmail.com',
                'social' => [
                    'facebook' => 'https://www.facebook.com/SPESuez',
                    'linkedin' => 'https://www.linkedin.com/company/spescusc',
                    'youtube' => 'https://www.youtube.com/@SPESCUSC',
                    'instagram' => 'https://www.instagram.com/spesusc/',
                ],
            ],
        ]);
    }
}
