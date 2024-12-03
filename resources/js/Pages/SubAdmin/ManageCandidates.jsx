import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManagePositions({ positions, electionId, flash }) {
    const [positionsData, setPositionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [candidateName, setCandidateName] = useState(''); // For candidate name
    const [candidatePlatform, setCandidatePlatform] = useState(''); // For candidate platform

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

    const fetchCandidates = async (positionId) => {
        try {
            const response = await axios.get(`/candidates/${positionId}`);
            setCandidates(response.data); // Assuming the response contains candidate data
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handlePositionChange = (e) => {
        const positionId = e.target.value;
        setSelectedPosition(positionId);
        fetchCandidates(positionId);
    };

    const handleAddCandidate = async () => {
        try {
            const newCandidate = {
                election_id: electionId || localStorage.getItem('election_id'),  // Ensure election ID is passed correctly
                position_id: selectedPosition,
                name: candidateName,
                platform: candidatePlatform,
            };

            // Send POST request to store the candidate
            const response = await axios.post('/candidates', newCandidate);

            // Add the new candidate to the list (assuming successful response)
            setCandidates([...candidates, response.data]);

            // Clear the input fields
            setCandidateName('');
            setCandidatePlatform('');
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('An error occurred while adding the candidate.');
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

                            {selectedPosition && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600">Selected Position</h4>
                                    <div className="mt-4">
                                        <label className="block text-lg text-green-600">Position</label>
                                        <input
                                            type="text"
                                            value={positionsData.find(pos => String(pos.id) === String(selectedPosition))?.name || ''}
                                            disabled
                                            className="w-full px-4 py-2 border border-green-300 rounded-md bg-gray-100 text-gray-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-lg text-green-600">Election ID</label>
                                        <input
                                            type="text"
                                            value={positionsData.find(pos => String(pos.id) === String(selectedPosition))?.election_id || ''}
                                            disabled
                                            className="w-full px-4 py-2 border border-green-300 rounded-md bg-gray-100 text-gray-500"
                                        />
                                    </div>

                                    {/* Candidate Name and Platform */}
                                    <div className="mt-8">
                                        <h4 className="text-xl font-semibold text-green-600">Add Candidate</h4>
                                        <div className="mt-4">
                                            <label className="block text-lg text-green-600">Candidate Name</label>
                                            <input
                                                type="text"
                                                value={candidateName}
                                                onChange={(e) => setCandidateName(e.target.value)}
                                                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-lg text-green-600">Platform</label>
                                            <textarea
                                                value={candidatePlatform}
                                                onChange={(e) => setCandidatePlatform(e.target.value)}
                                                className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                        </div>
                                        <button
                                            onClick={handleAddCandidate}
                                            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
                                        >
                                            Add Candidate
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Display Candidates */}
                            {candidates.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600">Candidates</h4>
                                    <ul className="mt-4">
                                        {candidates.map((candidate) => (
                                            <li key={candidate.id} className="py-2 border-b border-green-200">
                                                {candidate.name} - Platform: {candidate.platform}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
