import { Head, Link } from '@inertiajs/react';

interface ApplicationClosedProps {
  message: string;
  contactEmail: string;
}

export default function Closed({ message, contactEmail }: ApplicationClosedProps) {
  return (
    <>
      <Head title="Applications Closed" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Applications Currently Closed
          </h1>

          {/* Message */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need to get in touch?
            </h2>
            <p className="text-gray-600 mb-4">
              For any questions or inquiries, please contact us:
            </p>
            <a 
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.463.25 1.024.25 1.487 0L21 8m-18 0l18 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              {contactEmail}
            </a>
          </div>

          {/* Action Button */}
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Homepage
          </Link>

          {/* Footer Note */}
          <div className="mt-12">
            <p className="text-sm text-gray-500">
              We appreciate your interest in joining SPE Suez University Student Chapter!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}