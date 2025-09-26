<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main admin user
        User::create([
            'name' => 'SPE Suez Admin',
            'email' => 'admin@spesuez.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create HR users
        User::create([
            'name' => 'SPE HR Manager',
            'email' => 'spesusc.hrm2026@gmail.com',
            'password' => Hash::make('hr2026'),
            'role' => 'hr',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}
