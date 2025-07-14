import React from "react";

export default function BatchEditModal({
  editTasks,
  setEditTasks,
  setGroupEditOpen,
  statuses,
  projects,
  isTaskEdited,
  handleAddTask,
  handleMarkForDeletion,
  handleEditTaskField,
  handleGroupEditSubmit,
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setGroupEditOpen(false)}
          />
        </div>
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Batch Edit Tasks</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 transition-colors"
                onClick={() => setGroupEditOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {editTasks.map((task, idx) => {
                const projectId = task.project?.id || task.project;
                const projectEmployees = (() => {
                  const proj = projects.find(p => p.id === projectId);
                  return proj && proj.employees ? proj.employees : [];
                })();
                const isEdited = isTaskEdited(task, idx);
                const isNew = task.id === null;

                return (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 transition-all ${
                      task.toDelete
                        ? 'bg-red-50 border-red-200'
                        : isNew
                          ? 'bg-green-50 border-green-200'
                          : isEdited
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* ...existing input fields... */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                          Name {isEdited && <span className="text-blue-500 ml-1">*</span>}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="Task name"
                          value={task.name}
                          onChange={e => handleEditTaskField(idx, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                          Description
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="Description"
                          value={task.description}
                          onChange={e => handleEditTaskField(idx, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                          Status
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                          value={task.status}
                          onChange={e => handleEditTaskField(idx, 'status', e.target.value)}
                        >
                          <option value="">Select status</option>
                          {statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                          Project
                        </label>
                        {isNew ? (
                          <select
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                            value={projectId || ''}
                            onChange={e => handleEditTaskField(idx, 'project', e.target.value)}
                          >
                            <option value="">Select project</option>
                            {projects.map(proj => (
                              <option key={proj.id} value={proj.id}>{proj.name}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="px-3 py-2 text-sm bg-gray-50 rounded-md text-gray-700">
                            {projects.find(p => p.id === projectId)?.name || 'No project'}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                          Assigned To
                        </label>
                        <select
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                          value={task.assigned_to || ''}
                          onChange={e => handleEditTaskField(idx, 'assigned_to', e.target.value)}
                        >
                          <option value="">
                
                               {task.assigned_to?.name || 'Assigned Employee'}
                               
                          </option>
                          {projectEmployees
                            .filter(emp => emp.id !== task.assigned_to)
                            .map(emp => (
                              <option key={emp.id} value={emp.id}>{emp.name}</option>
                            ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                            Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                            value={task.start_date || ''}
                            onChange={e => handleEditTaskField(idx, 'start_date', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                            End Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                            value={task.end_date || ''}
                            onChange={e => handleEditTaskField(idx, 'end_date', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {task.id && (
                          <span className="text-xs text-gray-400 font-mono">ID: {task.id}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className={`px-3 py-1 text-xs rounded-md font-medium ${
                          task.toDelete
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        } transition-colors`}
                        onClick={() => handleMarkForDeletion(idx)}
                      >
                        {task.toDelete ? 'Undo Remove' : 'Remove Task'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black flex items-center gap-2 transition-colors"
                onClick={handleAddTask}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Task
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  onClick={() => setGroupEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                  onClick={handleGroupEditSubmit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
