import React from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show() {
    const { issue } = usePage().props;

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900">Issue Details</h2>
                    <Link 
                        href="/issues" 
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to issues
                    </Link>
                </div>
            }
        >
            <Head title={issue.name} />
            
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Header Section */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">{issue.name}</h3>
                            <div className="mt-2 flex items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    issue.status === 'open' ? 'bg-blue-100 text-blue-800' :
                                    issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {issue.status.replace('_', ' ')}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                    {issue.project?.name ?? issue.project_id}
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Assigned To</p>
                                <p className="text-sm text-gray-900 mt-1">
                                    {issue.assigned_to ? (
                                        <span className="inline-flex items-center">
                                            <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                                            {issue.assigned_to}
                                        </span>
                                    ) : (
                                        'Unassigned'
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Created At</p>
                                <p className="text-sm text-gray-900 mt-1">
                                    {new Date(issue.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Start Date</p>
                                <p className="text-sm text-gray-900 mt-1">
                                    {issue.start_date || 'Not specified'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">End Date</p>
                                <p className="text-sm text-gray-900 mt-1">
                                    {issue.end_date || 'Not specified'}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                            <div className="prose prose-sm max-w-none text-gray-600">
                                {issue.description || 'No description provided.'}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between pt-4 border-t border-gray-200">
                            <Link
                                as="button"
                                method="delete"
                                href={`/issues/${issue.id}`}
                               
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                Delete Issue
                            </Link>
                            <div className="space-x-3">
                                <Link
                                    href={`/issues/${issue.id}/edit`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href="/issues"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                                >
                                    View All Issues
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}