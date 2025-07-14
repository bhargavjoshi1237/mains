import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

export default function Index({ tasks: initialTasks, statuses, employees, projects, user_role, errors }) {
    const [editing, setEditing] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const [massEdit, setMassEdit] = useState(false);
    const [newTasks, setNewTasks] = useState([
        {
            name: '',
            description: '',
            status: statuses[0] || '',
            assigned_to: '',
            project_id: '',
            start_date: '',
            end_date: '',
        }
    ]);

    // Mass edit form
    const { data, setData, post, processing, reset, errors: formErrors } = useForm({
        tasks: initialTasks.map(task => ({
            id: task.id,
            name: task.name,
            description: task.description || '',
            status: task.status,
            assigned_to: task.assigned_to?.id || '',
            project_id: task.project?.id || '',
            start_date: task.start_date || '',
            end_date: task.end_date || '',
        })),
        newTask: {
            name: '',
            description: '',
            status: statuses[0] || '',
            assigned_to: '',
            project_id: '',
            start_date: '',
            end_date: '',
        }
    });

    // Status color mapping
    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-green-100 text-green-800',
        'Blocked': 'bg-red-100 text-red-800',
    };

    // Toggle editing for a row
    const handleEditToggle = idx => {
        setEditing(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    // Handle field change for a task
    const handleFieldChange = (idx, field, value) => {
        const updated = [...data.tasks];
        updated[idx][field] = value;
        setData('tasks', updated);
    };

    // Helper to store new tasks sequentially and update local state
    const storeNewTasksSequentially = (tasks, onComplete) => {
        if (tasks.length === 0) {
            onComplete();
            return;
        }
        const [first, ...rest] = tasks;
        router.post(route('task.store'), first, {
            preserveScroll: true,
            onSuccess: () => {
                router.get(route('task.index'), {}, {
                    preserveScroll: true,
                    only: ['tasks'],
                    onSuccess: (page) => {
                        if (page.props && page.props.tasks) {
                            setData('tasks', page.props.tasks.map(task => ({
                                id: task.id,
                                name: task.name,
                                description: task.description || '',
                                status: task.status,
                                assigned_to: task.assigned_to?.id || '',
                                project_id: task.project?.id || '',
                                start_date: task.start_date || '',
                                end_date: task.end_date || '',
                            })));
                        }
                        storeNewTasksSequentially(rest, onComplete);
                    }
                });
            }
        });
    };

    // Handle mass update (update existing + create new)
    const handleMassUpdate = e => {
        e.preventDefault();
        const tasksToCreate = newTasks
            .filter(t => t.name.trim() !== '')
            .map(({ name, description, status, assigned_to, project_id, start_date, end_date }) => ({
                name,
                description,
                status,
                assigned_to,
                project_id,
                start_date,
                end_date,
            }));
        const tasksToUpdate = data.tasks;

        storeNewTasksSequentially(tasksToCreate, () => {
            post(route('task.batchUpdate'), { tasks: tasksToUpdate }, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditing({});
                    setNewTasks([{
                        name: '',
                        description: '',
                        status: statuses[0] || '',
                        assigned_to: '',
                        project_id: '',
                        start_date: '',
                        end_date: '',
                    }]);
                }
            });
        });
    };

    // Handle delete
    const handleDelete = id => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('task.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    setData('tasks', data.tasks.filter(task => task.id !== id));
                }
            });
        }
    };

    // Handle add task
    const handleAddTask = e => {
        e.preventDefault();
        router.post(route('task.store'), data.newTask, {
            preserveScroll: true,
            onSuccess: () => {
                reset('newTask');
                setShowAdd(false);
            }
        });
    };

    // Handle new task field change
    const handleNewTaskChange = (field, value) => {
        setData('newTask', { ...data.newTask, [field]: value });
    };

    // Toggle mass edit mode
    const handleMassEditToggle = () => {
        if (!massEdit) {
            const allEditing = {};
            data.tasks.forEach((_, idx) => { allEditing[idx] = true; });
            setEditing(allEditing);
        } else {
            setEditing({});
        }
        setMassEdit(!massEdit);
    };

    // Add new empty task row in mass edit mode
    const handleAddNewTaskRow = () => {
        setNewTasks([
            ...newTasks,
            {
                name: '',
                description: '',
                status: statuses[0] || '',
                assigned_to: '',
                project_id: '',
                start_date: '',
                end_date: '',
            }
        ]);
    };

    // Update field for a new task in mass edit mode
    const handleNewTaskFieldChange = (idx, field, value) => {
        const updated = [...newTasks];
        updated[idx][field] = value;
        if (field === 'project_id') {
            updated[idx]['assigned_to'] = '';
        }
        setNewTasks(updated);
    };

    // Get employees for a project
    const getProjectEmployees = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        return project && project.employees ? project.employees : employees;
    };

    // Helper to get readable error message for a field
    const getFieldError = (errors, key, label) => {
        if (!errors || !errors[key]) return null;
        let msg = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
        if (msg.match(/must be a date after or equal to .*start_date/i)) {
            return 'End Date must be after or equal to Start Date.';
        }
        if (msg.match(/The .* field is required\./i)) {
            return `${label} is required.`;
        }
        return msg;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => setShowAdd(v => !v)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${showAdd ? 'bg-gray-200 text-gray-800' : 'bg-black text-white'}`}
                    >
                        {showAdd ? 'Cancel' : 'Add Task'}
                    </button>
                    <button 
                        onClick={handleMassEditToggle}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${massEdit ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'}`}
                    >
                        {massEdit ? 'Cancel Mass Edit' : 'Mass Edit'}
                    </button>
                </div>
            </div>

            {/* Error messages */}
            {(errors && Object.keys(errors).length > 0) || (formErrors && Object.keys(formErrors).length > 0) ? (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                There were errors with your submission
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    {errors && Object.values(errors).map((err, i) => (
                                        <li key={`error-${i}`}>{err}</li>
                                    ))}
                                    {formErrors && Object.values(formErrors).map((err, i) => (
                                        <li key={`formError-${i}`}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Add Task Form */}
            {showAdd && (
                <form onSubmit={handleAddTask} className="mb-8 bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Task name"
                                value={data.newTask.name}
                                onChange={e => handleNewTaskChange('name', e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                            {getFieldError(formErrors, 'newTask.name', 'Name') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.name', 'Name')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                placeholder="Task description"
                                value={data.newTask.description}
                                onChange={e => handleNewTaskChange('description', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                            {getFieldError(formErrors, 'newTask.description', 'Description') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.description', 'Description')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.newTask.status}
                                onChange={e => handleNewTaskChange('status', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            >
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {getFieldError(formErrors, 'newTask.status', 'Status') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.status', 'Status')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
                                Assigned To
                            </label>
                            <select
                                id="assigned_to"
                                value={data.newTask.assigned_to}
                                onChange={e => handleNewTaskChange('assigned_to', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            >
                                <option value="">Select employee</option>
                                {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                            </select>
                            {getFieldError(formErrors, 'newTask.assigned_to', 'Assigned To') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.assigned_to', 'Assigned To')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                                Project
                            </label>
                            <select
                                id="project_id"
                                value={data.newTask.project_id}
                                onChange={e => handleNewTaskChange('project_id', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                disabled
                            >
                                <option value="">Select project</option>
                                {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.name}</option>)}
                            </select>
                            {getFieldError(formErrors, 'newTask.project_id', 'Project') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.project_id', 'Project')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                value={data.newTask.start_date}
                                onChange={e => handleNewTaskChange('start_date', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                            {getFieldError(formErrors, 'newTask.start_date', 'Start Date') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.start_date', 'Start Date')}</p>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                value={data.newTask.end_date}
                                onChange={e => handleNewTaskChange('end_date', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                            />
                            {getFieldError(formErrors, 'newTask.end_date', 'End Date') && (
                                <p className="mt-2 text-sm text-red-600">{getFieldError(formErrors, 'newTask.end_date', 'End Date')}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Task'}
                        </button>
                    </div>
                </form>
            )}

            {/* Tasks Table */}
            <form onSubmit={handleMassUpdate}>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Assigned To
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Project
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    End Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.tasks && data.tasks.length > 0 ? (
                                data.tasks.map((task, idx) => (
                                    <tr key={task.id} className={editing[idx] ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {task.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {editing[idx] ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={task.name}
                                                        onChange={e => handleFieldChange(idx, 'name', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    />
                                                    {getFieldError(formErrors, `tasks.${idx}.name`, 'Name') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.name`, 'Name')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                task.name
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                            {editing[idx] ? (
                                                <div>
                                                    <textarea
                                                        value={task.description}
                                                        onChange={e => handleFieldChange(idx, 'description', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                        rows={2}
                                                    />
                                                    {getFieldError(formErrors, `tasks.${idx}.description`, 'Description') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.description`, 'Description')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="line-clamp-2">{task.description || '-'}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editing[idx] ? (
                                                <div>
                                                    <select
                                                        value={task.status}
                                                        onChange={e => handleFieldChange(idx, 'status', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    >
                                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                    {getFieldError(formErrors, `tasks.${idx}.status`, 'Status') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.status`, 'Status')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[task.status] || 'bg-gray-100 text-gray-800'}`}>
                                                    {task.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {editing[idx] ? (
                                                <div>
                                                    <select
                                                        value={task.assigned_to}
                                                        onChange={e => handleFieldChange(idx, 'assigned_to', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    >
                                                        <option value="">Select employee</option>
                                                        {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                                                    </select>
                                                    {getFieldError(formErrors, `tasks.${idx}.assigned_to`, 'Assigned To') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.assigned_to`, 'Assigned To')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                employees.find(emp => emp.id === task.assigned_to)?.name || '-'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {task.project
                                                ? task.project.name
                                                : projects.find(proj => proj.id === task.project_id)?.name || '-'
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {editing[idx] ? (
                                                <div>
                                                    <input
                                                        type="date"
                                                        value={task.start_date}
                                                        onChange={e => handleFieldChange(idx, 'start_date', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    />
                                                    {getFieldError(formErrors, `tasks.${idx}.start_date`, 'Start Date') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.start_date`, 'Start Date')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                task.start_date || '-'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {editing[idx] ? (
                                                <div>
                                                    <input
                                                        type="date"
                                                        value={task.end_date}
                                                        onChange={e => handleFieldChange(idx, 'end_date', e.target.value)}
                                                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                    />
                                                    {getFieldError(formErrors, `tasks.${idx}.end_date`, 'End Date') && (
                                                        <p className="mt-1 text-xs text-red-600">{getFieldError(formErrors, `tasks.${idx}.end_date`, 'End Date')}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                task.end_date || '-'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                {!massEdit && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditToggle(idx)}
                                                        className={`text-sm ${editing[idx] ? 'text-gray-600 hover:text-gray-900' : 'text-blue-600 hover:text-blue-900'}`}
                                                    >
                                                        {editing[idx] ? 'Cancel' : 'Edit'}
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(task.id)}
                                                    className="text-sm text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mass Edit Controls */}
                {(data.tasks && data.tasks.length > 0) && (
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save All Changes'
                            )}
                        </button>
                    </div>
                )}
            </form>

            {/* Mass Add Tasks Section */}
            {massEdit && (
                <div className="mt-8 bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Add Multiple Tasks</h2>
                        <button
                            type="button"
                            onClick={handleAddNewTaskRow}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            Add Another Task
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Assigned To
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Start Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        End Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {newTasks.map((task, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="text"
                                                value={task.name}
                                                onChange={e => handleNewTaskFieldChange(idx, 'name', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <textarea
                                                value={task.description}
                                                onChange={e => handleNewTaskFieldChange(idx, 'description', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                rows={1}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={task.status}
                                                onChange={e => handleNewTaskFieldChange(idx, 'status', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            >
                                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={task.project_id}
                                                onChange={e => handleNewTaskFieldChange(idx, 'project_id', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            >
                                                <option value="">Select Project</option>
                                                {projects.map(proj => (
                                                    <option key={proj.id} value={proj.id}>{proj.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={task.assigned_to}
                                                onChange={e => handleNewTaskFieldChange(idx, 'assigned_to', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                                disabled={!task.project_id}
                                            >
                                                <option value="">Assign to</option>
                                                {getProjectEmployees(task.project_id).map(emp => (
                                                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="date"
                                                value={task.start_date}
                                                onChange={e => handleNewTaskFieldChange(idx, 'start_date', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="date"
                                                value={task.end_date}
                                                onChange={e => handleNewTaskFieldChange(idx, 'end_date', e.target.value)}
                                                className="block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {newTasks.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-600 hover:text-red-900 text-sm"
                                                    onClick={() => setNewTasks(newTasks.filter((_, i) => i !== idx))}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}