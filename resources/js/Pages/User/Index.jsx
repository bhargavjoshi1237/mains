import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserCard from './LoseComponents/UserCard';
import EmptyState from './LoseComponents/EmptyState';

export default function Index() {
    const { users } = usePage().props;
    const [sortByRole, setSortByRole] = useState(false);

    // Group users by role when sortByRole is true
    const groupedUsers = sortByRole ? {
        admin: users.filter(user => user.role === 'admin'),
        employee: users.filter(user => user.role === 'employee'),
        client: users.filter(user => user.role === 'client'),
    } : null;

    const toggleSortByRole = () => {
        setSortByRole(!sortByRole);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Users
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleSortByRole}
                            className="p-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            title={sortByRole ? 'Show all users' : 'Sort by role'}
                        >
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                            </svg>
                        </button>
                        <Link
                            href="/user/create"
                            className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Add User
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Users" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {sortByRole ? (
                        <div className="space-y-6">
                            {['admin', 'employee', 'client'].map(role => (
                                groupedUsers[role]?.length > 0 && (
                                    <div key={role} className="space-y-2">
                                        <h3 className="text-lg font-medium text-gray-900 capitalize">
                                            {role}s ({groupedUsers[role].length})
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {groupedUsers[role].map(user => (
                                                <UserCard key={user.id} user={user} />
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users && users.length > 0 ? (
                                users.map(user => (
                                    <UserCard key={user.id} user={user} />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}