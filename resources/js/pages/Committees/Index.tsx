import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Users, CheckCircle, Clock } from 'lucide-react';

interface Committee {
  id: number;
  name: string;
  description: string;
  responsibilities: string;
  is_open: boolean;
  created_at: string;
  updated_at: string;
}

interface CommitteesProps {
  committees: Committee[];
  pageTitle: string;
  description: string;
}

export default function Index({ committees, pageTitle, description }: CommitteesProps) {
  return (
    <>
      <Head title="Committees - SPE Suez" />

      <div className="min-h-screen bg-white">
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
                  <Link href="/committees" className="text-blue-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    Committees
                  </Link>
                  <Link
                    href="/apply"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {pageTitle}
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Committees Grid */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {committees.map((committee) => (
                <div
                  key={committee.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-600 mr-3" />
                      <h2 className="text-2xl font-bold text-gray-900">{committee.name}</h2>
                    </div>
                    <div className="flex items-center">
                      {committee.is_open ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <Clock className="w-4 h-4 mr-1" />
                          Closed
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {committee.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {committee.responsibilities}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    {committee.is_open ? (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">
                          ✓ Currently accepting applications
                        </span>
                        <Link
                          href="/apply"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply for This Committee
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <span className="text-sm text-red-600 font-medium">
                          Applications for this committee are currently closed
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Status Info */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Application Information</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Applications</h3>
                  <p className="text-gray-600">
                    Committees with "Open" status are actively accepting new member applications.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Closed Applications</h3>
                  <p className="text-gray-600">
                    Committees with "Closed" status have reached their capacity or ended their recruitment cycle.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">One Application</h3>
                  <p className="text-gray-600">
                    You can apply to only one committee. Choose carefully based on your interests and skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Choose the committee that aligns with your passion and skills. Join us in advancing petroleum engineering at Suez University.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Your Application Today
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">SPE Suez Student Chapter</h3>
                <p className="text-gray-400">
                  Advancing petroleum engineering knowledge and connecting students with industry professionals.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><a href="https://spesuez.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><Link href="/apply" className="text-gray-400 hover:text-white">Apply Now</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">spesusc.hrm2026@gmail.com</p>
                <p className="text-gray-400">Suez University, Egypt</p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">&copy; 2025 SPE Suez Student Chapter. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
