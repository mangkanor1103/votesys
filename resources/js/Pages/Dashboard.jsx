import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function SuperAdminDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-green-900">
                    Mindoro State University Online Voting System - Super Admin Dashboard
                </h2>
            }
        >
            <Head title="Super Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg border-t-4 border-green-600">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-green-700 mb-4">
                                Welcome to the Super Admin Dashboard
                            </h3>
                            <p className="text-gray-700">Manage your system efficiently and effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
