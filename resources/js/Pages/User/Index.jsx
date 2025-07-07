import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Index() {
    const { users } = usePage().props;

    return (
        
        <div>
            <h1>Users</h1>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Action</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role ?? '-'}</td>
                                <td>{new Date(user.created_at).toLocaleString()}</td>
                                <td>
                                    <Link href={`/user/${user.id}`}>
                                        <button>View</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/user/${user.id}/edit`}>
                                        <button>Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/user/${user.id}`} method="delete" className='text-red-500'>
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
