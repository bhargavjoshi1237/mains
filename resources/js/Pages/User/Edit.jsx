import React from 'react';
import { usePage, useForm, Link } from '@inertiajs/react';

export default function Edit({ roles = [], currentRole }) {
    const { user } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || currentRole || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/${user.id}`);
    };

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User</h1>
                <p className="text-gray-500">Update user information</p>
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
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
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
                                    className={`block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
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
                                    className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                                    className={`block w-full px-3 py-2 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black`}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <span className="block text-sm font-medium text-gray-700">Created At</span>
                                    <p className="text-sm text-gray-900 mt-1">
                                        {new Date(user.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-700">Updated At</span>
                                    <p className="text-sm text-gray-900 mt-1">
                                        {new Date(user.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                        <Link
                          href={`/user`}
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
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}