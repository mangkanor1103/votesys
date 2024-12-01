import { Head, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react'; // Inertia Link component
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa'; // Icons
import axios from 'axios'; // Import axios for making API requests

export default function ManagePositions() {
    const [positions, setPositions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [positionName, setPositionName] = useState('');
    const [maxVotes, setMaxVotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const electionId = localStorage.getItem('election_id'); // Get election_id from localStorage

    // Fetch positions from the server when the component is mounted
    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await axios.get(`/api/positions/${electionId}`);
                setPositions(response.data.positions);
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        };

        fetchPositions();
    }, [electionId]);

    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout')); // Send POST request to the logout route
    };

    const handleAddPosition = async () => {
        try {
            const response = await axios.post(`/api/positions`, {
                election_id: electionId,
                position_name: positionName,
                max_votes: maxVotes,
            });

            if (response.data.success) {
                setPositions([...positions, response.data.position]);
                setPositionName('');
                setMaxVotes('');
                setShowModal(false); // Close the modal after submission
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('An error occurred while adding the position.');
        }
    };

    const handleDeletePosition = async (positionId) => {
        try {
            const response = await axios.delete(`/api/positions/${positionId}`);

            if (response.data.success) {
                setPositions(positions.filter((position) => position.id !== positionId));
            }
        } catch (error) {
            setErrorMessage('An error occurred while deleting the position.');
        }
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

                            {/* Logout Button */}
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
                            <p className="text-gray-600 text-lg">
                                This page allows the sub-admin to manage election positions, create new ones, and oversee the voting process for each position.
                            </p>

                            {/* Add New Position Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
                                >
                                    Add New Position
                                </button>
                            </div>

                            {/* Modal for Adding New Position */}
                            {showModal && (
                                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl">
                                        <h3 className="text-xl font-medium text-green-600 mb-4">Add Position</h3>
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                                            placeholder="Position Name"
                                            value={positionName}
                                            onChange={(e) => setPositionName(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                                            placeholder="Max Votes"
                                            value={maxVotes}
                                            onChange={(e) => setMaxVotes(e.target.value)}
                                        />
                                        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                                        <div className="flex justify-end gap-4 mt-4">
                                            <button
                                                onClick={() => setShowModal(false)}
                                                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleAddPosition}
                                                className="bg-green-600 text-white px-6 py-3 rounded-lg"
                                            >
                                                Add Position
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Display list of positions */}
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
                                        {positions.map((position) => (
                                            <tr key={position.id}>
                                                <td className="px-4 py-2">{position.position_name}</td>
                                                <td className="px-4 py-2">{position.max_votes}</td>
                                                <td className="px-4 py-2">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-4">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePosition(position.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Delete
                                                    </button>
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
