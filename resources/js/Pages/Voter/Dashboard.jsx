import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function SuperAdminDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold text-white tracking-wide">
                    Mindoro State University Online Voting System - Super Admin Dashboard
                </h2>
            }
        >
            <Head title="Super Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg sm:rounded-lg border-t-4 border-green-700">
                        <div className="p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">
                                Welcome to the Super Admin Dashboard
                            </h3>
                            <p className="text-lg">
                                Manage your system efficiently and effectively.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
