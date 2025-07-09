import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { issues } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Issues
                    </h2>
                    <Link
                        href="/issues/create"
                        className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800"
                    >
                        Create Issue
                    </Link>
                </div>
            }
        >
            <Head title="Issues" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {issues && issues.length > 0 ? (
                            issues.map(issue => (
                                <Link
                                    key={issue.id}
                                    href={`/issues/${issue.id}`}
                                    className="relative group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md block"
                                >
                                    <div className="relative p-5 flex flex-col h-full">
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">{issue.name}</h3>
                                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{issue.status}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
                                            <div className="mt-auto space-y-2 text-xs text-gray-600">
                                                <div className="flex items-center">
                                                    <span>Project: {issue.project?.name ?? issue.project_id}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <span>Assigned: {issue.assigned_to ? issue.assigned_to : 'Unassigned'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-gray-600">No issues found.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
