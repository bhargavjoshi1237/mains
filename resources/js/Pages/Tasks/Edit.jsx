import React, { useState } from "react";
import { usePage, router, Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit() {
    const { task, users = [], statuses = [] } = usePage().props;

    const [form, setForm] = useState({
        name: task?.name || "",
        description: task?.description || "",
        status: task?.status || "",
        assigned_to: task?.assigned_to?.id || task?.assigned_to || "",
        project_id: task?.project_id || "",
        start_date: task?.start_date || "",
        end_date: task?.end_date || "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        router.put(`/task/${task.id}`, form, {
            onSuccess: () => {
                router.visit(`/task/${task.id}`);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Task
                    </h2>
                    <Link 
                        href={`/task/${task.id}`}
                        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Back to Task
                    </Link>
                </div>
            }
        >
            <Head title="Edit Task" />
            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Vercel-style subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                        
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center mb-6">
                                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100 mr-3">
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <path stroke="#3b82f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"/>
                                        <path stroke="#3b82f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12C19.25 16.004 15.004 19.25 11 19.25C6.99602 19.25 4.75 16.004 4.75 12C4.75 7.99602 7.99602 4.75 11 4.75C15.004 4.75 19.25 7.99602 19.25 12Z"/>
                                    </svg>
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900">Edit Task</h1>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className={`w-full px-3 py-2 text-sm border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows={3}
                                            className={`w-full px-3 py-2 text-sm border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                        />
                                        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={form.status}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 text-sm border ${errors.status ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            >
                                                <option value="">Select status</option>
                                                {statuses.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Assigned To
                                            </label>
                                            <select
                                                name="assigned_to" 
                                                value={form.assigned_to}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 text-sm border ${errors.assigned_to ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            >
                                                <option value="">Select user</option>
                                                {users
                                                    .filter((user) => user.role === "employee")
                                                    .map((user) => (
                                                        <option key={user.id} value={user.id}>
                                                            {user.name}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.assigned_to && <p className="mt-1 text-xs text-red-600">{errors.assigned_to}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="start_date"
                                                value={form.start_date || ""}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 text-sm border ${errors.start_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            />
                                            {errors.start_date && <p className="mt-1 text-xs text-red-600">{errors.start_date}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Deadline Date
                                            </label>
                                            <input
                                                type="date"
                                                name="end_date"
                                                value={form.end_date || ""}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 text-sm border ${errors.end_date ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400`}
                                            />
                                            {errors.end_date && <p className="mt-1 text-xs text-red-600">{errors.end_date}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        Update Task
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