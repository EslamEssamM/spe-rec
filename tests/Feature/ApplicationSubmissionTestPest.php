<?php

use App\Models\Committee;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    // Fake storage for file uploads
    Storage::fake('public');

    // Create some committees for testing
    Committee::factory()->create([
        'name' => 'Human resources Management (HRM)',
        'description' => 'Manage team recruitment and development',
        'is_open' => true,
    ]);

    Committee::factory()->create([
        'name' => 'Social Media',
        'description' => 'Manage online presence and engagement',
        'is_open' => true,
    ]);

    Committee::factory()->create([
        'name' => 'Multimedia',
        'description' => 'Create visual content and productions',
        'is_open' => false, // Closed committee for testing
    ]);
});

it('can submit a valid application with one committee', function () {
    $applicationData = [
        'full_name' => 'John Doe',
        'email' => 'john.doe@gmail.com',
        'mobile' => '+20 123 456 7890',
        'facebook_link' => 'https://facebook.com/john.doe',
        'personal_photo' => UploadedFile::fake()->image('photo.jpg', 600, 600)->size(1000),
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

    $response = $this->post('/apply', $applicationData);

    $response->assertRedirect('/application/success');
    $response->assertSessionHas('success');

    $this->assertDatabaseHas('applications', [
        'full_name' => 'John Doe',
        'email' => 'john.doe@gmail.com',
        'mobile' => '+20 123 456 7890',
        'committee_choices' => json_encode(['Human resources Management (HRM)']),
        'status' => 'pending',
    ]);
});

it('can submit a valid application with two committees', function () {
    $applicationData = [
        'full_name' => 'Jane Smith',
        'email' => 'jane.smith@gmail.com',
        'mobile' => '+20 987 654 3210',
        'facebook_link' => 'https://facebook.com/jane.smith',
        'personal_photo' => UploadedFile::fake()->image('jane-photo.jpg'),
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'second',
        'previous_experience' => 'I have experience in content creation, social media management, and event organization through my work with the university student council.',
        'why_applying' => 'SPE offers great opportunities for professional development and networking in the petroleum engineering field.',
        'how_benefit' => 'I will gain industry insights, develop leadership skills, and build connections that will help advance my career in petroleum engineering.',
        'committee_choices' => ['Human resources Management (HRM)', 'Social Media'],
        'why_committee' => 'I chose HRM and Social Media because they align with my skills in communication, content creation, and team management.',
        'committee_responsibilities' => 'HRM handles recruitment and member management, while Social Media manages online presence, creates content, and engages with the community.',
        'open_space' => null,
    ];

    $response = $this->post('/apply', $applicationData);

    $response->assertRedirect('/application/success');

    $this->assertDatabaseHas('applications', [
        'full_name' => 'Jane Smith',
        'email' => 'jane.smith@gmail.com',
        'committee_choices' => json_encode(['Human resources Management (HRM)', 'Social Media']),
        'status' => 'pending',
    ]);

    // Assert photo was uploaded
    Storage::disk('public')->assertExists('applications/photos/' . basename($applicationData['personal_photo']->hashName()));
});

it('requires all mandatory fields', function () {
    $response = $this->post('/apply', []);

    $response->assertSessionHasErrors([
        'full_name',
        'email',
        'mobile',
        'facebook_link',
        'university',
        'faculty',
        'department',
        'academic_year',
        'previous_experience',
        'why_applying',
        'how_benefit',
        'committee_choices',
        'why_committee',
        'committee_responsibilities',
    ]);
});

it('validates committee choices minimum', function () {
    $applicationData = [
        'full_name' => 'Test User',
        'email' => 'test@example.com',
        'mobile' => '+20 123 456 7890',
        'facebook_link' => 'https://facebook.com/test',
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'first',
        'previous_experience' => 'Some experience here',
        'why_applying' => 'Some reason here',
        'how_benefit' => 'Some benefit here',
        'committee_choices' => [], // Empty array
        'why_committee' => 'Some reason',
        'committee_responsibilities' => 'Some knowledge',
    ];

    $response = $this->post('/apply', $applicationData);

    $response->assertSessionHasErrors('committee_choices');
});

it('validates committee choices maximum', function () {
    $applicationData = [
        'full_name' => 'Test User',
        'email' => 'test@example.com',
        'mobile' => '+20 123 456 7890',
        'facebook_link' => 'https://facebook.com/test',
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'first',
        'previous_experience' => 'Some experience here',
        'why_applying' => 'Some reason here',
        'how_benefit' => 'Some benefit here',
        'committee_choices' => ['Committee 1', 'Committee 2', 'Committee 3'], // More than 2
        'why_committee' => 'Some reason',
        'committee_responsibilities' => 'Some knowledge',
    ];

    $response = $this->post('/apply', $applicationData);

    $response->assertSessionHasErrors('committee_choices');
});

it('validates email uniqueness', function () {
    // Create an existing application
    $existingData = [
        'full_name' => 'Existing User',
        'email' => 'existing@example.com',
        'mobile' => '+20 111 111 1111',
        'facebook_link' => 'https://facebook.com/existing',
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'first',
        'previous_experience' => 'Some experience',
        'why_applying' => 'Some reason',
        'how_benefit' => 'Some benefit',
        'committee_choices' => ['Human resources Management (HRM)'],
        'why_committee' => 'Some reason',
        'committee_responsibilities' => 'Some knowledge',
    ];

    $this->post('/apply', $existingData);

    // Try to submit with same email
    $duplicateData = array_merge($existingData, [
        'full_name' => 'Different User',
    ]);

    $response = $this->post('/apply', $duplicateData);

    $response->assertSessionHasErrors('email');
});

it('validates text field minimum length', function () {
    $applicationData = [
        'full_name' => 'Test User',
        'email' => 'test@example.com',
        'mobile' => '+20 123 456 7890',
        'facebook_link' => 'https://facebook.com/test',
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'first',
        'previous_experience' => 'Short', // Less than 10 characters
        'why_applying' => 'Also short', // Less than 10 characters
        'how_benefit' => 'Short',
        'committee_choices' => ['Human resources Management (HRM)'],
        'why_committee' => 'Short',
        'committee_responsibilities' => 'Short',
    ];

    $response = $this->post('/apply', $applicationData);

    $response->assertSessionHasErrors([
        'previous_experience',
        'why_applying',
        'how_benefit',
        'why_committee',
        'committee_responsibilities',
    ]);
});

it('validates academic year values', function () {
    $applicationData = [
        'full_name' => 'Test User',
        'email' => 'test@example.com',
        'mobile' => '+20 123 456 7890',
        'facebook_link' => 'https://facebook.com/test',
        'university' => 'Suez University',
        'faculty' => 'Faculty of Engineering',
        'department' => 'Petroleum Engineering',
        'academic_year' => 'invalid_year',
        'previous_experience' => 'Some experience here',
        'why_applying' => 'Some reason here',
        'how_benefit' => 'Some benefit here',
        'committee_choices' => ['Human resources Management (HRM)'],
        'why_committee' => 'Some reason',
        'committee_responsibilities' => 'Some knowledge',
    ];

    $response = $this->post('/apply', $applicationData);

    $response->assertSessionHasErrors('academic_year');
});

it('accepts valid academic year values', function () {
    $validYears = ['preparatory', 'first', 'second', 'third', 'fourth', 'fifth'];

    foreach ($validYears as $year) {
        $applicationData = [
            'full_name' => 'Test User ' . $year,
            'email' => 'test.' . $year . '@example.com',
            'mobile' => '+20 123 456 7890',
            'facebook_link' => 'https://facebook.com/test',
            'university' => 'Suez University',
            'faculty' => 'Faculty of Engineering',
            'department' => 'Petroleum Engineering',
            'academic_year' => $year,
            'previous_experience' => 'Some experience here',
            'why_applying' => 'Some reason here',
            'how_benefit' => 'Some benefit here',
            'committee_choices' => ['Human resources Management (HRM)'],
            'why_committee' => 'Some reason',
            'committee_responsibilities' => 'Some knowledge',
        ];

        $response = $this->post('/apply', $applicationData);

        $response->assertRedirect('/application/success');
        $this->assertDatabaseHas('applications', [
            'email' => 'test.' . $year . '@example.com',
            'academic_year' => $year,
        ]);
    }
});
