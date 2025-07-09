import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

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

// Extracted User Card Component
function UserCard({ user }) {
    return (
        <Link
            href={`/user/${user.id}`}
            className="group transition-all duration-150"
        >
            <div className="relative h-full bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden hover:shadow-sm hover:shadow-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                
                <div className="p-4 flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="7" r="4" fill="#3b82f6" />
                            <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#3b82f6" opacity="0.3" />
                        </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium text-gray-900 truncate">
                                {user.name}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'employee' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                            }`}>
                                {user.role}
                            </span>
                        </div>
                        
                        <div className="mt-2 space-y-1 text-xs text-gray-600">
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Extracted Empty State Component
function EmptyState() {
    return (
        <div className="col-span-full py-12 text-center">
            <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
            <p className="text-gray-500 mb-6">Get started by creating a new user</p>
            <Link
                href="/user/create"
                className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
                Add User
            </Link>
        </div>
    );
}