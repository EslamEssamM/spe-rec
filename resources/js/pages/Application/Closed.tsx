import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface ApplicationClosedProps {
  type?: 'recruitment_closed' | 'committees_closed';
  title?: string;
  message: string;
  contactEmail: string;
  reopenDate?: string;
  reopenDateTime?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Closed({
  type = 'committees_closed',
  title,
  message,
  contactEmail,
  reopenDate,
  reopenDateTime
}: ApplicationClosedProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!reopenDateTime || !isClient) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const targetDate = new Date(reopenDateTime).getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [reopenDateTime, isClient]);

  const isRecruitmentClosed = type === 'recruitment_closed';
  const displayTitle = title || (isRecruitmentClosed ? 'Recruitment Currently Closed' : 'Applications Currently Closed');

  return (
    <>
      <Head title={displayTitle} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className={`w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full flex items-center justify-center shadow-xl ${
            isRecruitmentClosed
              ? 'bg-gradient-to-br from-amber-500 to-orange-600'
              : 'bg-gradient-to-br from-red-500 to-red-600'
          }`}>
            {isRecruitmentClosed ? (
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
            {displayTitle}
          </h1>

          {/* Message */}
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
            {message}
          </p>

          {/* Countdown Timer for Recruitment Reopening */}
          {isRecruitmentClosed && reopenDate && isClient && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 mx-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                🎯 Recruitment Opens On
              </h2>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">
                {reopenDate}
              </p>

              {/* Countdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 sm:p-4 text-white">
                  <div className="text-2xl sm:text-3xl font-bold">{timeRemaining.days}</div>
                  <div className="text-xs sm:text-sm opacity-90">Days</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 sm:p-4 text-white">
                  <div className="text-2xl sm:text-3xl font-bold">{timeRemaining.hours}</div>
                  <div className="text-xs sm:text-sm opacity-90">Hours</div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-3 sm:p-4 text-white">
                  <div className="text-2xl sm:text-3xl font-bold">{timeRemaining.minutes}</div>
                  <div className="text-xs sm:text-sm opacity-90">Minutes</div>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 sm:p-4 text-white">
                  <div className="text-2xl sm:text-3xl font-bold">{timeRemaining.seconds}</div>
                  <div className="text-xs sm:text-sm opacity-90">Seconds</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-blue-800 font-medium">
                  🔔 Get ready! Applications will be open soon.
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Follow our social media for updates and notifications.
                </p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 mx-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              Need to get in touch?
            </h2>
            <p className="text-gray-600 mb-4">
              For any questions or inquiries, please contact us:
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.463.25 1.024.25 1.487 0L21 8m-18 0l18 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <span className="text-sm sm:text-base">{contactEmail}</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm sm:text-base">Return to Homepage</span>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm sm:text-base">Learn About SPE</span>
            </Link>
          </div>

          {/* Footer Note */}
          <div className="mt-8 sm:mt-12 px-4">
            <p className="text-sm text-gray-500">
              {isRecruitmentClosed
                ? "Thank you for your interest! We're preparing an amazing recruitment experience for you."
                : "We appreciate your interest in joining SPE Suez University Student Chapter!"
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
