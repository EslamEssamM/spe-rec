<?php

namespace Database\Seeders;

use App\Models\Committee;
use Illuminate\Database\Seeder;

class CommitteeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $committees = [
            [
                'name' => 'Human resources Management (HRM)',
                'description' => 'Manage team recruitment and development',
                'responsibilities' => 'Handle recruitment processes, team building, performance management, and human resource development strategies.',
                'is_open' => true,
            ],
            [
                'name' => 'Human resources Development (HRD)',
                'description' => 'Focus on skill development and growth',
                'responsibilities' => 'Design training programs, conduct workshops, mentor members, and create development pathways for skill enhancement.',
                'is_open' => true,
            ],
            [
                'name' => 'Social Media',
                'description' => 'Manage online presence and engagement',
                'responsibilities' => 'Create content for social platforms, engage with followers, manage brand presence, and execute digital marketing campaigns.',
                'is_open' => true,
            ],
            [
                'name' => 'Multimedia',
                'description' => 'Create visual content and productions',
                'responsibilities' => 'Produce videos, create graphics, handle photography, manage visual assets, and support multimedia projects.',
                'is_open' => true,
            ],
            [
                'name' => 'Direct Marketing',
                'description' => 'Handle marketing campaigns',
                'responsibilities' => 'Develop marketing strategies, execute promotional campaigns, manage advertising efforts, and drive brand awareness.',
                'is_open' => true,
            ],
            [
                'name' => 'Magazine Editing',
                'description' => 'Edit and curate content',
                'responsibilities' => 'Review and edit articles, ensure content quality, coordinate with writers, and maintain editorial standards.',
                'is_open' => true,
            ],
            [
                'name' => 'Magazine Design',
                'description' => 'Design layouts and visuals',
                'responsibilities' => 'Create magazine layouts, design graphics, manage visual elements, and ensure aesthetic consistency.',
                'is_open' => true,
            ],
            [
                'name' => 'International Relations (IR)',
                'description' => 'Manage global partnerships',
                'responsibilities' => 'Build international connections, coordinate with global chapters, manage cultural exchanges, and develop international programs.',
                'is_open' => true,
            ],
            [
                'name' => 'Organizing Committee (OC)',
                'description' => 'Plan and execute events',
                'responsibilities' => 'Organize events, coordinate logistics, manage schedules, oversee event execution, and ensure successful outcomes.',
                'is_open' => true,
            ],
            [
                'name' => 'Extracurricular Committee (EC)',
                'description' => 'Organize student activities',
                'responsibilities' => 'Plan recreational activities, organize competitions, coordinate social events, and enhance student engagement.',
                'is_open' => true,
            ],
            [
                'name' => 'Logistics',
                'description' => 'Handle resource management',
                'responsibilities' => 'Manage equipment and supplies, coordinate transportation, oversee venue arrangements, and handle operational logistics.',
                'is_open' => true,
            ],
            [
                'name' => 'Energy4me',
                'description' => 'Energy awareness programs',
                'responsibilities' => 'Develop energy education programs, promote sustainability initiatives, create awareness campaigns, and engage communities.',
                'is_open' => true,
            ],
            [
                'name' => 'Academy',
                'description' => 'Training and education programs',
                'responsibilities' => 'Design educational curricula, conduct training sessions, coordinate academic programs, and support learning initiatives.',
                'is_open' => true,
            ],
            [
                'name' => 'Data Analysis',
                'description' => 'Analyze data and create insights',
                'responsibilities' => 'Collect and analyze data, create reports, generate insights, support decision-making with data-driven recommendations.',
                'is_open' => true,
            ],
            [
                'name' => 'Business Development (BD)',
                'description' => 'Develop business strategies',
                'responsibilities' => 'Identify growth opportunities, build partnerships, develop strategic plans, and drive organizational development.',
                'is_open' => true,
            ],
            [
                'name' => 'Android',
                'description' => 'Develop mobile applications',
                'responsibilities' => 'Design and develop Android applications, maintain mobile platforms, optimize user experience, and support mobile initiatives.',
                'is_open' => true,
            ],
            [
                'name' => 'Web Development',
                'description' => 'Create web applications',
                'responsibilities' => 'Develop websites, maintain web platforms, create web applications, optimize performance, and ensure security.',
                'is_open' => true,
            ],
        ];

        foreach ($committees as $committee) {
            Committee::create($committee);
        }
    }
}
