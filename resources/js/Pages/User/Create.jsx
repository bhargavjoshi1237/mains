import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Create({ roles = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        client_company_name: '',
        client_company_number: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New User</h1>
                <p className="text-gray-500">Set up a new user account with the required permissions</p>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="text-sm font-medium text-red-800 mb-2">There were errors with your submission:</h3>
                    <ul className="text-sm text-red-700 list-disc list-inside">
                        {Object.entries(errors).map(([field, message]) => (
                            <li key={field}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    placeholder="user@example.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={`block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    User Role
                                </label>
                                <select
                                    id="role"
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    className={`block w-full px-3 py-2 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                            </div>
                        </div>

                        {data.role === 'client' && (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="client_company_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="client_company_name"
                                        value={data.client_company_name}
                                        onChange={e => setData('client_company_name', e.target.value)}
                                        className={`block w-full px-3 py-2 border ${errors.client_company_name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                        placeholder="Acme Inc."
                                    />
                                    {errors.client_company_name && <p className="mt-1 text-sm text-red-600">{errors.client_company_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="client_company_number" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Number
                                    </label>
                                    <input
                                        type="text"
                                        id="client_company_number"
                                        value={data.client_company_number}
                                        onChange={e => setData('client_company_number', e.target.value)}
                                        className={`block w-full px-3 py-2 border ${errors.client_company_number ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                        placeholder="12345678"
                                    />
                                    {errors.client_company_number && <p className="mt-1 text-sm text-red-600">{errors.client_company_number}</p>}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                        <Link
                            href="/user"
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
                        >
                            {processing ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}