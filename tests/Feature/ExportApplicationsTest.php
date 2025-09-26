<?php

use App\Models\Application;
use App\Models\User;

test('admin can export applications to excel', function () {
    // Create an admin user
    $admin = User::factory()->create([
        'email' => 'admin@example.com',
        'role' => 'admin'
    ]);

    // Create some test applications
    Application::factory()->count(3)->create();

    // Act as the admin and request the export
    $response = $this->actingAs($admin)
        ->get('/admin/applications/export');

    // Assert the response is successful and returns a file
    $response->assertStatus(200);
    $response->assertHeader('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    
    // Check that the filename contains the expected pattern
    $disposition = $response->headers->get('content-disposition');
    expect($disposition)->toContain('spe_applications_');
    expect($disposition)->toContain('.xlsx');
});

test('export respects filters', function () {
    // Create an admin user
    $admin = User::factory()->create([
        'email' => 'admin@example.com',
        'role' => 'admin'
    ]);

    // Create applications with different statuses
    Application::factory()->create(['status' => 'pending']);
    Application::factory()->create(['status' => 'accepted']);
    Application::factory()->create(['status' => 'rejected']);

    // Export only pending applications
    $response = $this->actingAs($admin)
        ->get('/admin/applications/export?status=pending');

    $response->assertStatus(200);
});
