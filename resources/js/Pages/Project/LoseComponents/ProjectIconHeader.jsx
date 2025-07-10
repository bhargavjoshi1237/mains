import React from 'react';

export default function ProjectIconHeader({ title, description }) {
  return (
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center shadow border border-blue-100 mr-4">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#3b82f6" />
          <rect x="7" y="7" width="10" height="10" rx="2" fill="#fff" opacity="0.5" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
    </div>
  );
}
