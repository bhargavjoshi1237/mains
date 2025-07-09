import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
  const { task, user_role } = usePage().props;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Task Details
          </h2>
          <Link
            href="/task"
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Tasks
          </Link>
        </div>
      }
    >
      <Head title={`Task - ${task.name}`} />
      <div className="py-8">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8">
              {/* Task Header */}
              <div className="flex items-start mb-6">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shadow border border-blue-100 mr-4">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="#3b82f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"/>
                    <path stroke="#3b82f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12C19.25 16.004 15.004 19.25 11 19.25C6.99602 19.25 4.75 16.004 4.75 12C4.75 7.99602 7.99602 4.75 11 4.75C15.004 4.75 19.25 7.99602 19.25 12Z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</h3>
                    <p className="mt-1 text-sm text-gray-900">{task.description || '-'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</h3>
                    <p className="mt-1 text-sm text-gray-900">{task.project?.name || '-'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned To</h3>
                    <p className="mt-1 text-sm text-gray-900">{task.assigned_to?.name || '-'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Timeline</h3>
                    <div className="mt-1 text-sm text-gray-900">
                      {formatDate(task.start_date)} → {formatDate(task.end_date)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created By</h3>
                    <p className="mt-1 text-sm text-gray-900">{task.created_by?.name || '-'}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated By</h3>
                    <p className="mt-1 text-sm text-gray-900">{task.updated_by?.name || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {(user_role === 'admin' || user_role === 'employee') && (
                  <Link
                    href={`/task/${task.id}/edit`}
                    className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Edit Task
                  </Link>
                )}
                {user_role === 'admin' && (
                  <Link
                    href={`/task/${task.id}`}
                    method="delete"
                    as="button"
                    className="px-4 py-2 bg-red-50 border border-red-200 text-sm font-medium rounded-md text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Task
                  </Link>
                )}
                <Link
                  href="/task"
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Back to Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}