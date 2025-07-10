import React, { useState } from 'react';
import { Link, useForm, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
  const { project, employees = [] } = usePage().props;
  const initialEmployeeIds = project.employees ? project.employees.map(e => e.id) : [];
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || '',
    description: project.description || '',
    client_id: project.client_id || '',
    start_date: project.start_date || '',
    end_date: project.end_date || '',
    employee_ids: initialEmployeeIds,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/project/${project.id}`);
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Edit Project 
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
      <Head title={`Edit Project - ${project.name}`} />
      <div className="py-8">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Icon Header */}
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shadow border border-blue-100 mr-4">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <rect x="4" y="4" width="16" height="16" rx="4" fill="#3b82f6" />
                      <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" opacity="0.5" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit {data.name}</h1>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border ${errors.start_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                      value={data.start_date}
                      onChange={e => setData('start_date', e.target.value)}
                    />
                    {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border ${errors.end_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black`}
                      value={data.end_date}
                      onChange={e => setData('end_date', e.target.value)}
                    />
                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                  </div>
                </div>

                {/* Employee Assignment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Employees</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedEmployeeId}
                      onChange={e => setSelectedEmployeeId(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    >
                      <option value="">Select Employee</option>
                      {employees
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
                  {errors.employee_ids && <p className="mt-1 text-sm text-red-600">{errors.employee_ids}</p>}
                  
                  {/* Selected Employees List */}
                  {data.employee_ids.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">Assigned Employees</h3>
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {data.employee_ids.map(empId => {
                          const emp = employees.find(e => e.id === empId);
                          return (
                            <li key={empId} className="px-3 py-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                  <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14.75C8.28 14.75 5.25 15.23 5.25 17.5V19.75H18.75V17.5C18.75 15.23 15.72 14.75 12 14.75Z" />
                                    <path d="M12 13C14.14 13 15.75 11.39 15.75 9.25C15.75 7.11 14.14 5.5 12 5.5C9.86 5.5 8.25 7.11 8.25 9.25C8.25 11.39 9.86 13 12 13Z" />
                                  </svg>
                                </div>
                                <span>{emp ? emp.name : empId}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveEmployee(empId)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Remove
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Link
                    href="/project"
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={processing}
                    className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                  >
                    {processing ? 'Saving...' : 'Save Changes'}
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