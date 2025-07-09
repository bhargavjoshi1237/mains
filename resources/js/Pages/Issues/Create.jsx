import React from 'react';
import { useForm, Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { projects } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        status: '',
        project_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/issues');
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Issue</h2>}>
            <Head title="Create Issue" />
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Name</label>
                    <input type="text" className="w-full border rounded px-3 py-2" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea className="w-full border rounded px-3 py-2" value={data.description} onChange={e => setData('description', e.target.value)} />
                    {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Status</label>
                    <input type="text" className="w-full border rounded px-3 py-2" value={data.status} onChange={e => setData('status', e.target.value)} />
                    {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Project</label>
                    <select className="w-full border rounded px-3 py-2" value={data.project_id} onChange={e => setData('project_id', e.target.value)}>
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                    {errors.project_id && <div className="text-red-500 text-xs">{errors.project_id}</div>}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Create Issue</button>
            </form>
        </AuthenticatedLayout>
    );
}
                    