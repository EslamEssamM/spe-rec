<?php

namespace App\Console\Commands;

use App\Exports\ApplicationsExport;
use App\Models\Application;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class TestExportCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'test:export';

    /**
     * The console command description.
     */
    protected $description = 'Test the Excel export functionality';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        try {
            $this->info('Testing Excel Export Functionality...');

            // Get applications count
            $count = Application::count();
            $this->info("Total applications in database: $count");

            if ($count === 0) {
                $this->info('No applications found. Creating test data...');
                Application::factory(3)->create();
                $count = Application::count();
                $this->info("Created $count test applications");
            }

            // Test the export
            $query = Application::query();
            $export = new ApplicationsExport($query);

            // Test the query method
            $this->info('Testing query method...');
            $applications = $export->query()->get();
            $this->info('Query returned '.$applications->count().' applications');

            // Test the headings
            $this->info('Testing headings...');
            $headings = $export->headings();
            $this->line('Headings: '.implode(', ', array_slice($headings, 0, 5)).'...');

            // Test mapping for first application
            if ($applications->count() > 0) {
                $this->info('Testing mapping for first application...');
                $mapped = $export->map($applications->first());
                $this->line('First 3 mapped fields: '.implode(', ', array_slice($mapped, 0, 3)));
            }

            // Test file generation in storage/app
            $this->info('Testing file generation...');
            $filename = 'test_export_'.now()->format('Y-m-d_H-i-s').'.xlsx';
            Excel::store($export, $filename, 'local');

            $this->info('✅ Export test completed successfully!');
            $this->info("Test file created: storage/app/$filename");

            return Command::SUCCESS;

        } catch (\Exception $e) {
            $this->error('❌ Export test failed: '.$e->getMessage());
            $this->error('Stack trace:');
            $this->line($e->getTraceAsString());

            return Command::FAILURE;
        }
    }
}
