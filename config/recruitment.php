<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Recruitment Settings
    |--------------------------------------------------------------------------
    |
    | Here you can configure the recruitment settings for SPE Suez Student Chapter.
    | This includes opening and closing dates for recruitment periods.
    |
    */

    // Current recruitment status
    'is_open' => env('RECRUITMENT_OPEN', false),

    // Recruitment opening date (when applications will be accepted)
    'opens_at' => env('RECRUITMENT_OPENS_AT', '2025-12-05 00:00:00'),

    // Recruitment closing date (when applications will no longer be accepted)
    'closes_at' => env('RECRUITMENT_CLOSES_AT', '2025-12-20 23:59:59'),

    // Contact email for recruitment inquiries
    'contact_email' => env('RECRUITMENT_CONTACT_EMAIL', 'spesusc.hrm2026@gmail.com'),

    // Custom messages
    'closed_message' => 'SPE Suez Student Chapter recruitment is currently closed.',
    'committees_closed_message' => 'Applications are currently closed. All committees have reached their capacity.',

];
