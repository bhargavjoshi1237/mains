import React, { useState, useEffect } from "react";

export default function TaskForm({ initialValues, projects, users, onSubmit, submitLabel, statuses }) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  // Only show users with role 'employee' (if backend still sends mixed roles)
  const employeeUsers = users.filter((u) => u.role === "employee" || !u.role);

  return (
    <form onSubmit={handleSubmit} className="w-full ">
      <div className="w-full flex item-end -mt-10 mb-10">
        <button
          type="submit"
          className="bg-[#232323] w-36 ml-auto text-white px-6 py-2 rounded font-semibold hover:bg-[#444] transition w-full mt-auto"
        >
          {submitLabel}
        </button>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded px-3 py-2"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              className="w-full border rounded px-3 py-2"
              value={values.description}
              onChange={handleChange}
            />
          </div>
           <div className=" ">
            <label className="block mb-1 font-medium">Status</label>
            <select
              name="status"
              className="w-full border rounded px-3 py-2"
              value={values.status}
              onChange={handleChange}
            >
              {statuses?.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Assigned To */}
          <div>
            <label className="block mb-1 font-medium">Assigned To</label>
            <select
              name="assigned_to_id"
              className="w-full border rounded px-3 py-2"
              value={values.assigned_to_id}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {employeeUsers.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="start_date"
                className="w-full border rounded px-3 py-2"
                value={values.start_date}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">End Date</label>
              <input
                type="date"
                name="end_date"
                className="w-full border rounded px-3 py-2"
                value={values.end_date}
                onChange={handleChange}
              />
            </div>
          </div>
          
         
        </div>
      </div>
    </form>
  );
}