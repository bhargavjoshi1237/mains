import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    const { users } = usePage().props;

    return (

        <AuthenticatedLayout
            header={<div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
                <Link
                    href="/user/create"
                    className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                    Add User
                </Link>
            </div>
            }
        >
            <Head title="Users" />

            <div className="">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="w-full flex flex-wrap gap-6 justify-start items-start mt-8">
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <Link
                                    key={user.id}
                                    href={`/user/${user.id}`}
                                    className="mt-5 w-[350px] rounded-xl bg-white shadow-lg h-auto flex items-center p-4 gap-4 hover:bg-gray-300"
                                >
                                    {/* SVG Icon */}
                                    <div className="h-16 w-16 flex items-center justify-center bg-blue-100 rounded-lg">
                                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                            <circle cx="12" cy="7" r="4" fill="#3b82f6" />
                                            <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#3b82f6" opacity="0.3" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-800 ">{user.name}</h3>
                                        </div>
                                        <div className="mt-1 flex flex-col gap-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Email</span>
                                                <span className="text-sm font-bold text-gray-800">
                                                    {user.email ? user.email.split('@')[0] : ''}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Role</span>
                                                <span className="text-sm font-bold text-gray-800">{user.role ?? '-'}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Joined At</span>
                                                <span className="text-sm font-bold text-gray-800">
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                                                </span>
                                            </div>
                                            {/* You can add more user stats here if available */}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-white">No users found.</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
