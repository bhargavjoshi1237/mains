import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Show() {
    const { user, createdBy } = usePage().props;

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
                User not found.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">User Details</h1>
                <p className="text-gray-500">Detailed information about this user account</p>
            </div>

            <div className="bg-white rounded-lg  border border-gray-300 overflow-hidden shadow-sm">
                <div className="p-6 border-b   border-gray-300">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-medium">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="px-6 py-4">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Role</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {user.role ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {user.role}
                                    </span>
                                ) : '-'}
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {createdBy ? createdBy.name : user.created_by || '-'}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1  md:grid-cols-2 ">
                        <div className="px-6 py-4">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(user.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(user.updated_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
                
                
                <Link
                    href="/user/"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Back to Users
                </Link>
                <Link
                    href={`/user/${user.id}/edit`}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Edit
                </Link>
                <Link
                    as="button"
                    method="delete"
                    href={`/user/${user.id}`}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Delete
                </Link>
            </div>
        </div>
    );
}