import React, { useState } from "react";
import { useForm, Head, router } from "@inertiajs/react";

export default function Create({ employees, statuses, projects, errors: serverErrors }) {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    assigned_to: "",
    project_id: "",
    status: statuses[0] || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("task.store"));
    console.log("Submitting task data:", data);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <Head title="Create Task" />
      <h2 className="text-2xl font-bold mb-6">Create Task</h2>
       
      {typeof errors === 'string' && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{errors}</div>
      )}
      {errors.error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{errors.error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <div className="mt-1 text-sm text-red-600">{errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && (
            <div className="mt-1 text-sm text-red-600">
              {errors.description}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            value={data.assigned_to}
            onChange={(e) => setData("assigned_to", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select User</option>
            {employees.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.assigned_to && (
            <div className="mt-1 text-sm text-red-600">
              {errors.assigned_to}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <div className="mt-1 text-sm text-red-600">{errors.status}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={data.start_date}
            onChange={(e) => setData("start_date", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.start_date && (
            <div className="mt-1 text-sm text-red-600">{errors.start_date}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Dead Line Date
          </label>
          <input
            type="date"
            value={data.end_date}
            onChange={(e) => setData("end_date", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.end_date && (
            <div className="mt-1 text-sm text-red-600">{errors.end_date}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project
          </label>
          <select
            value={data.project_id}
            onChange={(e) => setData("project_id", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.project_id && (
            <div className="mt-1 text-sm text-red-600">{errors.project_id}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}