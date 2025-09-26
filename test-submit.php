<?php

// Test the application submission endpoint
$url = 'http://127.0.0.1:8000/apply';

$formData = [
    'full_name' => 'Test User',
    'email' => 'test@example.com',
    'mobile' => '+20 123 456 7890',
    'facebook_link' => 'https://facebook.com/test',
    'university' => 'Suez University',
    'faculty' => 'Faculty of Engineering',
    'department' => 'Petroleum Engineering',
    'academic_year' => 'third',
    'previous_experience' => 'I have volunteered in multiple student organizations during my academic career.',
    'why_applying' => 'I am passionate about petroleum engineering and want to contribute to SPE.',
    'how_benefit' => 'Joining SPE will help me network with industry professionals and gain experience.',
    'committee_choices' => ['Human resources Management (HRM)'],
    'why_committee' => 'I chose HRM because I have strong interpersonal skills and experience.',
    'committee_responsibilities' => 'The HRM committee is responsible for recruiting new members and managing databases.',
    'open_space' => 'I am excited to contribute to SPE Suez.',
];

// Get CSRF token first
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8000/apply');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');

$response = curl_exec($ch);

// Extract CSRF token
preg_match('/<meta name="csrf-token" content="([^"]+)"/', $response, $matches);
$csrfToken = $matches[1] ?? '';

echo "CSRF Token: " . $csrfToken . "\n";

if (!empty($csrfToken)) {
    // Submit form with CSRF token
    $formData['_token'] = $csrfToken;
    
    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8000/apply');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    echo "HTTP Response Code: " . $httpCode . "\n";
    echo "Response Headers:\n";
    echo $response . "\n";
} else {
    echo "Could not get CSRF token\n";
}

curl_close($ch);

// Clean up
if (file_exists('cookies.txt')) {
    unlink('cookies.txt');
}