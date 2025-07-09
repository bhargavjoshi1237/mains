import React from 'react';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit() {
    const { issue, projects } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: issue.name || '',
        description: issue.description || '',
        status: issue.status || '',
        project_id: issue.project_id || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/issues/${issue.id}`);
    }

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900">Edit Issue</h2>
                    <Link 
                        href={`/issues/${issue.id}`}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to issue
                    </Link>
                </div>
            }
        >
            <Head title={`Edit ${issue.name}`} />
            
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Edit Issue Details</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Update the details for this issue below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Issue Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`block w-full rounded-md border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} shadow-sm sm:text-sm px-3 py-2`}
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="Issue name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className={`block w-full rounded-md border ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} shadow-sm sm:text-sm px-3 py-2`}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Describe the issue in detail..."
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        className={`block w-full rounded-md border ${errors.status ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} shadow-sm sm:text-sm px-3 py-2`}
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                    >
                                        <option value="">Select status</option>
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                                        Project
                                    </label>
                                    <select
                                        id="project"
                                        className={`block w-full rounded-md border ${errors.project_id ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-black focus:border-black'} shadow-sm sm:text-sm px-3 py-2`}
                                        value={data.project_id}
                                        onChange={e => setData('project_id', e.target.value)}
                                    >
                                        <option value="">Select project</option>
                                        {projects.map(project => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))}
                                    </select>
                                    {errors.project_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-gray-200">
                                <Link
                                    href={`/issues/${issue.id}`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
                                >
                                    {processing ? 'Updating...' : 'Update Issue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}