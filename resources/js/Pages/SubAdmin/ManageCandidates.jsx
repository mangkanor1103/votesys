import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManageCandidates({ candidates, positions, electionId, flash }) {
    const [candidateName, setCandidateName] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [platform, setPlatform] = useState('');
    const [candidateImage, setCandidateImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(flash?.success || null);
    const [storedElectionId, setStoredElectionId] = useState(null);
    const [editingCandidate, setEditingCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`/elections/${electionId}/candidates`);
                const { positions, candidates } = response.data;
                setPositions(positions);
                setCandidates(candidates);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, [electionId]);

    const safeCandidates = candidates || [];
    const safePositions = positions || [];

    const handleCreateOrUpdateCandidate = async (e) => {
        e.preventDefault();

        if (!electionId && !storedElectionId) {
            setError('Election ID is missing');
            return;
        }

        if (!selectedPosition) {
            setError('Please select a position for the candidate');
            return;
        }

        if (!candidateImage && !editingCandidate) {
            setError('Please upload a candidate picture');
            return;
        }

        const finalElectionId = electionId || storedElectionId;

        const formData = new FormData();
        formData.append('name', candidateName);
        formData.append('position_id', selectedPosition);
        formData.append('platform', platform);
        if (candidateImage) {
            formData.append('image', candidateImage);
        }

        try {
            const url = editingCandidate
                ? `/candidates/${editingCandidate.id}/${finalElectionId}`
                : `/candidates/${finalElectionId}`;

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setCandidateName('');
            setSelectedPosition('');
            setPlatform('');
            setCandidateImage(null);
            setEditingCandidate(null);
            setSuccess('Candidate saved successfully');
            setError(null); // Reset error if success occurs
            window.location.reload();
        } catch (error) {
            console.error('Error saving candidate:', error);
            setError('An error occurred while saving the candidate');
            setSuccess(null); // Reset success if error occurs
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCandidateImage(file);
        }
    };

    const handleEditCandidate = (candidate) => {
        setEditingCandidate(candidate);
        setCandidateName(candidate.name);
        setSelectedPosition(candidate.position.id);
        setPlatform(candidate.platform);
    };

    const handleDeleteCandidate = async (candidateId) => {
        if (window.confirm('Are you sure you want to delete this candidate?')) {
            try {
                await axios.delete(`/candidates/${candidateId}`);
                setSuccess('Candidate deleted successfully');
                window.location.reload();
            } catch (error) {
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
                                        <label htmlFor="selectedPosition" className="block text-sm font-medium text-gray-700">
                                            Position
                                        </label>
                                        <select
                                            id="selectedPosition"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={selectedPosition}
                                            onChange={(e) => setSelectedPosition(e.target.value)}
                                            required
                                        >
                                            <option value="">-- Select Position --</option>
                                            {safePositions.map((position) => (
                                                <option key={position.id} value={position.id}>
                                                    {position.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                                            Platform
                                        </label>
                                        <input
                                            type="text"
                                            id="platform"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={platform}
                                            onChange={(e) => setPlatform(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="candidateImage" className="block text-sm font-medium text-gray-700">
                                            Candidate Picture
                                        </label>
                                        <input
                                            type="file"
                                            id="candidateImage"
                                            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        {editingCandidate ? 'Update Candidate' : 'Create Candidate'}
                                    </button>
                                </form>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-xl font-medium text-gray-900 mb-4">Candidates List</h4>
                                <table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Position</th>
                                            <th className="px-4 py-2 text-left">Platform</th>
                                            <th className="px-4 py-2 text-left">Photo</th>
                                            <th className="px-4 py-2 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {safeCandidates.map((candidate) => (
                                            <tr key={candidate.id} className="border-b">
                                                <td className="px-4 py-2">{candidate.name}</td>
                                                <td className="px-4 py-2">{candidate.position.name}</td>
                                                <td className="px-4 py-2">{candidate.platform}</td>
                                                <td className="px-4 py-2">
                                                    {candidate.image && (
                                                        <img
                                                            src={candidate.image}
                                                            alt="Candidate"
                                                            className="w-12 h-12 object-cover rounded-full"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => handleEditCandidate(candidate)}
                                                        className="mr-2 text-indigo-600"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCandidate(candidate.id)}
                                                        className="text-red-600"
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
