import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

export default function ManageCandidates({ positions, electionId, flash }) {
    const [positionsData, setPositionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [candidateName, setCandidateName] = useState('');
    const [candidatePlatform, setCandidatePlatform] = useState('');
    const [candidatePhoto, setCandidatePhoto] = useState(null);
    const [editingCandidate, setEditingCandidate] = useState(null);

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        const finalElectionId = electionId || storedElectionId;

        const fetchPositions = async () => {
            try {
                if (finalElectionId) {
                    const response = await axios.get(`/positions/${finalElectionId}`);
                    setPositionsData(response.data);
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

    const fetchCandidates = (positionId) => {
        // Check if the candidates are available in localStorage for the selected position
        const storedCandidates = localStorage.getItem(`candidates_${positionId}`);
        if (storedCandidates) {
            setCandidates(JSON.parse(storedCandidates));
        } else {
            axios.get(`/candidates/${positionId}`).then((response) => {
                setCandidates(response.data);
                localStorage.setItem(`candidates_${positionId}`, JSON.stringify(response.data));  // Store in localStorage
            }).catch((error) => {
                console.error('Error fetching candidates:', error);
            });
        }
    };

    const handlePositionChange = (e) => {
        const positionId = e.target.value;
        setSelectedPosition(positionId);
        fetchCandidates(positionId);
    };

    const handleAddCandidate = async () => {
        try {
            const formData = new FormData();
            formData.append('election_id', electionId || localStorage.getItem('election_id'));
            formData.append('position_id', selectedPosition);
            formData.append('name', candidateName);
            formData.append('platform', candidatePlatform);
            if (candidatePhoto) {
                formData.append('photo', candidatePhoto);
            }

            const response = await axios.post('/candidates', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update candidates both in state and localStorage
            const updatedCandidates = [...candidates, response.data];
            setCandidates(updatedCandidates);
            localStorage.setItem(`candidates_${selectedPosition}`, JSON.stringify(updatedCandidates));

            setCandidateName('');
            setCandidatePlatform('');
            setCandidatePhoto(null);
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('An error occurred while adding the candidate.');
        }
    };

    const handleDeleteCandidate = async (candidateId) => {
        try {
            await axios.delete(`/candidates/${candidateId}`);

            // Update candidates both in state and localStorage
            const updatedCandidates = candidates.filter(candidate => candidate.id !== candidateId);
            setCandidates(updatedCandidates);
            localStorage.setItem(`candidates_${selectedPosition}`, JSON.stringify(updatedCandidates));
        } catch (error) {
            console.error('Error deleting candidate:', error);
            setError('An error occurred while deleting the candidate.');
        }
    };

    const handleEditCandidate = (candidate) => {
        setEditingCandidate(candidate);
        setCandidateName(candidate.name);
        setCandidatePlatform(candidate.platform);
        setCandidatePhoto(null);
    };

    const handleUpdateCandidate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', candidateName);
            formData.append('platform', candidatePlatform);
            if (candidatePhoto) {
                formData.append('photo', candidatePhoto);
            }

            const response = await axios.put(`/candidates/${editingCandidate.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedCandidates = candidates.map((candidate) =>
                candidate.id === editingCandidate.id ? response.data : candidate
            );
            setCandidates(updatedCandidates);
            localStorage.setItem(`candidates_${selectedPosition}`, JSON.stringify(updatedCandidates));

            setEditingCandidate(null);
            setCandidateName('');
            setCandidatePlatform('');
            setCandidatePhoto(null);
        } catch (error) {
            console.error('Error updating candidate:', error);
            setError('An error occurred while updating the candidate.');
        }
    };

    const getPositionName = (positionId) => {
        const position = positionsData.find((pos) => pos.id === Number(positionId));
        return position ? position.name : 'Unknown Position';
    };

    const handleLogout = async () => {
        try {
            await post(route('logout'));
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Manage Positions" />
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
                            <Link href={route('subdashboard')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg">
                                <FaHome className="text-xl" /> Home
                            </Link>
                            <Link href={route('manage-positions')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg">
                                <FaRegFlag className="text-xl" /> Manage Positions
                            </Link>
                            <Link href={route('manage-voters')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg">
                                <FaUsers className="text-xl" /> Manage Voters
                            </Link>
                            <Link href={route('manage-candidates')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg">
                                <FaChalkboardTeacher className="text-xl" /> Manage Candidates
                            </Link>
                            <Link
                                href={route('result')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> Result
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
            </nav>
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
                                <>
                                    <div className="mt-8">
                                        <h4 className="text-xl font-semibold text-green-600">Candidates</h4>
                                        <table className="mt-4 table-auto w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 text-left">
                                                    <th className="px-4 py-2">Name</th>
                                                    <th className="px-4 py-2">Platform</th>
                                                    <th className="px-4 py-2">Photo</th>
                                                    <th className="px-4 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidates.map((candidate) => (
                                                    <tr key={candidate.id}>
                                                        <td className="border px-4 py-2">{candidate.name}</td>
                                                        <td className="border px-4 py-2">{candidate.platform}</td>
                                                        <td className="border px-4 py-2">
                                                            <img
                                                                src={`/storage/${candidate.photo}`}
                                                                alt="Candidate Photo"
                                                                className="w-16 h-16 rounded-full object-cover"
                                                            />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <button
                                                                onClick={() => handleEditCandidate(candidate)}
                                                                className="text-green-600 hover:text-green-800"
                                                            >
                                                                <FaPen />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCandidate(candidate.id)}
                                                                className="ml-4 text-red-600 hover:text-red-800"
                                                            >
                                                                <FaTrashAlt />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-8">
                                        <h4 className="text-xl font-semibold text-green-600">Add Candidate</h4>
                                        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700">Candidate Name</label>
                                                <input
                                                    type="text"
                                                    value={candidateName}
                                                    onChange={(e) => setCandidateName(e.target.value)}
                                                    className="mt-1 px-4 py-2 w-full border border-green-300 rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700">Platform</label>
                                                <textarea
                                                    value={candidatePlatform}
                                                    onChange={(e) => setCandidatePlatform(e.target.value)}
                                                    className="mt-1 px-4 py-2 w-full border border-green-300 rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700">Candidate Photo</label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => setCandidatePhoto(e.target.files[0])}
                                                    className="mt-1 px-4 py-2 w-full border border-green-300 rounded-md"
                                                />
                                            </div>
                                            <button
                                                onClick={handleAddCandidate}
                                                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-800"
                                            >
                                                Add Candidate
                                            </button>
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
