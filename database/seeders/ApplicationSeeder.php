<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Committee;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First, ensure we have committees to reference
        if (Committee::count() === 0) {
            $this->call(CommitteeSeeder::class);
        }

        // Get all committee names for realistic committee choices
        $committees = Committee::pluck('name')->toArray();

        // Create 50 sample applications with various statuses
        $statuses = ['pending', 'reviewed', 'accepted', 'rejected'];
        $statusWeights = [
            'pending' => 40,    // 40% pending
            'reviewed' => 30,   // 30% reviewed
            'accepted' => 20,   // 20% accepted
            'rejected' => 10,   // 10% rejected
        ];

        for ($i = 1; $i <= 50; $i++) {
            // Randomly select status based on weights
            $rand = rand(1, 100);
            $status = 'pending';
            $cumulative = 0;
            foreach ($statusWeights as $statusName => $weight) {
                $cumulative += $weight;
                if ($rand <= $cumulative) {
                    $status = $statusName;
                    break;
                }
            }

            // Randomly select 1-3 committees
            $numCommittees = rand(1, min(3, count($committees)));
            $selectedCommittees = collect($committees)
                ->shuffle()
                ->take($numCommittees)
                ->values()
                ->toArray();

            Application::factory()->create([
                'status' => $status,
                'committee_choices' => $selectedCommittees,
                'submitted_at' => fake()->dateTimeBetween('-3 months', 'now'),
            ]);
        }

        $this->command->info('Created 50 applications with various statuses and committee choices.');
        
        // Display summary
        $summary = Application::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
            
        $this->command->info('Application status distribution:');
        foreach ($summary as $status => $count) {
            $this->command->info("  {$status}: {$count}");
        }
    }
}
