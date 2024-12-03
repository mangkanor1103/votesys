import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManageCandidates({ electionId, flash }) {
    const [candidateName, setCandidateName] = useState('');
    const [positionId, setPositionId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(flash?.success || null);
    const [storedElectionId, setStoredElectionId] = useState(null);
    const [candidatesData, setCandidatesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [positionsData, setPositionsData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editCandidateId, setEditCandidateId] = useState(null);

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        setStoredElectionId(storedElectionId);

        const fetchData = async () => {
            try {
                const finalElectionId = electionId || storedElectionId;
                if (finalElectionId) {
                    // Fetch positions for the select dropdown
                    const positionsResponse = await axios.get(`/positions/${finalElectionId}`);
                    setPositionsData(positionsResponse.data);

                    // Fetch candidates for the election
                    const candidatesResponse = await axios.get(`/candidates/${finalElectionId}`);
                    setCandidatesData(candidatesResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [electionId, storedElectionId]);

    const handleCreateOrUpdateCandidate = async (e) => {
        e.preventDefault();

        if (!electionId && !storedElectionId) {
            setError('Election ID is missing');
            return;
        }

        const finalElectionId = electionId || storedElectionId;

        try {
            let response;
            if (isEditing) {
                // Update the candidate
                response = await axios.put(`/candidates/${finalElectionId}/${editCandidateId}`, {
                    name: candidateName,
                    position_id: positionId,
                });
                setSuccess('Candidate updated successfully');
                setIsEditing(false);
                setEditCandidateId(null);
            } else {
                // Create a new candidate
                response = await axios.post(`/candidates/${finalElectionId}`, {
                    name: candidateName,
                    position_id: positionId,
                });
                setSuccess('Candidate created successfully');
            }

            // Reset form fields
            setCandidateName('');
            setPositionId('');
            setCandidatesData((prev) =>
                isEditing
                    ? prev.map((candidate) =>
                          candidate.id === editCandidateId
                              ? { ...candidate, name: candidateName, position_id: positionId }
                              : candidate
                      )
                    : [...prev, { id: response.data.id, name: candidateName, position_id: positionId }]
            );
        } catch (error) {
            console.error('Error creating or updating candidate:', error);
            setError('An error occurred while creating or updating the candidate');
        }
    };

    const handleEdit = (candidate) => {
        setIsEditing(true);
        setEditCandidateId(candidate.id);
        setCandidateName(candidate.name);
        setPositionId(candidate.position_id);
    };

    const handleDelete = async (candidateId) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            try {
                const finalElectionId = electionId || storedElectionId;
                await axios.delete(`/candidates/${finalElectionId}/${candidateId}`);
                setSuccess('Candidate deleted successfully');
                setCandidatesData((prev) => prev.filter((candidate) => candidate.id !== candidateId));
            } catch (error) {
                console.error('Error deleting candidate:', error);
                setError('An error occurred while deleting the candidate');
            }
        }
    };

    const handleLogout = () => {
        axios.post('/logout').then(() => {
            window.location.href = '/login';
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Manage Candidates" />

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
                                Manage Candidates
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
                                <form onSubmit={handleCreateOrUpdateCandidate}>
                                    <div className="mb-4">
                                        <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
                                            Candidate Name
                                        </label>
                                        <input
                                            type="text"
                                            id="candidateName"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={candidateName}
                                            onChange={(e) => setCandidateName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="positionId" className="block text-sm font-medium text-gray-700">
                                            Position
                                        </label>
                                        <select
                                            id="positionId"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={positionId}
                                            onChange={(e) => setPositionId(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Position</option>
                                            {positionsData.map((position) => (
                                                <option key={position.id} value={position.id}>
                                                    {position.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-green-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
                                    >
                                        {isEditing ? 'Update Candidate' : 'Create Candidate'}
                                    </button>
                                </form>
                            </div>

                            {/* Candidates List */}
                            <div className="mt-8">
                                <h4 className="text-xl font-medium text-gray-800">Candidates List</h4>
                                <ul className="space-y-4 mt-4">
                                    {loading ? (
                                        <li>Loading candidates...</li>
                                    ) : (
                                        candidatesData.map((candidate) => (
                                            <li key={candidate.id} className="flex justify-between items-center py-3 border-b">
                                                <div>
                                                    <h5 className="text-lg font-medium">{candidate.name}</h5>
                                                    <p className="text-gray-500">Position: {candidate.position.name}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(candidate)}
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(candidate.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
