import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { tasks, user_role } = usePage().props;

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Tasks
          </h2>
          {(user_role === 'admin' || user_role === 'employee') && (
            <Link
              href="/task/create"
              className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Create Task
            </Link>
          )}
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <Link
                  key={task.id}
                  href={`/task/${task.id}`}
                  className="group"
                >
                  <div className="relative h-full bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden hover:shadow-sm hover:shadow-gray-100">
                    {/* Vercel-style subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-medium text-gray-900 line-clamp-1">
                          {task.name}
                        </h3>
                        <span className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[task.status] || statusColors.default
                        }`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-3">
                        {task.description}
                      </p>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center text-gray-500">
                          <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="truncate">Assigned: {task.assigned_to?.name || 'Unassigned'}</span>
                        </div>
                        {task.project && (
                          <div className="flex items-center text-gray-500">
                            <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="truncate">Project: {task.project.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto max-w-md">
                  <div className="text-gray-300 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
                  <p className="text-gray-500 mb-6">Create your first task to get started</p>
                  {(user_role === 'admin' || user_role === 'employee') && (
                    <Link
                      href="/task/create"
                      className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Create Task
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}