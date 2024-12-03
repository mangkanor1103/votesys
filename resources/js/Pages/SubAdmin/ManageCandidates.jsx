import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManageCandidates({ positions, electionId, flash }) {
    const [positionsData, setPositionsData] = useState([]);  // Store positions data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('');  // Remove localStorage persistence
    const [candidates, setCandidates] = useState([]);  // No localStorage persistence
    const [candidateName, setCandidateName] = useState('');  // Remove localStorage persistence
    const [candidatePlatform, setCandidatePlatform] = useState('');  // Remove localStorage persistence
    const [editingCandidate, setEditingCandidate] = useState(null); // Track candidate being edited

    // Fetch positions when the component loads
    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        const finalElectionId = electionId || storedElectionId;

        const fetchPositions = async () => {
            try {
                if (finalElectionId) {
                    const response = await axios.get(`/positions/${finalElectionId}`);
                    setPositionsData(response.data);  // Set positions to state
                }
            } catch (error) {
                console.error('Error fetching positions:', error);
                setError('An error occurred while fetching positions.');
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, [electionId]);

    // Fetch candidates based on selected position
    const fetchCandidates = async (positionId) => {
        try {
            const response = await axios.get(`/candidates/${positionId}`);
            setCandidates(response.data);  // Set candidates
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    // Handle position change
    const handlePositionChange = (e) => {
        const positionId = e.target.value;
        setSelectedPosition(positionId);
        fetchCandidates(positionId);
    };

    // Handle adding a candidate
    const handleAddCandidate = async () => {
        try {
            const newCandidate = {
                election_id: electionId || localStorage.getItem('election_id'),
                position_id: selectedPosition,
                name: candidateName,
                platform: candidatePlatform,
            };

            const response = await axios.post('/candidates', newCandidate);
            const updatedCandidates = [...candidates, response.data];
            setCandidates(updatedCandidates);
            setCandidateName('');
            setCandidatePlatform('');
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('An error occurred while adding the candidate.');
        }
    };

    // Handle candidate deletion
    const handleDeleteCandidate = async (candidateId) => {
        try {
            await axios.delete(`/candidates/${candidateId}`);
            const updatedCandidates = candidates.filter(candidate => candidate.id !== candidateId);
            setCandidates(updatedCandidates);
        } catch (error) {
            console.error('Error deleting candidate:', error);
            setError('An error occurred while deleting the candidate.');
        }
    };

    // Handle candidate editing
    const handleEditCandidate = (candidate) => {
        setEditingCandidate(candidate);
        setCandidateName(candidate.name);
        setCandidatePlatform(candidate.platform);
    };

    // Handle candidate update
    const handleUpdateCandidate = async () => {
        try {
            const updatedCandidate = {
                name: candidateName,
                platform: candidatePlatform,
            };

            const response = await axios.put(`/candidates/${editingCandidate.id}`, updatedCandidate);
            const updatedCandidates = candidates.map((candidate) =>
                candidate.id === editingCandidate.id ? response.data : candidate
            );
            setCandidates(updatedCandidates);

            setEditingCandidate(null);
            setCandidateName('');
            setCandidatePlatform('');
        } catch (error) {
            console.error('Error updating candidate:', error);
            setError('An error occurred while updating the candidate.');
        }
    };

    // Get position name from positionsData by ID
    const getPositionName = (positionId) => {
        const position = positionsData.find((pos) => pos.id === Number(positionId));
        return position ? position.name : 'Unknown Position';
    };

    const handleLogout = async () => {
        try {
            await post(route('logout')); // Log out the user
            window.location.href = '/'; // Redirect to Welcome.jsx (assuming '/' is the route for Welcome.jsx)
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Manage Positions" />
            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>
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
            {/* Navbar and other content */}

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-8 text-gray-900">
                            <h3 className="text-2xl font-medium text-green-600 mb-6">Manage Positions</h3>

                            {error && (
                                <div className="mt-4 p-4 bg-red-200 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="mt-8">
                                <h4 className="text-xl font-semibold text-green-600">Select Position</h4>
                                {loading ? (
                                    <p>Loading positions...</p>
                                ) : (
                                    <div className="mt-4">
                                        <select
                                            value={selectedPosition}
                                            onChange={handlePositionChange}
                                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                        >
                                            <option value="">Select a position</option>
                                            {positionsData.map((position) => (
                                                <option key={position.id} value={position.id}>
                                                    {position.name} - Election ID: {position.election_id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Display selected position */}
                            {selectedPosition && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600">Candidates for {getPositionName(selectedPosition)}</h4>

                                    {/* Candidate List */}
                                    <ul className="mt-4">
                                        {candidates.map((candidate) => (
                                            <li key={candidate.id} className="flex justify-between items-center">
                                                <span>{candidate.name}</span>
                                                <span>{candidate.platform}</span>
                                                <button
                                                    onClick={() => handleEditCandidate(candidate)}
                                                    className="ml-4 text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaPen />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCandidate(candidate.id)}
                                                    className="ml-2 text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Add New Candidate */}
                            {selectedPosition && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600">Add New Candidate</h4>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={candidateName}
                                            onChange={(e) => setCandidateName(e.target.value)}
                                            placeholder="Enter candidate name"
                                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                        />
                                        <textarea
                                            value={candidatePlatform}
                                            onChange={(e) => setCandidatePlatform(e.target.value)}
                                            placeholder="Enter candidate platform"
                                            className="w-full mt-4 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                        />
                                        <button
                                            onClick={handleAddCandidate}
                                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Add Candidate
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Edit candidate */}
                            {editingCandidate && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600">Edit Candidate</h4>
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            value={candidateName}
                                            onChange={(e) => setCandidateName(e.target.value)}
                                            placeholder="Enter candidate name"
                                            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                        />
                                        <textarea
                                            value={candidatePlatform}
                                            onChange={(e) => setCandidatePlatform(e.target.value)}
                                            placeholder="Enter candidate platform"
                                            className="w-full mt-4 px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                        />
                                        <button
                                            onClick={handleUpdateCandidate}
                                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Update Candidate
                                        </button>
                                        <button
                                            onClick={() => setEditingCandidate(null)}
                                            className="mt-4 ml-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
