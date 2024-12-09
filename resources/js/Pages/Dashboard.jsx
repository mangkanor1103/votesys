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
                            <p className="text-lg mb-4">
                                As the Super Admin, you have full control over the Mindoro State University Online Voting System.
                                Manage elections, monitor voting activity, configure user roles such as sub-admins, and ensure
                                that the voting process remains transparent and secure.
                            </p>
                            <p className="text-lg">
                                One of your key responsibilities is generating election codes that can be used by sub-admins to
                                log in and create their own elections. These codes are essential for assigning specific elections to
                                sub-admins, enabling them to manage elections independently while you retain full system oversight.
                            </p>
                            <p className="text-lg mt-4">
                                The system allows you to:
                            </p>
                            <ul className="list-disc pl-6 text-lg">
                                <li>Generate unique election codes for sub-admins</li>
                                <li>Assign sub-admins to specific elections</li>
                                <li>Manage and monitor all elections created by sub-admins</li>
                                <li>Ensure data security and integrity of the voting process</li>
                                <li>View real-time voting statistics and results</li>
                            </ul>
                            <p className="mt-4 text-lg">
                                By generating election codes, you empower sub-admins to manage their respective elections,
                                ensuring a decentralized yet controlled environment for efficient election management.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
