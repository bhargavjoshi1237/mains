import React from 'react';
import EmployeeAvatar from './EmployeeAvatar';

export default function AssignedEmployeesList({ employeeIds, employees, onRemove }) {
  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Assigned Employees</h3>
      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
        {employeeIds.map(empId => {
          const emp = employees.find(e => e.id === empId);
          return (
            <li key={empId} className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <EmployeeAvatar name={emp ? emp.name : empId} />
                <span>{emp ? emp.name : empId}</span>
              </div>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(empId)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
