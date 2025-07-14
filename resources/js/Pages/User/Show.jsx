import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserCard from './LoseComponents/UserCard';

export default function Show() {
    const { user } = usePage().props;

    if (!user) {
        return (
            <AuthenticatedLayout>
                <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
                    User not found.
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        User Details
                    </h2>
                    <Link
                        href="/user"
                        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Back to Users
                    </Link>
                </div>
            }
        >
            <Head title={`User - ${user.name}`} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        {/* Vercel-style subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                        <div className="p-6 sm:p-8">
                            <div className="flex items-start mb-6">
                                {/* Use UserCard for avatar/name/email */}
                                <div className="w-full">
                                    <UserCard user={user} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</h3>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {user.role ? (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'employee' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.role}
                                            </span>
                                        ) : '-'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created By</h3>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {user.created_by ? user.created_by?.name : user.created_by || '-'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</h3>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(user.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Updated At</h3>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(user.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            {user.role === 'client' && user.client_detail && (
                                <div className="mb-6">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Client Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Company Name</span>
                                            <span className="text-sm text-gray-900">{client_detail.company_name || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Company Number</span>
                                            <span className="text-sm text-gray-900">{client_detail.company_number || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <Link
                                    href={`/user/${user.id}/edit`}
                                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    Edit User
                                </Link>
                                <Link
                                    href={`/user/${user.id}`}
                                    method="delete"
                                    as="button"
                                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete User
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}