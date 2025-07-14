import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserCard({ user }) {
    // ...existing code from UserCard in Index.jsx...
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
