import React, { useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatusBadge from "./LoseComponents/StatusBadge";

export default function Index() {
  const { tasks, user_role, statuses = [], employees = [], projects = [], userauth } = usePage().props;
  const [groupEditOpen, setGroupEditOpen] = useState(false);
  const [editTasks, setEditTasks] = useState((tasks || []).map(t => ({ ...t, toDelete: false })));
  const [originalTasks] = useState(tasks || []);
  const [batchError, setBatchError] = useState(null);
  const [batchLoading, setBatchLoading] = useState(false); // loading state for save button

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
    setBatchLoading(true); // start loading
    const tasksPayload = editTasks
      .filter(task => !task.toDelete)
      .map(task => ({
        id: task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        assigned_to: task.assigned_to?.id || task.assigned_to,
        project_id: task.project?.id || task.project,
        start_date: task.start_date,
        end_date: task.end_date,
      }));

    const deleteIds = editTasks.filter(task => task.toDelete && task.id).map(task => task.id);

    await Inertia.post('/task/batch-update', {
      tasks: tasksPayload,
      deletes: deleteIds,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setGroupEditOpen(false);
        setBatchError(null);
        setBatchLoading(false); // stop loading
        Inertia.visit('/task', { replace: true });
      },
      onError: (errors) => {
        setBatchError(errors?.batch || 'Batch update failed.');
        setBatchLoading(false); // stop loading
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
          <div className="flex gap-3">
            {(user_role === 'admin') && (<Link 
              href="/task/create" 
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-all duration-150 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Task
            </Link> )}
                {(user_role === 'admin') && (
            <button 
              type="button" 
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-all duration-150 flex items-center gap-2"
              onClick={() => setGroupEditOpen(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Group Edit
            </button> )}
          </div>
        </div>
      }
    >
      <Head title="Tasks" />
      {groupEditOpen && (
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
                
                {batchError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {batchError}
                  </div>
                )}
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {editTasks.map((task, idx) => {
                    const projectId = task.project?.id || task.project;
                    const projectEmployees = getProjectEmployees(projectId);
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
                              <option value="">{task.assigned_to?.name || 'Unassigned'}</option>
                              {projectEmployees.map(emp => (
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
                      className={`px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2${batchLoading ? ' opacity-70 cursor-not-allowed' : ''}`}
                      onClick={handleGroupEditSubmit}
                      disabled={batchLoading}
                    >
                      {batchLoading ? (
                        <>
                         <svg className='' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5a2.5 2.5 0 0 0 0 5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5a2.5 2.5 0 0 0 0-5"/></svg>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
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
          {tasks && tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <Link 
                  key={task.id} 
                  href={`/task/${task.id}`} 
                  className="group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden hover:shadow-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-50 -z-10" />
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-black">
                        {task.name}
                      </h3>
                      <StatusBadge status={task.status} />
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {task.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="truncate">
                          {task.assigned_to?.name || 'Unassigned'}
                        </span>
                      </div>
                      
                      {task.project && (
                        <div className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="truncate">
                            {task.project.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-full max-w-md px-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating a new task
                </p>
                
                {userauth?.role === 'admin' && (<Link
                            href="/task/create"
                            className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                          >
                            Create Task
                          </Link> )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}