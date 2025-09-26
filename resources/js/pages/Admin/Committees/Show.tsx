import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Committees',
        href: '/admin/committees',
    },
    {
        title: 'Committee Details',
        href: '#',
    },
];

interface Application {
  id: number;
  full_name: string;
  email: string;
  university: string;
  status: string;
  submitted_at: string;
}

interface Committee {
  id: number;
  name: string;
  description: string;
  is_open: boolean;
}

interface Stats {
  total: number;
  pending: number;
  reviewed: number;
  accepted: number;
  rejected: number;
}

interface Props extends PageProps {
  committee: Committee;
  applications: Application[];
  stats: Stats;
}

export default function Show({ committee, applications, stats }: Props) {
  const handleToggleStatus = () => {
    router.post(`/admin/committees/${committee.id}/toggle`, {}, {
      preserveScroll: true,
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
      <Head title={`Committee - ${committee.name}`} />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {committee.name}
              </h1>
              <div className="flex items-center gap-1">
                <div className={`h-3 w-3 rounded-full ${committee.is_open ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-sm font-medium ${
                  committee.is_open
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {committee.is_open ? 'Open for Applications' : 'Closed'}
                </span>
              </div>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {committee.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/committees/${committee.id}/edit`}>
                Edit Committee
              </Link>
            </Button>
            <Button
              variant={committee.is_open ? "destructive" : "default"}
              onClick={handleToggleStatus}
            >
              {committee.is_open ? 'Close Applications' : 'Open Applications'}
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-5">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{stats.total}</dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/50">
                  <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{stats.pending}</dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Reviewed</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{stats.reviewed}</dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
                  <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Accepted</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{stats.accepted}</dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejected</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{stats.rejected}</dd>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Applications ({applications.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No applications found for this committee.
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {application.full_name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {application.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {application.university}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(application.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/applications/${application.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}