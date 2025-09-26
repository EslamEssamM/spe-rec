<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Builder;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ApplicationsExport implements FromQuery, WithColumnWidths, WithHeadings, WithMapping, WithStyles
{
    protected Builder $query;

    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    public function query(): Builder
    {
        return $this->query->orderBy('submitted_at', 'desc');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Full Name',
            'Email',
            'Mobile',
            'Facebook Link',
            'University',
            'Faculty',
            'Department',
            'Academic Year',
            'Committee Choices',
            'Status',
            'Why Applying',
            'How Benefit',
            'Why Committee',
            'Committee Responsibilities',
            'Previous Experience',
            'Open Space',
            'Submitted At',
        ];
    }

    public function map($application): array
    {
        return [
            $application->id,
            $application->full_name,
            $application->email,
            $application->mobile ?? '',
            $application->facebook_link ?? '',
            $application->university,
            $application->faculty,
            $application->department,
            $application->academic_year,
            is_array($application->committee_choices) ? implode('; ', $application->committee_choices) : ($application->committee_choices ?? ''),
            ucfirst($application->status),
            $application->why_applying ?? '',
            $application->how_benefit ?? '',
            $application->why_committee ?? '',
            $application->committee_responsibilities ?? '',
            $application->previous_experience ?? '',
            $application->open_space ?? '',
            $application->submitted_at?->format('Y-m-d H:i:s') ?? '',
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 5,   // ID
            'B' => 20,  // Full Name
            'C' => 25,  // Email
            'D' => 15,  // Mobile
            'E' => 25,  // Facebook Link
            'F' => 20,  // University
            'G' => 20,  // Faculty
            'H' => 20,  // Department
            'I' => 15,  // Academic Year
            'J' => 25,  // Committee Choices
            'K' => 12,  // Status
            'L' => 30,  // Why Applying
            'M' => 30,  // How Benefit
            'N' => 30,  // Why Committee
            'O' => 30,  // Committee Responsibilities
            'P' => 30,  // Previous Experience
            'Q' => 30,  // Open Space
            'R' => 18,  // Submitted At
        ];
    }
}
