import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { projects } = usePage().props;

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Projects
          </h2>
          <Link
            href="/project/create"
            className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full flex flex-wrap gap-6 justify-start items-start mt-8">
            {projects && projects.length > 0 ? (
              projects.map(project => (
                <div
                  key={project.id}
                  className="mt-5 w-[350px] rounded-xl bg-white shadow-lg h-auto flex items-center p-4 gap-4 hover:bg-gray-100"
                >
                  {/* SVG Icon */}
                  <div className="h-16 w-16 flex items-center justify-center bg-blue-100 rounded-lg">
                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4" fill="#3b82f6" />
                      <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" opacity="0.5" />
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      <span className="text-xs text-gray-500">{project.client?.name ?? project.client_id}</span>
                    </div>
                    <div className="mt-1 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Description</span>
                        <span className="text-sm font-bold text-gray-800 truncate max-w-[120px] text-right">{project.description}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Created By</span>
                        <span className="text-sm font-bold text-gray-800">{project.created_by_user?.name ?? project.created_by}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Start</span>
                        <span className="text-sm font-bold text-gray-800">{project.start_date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">End</span>
                        <span className="text-sm font-bold text-gray-800">{project.end_date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Link
                          href={`/project/${project.id}`}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs font-medium"
                        >
                          View
                        </Link>
                        <Link
                          href={`/project/${project.id}/edit`}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-medium"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/project/${project.id}`}
                          method="delete"
                          as="button"
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                          onClick={e => {
                            if (!confirm('Are you sure you want to delete this project?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No projects found.</div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
