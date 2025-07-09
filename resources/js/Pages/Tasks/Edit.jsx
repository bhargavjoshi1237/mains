import React, { useState } from "react";
import { usePage, router, Head } from "@inertiajs/react";
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
                </div>
            }
        >
            <Head title="Edit Task" />
            <div className="w-[90%] mx-auto mt-10 p-8 rounded">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        {errors.description && (
                            <div className="text-red-500">{errors.description}</div>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        {errors.status && <div className="text-red-500">{errors.status}</div>}
                    </div>
                    <div>
                        <label className="block font-medium">Assigned To</label>
                        <select
                            name="assigned_to" 
                            value={form.assigned_to}
                            onChange={handleChange}
                            className="input input-bordered w-full"
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
                        {errors.assigned_to && ( 
                            <div className="text-red-500">{errors.assigned_to}</div>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium">Start Date</label>
                        <input
                            type="date"
                            name="start_date"
                            value={form.start_date || ""}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        {errors.start_date && (
                            <div className="text-red-500">{errors.start_date}</div>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium"> Dead Line Date</label>
                        <input
                            type="date"
                            name="end_date"
                            value={form.end_date || ""}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        {errors.end_date && <div className="text-red-500">{errors.end_date}</div>}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Update Task
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}