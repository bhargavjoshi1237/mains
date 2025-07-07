import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Show() {
  const { project } = usePage().props;

  if (!project) {
    return <div className="p-6 text-center text-gray-600">Project not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      <div className="mb-2">
        <span className="font-semibold">Name:</span> {project.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Description:</span> {project.description}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Client ID:</span> {project.client_id}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created By:</span> {project.created_by}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Updated By:</span> {project.updated_by}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Start Date:</span> {project.start_date}
      </div>
      <div className="mb-2">
        <span className="font-semibold">End Date:</span> {project.end_date}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created At:</span> {new Date(project.created_at).toLocaleString()}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Updated At:</span> {new Date(project.updated_at).toLocaleString()}
      </div>
      <br />
      <Link
        href={`/project/${project.id}/edit`}
        className="mr-3 border border-[#474747] px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Edit
      </Link>
      <Link
        href="/project"
        className="ml-2 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800"
      >
        Back to Projects
      </Link>
    </div>
  );
}
