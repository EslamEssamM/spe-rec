<?php

namespace Database\Factories;

use App\Models\Committee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $universities = [
            'Suez University',
            'Cairo University',
            'Alexandria University',
            'Ain Shams University',
            'Mansoura University',
            'Helwan University',
            'Zagazig University',
            'Assiut University',
            'Tanta University',
            'Benha University'
        ];

        $faculties = [
            'Faculty of Engineering',
            'Faculty of Computer Science',
            'Faculty of Business Administration',
            'Faculty of Arts',
            'Faculty of Science',
            'Faculty of Medicine',
            'Faculty of Pharmacy',
            'Faculty of Law',
            'Faculty of Education',
            'Faculty of Economics'
        ];

        $departments = [
            'Computer Science',
            'Electrical Engineering',
            'Mechanical Engineering',
            'Civil Engineering',
            'Business Administration',
            'Marketing',
            'Accounting',
            'Information Systems',
            'Software Engineering',
            'Communications Engineering'
        ];

        $academicYears = ['preparatory', 'first', 'second', 'third', 'fourth', 'fifth'];

        // Generate random committee choices (1-3 committees)
        $committees = Committee::pluck('name')->toArray();
        $numCommittees = $this->faker->numberBetween(1, min(3, count($committees)));
        $selectedCommittees = $this->faker->randomElements($committees, $numCommittees);

        return [
            'full_name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'mobile' => '+20 ' . $this->faker->numberBetween(100, 999) . ' ' . $this->faker->numberBetween(100, 999) . ' ' . $this->faker->numberBetween(1000, 9999),
            'facebook_link' => 'https://facebook.com/' . $this->faker->userName(),
            'personal_photo' => 'applications/photos/default.jpg',
            'university' => $this->faker->randomElement($universities),
            'faculty' => $this->faker->randomElement($faculties),
            'department' => $this->faker->randomElement($departments),
            'academic_year' => $this->faker->randomElement($academicYears),
            'committee_choices' => $selectedCommittees,
            'why_applying' => $this->faker->paragraph(3),
            'how_benefit' => $this->faker->paragraph(2),
            'why_committee' => $this->faker->paragraph(2),
            'committee_responsibilities' => $this->faker->paragraph(3),
            'previous_experience' => $this->faker->paragraph(2),
            'open_space' => $this->faker->optional(0.5)->paragraph(1),
            'status' => $this->faker->randomElement(['pending', 'reviewed', 'accepted', 'rejected']),
            'submitted_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }

    /**
     * Indicate that the application is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the application is reviewed.
     */
    public function reviewed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'reviewed',
        ]);
    }

    /**
     * Indicate that the application is accepted.
     */
    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepted',
        ]);
    }

    /**
     * Indicate that the application is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
        ]);
    }
}
