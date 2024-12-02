import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManagePositions({ positions, electionId, flash }) {
    const [positionsData, setPositionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');  // Success message state
    const [selectedPosition, setSelectedPosition] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [newCandidateName, setNewCandidateName] = useState('');
    const [newCandidateDetails, setNewCandidateDetails] = useState('');

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        const finalElectionId = electionId || storedElectionId;

        const fetchPositions = async () => {
            try {
                if (finalElectionId) {
                    const response = await axios.get(`/positions/${finalElectionId}`);
                    setPositionsData(response.data); // Assuming response.data contains the positions
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

    const handlePositionChange = (e) => {
        setSelectedPosition(e.target.value);
        // Fetch candidates for the selected position
        fetchCandidates(e.target.value);
    };

    const fetchCandidates = async (positionId) => {
        try {
            const response = await axios.get(`/positions/${positionId}/candidates`);
            setCandidates(response.data); // Set candidates to the state
        } catch (error) {
            console.error("Error fetching candidates:", error);
            setError('Failed to load candidates.');
        }
    };

    const handleCandidateSubmit = async (e) => {
        e.preventDefault();  // Prevent the page from reloading
        if (!newCandidateName || !newCandidateDetails) {
            setError('Both name and details are required');
            return;
        }

        try {
            const response = await axios.post(`/positions/${selectedPosition}/candidates`, {
                name: newCandidateName,
                details: newCandidateDetails,
            });

            setSuccess('Candidate added successfully!');
            setNewCandidateName('');
            setNewCandidateDetails('');
            fetchCandidates(selectedPosition); // Refresh candidates list after adding
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('Failed to add candidate');
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
                            <button
                                onClick={() => axios.post('/logout').then(() => window.location.href = '/login')}
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
                            <h3 className="text-2xl font-medium text-green-600 mb-6">Manage Candidates</h3>

                            {error && (
                                <div className="mt-4 p-4 bg-red-200 text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mt-4 p-4 bg-green-200 text-green-700 rounded-md">
                                    {success}
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
                                                    {position.name} (Max Votes: {position.max_votes}) - Election ID: {position.election_id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {selectedPosition && (
                                <>
                                    <div className="mt-8">
                                        <h4 className="text-xl font-semibold text-green-600">Candidates for Selected Position</h4>
                                        <ul className="mt-4">
                                            {candidates.length > 0 ? (
                                                candidates.map((candidate) => (
                                                    <li key={candidate.id} className="text-lg text-gray-700">{candidate.name} - {candidate.details}</li>
                                                ))
                                            ) : (
                                                <p>No candidates available for this position.</p>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="mt-8">
                                        <h4 className="text-xl font-semibold text-green-600">Add New Candidate</h4>
                                        <form onSubmit={handleCandidateSubmit} className="mt-4">
                                            <div>
                                                <label className="block text-gray-700" htmlFor="candidate-name">
                                                    Candidate Name
                                                </label>
                                                <input
                                                    id="candidate-name"
                                                    type="text"
                                                    value={newCandidateName}
                                                    onChange={(e) => setNewCandidateName(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-gray-700" htmlFor="candidate-details">
                                                    Candidate Details
                                                </label>
                                                <textarea
                                                    id="candidate-details"
                                                    value={newCandidateDetails}
                                                    onChange={(e) => setNewCandidateDetails(e.target.value)}
                                                    required
                                                    className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                                    Add Candidate
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
