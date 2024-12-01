import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaUsers, FaHome, FaRegFlag, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import axios from 'axios'; // Make sure axios is imported

export default function ManageVoters() {
    const [numCodes, setNumCodes] = useState('');
    const [electionId, setElectionId] = useState(''); // State for election_id
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);

    const handleGenerateCodes = async (event) => {
        event.preventDefault();

        // Validation
        if (!electionId) {
            setErrors(['Please enter a valid election ID.']);
            return;
        }

        if (!numCodes || numCodes <= 0) {
            setErrors(['Please enter a valid number of codes.']);
            return;
        }

        setProcessing(true);
        try {
            const response = await axios.post('/voters/generate', {
                election_id: electionId, // Passing election_id
                number_of_codes: numCodes,
            });

            alert('Voter codes generated successfully!');
            setNumCodes('');
            setElectionId(''); // Clear election_id after submission
            setErrors([]);
            console.log(response.data);
        } catch (error) {
            console.error('Error generating voter codes:', error);
            alert('Failed to generate voter codes. Please try again.');
            setErrors([error.response?.data?.message || 'An error occurred']);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Manage Voters" />
            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
                            <Link href={route('subdashboard')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700">
                                <FaHome className="text-xl" /> Home
                            </Link>
                            <Link href={route('manage-positions')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700">
                                <FaRegFlag className="text-xl" /> Manage Positions
                            </Link>
                            <Link href={route('manage-voters')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700">
                                <FaUsers className="text-xl" /> Manage Voters
                            </Link>
                            <Link href={route('manage-candidates')} className="text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700">
                                <FaChalkboardTeacher className="text-xl" /> Manage Candidates
                            </Link>
                            <button className="text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-green-700">
                                <FaSignOutAlt className="text-xl" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-8">
                            <h3 className="text-2xl font-medium text-green-600 mb-6">Generate Voter Codes</h3>
                            <form onSubmit={handleGenerateCodes}>
                                <div className="mb-4">
                                    <label htmlFor="electionId" className="block text-lg text-gray-600">
                                        Election ID:
                                    </label>
                                    <input
                                        type="text"
                                        id="electionId"
                                        value={electionId}
                                        onChange={(e) => setElectionId(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="numCodes" className="block text-lg text-gray-600">
                                        Number of Voter Codes to Generate:
                                    </label>
                                    <input
                                        type="number"
                                        id="numCodes"
                                        value={numCodes}
                                        onChange={(e) => setNumCodes(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                                        required
                                    />
                                    {errors.length > 0 && <div className="text-red-500 mt-2">{errors.join(', ')}</div>}
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
                                    disabled={processing}
                                >
                                    {processing ? 'Generating...' : 'Generate Codes'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
