import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Edit() {
  const { project } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || '',
    description: project.description || '',
    client_id: project.client_id || '',
    start_date: project.start_date || '',
    end_date: project.end_date || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/project/${project.id}`, {
    });
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded ">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form
       onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
          />
          {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
          />
          {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
        </div>
       
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={data.start_date}
            onChange={e => setData('start_date', e.target.value)}
          />
          {errors.start_date && <div className="text-red-600 text-sm mt-1">{errors.start_date}</div>}
        </div>
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={data.end_date}
            onChange={e => setData('end_date', e.target.value)}
          />
          {errors.end_date && <div className="text-red-600 text-sm mt-1">{errors.end_date}</div>}
        </div>
          <div className='flex'
          >
               <Link
                            href="/project"
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black mr-4 border border-[#474747] bg-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                        >
                         Back to Projects
                        </Link>
             <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                      
          </div>
      </form>
    </div>
  );
}
