import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { CheckCircle, Mail, Phone, Calendar, Users } from 'lucide-react';

interface Application {
  id: number;
  full_name: string;
  email: string;
  committee_choices: string[];
  submitted_at: string;
}

interface SuccessProps {
  application?: Application;
  message: string;
  nextSteps: string[];
  contactInfo: {
    email: string;
    social: {
      facebook: string;
      linkedin: string;
      instagram: string;
    };
  };
}

export default function Success({ application, message, nextSteps, contactInfo }: SuccessProps) {
  return (
    <>
      <Head title="Application Submitted - SPE Suez" />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Navigation Header */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Link href="/" className="text-xl font-bold text-blue-900">SPE Suez</Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </Link>
                  {/* <Link href="/about" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </Link> */}
                  <Link href="/committees" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Committees
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {message}
            </p>
          </div>

          {/* Application Summary */}
          {application && (
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Applicant Name</p>
                    <p className="font-medium text-gray-900">{application.full_name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{application.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Selected Committee{application.committee_choices.length > 1 ? 's' : ''}</p>
                    <p className="font-medium text-gray-900">{application.committee_choices.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {new Date(application.submitted_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
              <p className="text-blue-100 mb-6">
                Have questions or need assistance? Don't hesitate to reach out to us.
              </p>

              <div className="flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 mr-2" />
                <span className="text-lg font-medium">{contactInfo.email}</span>
              </div>

              <div className="flex justify-center space-x-6 mb-8">
                <a
                  href={contactInfo.social.facebook}
                  className="text-blue-100 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
                <a
                  href={contactInfo.social.linkedin}
                  className="text-blue-100 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={contactInfo.social.instagram}
                  className="text-blue-100 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>

              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">SPE Suez Student Chapter</h3>
              <p className="text-gray-400 mb-4">
                Thank you for your interest in joining SPE Suez Student Chapter.
              </p>
              <p className="text-gray-400">
                &copy; 2025 SPE Suez Student Chapter. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
