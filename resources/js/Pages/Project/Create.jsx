import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';

export default function Create() {
  const { clients } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    client_id: '',
    start_date: '',
    end_date: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post('/project');
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-500">Set up a new project and assign it to a client</p>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
          <h3 className="text-sm font-medium text-red-800 mb-2">There were errors with your submission:</h3>
          <ul className="text-sm text-red-700 list-disc list-inside">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
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
                  className={`block w-full px-3 py-2 border ${errors.client_id ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
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
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className={`block w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
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
                  className={`block w-full px-3 py-2 border ${errors.start_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
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
                  className={`block w-full px-3 py-2 border ${errors.end_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                />
                {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
            <Link
              href="/project"
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing || !data.name || !data.client_id}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
            >
              {processing ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
