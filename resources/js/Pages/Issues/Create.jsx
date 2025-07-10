import React from 'react';
import { useForm, Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import IssueFormFields from './LooseComponents/IssueFormFields';

export default function Create() {
    const { projects } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        status: '',
        project_id: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/issues');
    }

    return (
        <AuthenticatedLayout 
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900">Create New Issue</h2>
                    <Link 
                        href="/issues" 
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        ← Back to issues
                    </Link>
                </div>
            }
        >
            <Head title="Create Issue" />
            
            <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Issue Details</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Fill in the details below to create a new issue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <IssueFormFields
                                data={data}
                                setData={setData}
                                errors={errors}
                                projects={projects}
                            />
                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${processing ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
                                >
                                    {processing ? 'Creating...' : 'Create Issue'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}