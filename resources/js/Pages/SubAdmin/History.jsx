import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars, FaTools } from 'react-icons/fa';

export default function Welcome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}>
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden text-white text-2xl"
                        >
                            <FaBars />
                        </button>

                        <div
                            className={`flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0 sm:flex ${isMenuOpen ? 'block' : 'hidden'}`}
                        >
                            <Link
                                href={route('subdashboard')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaHome className="text-xl" /> Home
                            </Link>
                            <Link
                                href={route('manage-positions')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaRegFlag className="text-xl" /> Manage Positions
                            </Link>
                            <Link
                                href={route('manage-voters')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaUsers className="text-xl" /> Manage Voters
                            </Link>
                            <Link
                                href={route('manage-candidates')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> Manage Candidates
                            </Link>
                            <Link
                                href={route('result')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> Result
                            </Link>
                            <Link
                                href={route('history')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> History
                            </Link>
                            <Link
                                href={route('welcome')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaSignOutAlt className="text-xl" /> Logout
                            </Link>
                        </div>
                    </div>
                </div>
                 {/* Added Mindoro State University Online Voting System text at the bottom */}
    <div className="bg-green-500 text-center text-white py-2 mt-4">
        <p className="text-sm">Mindoro State University Online Voting System</p>
    </div>
            </nav>

            {/* Main Content */}
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-8 text-gray-900">
                            <h3 className="text-2xl font-medium text-green-600 mb-6">
                                History Function
                            </h3>
                            <div className="mt-6 space-y-4">
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">History Function:</p>
                                    <p className="text-gray-800 text-2xl">Under Maintenance</p>
                                </div>

                                {/* Maintenance Message */}
                                <div className="space-y-4 mt-6 animate-pulse">
                                    <div className="flex justify-center items-center gap-4">
                                        <FaTools className="text-5xl text-red-600 animate-spin" />
                                        <p className="text-center text-2xl text-red-600 animate-bounce">
                                            The history function is currently under maintenance due to lack of time. Please check back later.
                                        </p>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <div className="text-center">
                                            <p className="text-lg text-gray-500">We are working hard to bring it back online!</p>
                                            <div className="animate-ping mt-2">
                                                <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
