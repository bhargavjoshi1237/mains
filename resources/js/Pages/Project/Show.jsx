import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectIconHeader from './LoseComponents/ProjectIconHeader';
import EmployeeAvatar from './LoseComponents/EmployeeAvatar';

export default function Show() {
  const { project, tasks = [], employees = [], user_role } = usePage().props;

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
            {/* Hide Delete and Edit Project Button for employee and client */}
            {user_role !== 'employee' && user_role !== 'client' && (
              <>
                <Link
                  href={`/project/${project.id}`}
                  method="delete"
                  as="button"
                  className="px-4 py-2 bg-red-600 border border-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={e => {
                    if (!window.confirm('Are you sure you want to delete this project?')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete Project
                </Link>
                <Link
                  href={`/project/${project.id}/edit`}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Edit Project
                </Link>
              </>
            )}
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
              <div className="mb-6">
                <ProjectIconHeader
                  title={project.name}
                  description={project.description}
                />
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

              
                      <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
                        {(user_role === 'employee' || user_role === 'admin') && (
                        <Link 
                          href={`/task/create?project_id=${project.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          + Add Task
                        </Link>
                        )}
                      </div>
                      {tasks.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                        No tasks for this project yet.
                        </div>
                      ) : (
                        <ul className="space-y-3">
                        {tasks.map(task => (
                          <li key={task.id}>
                          <Link href={`/task/${task.id}`} className="block">
                            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-900">{task.name}</h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {task.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{task.description}</p>
                            <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
                              <span>Assigned: {task.assigned_to?.name ?? '-'}</span>
                              <span>Created: {task.created_by?.name ?? '-'}</span>
                            </div>
                            </div>
                          </Link>
                          </li>
                        ))}
                        </ul>
                      )}
                      </div>

                      {/* Employees Section */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Employees</h2>
                {employees.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                    No employees assigned to this project yet.
                  </div>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {employees.map(emp => (
                      <li key={emp.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-center">
                          <EmployeeAvatar name={emp.name} />
                          <div>
                            <h3 className="font-medium text-gray-900">{emp.name}</h3>
                            <p className="text-sm text-gray-500">{emp.position ?? 'Employee'}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}