import React from 'react';

export default function EmployeeAvatar({ name }) {
  return (
    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
      <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 14.75C8.28 14.75 5.25 15.23 5.25 17.5V19.75H18.75V17.5C18.75 15.23 15.72 14.75 12 14.75Z" />
        <path d="M12 13C14.14 13 15.75 11.39 15.75 9.25C15.75 7.11 14.14 5.5 12 5.5C9.86 5.5 8.25 7.11 8.25 9.25C8.25 11.39 9.86 13 12 13Z" />
      </svg>
    </div>
  );
}
