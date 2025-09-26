import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Globe, Users, Award, Target, Heart, Lightbulb } from 'lucide-react';

interface AboutProps {
  speHistory: {
    founded: number;
    headquarters: string;
    mission: string;
    global_reach: {
      members: string;
      countries: string;
      student_chapters: string;
      sections: string;
    };
  };
  speSuezChapter: {
    founded: number;
    location: string;
    mission: string;
    achievements: string[];
    values: string[];
  };
  leadership: {
    executive_board: Array<{
      position: string;
      name: string;
    }>;
  };
  contactInfo: {
    email: string;
    university: string;
    faculty: string;
    social_media: {
      facebook: string;
      linkedin: string;
      instagram: string;
    };
  };
}

export default function About({
  speHistory,
  speSuezChapter,
  leadership,
  contactInfo
}: AboutProps) {
  return (
    <>
      <Head title="About SPE Suez" />

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
                  {/* <Link href="/about" className="text-blue-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                    About
                  </Link> */}
                  <Link href="/committees" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
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
                About SPE Suez
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Learn about our history, mission, and commitment to advancing petroleum engineering education at Suez University
              </p>
            </div>
          </div>
        </div>

        {/* SPE Global Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Society of Petroleum Engineers (SPE)
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Founded in {speHistory.founded} and headquartered in {speHistory.headquarters},
                  SPE is the largest individual member organization serving managers, engineers,
                  scientists and other professionals worldwide in the upstream segment of the oil and gas industry.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {speHistory.mission}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Globe className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{speHistory.global_reach.countries}</div>
                  <div className="text-gray-600">Countries</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{speHistory.global_reach.members}</div>
                  <div className="text-gray-600">Members</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{speHistory.global_reach.student_chapters}</div>
                  <div className="text-gray-600">Student Chapters</div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <Target className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{speHistory.global_reach.sections}</div>
                  <div className="text-gray-600">Sections</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SPE Suez Chapter Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">SPE Suez Student Chapter</h2>
              <p className="text-lg text-gray-700">
                Established in {speSuezChapter.founded} at {speSuezChapter.location}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {speSuezChapter.mission}
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Achievements</h3>
                <ul className="space-y-3">
                  {speSuezChapter.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
                <div className="space-y-4">
                  {speSuezChapter.values.map((value, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 mr-4">
                        {index === 0 && <Award className="h-8 w-8 text-blue-600" />}
                        {index === 1 && <Heart className="h-8 w-8 text-blue-600" />}
                        {index === 2 && <Users className="h-8 w-8 text-blue-600" />}
                        {index === 3 && <Lightbulb className="h-8 w-8 text-blue-600" />}
                        {index === 4 && <Globe className="h-8 w-8 text-blue-600" />}
                      </div>
                      <div className="text-gray-900 font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-lg text-gray-700">
                Meet our executive board members who lead SPE Suez Student Chapter
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.executive_board.map((member, index) => (
                <div key={index} className="text-center bg-gray-50 p-6 rounded-lg">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.position}</h3>
                  <p className="text-gray-600">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-blue-100">{contactInfo.email}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">University</h3>
                  <p className="text-blue-100">{contactInfo.university}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Faculty</h3>
                  <p className="text-blue-100">{contactInfo.faculty}</p>
                </div>
              </div>
              <div className="mt-12">
                <Link
                  href="/apply"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Ready to Join? Apply Now
                </Link>
              </div>
            </div>
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
                  <li><Link href="/committees" className="text-gray-400 hover:text-white">Committees</Link></li>
                  <li><Link href="/apply" className="text-gray-400 hover:text-white">Apply Now</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">{contactInfo.email}</p>
                <p className="text-gray-400">{contactInfo.university}</p>
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
