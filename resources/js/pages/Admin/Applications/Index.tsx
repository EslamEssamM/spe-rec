import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
];

interface Application {
  id: number;
  full_name: string;
  email: string;
  university: string;
  faculty: string;
  academic_year: string;
  committee_choices: string[];
  status: string;
  submitted_at: string;
}

interface Committee {
  id: number;
  name: string;
}

interface Props extends PageProps {
  applications: {
    data: Application[];
    links?: any[];
    meta?: {
      current_page?: number;
      last_page?: number;
      total?: number;
      from?: number;
      to?: number;
    };
  };
  committees: Committee[];
  filters: {
    status: string;
    committee: string;
    search: string;
    sort_by: string;
    sort_order: string;
  };
}

export default function Index({
  applications,
  committees,
  filters,
}: Props) {
  const handleFilter = (key: string, value: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (value === 'all' || value === '') {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value);
    }
    router.get(`/admin/applications?${currentParams.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    handleFilter('search', search);
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
          <Head title="Applications Management" />

          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
              <div className="mb-4 flex items-center justify-between">
                  <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Applications
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                          Manage and review student applications (
                          {applications.meta?.total ||
                              applications.data?.length ||
                              0}{' '}
                          total)
                      </p>
                  </div>
                  <div className="flex gap-2">
                      <Button asChild>
                          <a
                              href={`/admin/applications/export?${new URLSearchParams(
                                  {
                                      status: filters.status || 'all',
                                      committee: filters.committee || 'all',
                                      search: filters.search || '',
                                  },
                              ).toString()}`}
                              className="inline-flex items-center"
                              //   blank
                              rel="link"
                              target="_blank"
                          >
                              <svg
                                  className="mr-2 h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                              </svg>
                              Export Excel
                          </a>
                      </Button>
                  </div>
              </div>

              {/* Filters */}
              <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                  <div className="grid gap-4 md:grid-cols-4">
                      {/* Search */}
                      <div className="space-y-2">
                          <Label htmlFor="search">Search</Label>
                          <form onSubmit={handleSearch}>
                              <Input
                                  id="search"
                                  name="search"
                                  type="text"
                                  placeholder="Name or email..."
                                  defaultValue={filters.search}
                              />
                          </form>
                      </div>

                      {/* Status Filter */}
                      <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <select
                              id="status"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                              value={filters.status}
                              onChange={(e) =>
                                  handleFilter('status', e.target.value)
                              }
                          >
                              <option value="all">All Status</option>
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                          </select>
                      </div>

                      {/* Committee Filter */}
                      <div className="space-y-2">
                          <Label htmlFor="committee">Committee</Label>
                          <select
                              id="committee"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                              value={filters.committee}
                              onChange={(e) =>
                                  handleFilter('committee', e.target.value)
                              }
                          >
                              <option value="all">All Committees</option>
                              {committees.map((committee) => (
                                  <option
                                      key={committee.id}
                                      value={committee.id}
                                  >
                                      {committee.name}
                                  </option>
                              ))}
                          </select>
                      </div>

                      {/* Sort */}
                      <div className="space-y-2">
                          <Label htmlFor="sort">Sort by</Label>
                          <select
                              id="sort"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                              value={`${filters.sort_by}_${filters.sort_order}`}
                              onChange={(e) => {
                                  const value = e.target.value;
                                  const lastUnderscoreIndex = value.lastIndexOf('_');
                                  const sortBy = value.substring(0, lastUnderscoreIndex);
                                  const sortOrder = value.substring(lastUnderscoreIndex + 1);
                                  const params = new URLSearchParams(
                                      window.location.search,
                                  );
                                  params.set('sort_by', sortBy);
                                  params.set('sort_order', sortOrder);
                                  router.get(
                                      `/admin/applications?${params.toString()}`,
                                  );
                              }}
                          >
                              <option value="submitted_at_desc">
                                  Newest First
                              </option>
                              <option value="submitted_at_asc">
                                  Oldest First
                              </option>
                              <option value="full_name_asc">Name A-Z</option>
                              <option value="full_name_desc">Name Z-A</option>
                              <option value="status_asc">Status A-Z</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto rounded-lg bg-white shadow-sm dark:bg-gray-800">
                  <table className="w-full table-auto">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Applicant
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Education
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Committees
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Submitted
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                  Actions
                              </th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-800">
                          {applications.data.length === 0 ? (
                              <tr>
                                  <td
                                      colSpan={6}
                                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                                  >
                                      No applications found matching your
                                      criteria.
                                  </td>
                              </tr>
                          ) : (
                              applications.data.map((application) => (
                                  <tr
                                      key={application.id}
                                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                  >
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
                                      <td className="px-6 py-4">
                                          <div className="text-sm text-gray-900 dark:text-white">
                                              {application.university}
                                          </div>
                                          <div className="text-sm text-gray-500 dark:text-gray-400">
                                              {application.faculty} -{' '}
                                              {application.academic_year}
                                          </div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <div className="flex flex-wrap gap-1">
                                              {application.committee_choices?.map(
                                                  (committee, index) => (
                                                      <span
                                                          key={index}
                                                          className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                                                      >
                                                          {committee}
                                                      </span>
                                                  ),
                                              )}
                                          </div>
                                      </td>
                                      <td className="px-6 py-4">
                                          <span
                                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
                                          >
                                              {application.status}
                                          </span>
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                          {new Date(
                                              application.submitted_at,
                                          ).toLocaleDateString()}
                                      </td>
                                      <td className="px-6 py-4">
                                          <Button
                                              variant="outline"
                                              size="sm"
                                              asChild
                                          >
                                              <Link
                                                  href={`/admin/applications/${application.id}`}
                                              >
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

              {/* Pagination */}
              {applications.meta && (applications.meta.last_page || 0) > 1 && (
                  <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                          Showing {applications.meta.from || 1} to{' '}
                          {applications.meta.to ||
                              applications.data?.length ||
                              0}{' '}
                          of {applications.meta.total || 0} results
                      </div>
                      <div className="flex gap-2">
                          {applications.links?.map((link, index) => (
                              <Button
                                  key={index}
                                  variant={link.active ? 'default' : 'outline'}
                                  size="sm"
                                  disabled={!link.url}
                                  onClick={() =>
                                      link.url && router.get(link.url)
                                  }
                                  dangerouslySetInnerHTML={{
                                      __html: link.label,
                                  }}
                              />
                          )) || null}
                      </div>
                  </div>
              )}
          </div>
      </AppLayout>
  );
}
