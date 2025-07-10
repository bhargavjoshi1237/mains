import React from 'react';

export default function IssueFormFields({ data, setData, errors, projects }) {
    return (
        <>
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
                    placeholder="e.g. Fix login page bug"
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
        </>
    );
}
