import React, { useEffect } from "react";
import { useForm, Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BackToTasksButton from "./LoseComponents/BackToTasksButton";

function getProjectIdFromQuery() {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("project_id") || "";
}

export default function Create({ employees, statuses, projects, errors: serverErrors }) {
  const initialProjectId = getProjectIdFromQuery();

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    assigned_to: "",
    project_id: initialProjectId,
    status: statuses[0] || "",
    start_date: "",
    end_date: "",
  });

  const selectedProject = projects.find(p => String(p.id) === String(data.project_id));
  const assignedEmployees = selectedProject && Array.isArray(selectedProject.employees)
    ? selectedProject.employees
    : [];

  useEffect(() => {
    if (data.assigned_to && !assignedEmployees.some(e => e.id === data.assigned_to)) {
      setData("assigned_to", "");
    }
    // eslint-disable-next-line
  }, [data.project_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("task.store"));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Create Task
          </h2>
          <BackToTasksButton href={route("task.index")} />
        </div>
      }
    >
      <Head title="Create Task" />
      <div className="py-8">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Add a new task to your project and assign it to team members.
                </p>
              </div>

              {(typeof serverErrors === 'string' || serverErrors.error) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-sm font-medium text-red-800 mb-2">There was an error:</h3>
                  <p className="text-sm text-red-700">
                    {typeof serverErrors === 'string' ? serverErrors : serverErrors.error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Task Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                      placeholder="Enter task title"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                      className={`w-full px-3 py-2 text-sm border ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                      placeholder="Describe the task details..."
                    />
                    {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={data.project_id}
                        onChange={(e) => setData("project_id", e.target.value)}
                        className={`w-full px-3 py-2 text-sm border ${errors.project_id ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                        disabled={!!initialProjectId}
                      >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </select>
                      {errors.project_id && <p className="mt-1 text-xs text-red-600">{errors.project_id}</p>}
                    </div>

                    {/* Assign To */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assign To
                      </label>
                      <select
                        value={data.assigned_to}
                        onChange={(e) => setData("assigned_to", e.target.value)}
                        className={`w-full px-3 py-2 text-sm border ${errors.assigned_to ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                        disabled={!data.project_id}
                      >
                        <option value="">
                          {data.project_id ? "Select Team Member" : "Select a project first"}
                        </option>
                        {assignedEmployees.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                      {errors.assigned_to && <p className="mt-1 text-xs text-red-600">{errors.assigned_to}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className={`w-full px-3 py-2 text-sm border ${errors.status ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                        className={`w-full px-3 py-2 text-sm border ${errors.start_date ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                      />
                      {errors.start_date && <p className="mt-1 text-xs text-red-600">{errors.start_date}</p>}
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deadline
                      </label>
                      <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                        className={`w-full px-3 py-2 text-sm border ${errors.end_date ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
                      />
                      {errors.end_date && <p className="mt-1 text-xs text-red-600">{errors.end_date}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => router.visit(route("task.index"))}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
                  >
                    {processing ? 'Creating...' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}