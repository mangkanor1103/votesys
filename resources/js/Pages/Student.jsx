import React from 'react';
import { Head } from '@inertiajs/react';

export default function Student() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Login" />
            <h1 className="text-4xl font-bold text-white mb-6">Student Login</h1>
            <p className="text-lg text-white mb-8 text-center">
                Please enter your credentials to access your student dashboard.
            </p>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <form>
                    {/* School ID Input */}
                    <div className="mb-4">
                        <label htmlFor="school-id" className="block text-green-800 font-bold mb-2">
                            School ID:
                        </label>
                        <input
                            type="text"
                            id="school-id"
                            name="school_id"
                            placeholder="Enter your school ID"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-green-800 font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
            {/* Green Leaf Icon */}
            <div className="absolute bottom-10">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2935/2935432.png"
                    alt="Green Leaf"
                    className="w-16 h-16 opacity-60"
                />
            </div>
        </div>
    );
}
