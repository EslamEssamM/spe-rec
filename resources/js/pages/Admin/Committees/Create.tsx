import React from 'react';
import { Head, router } from '@inertiajs/react';
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
        title: 'Committees',
        href: '/admin/committees',
    },
    {
        title: 'Create Committee',
        href: '#',
    },
];

interface Props extends PageProps {
  errors: Record<string, string>;
}

export default function Create({ errors }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    router.post('/admin/committees', {
      name: formData.get('name'),
      description: formData.get('description'),
      is_open: formData.get('is_open') === 'on',
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Committee" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Committee</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new committee to the organization
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Committee Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter committee name"
                  className={errors.name ? 'border-red-300 dark:border-red-600' : ''}
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.description ? 'border-red-300 dark:border-red-600' : ''
                  }`}
                  placeholder="Enter committee description"
                  required
                />
                {errors.description && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_open"
                  name="is_open"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <Label htmlFor="is_open" className="text-sm font-medium text-gray-900 dark:text-white">
                  Open for applications
                </Label>
              </div>

              <div className="flex items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.get('/admin/committees')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Committee
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}