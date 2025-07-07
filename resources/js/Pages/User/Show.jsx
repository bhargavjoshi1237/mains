import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const { user, createdBy } = usePage().props;

    if (!user) {
        return <div>User not found.</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            <table border="1" cellPadding="8" cellSpacing="0">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{user.role ?? '-'}</td>
                    </tr>
                    <tr>
                        <th>Created By</th>
                        <td>{createdBy ? createdBy.name : user.created_by}</td>
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
        </div>
    );
}
