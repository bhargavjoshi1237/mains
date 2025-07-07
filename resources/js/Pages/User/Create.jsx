import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user');
    };

    return (
        <div>
            <h1>Create User</h1>
            {Object.keys(errors).length > 0 && (
                <pre className='mt-5 text-red-500'>
                    {JSON.stringify(errors, null, 2)}
                </pre>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        value={data.role}
                        onChange={e => setData('role', e.target.value)}
                    />
                </div>
                <button type="submit" disabled={processing}>Create</button>
            </form>
        </div>
    );
}
