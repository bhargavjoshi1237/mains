import React from 'react';

export default function StatsCard({ title, value, icon }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xs">
            <div className="flex items-center">
                <div className="rounded-md bg-black p-2">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                    <p className="text-xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );
}
