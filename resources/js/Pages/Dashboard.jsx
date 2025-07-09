import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard({ user, totalTasks, totalUsers, totalProjects, totalEmployees, totalClients, totalIssuesLast30Days, recentActivities }) {
    const { error, users } = usePage().props;

    // Build a map of userId => userName for quick lookup
    const userMap = {};
    if (users && Array.isArray(users)) {
        users.forEach(u => {
            userMap[u.id] = u.name;
        });
    }

    return (
        <AuthenticatedLayout
            role={user?.role}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Dashboard
                    </h2>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stats Grid - Vercel Style */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 mb-8">
                        {[
                            { 
                                title: "Total Tasks", 
                                value: totalTasks ?? 0,
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            },
                            { 
                                title: "Total Projects", 
                                value: totalProjects ?? 0,
                                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 7h10"
                            },
                            { 
                                title: "Total Users", 
                                value: totalUsers ?? 0,
                                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            },
                            { 
                                title: "Employees", 
                                value: totalEmployees ?? 0,
                                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            },
                            { 
                                title: "Clients", 
                                value: totalClients ?? 0,
                                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            },
                            { 
                                title: "Issues (30d)", 
                                value: totalIssuesLast30Days ?? 0,
                                // Changed to warning triangle icon
                                icon: "M12 9v2m0 4h.01M21 18a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12zM12 7v2m0 4h.01"
                            }
                        ].map((stat, index) => (
                            <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-xs">
                                <div className="flex items-center">
                                    <div className="rounded-md bg-black p-2">
                                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.title}</p>
                                        <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                   
                    <div className="space-y-6">
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activities</h3>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {recentActivities && recentActivities.length > 0 ? (
                                    recentActivities.map((activity, idx) => (
                                        <div key={activity.id || idx} className="px-4 py-2 rounded-xl  bg-gray-100 mt-4 ml-4 mr-4">
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
                                        No recent activities to display
                                    </div>
                                )}
                            </div>
                            {recentActivities && recentActivities.length > 0 && (
                                <div className="px-6 py-3 bg-gray-50 text-right text-sm">
                                    <a href="#" className="font-medium text-gray-600 hover:text-gray-900">
                                        View all activities →
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Admin-Specific Content */}
                        {user?.role === 'admin' && (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* Employee Overview Card */}
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="px-6 py-5 border-b border-gray-200">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Employee Overview</h3>
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">Employee One</h4>
                                                <div className="mt-3 grid grid-cols-2 gap-4">
                                                    {[
                                                        { label: "Tasks Assigned", value: "12" },
                                                        { label: "Projects", value: "3" },
                                                        { label: "Completed", value: "8" },
                                                        { label: "Overdue", value: "1" }
                                                    ].map((item, i) => (
                                                        <div key={i}>
                                                            <p className="text-xs text-gray-500">{item.label}</p>
                                                            <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions Card */}
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <div className="px-6 py-5 border-b border-gray-200">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
                                    </div>
                                    <div className="px-6 py-4 grid grid-cols-2 gap-4">
                                        <Link
                                            href="/task/create"
                                            className="group flex items-center space-x-3 text-left p-3 rounded-md hover:bg-gray-50"
                                        >
                                            <div className="flex-shrink-0 h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
                                                <svg className="h-5 w-5 text-blue-600 group-hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">New Task</p>
                                                <p className="text-xs text-gray-500">Create a new task</p>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/project/create"
                                            className="group flex items-center space-x-3 text-left p-3 rounded-md hover:bg-gray-50"
                                        >
                                            <div className="flex-shrink-0 h-8 w-8 rounded-md bg-green-50 flex items-center justify-center">
                                                <svg className="h-5 w-5 text-green-600 group-hover:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">New Project</p>
                                                <p className="text-xs text-gray-500">Start a new project</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}