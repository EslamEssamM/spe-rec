<?php

namespace App\Console\Commands;

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Http\Request;

class TestExportEndpointCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'test:export-endpoint';

    /**
     * The console command description.
     */
    protected $description = 'Test the export endpoint directly';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        try {
            $this->info('Testing export endpoint...');
            
            // Create a mock request
            $request = Request::create('/admin/applications/export', 'GET');
            
            // Create controller instance
            $controller = new AdminApplicationController();
            
            // Call the export method
            $response = $controller->export($request);
            
            $this->info('Response type: ' . get_class($response));
            $this->info('Status code: ' . $response->getStatusCode());
            
            if (method_exists($response, 'headers')) {
                $contentType = $response->headers->get('content-type');
                $this->info('Content-Type: ' . ($contentType ?? 'not set'));
                
                $contentDisposition = $response->headers->get('content-disposition');
                $this->info('Content-Disposition: ' . ($contentDisposition ?? 'not set'));
            }
            
            $this->info('✅ Export endpoint test completed successfully!');
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            $this->error('❌ Export endpoint test failed: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
            $this->line($e->getTraceAsString());
            return Command::FAILURE;
        }
    }
}
