import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
  const { projects, userauth } = usePage().props;

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Projects
          </h2>
           {userauth?.role === 'admin' && (<Link
            href="/project/create"
            className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create Project
          </Link> )}
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects && projects.length > 0 ? (
              projects.map(project => (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-70"></div>
                  <div className="relative p-5 flex flex-col h-full">
                    {/* Top Icon */}
                     
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{project.client?.name ?? project.client_id}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="mt-auto space-y-2 text-xs text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{project.created_by_user?.name ?? project.created_by}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{project.start_date} → {project.end_date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ...existing code for action buttons can be removed or kept outside the Link as needed... */}
                  </div>
                </Link>
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