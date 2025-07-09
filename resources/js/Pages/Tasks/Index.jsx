import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box } from '@/Components/Task';

export default function Index() {
  const { tasks } = usePage().props;

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Tasks
          </h2>
          <Link
            href="/task/create"
            className="ml-auto px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Create Task
          </Link>
        </div>
      }
    >
      <Head title="Tasks" />
      <div className="">




        <div className="ml-auto mr-auto   ">
          <div className="ml-auto mr-auto w-full flex flex-wrap justify-start items-start mt-8">
            {tasks && tasks.length > 0 ? (
              tasks.map(task => (
                <Link
                  key={task.id}
                  href={`/task/${task.id}`}
                  className=" ml-auto mr-auto mt-1 mb-1"
                >
                  <Box
                    title={task.name ?? ''}
                    description={task.description ?? ''}
                    assignedto={task.created_by?.name ?? ''}
                    createdby={task.assigned_to?.name ?? ''}
                    status={task.status ?? ''}
                  />
                </Link>
              ))
            ) : (
              <div className="text-gray-600">No tasks found.</div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}