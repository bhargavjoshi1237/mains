import React from "react";

const statusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};

export default function StatusBadge({ status }) {
  const color = statusColors[status] || statusColors.default;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {status?.replace('_', ' ') || "Unknown"}
    </span>
  );
}
