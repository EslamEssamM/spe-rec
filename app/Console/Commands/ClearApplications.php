<?php

namespace App\Console\Commands;

use App\Models\Application;
use Illuminate\Console\Command;

class ClearApplications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'applications:clear {--force : Skip confirmation prompt}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove all applications from the database';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $count = Application::count();

        if ($count === 0) {
            $this->info('No applications to delete.');

            return self::SUCCESS;
        }

        $this->warn("This will permanently delete {$count} application(s).");

        if (!$this->option('force') && !$this->confirm('Are you sure you want to delete all applications?')) {
            $this->info('Operation cancelled.');

            return self::SUCCESS;
        }

        $deleted = Application::query()->delete();

        $this->info("Successfully deleted {$deleted} application(s).");

        return self::SUCCESS;
    }
}
