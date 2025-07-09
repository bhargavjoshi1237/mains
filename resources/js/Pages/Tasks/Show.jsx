import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";

export default function Show() {
  const { task } = usePage().props;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const handleBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px #eee" }}>
      <Head title="View Task" />
      <h2 style={{ fontSize: 24, marginBottom: 16 }}>Task Details</h2>
      <div><strong>Name:</strong> {task.name ?? "-"}</div>
      <div><strong>Description:</strong> {task.description ?? "-"}</div>
      <div><strong>Assigned Project:</strong> {task.project?.name ?? "-"}</div>
      <div><strong>Assigned To:</strong> {task.assigned_to?.name ?? "-"}</div>
      <div><strong>Start Date:</strong> {formatDate(task.start_date)}</div>
      <div><strong>End Date:</strong> {formatDate(task.end_date)}</div>
      <div><strong>Status:</strong> {task.status ?? "-"}</div>
      <div><strong>Created By:</strong> {task.created_by?.name ?? "-"}</div>
      <div><strong>Last Updated By:</strong> {task.created_by?.name ?? "-"}</div>
      <div className="flex gap-5 mt-6">
        <Link
          href={`/task/${task.id}/edit`}
          className="bg-gray-200 text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 transition"
        >
          Edit Task
        </Link>
        <a
          href="#"
          onClick={handleBack}
          className="bg-[#232323] text-white px-6 py-2 rounded font-semibold hover:bg-[#444] transition"
        >
          Back
        </a>
        <Link
          href={`/task/${task.id}`}
          method="delete"
          as="button"
          className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Delete Task
        </Link>
      </div>
    </div>
  );
}