import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
  const { project, userauth, user_role } = usePage().props;

  if (!project) {
    return (
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Project Details
          </h2>
        }
      >
        <div className="py-8 text-center text-gray-600">Project not found.</div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Project Details
          </h2>
          <div className="flex space-x-2">
            {userauth?.role === 'admin' && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  router.delete(`/project/${project.id}`);
                }}
                className="mr-6"
              >
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 border border-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete Project
                </button>
              </form>
            )}
            {userauth?.role === 'admin' && (
               <Link
              href={`/project/${project.id}/edit`}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit Project
            </Link> )}
            <Link
              href="/project"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Project - ${project.name}`} />
      <div className="py-8">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex items-start mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shadow border border-blue-100 mr-4">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="4" fill="#3b82f6" />
                    <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" opacity="0.5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.client?.name ?? project.client_id}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created By</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.created_by_user?.name ?? project.created_by}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated By</h3>
                    <p className="mt-1 text-sm text-gray-900">{project.updated_by_user?.name ?? project.updated_by}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-900">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.start_date} → {project.end_date}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</h3>
                    <p className="mt-1 text-sm text-gray-900">{new Date(project.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated At</h3>
                    <p className="mt-1 text-sm text-gray-900">{new Date(project.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
