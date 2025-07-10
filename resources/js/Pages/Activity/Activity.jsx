import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Activity() {
    const { activities, users, auth } = usePage().props;

    // Build a map of userId => userName for quick lookup
    const userMap = {};
    if (users && Array.isArray(users)) {
        users.forEach(u => {
            userMap[u.id] = u.name;
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Activities (Last 7 Days)</h2>}>
            <Head title="Activity" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">Activity Log</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {activities && activities.length > 0 ? (
                                activities.map((activity, idx) => (
                                    <div key={activity.id || idx} className="px-4 py-2 rounded-xl bg-gray-100 mt-4 ml-4 mr-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {activity.entity_name}
                                                    </p>
                                                    <div className="flex flex-col items-end">
                                                        <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                                            {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                        <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                                                            {new Date(activity.created_at).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    <span className="capitalize">{activity.type}</span> {activity.action}
                                                    {activity.performed_by && (
                                                        <span className="text-gray-400 ml-1">
                                                            by {userMap[activity.performed_by] || activity.performed_by}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-4 text-center text-sm text-gray-500">
                                    No activities to display
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
