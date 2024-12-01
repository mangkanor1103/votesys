import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManagePositions({ positions, electionId, flash }) {
    const [positionName, setPositionName] = useState('');
    const [maxVotes, setMaxVotes] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(flash?.success || null);
    const [storedElectionId, setStoredElectionId] = useState(null);

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        setStoredElectionId(storedElectionId);
    }, []);

    const safePositions = positions || [];

    const handleCreatePosition = async (e) => {
        e.preventDefault();

        if (!electionId && !storedElectionId) {
            setError('Election ID is missing');
            return;
        }

        const finalElectionId = electionId || storedElectionId;

        try {
            const response = await axios.post(`/positions/${finalElectionId}`, {
                name: positionName,
                max_votes: maxVotes,
            });

            console.log('Position created:', response.data);

            setPositionName('');
            setMaxVotes('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating position:', error);
            setError('An error occurred while creating the position');
        }
    };

    const handleLogout = () => {
        axios.post('/logout').then(() => {
            window.location.href = '/login';
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Manage Positions" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        {/* Title */}
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>

                        {/* Navigation Links */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
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
                            <button
                                onClick={handleLogout}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaSignOutAlt className="text-xl" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-8 text-gray-900">
                            <h3 className="text-2xl font-medium text-green-600 mb-6">
                                Manage Positions
                            </h3>

                            {success && (
                                <div className="mt-4 p-4 bg-green-200 text-green-700 rounded-md">
                                    {success}
                                </div>
                            )}
                            {error && (
                                <div className="mt-4 p-4 bg-red-200 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="mt-6">
                                <form onSubmit={handleCreatePosition}>
                                    <div className="mb-4">
                                        <label htmlFor="positionName" className="block text-sm font-medium text-gray-700">
                                            Position Name
                                        </label>
                                        <input
                                            type="text"
                                            id="positionName"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={positionName}
                                            onChange={(e) => setPositionName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="maxVotes" className="block text-sm font-medium text-gray-700">
                                            Max Votes
                                        </label>
                                        <input
                                            type="number"
                                            id="maxVotes"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={maxVotes}
                                            onChange={(e) => setMaxVotes(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                                    >
                                        Add New Position
                                    </button>
                                </form>
                            </div>

                            {/* Display positions */}
                            <div className="mt-8">
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="bg-green-500 text-white">
                                            <th className="px-4 py-2">Position</th>
                                            <th className="px-4 py-2">Max Votes</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {safePositions.map((position) => (
                                            <tr key={position.id}>
                                                <td className="px-4 py-2">{position.name}</td>
                                                <td className="px-4 py-2">{position.max_votes}</td>
                                                <td className="px-4 py-2">
                                                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                                    <button className="ml-4 text-red-600 hover:text-red-800">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
