import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Welcome() {
    const { post } = useForm();
    const [electionCode, setElectionCode] = useState('');
    const [electionId, setElectionId] = useState('');
    const [electionName, setElectionName] = useState('');
    const [electionDate, setElectionDate] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Fetch election details from localStorage
        const storedElectionCode = localStorage.getItem('election_code');
        const storedElectionId = localStorage.getItem('election_id');
        const storedElectionName = localStorage.getItem('election_name');
        const storedElectionDate = localStorage.getItem('election_date');

        setElectionCode(storedElectionCode || 'N/A');
        setElectionId(storedElectionId || 'N/A');
        setElectionName(storedElectionName || 'N/A');
        setElectionDate(storedElectionDate || 'N/A');
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">

                        {/* Hamburger Icon */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden text-white text-2xl"
                        >
                            <FaBars />
                        </button>

                        {/* Navigation Links */}
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
                                <FaChalkboardTeacher className="text-xl" /> Logout
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-8 text-gray-900">
                            <h3 className="text-2xl font-medium text-green-600 mb-6">
                                Welcome to the Voting System
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Please proceed to manage elections, voters, and candidates efficiently.
                            </p>

                            {/* Election Details (using grid for responsiveness) */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">Election Code:</p>
                                    <p className="text-gray-800 text-2xl">{electionCode}</p>
                                </div>
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">Election Name:</p>
                                    <p className="text-gray-800 text-2xl">{electionName}</p>
                                </div>
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">Election ID:</p>
                                    <p className="text-gray-800 text-2xl">{electionId}</p>
                                </div>
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">Election Date:</p>
                                    <p className="text-gray-800 text-2xl">{electionDate}</p>
                                </div>
                            </div>

                            {/* About the Mindoro State University Online Voting System */}
                            <div className="mt-8">
                                <h4 className="text-xl font-semibold text-green-600">About the Voting System</h4>
                                <p className="text-gray-600 text-lg mt-4">
                                    The Mindoro State University Online Voting System provides a secure and efficient way for students to participate in the student council elections. This system allows voters to cast their votes online, ensuring accessibility and convenience. It incorporates robust encryption methods for security and features a user-friendly interface, making the voting process seamless and reliable.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
