import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from "./LoseComponents/StatusBadge";

export default function Index() {
  const { tasks, user_role, statuses = [], employees = [], projects = [] } = usePage().props;
  const [groupEditOpen, setGroupEditOpen] = useState(false);
  const [editTasks, setEditTasks] = useState((tasks || []).map(t => ({ ...t, toDelete: false })));
  const [originalTasks] = useState(tasks || []);

  // Add new empty task
  const handleAddTask = () => {
    setEditTasks([
      ...editTasks,
      {
        id: null,
        name: '',
        description: '',
        status: '',
        assigned_to: null,
        project: null,
        start_date: '',
        end_date: '',
        toDelete: false,
      },
    ]);
  };

 
  const handleMarkForDeletion = (idx) => {
    setEditTasks(editTasks.map((task, i) => 
      i === idx ? { ...task, toDelete: !task.toDelete } : task
    ));
  };

  
  const handleEditTaskField = (idx, field, value) => {
    setEditTasks(editTasks.map((task, i) =>
      i === idx ? { ...task, [field]: value } : task
    ));
  };


  const getProjectEmployees = projectId => {
    const proj = projects.find(p => p.id === projectId);
    return proj && proj.employees ? proj.employees : [];
  };

  
  const isTaskEdited = (task, idx) => {
    const orig = originalTasks[idx];
    if (!orig) return false;
    return (
      task.name !== orig.name ||
      task.description !== orig.description ||
      task.status !== orig.status ||
      task.assigned_to !== orig.assigned_to ||
      (task.project?.id || task.project) !== (orig.project?.id || orig.project) ||
      task.start_date !== orig.start_date ||
      task.end_date !== orig.end_date
    );
  };

 
  const handleGroupEditSubmit = async () => {
    const creates = [];
    const updates = [];
    const deletes = [];

    editTasks.forEach((task, idx) => {
      if (task.toDelete && task.id) {
        deletes.push(task.id);
      } else if (!task.id) {
        creates.push({
          name: task.name,
          description: task.description,
          status: task.status,
          assigned_to: task.assigned_to?.id || task.assigned_to,
          project_id: task.project?.id || task.project,
          start_date: task.start_date,
          end_date: task.end_date,
        });
      } else if (isTaskEdited(task, idx)) {
        updates.push({
          id: task.id,
          name: task.name,
          description: task.description,
          status: task.status,
          assigned_to: task.assigned_to?.id || task.assigned_to,
          project_id: task.project?.id || task.project,
          start_date: task.start_date,
          end_date: task.end_date,
        });
      }
    });

    await Inertia.post('/task/batch-update', {
      creates,
      updates,
      deletes,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setGroupEditOpen(false);
        Inertia.visit('/task', { replace: true });
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">Tasks</h2>
          <div className="flex gap-2">
            <Link href="/task/create" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Create Task
            </Link>
            <button type="button" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => setGroupEditOpen(true)}>
              Group Edit
            </button>
          </div>
        </div>
      }
    >
      <Head title="Tasks" />
    
      {groupEditOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm"
                onClick={() => setGroupEditOpen(false)}></div>
            </div>
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Group Edit Tasks</h3>
                  <button type="button" className="text-gray-500 hover:text-gray-700"
                    onClick={() => setGroupEditOpen(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {editTasks.map((task, idx) => {
                    const projectId = task.project?.id || task.project;
                    const projectEmployees = getProjectEmployees(projectId);
                    const isEdited = isTaskEdited(task, idx);
                    const isNew = task.id === null;
                    return (
                      <div key={idx}
                        className={`border rounded-xl p-4 transition-all ${
                          task.toDelete
                            ? 'bg-red-50 border-red-200 opacity-75'
                            : isNew
                              ? 'bg-green-50 border-green-200'
                              : isEdited
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                       
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Name {isEdited && <span className="text-blue-500 ml-1">*</span>}
                            </label>
                            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Task name" value={task.name}
                              onChange={e => handleEditTaskField(idx, 'name', e.target.value)}
                            />
                          </div>
                        
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                            <input type="text" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Description" value={task.description}
                              onChange={e => handleEditTaskField(idx, 'description', e.target.value)}
                            />
                          </div>
                       
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                            <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                            <label className="block text-xs font-medium text-gray-500 mb-1">Project</label>
                            {isNew ? (
                              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={projectId || ''}
                                onChange={e => handleEditTaskField(idx, 'project', e.target.value)}
                              >
                                <option value="">Select project</option>
                                {projects.map(proj => (
                                  <option key={proj.id} value={proj.id}>{proj.name}</option>
                                ))}
                              </select>
                            ) : (
                              <div className="px-3 py-2 text-sm bg-gray-100 rounded-lg text-gray-700">
                                {projects.find(p => p.id === projectId)?.name || 'No project'}
                              </div>
                            )}
                          </div>
                       
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Assigned To</label>
                            <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                              value={task.assigned_to || ''}
                              onChange={e => handleEditTaskField(idx, 'assigned_to', e.target.value)}
                            >
                              <option value="">Select user</option>
                              {projectEmployees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                              ))}
                            </select>
                          </div>
                        
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={task.start_date || ''}
                                onChange={e => handleEditTaskField(idx, 'start_date', e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                              <input type="date" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={task.end_date || ''}
                                onChange={e => handleEditTaskField(idx, 'end_date', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div>
                            {task.id && (
                              <span className="text-xs text-gray-500">ID: {task.id}</span>
                            )}
                          </div>
                          <button type="button"
                            className={`px-3 py-1 text-xs rounded-full ${
                              task.toDelete
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                            onClick={() => handleMarkForDeletion(idx)}
                          >
                            {task.toDelete ? 'Undo Remove' : 'Mark for Removal'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={handleAddTask}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Task
                  </button>
                  <div className="space-x-3">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      onClick={() => setGroupEditOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
      )}
 
      <div className="py-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <Link key={task.id} href={`/task/${task.id}`} className="group">
                  <div className="relative h-full bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden hover:shadow-sm hover:shadow-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50/50 opacity-50 -z-10"></div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-medium text-gray-900 line-clamp-1">{task.name}</h3>
                        <StatusBadge status={task.status} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2 mb-3">{task.description}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center text-gray-500">
                          <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="truncate">Assigned:  {task.assigned_to?.name || 'Unassigned'}</span>
                        </div>
                        {task.project && (
                          <div className="flex items-center text-gray-500">
                            <svg className="w-3 h-3 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="truncate">Project: {task.project.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto max-w-md">
                  <div className="text-gray-300 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
                  <p className="text-gray-500 mb-6">Create your first task to get started</p>
                  {(user_role === 'admin' || user_role === 'employee') && (
                    <Link href="/task/create" className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                      Create Task
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}