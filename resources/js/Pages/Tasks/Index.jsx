import React, { useState } from 'react';
import { Link, router, useForm,Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
                    setMassEdit(false); // Disable mass edit after saving
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
        <AuthenticatedLayout header={
            <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold text-gray-900">Tasks</h2>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => router.get(route('task.create'))}
                        className={`px-4 py-2 rounded-md text-sm font-medium bg-black text-white`}
                    >
                        Add Task
                    </button>
                    <button 
                        onClick={handleMassEditToggle}
                        className={`px-4 py-2 flex rounded-md text-sm font-medium ${massEdit ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" className='mr-2' viewBox="0 0 24 24"><path fill="currentColor" d="M6.616 21q-.691 0-1.153-.462T5 19.385V4.615q0-.69.463-1.152T6.616 3h7.213q.323 0 .628.13t.522.349L18.52 7.02q.217.218.348.522t.131.628v2.248q0 .218-.134.379q-.133.162-.345.223q-.362.131-.666.32q-.305.19-.586.47l-5.515 5.497q-.217.217-.351.522q-.134.304-.134.628v1.734q0 .348-.23.578t-.577.23zm7.038-.808V19.12q0-.161.056-.3q.055-.14.186-.271l5.09-5.065q.148-.13.308-.19q.16-.062.32-.062q.165 0 .334.064q.17.065.298.194l.925.944q.123.148.188.308q.064.159.064.319t-.061.322t-.19.31l-5.066 5.066q-.131.13-.27.186q-.14.056-.302.056h-1.073q-.348 0-.577-.23q-.23-.23-.23-.578m5.96-4.176l.924-.956l-.925-.944l-.95.95zM14.807 8H18l-4-4l4 4l-4-4v3.192q0 .348.23.578t.578.23"/></svg>
                      {massEdit ? 'Cancel Mass Edit' : 'Mass Edit'}
                    </button>
                    {massEdit && Object.values(editing).some(Boolean) && (
                        <form onSubmit={handleMassUpdate}>
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
                        </form>
                    )}
                </div>
            </div>
        }>
        <Head title="Tasks" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Show normal errors at the top */}
            {errors && Object.keys(errors).length > 0 && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
                    <ul className="list-disc pl-5 text-red-700 text-sm">
                        {Object.entries(errors).map(([key, msg], i) => (
                            <li key={key}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Hide raw errors dump */}
            {/* <pre style={{ background: '#fff0f0', color: '#b91c1c', padding: '8px', borderRadius: '6px', marginBottom: '1rem', fontSize: '12px', overflowX: 'auto' }}>
                {JSON.stringify({ errors, formErrors }, null, 2)}
            </pre> */}
            {/* Tasks Table */}
            <form onSubmit={handleMassUpdate}>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                                                <span className={`border border-[#474747] px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[task.status] || 'bg-gray-100 text-gray-800'}`}>
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
                                                <Link
                                                    type="button"
                                                    href={route('task.show', task.id)}
                                                    className="text-sm text-black hover:text-gray-500 mx-2"
                                                >
                                                    View
                                                </Link>
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
        </div> </AuthenticatedLayout>
    );
}