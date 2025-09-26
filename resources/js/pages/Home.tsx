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

          <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-400/10 blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-400/10 blur-3xl delay-300"></div>
                  <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform animate-spin rounded-full bg-indigo-400/5 blur-3xl duration-[20000ms]"></div>
              </div>

              {/* Navigation Header */}
              <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="flex h-16 items-center justify-between">
                          <div className="flex items-center space-x-4">
                              <div className="group flex-shrink-0">
                                  <div className="flex items-center space-x-2">
                                      <div className="flex h-16 w-16 transform items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110">
                                          <img
                                              src="/spe-logo-light.png"
                                              alt="SPE Logo"
                                          />
                                      </div>
                                      <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
                                          SPE Suez
                                      </h1>
                                  </div>
                              </div>
                          </div>
                          <div className="hidden md:block">
                              <div className="ml-10 flex items-baseline space-x-4">
                                  <Link
                                      href="/"
                                      className="group relative rounded-md px-3 py-2 text-sm font-medium text-blue-900 hover:text-blue-700"
                                  >
                                      Home
                                      <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-100 transform bg-blue-600 transition-transform duration-300 group-hover:scale-x-110"></span>
                                  </Link>
                                  {/* <Link href="/about" className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium relative group">
                    About
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link> */}
                                  <Link
                                      href="/committees"
                                      className="group relative rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700"
                                  >
                                      Committees
                                      <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transform bg-blue-600 transition-transform duration-300 group-hover:scale-x-100"></span>
                                  </Link>
                                  <Link
                                      href="/apply"
                                      className="group relative transform overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                  >
                                      <span className="relative z-10 flex items-center">
                                          Apply Now
                                          <Sparkles className="ml-2 h-4 w-4 group-hover:animate-spin" />
                                      </span>
                                      <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100"></div>
                                  </Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </nav>

              {/* Hero Section */}
              <div className="relative overflow-hidden">
                  <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                      <div className="text-center">
                          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                              {speInfo.title}
                          </h1>
                          <p className="mb-8 text-xl font-medium text-blue-600 md:text-2xl">
                              {speInfo.subtitle}
                          </p>
                          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-700">
                              {speInfo.description}
                          </p>
                          <div className="flex flex-col justify-center gap-4 sm:flex-row">
                              <Link
                                  href="/apply"
                                  className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
                              >
                                  Apply for Membership
                                  <ArrowRight className="ml-2 h-5 w-5" />
                              </Link>
                              <Link
                                  href="/about"
                                  className="inline-flex items-center rounded-lg border-2 border-blue-600 bg-white px-8 py-4 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                              >
                                  Learn More About Us
                              </Link>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white py-16">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                          <div className="text-center">
                              <div className="mb-4 flex justify-center">
                                  <Users className="h-12 w-12 text-blue-600" />
                              </div>
                              <div className="mb-2 text-3xl font-bold text-gray-900">
                                  {stats.members}+
                              </div>
                              <div className="text-gray-600">Members</div>
                          </div>
                          <div className="text-center">
                              <div className="mb-4 flex justify-center">
                                  <Calendar className="h-12 w-12 text-blue-600" />
                              </div>
                              <div className="mb-2 text-3xl font-bold text-gray-900">
                                  {stats.events}+
                              </div>
                              <div className="text-gray-600">Events</div>
                          </div>
                          <div className="text-center">
                              <div className="mb-4 flex justify-center">
                                  <Award className="h-12 w-12 text-blue-600" />
                              </div>
                              <div className="mb-2 text-3xl font-bold text-gray-900">
                                  {stats.workshops}+
                              </div>
                              <div className="text-gray-600">Workshops</div>
                          </div>
                          <div className="text-center">
                              <div className="mb-4 flex justify-center">
                                  <Building className="h-12 w-12 text-blue-600" />
                              </div>
                              <div className="mb-2 text-3xl font-bold text-gray-900">
                                  {stats.partnerships}+
                              </div>
                              <div className="text-gray-600">
                                  Industry Partners
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Mission & Vision Section */}
              <div className="bg-gray-50 py-16">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="grid gap-12 md:grid-cols-2">
                          <div>
                              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                  Our Mission
                              </h2>
                              <p className="text-lg leading-relaxed text-gray-700">
                                  {speInfo.mission}
                              </p>
                          </div>
                          <div>
                              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                                  Our Vision
                              </h2>
                              <p className="text-lg leading-relaxed text-gray-700">
                                  {speInfo.vision}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-white py-16">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="mb-12 text-center">
                          <h2 className="mb-4 text-3xl font-bold text-gray-900">
                              Why Join SPE Suez?
                          </h2>
                          <p className="text-lg text-gray-700">
                              Discover the benefits of becoming a member
                          </p>
                      </div>
                      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                          {speInfo.benefits.map((benefit, index) => (
                              <div
                                  key={index}
                                  className="rounded-lg bg-blue-50 p-6"
                              >
                                  <div className="mb-3 flex items-center">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                          {index + 1}
                                      </div>
                                      <div className="ml-3">
                                          <h3 className="text-lg font-semibold text-gray-900">
                                              {benefit}
                                          </h3>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* CTA Section */}
              <div className="bg-blue-600 py-16">
                  <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                      <h2 className="mb-4 text-3xl font-bold text-white">
                          Ready to Join SPE Suez?
                      </h2>
                      <p className="mb-8 text-xl text-blue-100">
                          Take the first step towards advancing your petroleum
                          engineering career
                      </p>
                      <Link
                          href="/apply"
                          className="inline-flex items-center rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 transition-colors hover:bg-gray-50"
                      >
                          Start Your Application
                          <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                  </div>
              </div>

              {/* Footer */}
              <footer className="bg-gray-900 py-12 text-white">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="grid gap-8 md:grid-cols-3">
                          <div>
                              <h3 className="mb-4 text-lg font-semibold">
                                  SPE Suez Student Chapter
                              </h3>
                              <p className="text-gray-400">
                                  Advancing petroleum engineering knowledge and
                                  connecting students with industry
                                  professionals.
                              </p>
                          </div>
                          <div>
                              <h3 className="mb-4 text-lg font-semibold">
                                  Quick Links
                              </h3>
                              <ul className="space-y-2">
                                  <li>
                                      <Link
                                          href="/about"
                                          className="text-gray-400 hover:text-white"
                                      >
                                          About Us
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          href="/committees"
                                          className="text-gray-400 hover:text-white"
                                      >
                                          Committees
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          href="/apply"
                                          className="text-gray-400 hover:text-white"
                                      >
                                          Apply Now
                                      </Link>
                                  </li>
                              </ul>
                          </div>
                          <div>
                              <h3 className="mb-4 text-lg font-semibold">
                                  Contact
                              </h3>
                              <p className="text-gray-400">
                                  spesusc.hrm2026@gmail.com
                              </p>
                              <p className="text-gray-400">
                                  Suez University, Egypt
                              </p>
                          </div>
                      </div>
                      <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                          <p className="text-gray-400">
                              &copy; 2025 SPE Suez Student Chapter. All rights
                              reserved.
                          </p>
                      </div>
                  </div>
              </footer>
          </div>
      </>
  );
}
