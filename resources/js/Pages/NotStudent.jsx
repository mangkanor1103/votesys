import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function NotStudent() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            // Proceed with registration logic
            console.log('Registration successful');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Verification" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Student Verification</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                Register your ID to confirm if you are a student of Mindoro State University.
            </p>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleRegister}>
                    {/* School ID Input */}
                    <div className="mb-6">
                        <label htmlFor="school-id" className="block text-green-800 font-semibold mb-2">
                            School ID:
                        </label>
                        <input
                            type="text"
                            id="school-id"
                            name="school_id"
                            placeholder="Enter your school ID"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Name Input */}
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-green-800 font-semibold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Department Input */}
                    <div className="mb-6">
                        <label htmlFor="department" className="block text-green-800 font-semibold mb-2">
                            Department:
                        </label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            placeholder="Enter your department"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-green-800 font-semibold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-green-800 font-semibold mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm_password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
