<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Submitted Successfully</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 40px 30px;
        }
        .success-badge {
            background-color: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        .application-details {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 25px;
            margin: 25px 0;
        }
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
            width: 140px;
            flex-shrink: 0;
        }
        .detail-value {
            color: #6b7280;
            flex: 1;
        }
        .committees-list {
            color: #2563eb;
            font-weight: 600;
        }
        .next-steps {
            background-color: #eff6ff;
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin: 25px 0;
        }
        .next-steps h3 {
            color: #1e40af;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .steps-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .steps-list li {
            padding: 8px 0;
            position: relative;
            padding-left: 30px;
            color: #374151;
        }
        .steps-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        .contact-info {
            background-color: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
        }
        .contact-info h4 {
            color: #92400e;
            margin: 0 0 10px 0;
        }
        .contact-info p {
            margin: 5px 0;
            color: #451a03;
        }
        .contact-email {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
        }
        .footer {
            background-color: #1f2937;
            color: #9ca3af;
            padding: 30px;
            text-align: center;
        }
        .footer h3 {
            color: #f3f4f6;
            margin: 0 0 15px 0;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
        }
        .logo {
            background-color: rgba(255, 255, 255, 0.2);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px auto;
            font-size: 24px;
            font-weight: bold;
        }
        @media (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            .header, .content, .footer {
                padding: 30px 20px;
            }
            .application-details, .next-steps, .contact-info {
                padding: 15px;
            }
            .detail-row {
                flex-direction: column;
            }
            .detail-label {
                width: auto;
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">SPE</div>
            <h1>Application Submitted!</h1>
            <p>Your application to SPE Suez Student Chapter has been received</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="success-badge">✓ Successfully Submitted</div>
            
            <h2>Dear {{ $application->full_name }},</h2>
            
            <p>Thank you for your interest in joining SPE Suez Student Chapter! We're excited to inform you that your application has been <strong>successfully submitted</strong> and is now under review.</p>

            <!-- Application Details -->
            <div class="application-details">
                <h3 style="margin-top: 0; color: #1f2937;">Application Summary</h3>
                
                <div class="detail-row">
                    <div class="detail-label">Full Name:</div>
                    <div class="detail-value">{{ $application->full_name }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Email:</div>
                    <div class="detail-value">{{ $application->email }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Mobile:</div>
                    <div class="detail-value">{{ $application->mobile }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">University:</div>
                    <div class="detail-value">{{ $application->university }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Faculty:</div>
                    <div class="detail-value">{{ $application->faculty }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Department:</div>
                    <div class="detail-value">{{ $application->department }}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Academic Year:</div>
                    <div class="detail-value">{{ ucfirst($application->academic_year) }} Year</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Committee(s):</div>
                    <div class="detail-value committees-list">
                        @if(is_array($application->committee_choices))
                            {{ implode(', ', $application->committee_choices) }}
                        @else
                            {{ $application->committee_choices }}
                        @endif
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">Submitted:</div>
                    <div class="detail-value">{{ $application->submitted_at->format('F j, Y \a\t g:i A') }}</div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul class="steps-list">
                    <li>Our HR team will carefully review your application</li>
                    <li>You will receive an email notification about your application status</li>
                    <li>The review process typically takes 1-2 weeks</li>
                    <li>If selected, you'll be contacted for the next steps</li>
                </ul>
            </div>

            <!-- Contact Information -->
            <div class="contact-info">
                <h4>Need Help or Have Questions?</h4>
                <p>Don't hesitate to contact our HR team:</p>
                <p><a href="mailto:spesusc.hrm2026@gmail.com" class="contact-email">spesusc.hrm2026@gmail.com</a></p>
            </div>

            <p style="margin-bottom: 0;">Thank you once again for your interest in SPE Suez Student Chapter. We look forward to potentially welcoming you to our amazing community!</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <h3>SPE Suez Student Chapter</h3>
            <p>Society of Petroleum Engineers - Suez University</p>
            <p>Building the future of energy professionals</p>
            <p style="margin-top: 20px; font-size: 12px;">&copy; {{ date('Y') }} SPE Suez Student Chapter. All rights reserved.</p>
        </div>
    </div>
</body>
</html>