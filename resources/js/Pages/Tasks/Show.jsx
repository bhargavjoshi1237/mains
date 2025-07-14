import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BackToTasksButton from "./LoseComponents/BackToTasksButton";
import StatusBadge from "./LoseComponents/StatusBadge";
import TaskStatusIcon from "./LoseComponents/TaskStatusIcon";

export default function Show() {
  const { task, user_role } = usePage().props;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusColors = {
    completed: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    in_progress: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
    cancelled: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    default: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" }
  };

  const getStatusColors = (status) => {
    return statusColors[status] || statusColors.default;
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Task Details
          </h2>
          <BackToTasksButton />
        </div>
      }
    >
      <Head title={`Task - ${task.name}`} />
      <div className="py-8">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8">
              {/* Task Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${getStatusColors(task.status).bg} ${getStatusColors(task.status).border}`}>
                  <TaskStatusIcon colorClass={getStatusColors(task.status).text} />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{task.name}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <StatusBadge status={task.status} />
                    <span className="text-xs text-gray-500">
                      Created {formatDate(task.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Description</h3>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      {task.description || <p className="text-gray-400">No description provided</p>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Project</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {task.project?.name?.charAt(0) || '-'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {task.project?.name || 'No project assigned'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Assigned To</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        {task.assigned_to?.name?.charAt(0) || '-'}
                      </div>
                      <span className="text-sm text-gray-900">
                        {task.assigned_to?.name || 'Unassigned'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Timeline</h3>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm font-medium">{formatDate(task.start_date)}</p>
                      </div>
                      <div className="h-px w-4 bg-gray-300"></div>
                      <div>
                        <p className="text-xs text-gray-500">Due Date</p>
                        <p className={`text-sm font-medium ${task.end_date && new Date(task.end_date) < new Date() ? 'text-red-600' : ''}`}>
                          {formatDate(task.end_date) || 'No due date'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Created By</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          {task.created_by?.name?.charAt(0) || '-'}
                        </div>
                        <span className="text-sm text-gray-900">
                          {task.created_by?.name || 'System'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Last Updated By</h3>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                          {task.updated_by?.name?.charAt(0) || '-'}
                        </div>
                        <span className="text-sm text-gray-900">
                          {task.updated_by?.name || 'Not updated yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                {(user_role === 'admin' || user_role === 'employee') && (
                  <Link
                    href={`/task/${task.id}/edit`}
                    className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Edit Task
                  </Link>
                )}
                {user_role === 'admin' && (
                  <Link
                    href={`/task/${task.id}`}
                    method="delete"
                    as="button"
                    className="px-4 py-2 bg-red-50 border border-red-200 text-sm font-medium rounded-md text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Delete Task
                  </Link>
                )}
                <BackToTasksButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}