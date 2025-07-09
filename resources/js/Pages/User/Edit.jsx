import React, { useEffect, useState } from 'react';
import { usePage, useForm, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ roles = [], currentRole }) {
    const { user, clientDetail } = usePage().props;
    const [showClientFields, setShowClientFields] = useState((user.role || currentRole) === 'client');

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || currentRole || '',
        company_name: clientDetail?.company_name || '',
        company_number: clientDetail?.company_number || '',
    });

    useEffect(() => {
        setShowClientFields(data.role === 'client');
    }, [data.role]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/${user.id}`);
    };

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
                        Edit User
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
            <Head title={`Edit User - ${user.name}`} />
            <div className="py-8">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        {/* Vercel-style subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                        
                        <div className="p-6 sm:p-8">
                            <div className="flex items-start mb-6">
                                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 mr-4">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="7" r="4" fill="#3b82f6" />
                                        <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#3b82f6" opacity="0.3" />
                                    </svg>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">Edit User</h1>
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h3 className="text-sm font-medium text-red-800 mb-2">There were errors with your submission:</h3>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {Object.entries(errors).map(([field, message]) => (
                                            <li key={field} className="flex items-start">
                                                <span className="mr-1">•</span>
                                                <span>{message}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className={`block w-full px-3 py-2 text-sm border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className={`block w-full px-3 py-2 text-sm border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            required
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={data.role}
                                            onChange={e => setData('role', e.target.value)}
                                            className={`block w-full px-3 py-2 text-sm border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map(role => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
                                    </div>

                                    
                                </div>

                                {showClientFields && (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                id="company_name"
                                                name="company_name"
                                                value={data.company_name}
                                                onChange={e => setData('company_name', e.target.value)}
                                                className={`block w-full px-3 py-2 text-sm border ${errors.company_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            />
                                            {errors.company_name && <p className="mt-1 text-xs text-red-600">{errors.company_name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="company_number" className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Number
                                            </label>
                                            <input
                                                type="text"
                                                id="company_number"
                                                name="company_number"
                                                value={data.company_number}
                                                onChange={e => setData('company_number', e.target.value)}
                                                className={`block w-full px-3 py-2 text-sm border ${errors.company_number ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            />
                                            {errors.company_number && <p className="mt-1 text-xs text-red-600">{errors.company_number}</p>}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <Link
                                        href="/user"
                                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}