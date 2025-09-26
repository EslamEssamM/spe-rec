<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Exports\ApplicationsExport;
use App\Models\Application;
use Maatwebsite\Excel\Facades\Excel;

// Load Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

try {
    echo "Testing Excel Export Functionality...\n";
    
    // Get applications count
    $count = Application::count();
    echo "Total applications in database: $count\n";
    
    if ($count === 0) {
        echo "No applications found. Creating test data...\n";
        Application::factory(3)->create();
        $count = Application::count();
        echo "Created $count test applications\n";
    }
    
    // Test the export
    $query = Application::query();
    $export = new ApplicationsExport($query);
    
    // Test the query method
    echo "Testing query method...\n";
    $applications = $export->query()->get();
    echo "Query returned " . $applications->count() . " applications\n";
    
    // Test the headings
    echo "Testing headings...\n";
    $headings = $export->headings();
    echo "Headings: " . implode(', ', $headings) . "\n";
    
    // Test mapping for first application
    if ($applications->count() > 0) {
        echo "Testing mapping for first application...\n";
        $mapped = $export->map($applications->first());
        echo "Mapped data: " . json_encode($mapped) . "\n";
    }
    
    // Test file generation
    echo "Testing file generation...\n";
    $filename = 'test_export_' . now()->format('Y-m-d_H-i-s') . '.xlsx';
    Excel::store($export, $filename, 'local');
    
    echo "✅ Export test completed successfully!\n";
    echo "Test file created: $filename\n";
    
} catch (Exception $e) {
    echo "❌ Export test failed: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}