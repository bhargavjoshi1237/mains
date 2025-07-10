import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
  const { issue, user_role } = usePage().props;

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not set";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusColors = {
    open: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
    in_progress: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-100" },
    resolved: { bg: "bg-green-50", text: "text-green-800", border: "border-green-100" },
    closed: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-100" },
  };

  const getStatusColor = (status) => {
    return statusColors[status] || statusColors.open;
  };

  return (
    <AuthenticatedLayout>
      <Head title={`${issue.name} | Issue`} />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Issue Details</h1>
            <p className="mt-1 text-gray-500">View and manage this issue</p>
          </div>
          <Link
            href="/issues"
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                      bg-white text-gray-700 border border-gray-300 hover:bg-gray-50
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back to issues
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-start space-x-4">
            <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center 
                            ${getStatusColor(issue.status).bg} ${getStatusColor(issue.status).border}`}>
              <svg className={`h-5 w-5 ${getStatusColor(issue.status).text}`} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"/>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M19.25 12C19.25 16.004 15.004 19.25 11 19.25C6.99602 19.25 4.75 16.004 4.75 12C4.75 7.99602 7.99602 4.75 11 4.75C15.004 4.75 19.25 7.99602 19.25 12Z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-gray-900">{issue.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${getStatusColor(issue.status).bg} ${getStatusColor(issue.status).text}`}>
                  {issue.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  Created {formatDate(issue.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {issue.description || <p className="text-gray-400">No description provided</p>}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Project</h3>
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-gray-200 mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">
                      {issue.project?.name || 'No project assigned'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Timeline</h3>
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm font-medium">{formatDate(issue.start_date)}</p>
                    </div>
                    <div className="h-px w-4 bg-gray-300"></div>
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className={`text-sm font-medium ${issue.end_date && new Date(issue.end_date) < new Date() ? 'text-red-600' : ''}`}>
                        {formatDate(issue.end_date) || 'No due date'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Assigned To</h3>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs font-medium">
                        {issue.assigned_to?.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm text-gray-900">
                        {issue.assigned_to?.name || 'Unassigned'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Created By</h3>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs font-medium">
                        {issue.created_by?.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm text-gray-900">
                        {issue.created_by?.name || 'System'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            {(user_role === 'admin' || user_role === 'employee') && (
              <Link
                href={`/issues/${issue.id}/edit`}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                          bg-white text-gray-700 border border-gray-300 hover:bg-gray-50
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Edit Issue
              </Link>
            )}
            {user_role === 'admin' && (
              <Link
                href={`/issues/${issue.id}`}
                method="delete"
                as="button"
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                          bg-red-50 text-red-700 border border-red-200 hover:bg-red-100
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Issue
              </Link>
            )}
            <Link
              href="/issues"
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                        bg-gray-900 text-white hover:bg-gray-800
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back to Issues
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}