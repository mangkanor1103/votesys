import React from 'react';
import { Head } from '@inertiajs/react';

export default function StuDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Dashboard" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Welcome to the Student Dashboard</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                You're successfully registered as a student at Mindoro State University.
            </p>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <p>Here's your student dashboard with important links and updates.</p>
            </div>
        </div>
    );
}
