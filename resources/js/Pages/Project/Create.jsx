import React, { useState } from 'react';
import { useForm, usePage, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProjectIconHeader from './LoseComponents/ProjectIconHeader';
import AssignedEmployeesList from './LoseComponents/AssignedEmployeesList';

export default function Create() {
  const { clients, employees } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    client_id: '',
    start_date: '',
    end_date: '',
    employee_ids: [],
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  function handleAddEmployee(e) {
    e.preventDefault();
    if (selectedEmployeeId && !data.employee_ids.includes(selectedEmployeeId)) {
      setData('employee_ids', [...data.employee_ids, selectedEmployeeId]);
      setSelectedEmployeeId('');
    }
  }

  function handleRemoveEmployee(empId) {
    setData('employee_ids', data.employee_ids.filter(id => id !== empId));
  }

  function handleSubmit(e) {
    e.preventDefault();
    post('/project');
  }

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Create Project
          </h2>
          <Link
            href="/project"
            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      }
    >
      <Head title="Create Project" />
      <div className="py-8">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="mb-8">
            <ProjectIconHeader
              title="Create New Project"
              description="Set up a new project and assign it to a client"
            />
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">There were errors with your submission:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field} className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                      placeholder="Project Name"
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client
                    </label>
                    <select
                      value={data.client_id}
                      onChange={e => setData('client_id', e.target.value)}
                      className={`block w-full px-3 py-2 border ${errors.client_id ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                      required
                    >
                      <option value="">Select a client</option>
                      {clients && clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                    {errors.client_id && <p className="mt-1 text-sm text-red-600">{errors.client_id}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className={`block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    placeholder="Project Description"
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={data.start_date}
                      onChange={e => setData('start_date', e.target.value)}
                      className={`block w-full px-3 py-2 border ${errors.start_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    />
                    {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={data.end_date}
                      onChange={e => setData('end_date', e.target.value)}
                      className={`block w-full px-3 py-2 border ${errors.end_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    />
                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign Employees
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedEmployeeId}
                      onChange={e => setSelectedEmployeeId(e.target.value)}
                      className={`block w-full px-3 py-2 border ${errors.employee_ids ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    >
                      <option value="">Select Employee</option>
                      {employees &&
                        employees
                          .filter(emp => !data.employee_ids.includes(emp.id))
                          .map(emp => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name}
                            </option>
                          ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAddEmployee}
                      className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                      disabled={!selectedEmployeeId}
                    >
                      Add
                    </button>
                  </div>
                  {errors.employee_ids && (
                    <p className="mt-1 text-sm text-red-600">{errors.employee_ids}</p>
                  )}
                  {/* Selected Employees List */}
                  {data.employee_ids.length > 0 && (
                    <AssignedEmployeesList
                      employeeIds={data.employee_ids}
                      employees={employees}
                      onRemove={handleRemoveEmployee}
                    />
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                <Link
                  href="/project"
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing || !data.name || !data.client_id}
                  className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                >
                  {processing ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}