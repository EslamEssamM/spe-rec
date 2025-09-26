<?php

use App\Models\Committee;

test('application form shows all committees with status', function () {
    // Create test committees
    Committee::create([
        'name' => 'Open Committee',
        'description' => 'This committee is open for applications',
        'responsibilities' => 'Various responsibilities',
        'is_open' => true,
    ]);

    Committee::create([
        'name' => 'Closed Committee',
        'description' => 'This committee is closed for applications',
        'responsibilities' => 'Various responsibilities',
        'is_open' => false,
    ]);

    $response = $this->get('/applications/create');

    $response->assertOk();

    // Check that both committees are passed to the view
    $response->assertInertia(fn ($page) =>
        $page->has('committees', 2)
             ->where('committees.0.name', 'Closed Committee')
             ->where('committees.0.is_open', false)
             ->where('committees.1.name', 'Open Committee')
             ->where('committees.1.is_open', true)
    );
});

test('cannot select closed committee in application', function () {
    // Create test committees
    Committee::create([
        'name' => 'Open Committee',
        'description' => 'This committee is open',
        'responsibilities' => 'Various responsibilities',
        'is_open' => true,
    ]);

    Committee::create([
        'name' => 'Closed Committee',
        'description' => 'This committee is closed',
        'responsibilities' => 'Various responsibilities',
        'is_open' => false,
    ]);

    // Try to submit application with closed committee
    $response = $this->post('/applications', [
        'full_name' => 'John Doe',
        'email' => 'john@example.com',
        'mobile' => '+201234567890',
        'facebook_link' => 'https://facebook.com/john.doe',
        'university' => 'Test University',
        'faculty' => 'Engineering',
        'department' => 'Computer Science',
        'academic_year' => 'third',
        'previous_experience' => 'I have experience in programming and leadership.',
        'why_applying' => 'I want to contribute to the organization.',
        'how_benefit' => 'I will gain valuable experience.',
        'committee_choices' => ['Closed Committee'], // Trying to select closed committee
        'why_committee' => 'I chose this committee because of my interest.',
        'committee_responsibilities' => 'I understand the committee handles various tasks.',
        'open_space' => '',
    ]);

    $response->assertSessionHasErrors('committee_choices.0');
});

test('can select open committee in application', function () {
    // Create test committees
    Committee::create([
        'name' => 'Open Committee',
        'description' => 'This committee is open',
        'responsibilities' => 'Various responsibilities',
        'is_open' => true,
    ]);

    // Submit application with open committee
    $response = $this->post('/applications', [
        'full_name' => 'John Doe',
        'email' => 'john@example.com',
        'mobile' => '+201234567890',
        'facebook_link' => 'https://facebook.com/john.doe',
        'university' => 'Test University',
        'faculty' => 'Engineering',
        'department' => 'Computer Science',
        'academic_year' => 'third',
        'previous_experience' => 'I have experience in programming and leadership.',
        'why_applying' => 'I want to contribute to the organization.',
        'how_benefit' => 'I will gain valuable experience.',
        'committee_choices' => ['Open Committee'], // Selecting open committee
        'why_committee' => 'I chose this committee because of my interest.',
        'committee_responsibilities' => 'I understand the committee handles various tasks.',
        'open_space' => '',
    ]);

    $response->assertRedirect('/applications/success');
});
