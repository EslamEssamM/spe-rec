<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('About', [
            'speHistory' => [
                'founded' => 1957,
                'headquarters' => 'Richardson, Texas, USA',
                'mission' => 'The mission of SPE is to collect, disseminate, and exchange technical knowledge concerning the exploration, development and production of oil and gas resources and related technologies for the public benefit and to provide opportunities for professionals to enhance their technical and professional competence.',
                'global_reach' => [
                    'members' => '135,000+',
                    'countries' => '141',
                    'student_chapters' => '400+',
                    'sections' => '200+',
                ],
            ],
            'speSuezChapter' => [
                'founded' => 2020,
                'location' => 'Suez University, Egypt',
                'mission' => 'To advance petroleum engineering knowledge among Suez University students and connect them with industry professionals.',
                'achievements' => [
                    'Successfully organized 25+ technical workshops',
                    'Facilitated 50+ industry connections',
                    'Hosted international SPE competitions',
                    'Established partnerships with major oil companies',
                    'Provided career guidance to 200+ students',
                ],
                'values' => [
                    'Excellence in technical education',
                    'Professional integrity and ethics',
                    'Collaborative learning environment',
                    'Innovation and creativity',
                    'Global industry connections',
                ],
            ],
            'leadership' => [
                'executive_board' => [
                    ['position' => 'President', 'name' => 'TBD'],
                    ['position' => 'Vice President', 'name' => 'TBD'],
                    ['position' => 'Secretary', 'name' => 'TBD'],
                    ['position' => 'Treasurer', 'name' => 'TBD'],
                ],
            ],
            'contactInfo' => [
                'email' => 'spesusc.hrm2026@gmail.com',
                'university' => 'Suez University',
                'faculty' => 'Faculty of Petroleum and Mining Engineering',
                'social_media' => [
                    'facebook' => '#',
                    'linkedin' => '#',
                    'instagram' => '#',
                ],
            ],
        ]);
    }
}
