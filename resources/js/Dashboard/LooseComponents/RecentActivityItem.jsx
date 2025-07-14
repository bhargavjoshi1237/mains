import React from 'react';

export default function RecentActivityItem({ activity, userMap }) {
    return (
        <div className="px-4 py-2 rounded-xl bg-gray-100 mt-4 ml-4 mr-4">
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
    );
}
