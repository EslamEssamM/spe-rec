<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'speInfo' => [
                'title' => 'SPE Suez Student Chapter',
                'subtitle' => 'Society of Petroleum Engineers',
                'description' => 'Welcome to SPE Suez Student Chapter - your gateway to petroleum engineering excellence. Join us in our mission to advance petroleum engineering knowledge and professional development.',
                'mission' => 'To advance the arts and sciences of exploration, development, production, and economics of oil, gas, other energy resources, and related technologies for the public benefit.',
                'vision' => 'To be the premier professional organization for petroleum engineers worldwide, connecting members to knowledge, opportunities, and each other.',
                'benefits' => [
                    'Professional networking opportunities',
                    'Technical workshops and training',
                    'Industry connections and internships',
                    'Leadership development programs',
                    'Access to technical publications',
                    'Career guidance and mentorship',
                ],
            ],
            'stats' => [
                'members' => 250,
                'events' => 50,
                'workshops' => 25,
                'partnerships' => 15,
            ],
        ]);
    }
}
