<?php

namespace App\Console\Commands;

use App\Models\Committee;
use Illuminate\Console\Command;

class ToggleCommitteeStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'committee:toggle {name : The name of the committee}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Toggle the open/closed status of a committee';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $committeeName = $this->argument('name');

        $committee = Committee::where('name', 'LIKE', "%{$committeeName}%")->first();

        if (!$committee) {
            $this->error("Committee '{$committeeName}' not found.");
            $this->info("Available committees:");
            Committee::all()->each(function($committee) {
                $status = $committee->is_open ? 'Open' : 'Closed';
                $this->line("- {$committee->name} ({$status})");
            });
            return;
        }

        $oldStatus = $committee->is_open ? 'Open' : 'Closed';
        $committee->is_open = !$committee->is_open;
        $committee->save();
        $newStatus = $committee->is_open ? 'Open' : 'Closed';

        $this->info("Committee '{$committee->name}' status changed from {$oldStatus} to {$newStatus}");
    }
}
