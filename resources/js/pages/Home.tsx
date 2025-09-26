import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowRight, Users, Calendar, Award, Building, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface HomeProps {
  speInfo: {
    title: string;
    subtitle: string;
    description: string;
    mission: string;
    vision: string;
    benefits: string[];
  };
  stats: {
    members: number;
    events: number;
    workshops: number;
    partnerships: number;
  };
}

export default function Home({ speInfo, stats }: HomeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    members: 0,
    events: 0,
    workshops: 0,
    partnerships: 0
  });

  useEffect(() => {
    setIsVisible(true);
    // Animate counters
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      members: stats.members / steps,
      events: stats.events / steps,
      workshops: stats.workshops / steps,
      partnerships: stats.partnerships / steps
    };

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {
          members: Math.min(prev.members + increment.members, stats.members),
          events: Math.min(prev.events + increment.events, stats.events),
          workshops: Math.min(prev.workshops + increment.workshops, stats.workshops),
          partnerships: Math.min(prev.partnerships + increment.partnerships, stats.partnerships)
        };

        if (newCounters.members >= stats.members) {
          clearInterval(timer);
        }

        return newCounters;
      });
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats]);
  return (
    <>
      <Head title="SPE Suez Student Chapter" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-spin duration-[20000ms]"></div>
        </div>

        {/* Navigation Header */}
        <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      SPE Suez
                    </h1>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-blue-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-100 group-hover:scale-x-110 transition-transform duration-300"></span>
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium relative group">
                    About
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                  <Link href="/committees" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium relative group">
                    Committees
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                  <Link
                    href="/apply"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Apply Now
                      <Sparkles className="ml-2 w-4 h-4 group-hover:animate-spin" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {speInfo.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 mb-8 font-medium">
                {speInfo.subtitle}
              </p>
              <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
                {speInfo.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apply"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply for Membership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.members}+</div>
                <div className="text-gray-600">Members</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.events}+</div>
                <div className="text-gray-600">Events</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.workshops}+</div>
                <div className="text-gray-600">Workshops</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Building className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stats.partnerships}+</div>
                <div className="text-gray-600">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {speInfo.mission}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {speInfo.vision}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join SPE Suez?</h2>
              <p className="text-lg text-gray-700">Discover the benefits of becoming a member</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speInfo.benefits.map((benefit, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{benefit}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join SPE Suez?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Take the first step towards advancing your petroleum engineering career
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Your Application
              <ArrowRight className="ml-2 h-5 w-5" />
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
                  <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link href="/committees" className="text-gray-400 hover:text-white">Committees</Link></li>
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
