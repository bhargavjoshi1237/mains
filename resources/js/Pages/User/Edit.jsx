import React from 'react';
import { usePage, useForm } from '@inertiajs/react';

export default function Edit() {
    const { user } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/${user.id}`);
    };

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div>

            <h1>Edit User</h1>
            {Object.keys(errors).length > 0 && (
                <pre className='mt-5 text-red-500'>
                    {JSON.stringify(errors, null, 2)}
                </pre>
            )}

            <form onSubmit={handleSubmit}>
                <table border="1" cellPadding="8" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <td>
                                <input
                                    type="text"
                                    name="role"
                                    value={data.role}
                                    onChange={e => setData('role', e.target.value)}
                                    required
                                />
                                {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
                            </td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>Updated At</th>
                            <td>{new Date(user.updated_at).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" style={{ marginTop: '16px' }} disabled={processing}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

