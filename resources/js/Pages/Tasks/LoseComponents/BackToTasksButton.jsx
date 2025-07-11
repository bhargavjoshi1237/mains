import React from "react";
import { Link } from "@inertiajs/react";

export default function BackToTasksButton({ href = "/task", children = "Back to Tasks" }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </Link>
  );
}
