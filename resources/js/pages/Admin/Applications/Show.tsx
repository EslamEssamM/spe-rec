import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Applications',
        href: '/admin/applications',
    },
    {
        title: 'Application Details',
        href: '#',
    },
];

interface Application {
  id: number;
  full_name: string;
  email: string;
  mobile?: string;
  facebook_link?: string;
  university: string;
  faculty: string;
  department: string;
  academic_year: string;
  previous_experience?: string;
  why_applying: string;
  how_benefit: string;
  committee_choices: string[];
  why_committee: string;
  committee_responsibilities: string;
  open_space?: string;
  status: string;
  submitted_at: string;
}

interface Props extends PageProps {
  application: Application;
}

export default function Show({ application }: Props) {
  const [status, setStatus] = useState(application.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    router.post(`/admin/applications/${application.id}/status`, {
      status,
    }, {
      onFinish: () => setIsSubmitting(false),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Application - ${application.full_name}`} />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {application.full_name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Application submitted on {new Date(application.submitted_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(application.status)}`}>
              {application.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</Label>
                  <p className="text-gray-900 dark:text-white">{application.full_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</Label>
                  <p className="text-gray-900 dark:text-white">{application.email}</p>
                </div>
                {application.mobile && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Mobile Number</Label>
                    <p className="text-gray-900 dark:text-white">{application.mobile}</p>
                  </div>
                )}
                {application.facebook_link && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Facebook Link</Label>
                    <a
                      href={application.facebook_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Educational Information */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Educational Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">University</Label>
                  <p className="text-gray-900 dark:text-white">{application.university}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Faculty</Label>
                  <p className="text-gray-900 dark:text-white">{application.faculty}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</Label>
                  <p className="text-gray-900 dark:text-white">{application.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Academic Year</Label>
                  <p className="text-gray-900 dark:text-white">{application.academic_year}</p>
                </div>
              </div>
            </div>

            {/* Committee Preferences */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Committee Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Selected Committees</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {application.committee_choices?.map((committee, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                      >
                        {committee}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Why This Committee?</Label>
                  <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.why_committee}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Committee Responsibilities Knowledge</Label>
                  <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.committee_responsibilities}</p>
                </div>
              </div>
            </div>

            {/* Essays */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Essays & Experience
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Previous Experience</Label>
                  <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.previous_experience || 'Not provided'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Why do you want to join SPE?</Label>
                  <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.why_applying}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">How will you benefit from SPE?</Label>
                  <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.how_benefit}</p>
                </div>
                {application.open_space && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Additional Comments</Label>
                    <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-wrap">{application.open_space}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Update Status
              </h3>
              <form onSubmit={handleStatusUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    className="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Updating...' : 'Update Status'}
                </Button>
              </form>
            </div>

            {/* Application Info */}
            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Application Info
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Application ID</Label>
                  <p className="text-gray-900 dark:text-white">#{application.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Submitted</Label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(application.submitted_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}