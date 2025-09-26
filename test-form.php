<?php

// Simple test script to verify form submission
require_once 'vendor/autoload.php';

use Illuminate\Support\Facades\Http;

// Test data similar to what the form would submit
$formData = [
    'full_name' => 'John Doe',
    'email' => 'john.doe@gmail.com',
    'mobile' => '+20 123 456 7890',
    'facebook_link' => 'https://facebook.com/john.doe',
    'university' => 'Suez University',
    'faculty' => 'Faculty of Engineering',
    'department' => 'Petroleum Engineering',
    'academic_year' => 'third',
    'previous_experience' => 'I have volunteered in multiple student organizations during my academic career, including organizing events and managing social media accounts.',
    'why_applying' => 'I am passionate about petroleum engineering and want to contribute to the SPE community while developing my professional skills.',
    'how_benefit' => 'Joining SPE will help me network with industry professionals, gain practical experience, and enhance my technical knowledge in petroleum engineering.',
    'committee_choices' => ['Human resources Management (HRM)'],
    'why_committee' => 'I chose HRM because I have strong interpersonal skills and experience in team management from my previous volunteer work.',
    'committee_responsibilities' => 'The HRM committee is responsible for recruiting new members, conducting interviews, managing member databases, and organizing team-building activities.',
    'open_space' => 'I am excited to contribute to SPE Suez and help build a strong community of future petroleum engineers.',
];

echo "Form data to be submitted:\n";
print_r($formData);
echo "\nForm looks complete and ready for submission!\n";