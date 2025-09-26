<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'make:admin {email} {name} {password}';

    /**
     * The console command description.
     */
    protected $description = 'Create an admin user for testing';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');
        $name = $this->argument('name');
        $password = $this->argument('password');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        if ($user->wasRecentlyCreated) {
            $this->info("✅ Admin user created successfully!");
        } else {
            $this->info("ℹ️ Admin user already exists, updated if needed.");
        }

        $this->info("Email: {$user->email}");
        $this->info("Name: {$user->name}");
        $this->info("Role: {$user->role}");
        $this->info("Is Active: " . ($user->is_active ? 'Yes' : 'No'));
        $this->info("Is HR/Admin: " . ($user->isHR() ? 'Yes' : 'No'));

        return Command::SUCCESS;
    }
}
