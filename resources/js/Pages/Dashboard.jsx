import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user }) {
    return (
        <AuthenticatedLayout
            role={user?.role}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>

                    {/* Only show for admin */}
                    {user?.role === 'admin' && (
                        <>
                            <div className='mt-5 w-[350px] rounded-xl bg-white shadow-lg h-auto flex items-center p-4 gap-4'>
                                {/* Status Indicator */}
                                <div className='h-24 w-2 rounded-lg'
                                    style={{ backgroundColor: "#ef4444" /* red-500 */ }}>
                                </div>
                                {/* Task Content */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-lg font-semibold text-gray-800'>Create The Home Page</h3>
                                        {/* <span className='text-xs px-2 py-1 rounded bg-red-100 text-red-600 font-medium'>
                                        In Progress
                                    </span> */}
                                    </div>
                                    <p className='text-sm text-gray-600 mt-1'>
                                        Create the homepage as the UI is designed, with created buttons and colors.
                                    </p>
                                    <div className='flex'>
                                        <div className='w-full flex items-center gap-2 mt-3'>
                                            <span className='text-xs text-gray-500'>Assigned to:</span>
                                            <div className='text-xs item-center justify-enter flex font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded'>
                                                <div className='w-[8px] h-[8px] mt-1 mr-1 bg-green-600 rounded-full'></div>
                                                John
                                            </div>
                                        </div>
                                        <div className='w-full flex items-center gap-2 mt-3'>
                                            <span className='text-xs text-gray-400 ml-2'>
                                                • Assigned on: 20 Jun 25
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Users Widget */}
                            <div className='mt-5 w-[350px] rounded-xl bg-white shadow-lg h-auto flex items-center p-4 gap-4'>
                                {/* SVG Icon */}
                                <div className='h-16 w-16 flex items-center justify-center bg-blue-100 rounded-lg'>
                                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="7" r="4" fill="#3b82f6" />
                                        <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4v1H4v-1z" fill="#3b82f6" opacity="0.3" />
                                    </svg>
                                </div>
                                {/* User Stats Content */}
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-lg font-semibold text-gray-800'>Employee One</h3>
                                    </div>
                                    <div className='mt-1 flex flex-col gap-1'>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-sm text-gray-600'>Total Tasks Assigned</span>
                                            <span className='text-sm font-bold text-gray-800'>12</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-sm text-gray-600'>Total Projects Assigned</span>
                                            <span className='text-sm font-bold text-gray-800'>3</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    )}


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
