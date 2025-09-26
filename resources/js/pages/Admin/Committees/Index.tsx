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
];

interface Committee {
  id: number;
  name: string;
  description: string;
  is_open: boolean;
  applications_count: number;
  pending_count: number;
  accepted_count: number;
}

interface Props extends PageProps {
  committees: Committee[];
}

export default function Index({ committees }: Props) {
  const handleToggleStatus = (id: number) => {
    router.post(`/admin/committees/${id}/toggle`, {}, {
      preserveScroll: true,
    });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete the "${name}" committee? This action cannot be undone.`)) {
      router.delete(`/admin/committees/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Committees Management" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Committees</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage committees and their status ({committees.length} total)
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/committees/create">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Committee
            </Link>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/50">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Committees</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">{committees.length}</dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
                  <div className="h-5 w-5 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Open for Applications</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">
                  {committees.filter(c => c.is_open).length}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                  <div className="h-5 w-5 rounded-full bg-red-400"></div>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Closed</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">
                  {committees.filter(c => !c.is_open).length}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/50">
                  <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applications</dt>
                <dd className="text-xl font-semibold text-gray-900 dark:text-white">
                  {committees.reduce((sum, c) => sum + c.applications_count, 0)}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Committees Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((committee) => (
            <div key={committee.id} className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {committee.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${committee.is_open ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className={`text-xs font-medium ${
                        committee.is_open
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {committee.is_open ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {committee.description}
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {committee.applications_count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    {committee.pending_count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    {committee.accepted_count}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Accepted</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/committees/${committee.id}`}>
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/committees/${committee.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={committee.is_open ? "destructive" : "default"}
                    onClick={() => handleToggleStatus(committee.id)}
                  >
                    {committee.is_open ? 'Close' : 'Open'}
                  </Button>
                  {committee.applications_count === 0 && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(committee.id, committee.name)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {committees.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No committees</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new committee.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link href="/admin/committees/create">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Committee
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}