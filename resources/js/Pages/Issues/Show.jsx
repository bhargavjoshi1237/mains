import React from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { issue } = usePage().props;

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Issue Details</h2>}>
            <Head title={issue.name} />
            <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded shadow">
                <h3 className="text-2xl font-bold mb-2">{issue.name}</h3>
                <div className="mb-2 text-gray-700">Status: {issue.status}</div>
                <div className="mb-2 text-gray-700">Project: {issue.project?.name ?? issue.project_id}</div>
                <div className="mb-2 text-gray-700">Assigned To: {issue.assigned_to ?? 'Unassigned'}</div>
                <div className="mb-2 text-gray-700">Start Date: {issue.start_date}</div>
                <div className="mb-2 text-gray-700">End Date: {issue.end_date}</div>
                <div className="mb-4 text-gray-700">Description: {issue.description}</div>
                <div className="flex gap-2">
                    <Link href={`/issues/${issue.id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</Link>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => router.delete(`/issues/${issue.id}`)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
