import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaChalkboardTeacher, FaHome, FaRegFlag, FaUsers, FaSignOutAlt } from 'react-icons/fa'; // Import necessary icons
import { Link } from '@inertiajs/react'; // Add the Link import

export default function ManageCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [candidateName, setCandidateName] = useState('');
    const [candidatePosition, setCandidatePosition] = useState('');

    // Function to fetch candidates from the backend
    const fetchCandidates = async () => {
        const response = await axios.get('/api/candidates'); // Adjust URL as needed for your backend
        setCandidates(response.data);
    };

    // Function to handle candidate submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/candidates', {
            name: candidateName,
            position: candidatePosition
        });
        if (response.data.success) {
            // Update state with the new candidate
            setCandidates([...candidates, response.data.candidate]);
            setCandidateName('');
            setCandidatePosition('');
        } else {
            console.error('Error adding candidate');
        }
    };

    // Function to delete a candidate
    const handleDelete = async (id) => {
        const response = await axios.delete(`/api/candidates/${id}`);
        if (response.data.success) {
            setCandidates(candidates.filter(candidate => candidate.id !== id));
        } else {
            console.error('Error deleting candidate');
        }
    };

    // Fetch candidates on component mount
    React.useEffect(() => {
        fetchCandidates();
    }, []);

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
                            <button className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300">
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
                            <p className="text-gray-600 text-lg">
                                This page allows the sub-admin to manage candidates for the election, including adding, editing, and removing candidates.
                            </p>

                            {/* Candidate Form */}
                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="mb-4">
                                    <label htmlFor="candidateName" className="block text-gray-700">Candidate Name</label>
                                    <input
                                        type="text"
                                        id="candidateName"
                                        value={candidateName}
                                        onChange={(e) => setCandidateName(e.target.value)}
                                        className="w-full p-3 mt-2 border rounded-md"
                                        placeholder="Enter candidate name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="candidatePosition" className="block text-gray-700">Candidate Position</label>
                                    <input
                                        type="text"
                                        id="candidatePosition"
                                        value={candidatePosition}
                                        onChange={(e) => setCandidatePosition(e.target.value)}
                                        className="w-full p-3 mt-2 border rounded-md"
                                        placeholder="Enter position"
                                        required
                                    />
                                </div>
                                <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
                                    Add Candidate
                                </button>
                            </form>

                            {/* Candidate List */}
                            <div>
                                <h4 className="text-xl font-semibold text-gray-700">Candidate List</h4>
                                <ul className="mt-4">
                                    {candidates.map((candidate) => (
                                        <li key={candidate.id} className="flex justify-between items-center mb-4">
                                            <div className="text-gray-800">
                                                <strong>{candidate.name}</strong> - {candidate.position}
                                            </div>
                                            <button
                                                onClick={() => handleDelete(candidate.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
