<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use Inertia\Inertia;
use Inertia\Response;

class CommitteeController extends Controller
{
    public function public(): Response
    {
        $committees = Committee::orderBy('name')->get();

        return Inertia::render('Committees/Index', [
            'committees' => $committees,
            'pageTitle' => 'Our Committees',
            'description' => 'Discover the various committees within SPE Suez Student Chapter and learn about their roles and responsibilities in advancing petroleum engineering education and professional development.',
        ]);
    }
}
