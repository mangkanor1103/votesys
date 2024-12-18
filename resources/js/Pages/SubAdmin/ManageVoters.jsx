import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { FaUsers, FaHome, FaRegFlag, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ManageVoters() {
    const [numCodes, setNumCodes] = useState('');
    const [electionId, setElectionId] = useState('');
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [generatedCodes, setGeneratedCodes] = useState([]);

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        if (storedElectionId) {
            setElectionId(storedElectionId);
            fetchCodes();
        }
    }, [electionId]);

    const fetchCodes = async () => {
        if (!electionId) return;
        try {
            const response = await axios.get(`/voters/${electionId}`);
            setGeneratedCodes(response.data.voters.map((voter) => voter.voter_code));
        } catch (error) {
            console.error('Error fetching voter codes:', error);
            setErrors(['Failed to load voter codes.']);
        }
    };

    const handleGenerateCodes = async (event) => {
        event.preventDefault();

        if (!electionId || !numCodes || numCodes <= 0) {
            setErrors(['Please ensure both Election Id and Number of Codes are valid.']);
            return;
        }

        setProcessing(true);
        try {
            await axios.post('/voters/generate', {
                election_id: electionId,
                number_of_codes: numCodes,
            });

            Swal.fire({
                title: 'Success!',
                text: 'Voter codes generated successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });

            fetchCodes();
            setNumCodes('');
            setErrors([]);
        } catch (error) {
            console.error('Error generating voter codes:', error);
            setErrors([error.response?.data?.message || 'An error occurred']);
        } finally {
            setProcessing(false);
        }
    };

    const handleClearCodes = async () => {
        if (!electionId) {
            setErrors(['Election ID is required to clear codes.']);
            return;
        }

        try {
            await axios.delete(`/voters/${electionId}/clear`);
            Swal.fire({
                title: 'Success!',
                text: 'All voter codes cleared successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
            });
            setGeneratedCodes([]);
        } catch (error) {
            console.error('Error clearing voter codes:', error);
            setErrors(['Failed to clear voter codes.']);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}>
            <Head title="Manage Voters" />
            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
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
                            <Link
                                href={route('result')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> Result
                            </Link>
                            <Link
                                href={route('history')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> History
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
                 {/* Added Mindoro State University Online Voting System text at the bottom */}
    <div className="bg-green-500 text-center text-white py-2 mt-4">
        <p className="text-sm">Mindoro State University Online Voting System</p>
    </div>
            </nav>

            {/* Main Content */}
            <div className="py-12">
                <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-2xl sm:rounded-lg border-t-4 border-green-500">
                        <div className="p-10">
                            {/* Title Section */}
                            <h3 className="text-3xl font-semibold text-green-700 mb-6">Generate Voter Codes</h3>

                            {/* Error Messages */}
                            {errors.length > 0 && (
                                <div className="text-red-500 mb-4">
                                    {errors.join(', ')}
                                </div>
                            )}

                            {/* Form Section */}
                            <form onSubmit={handleGenerateCodes}>
                                <div className="mb-8">
                                    <input
                                        id="electionId"
                                        type="hidden"
                                        value={electionId}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition duration-300"
                                        readOnly
                                    />
                                </div>

                                <div className="mb-8">
                                    <label htmlFor="numCodes" className="block text-lg text-gray-600 font-medium mb-2">
                                        Number of Voter Codes to Generate:
                                    </label>
                                    <input
                                        type="number"
                                        id="numCodes"
                                        value={numCodes}
                                        onChange={(e) => setNumCodes(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition duration-300"
                                        required
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-6 justify-center">
                                    <button
                                        type="submit"
                                        className="w-1/2 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
                                        disabled={processing}
                                    >
                                        {processing ? 'Generating...' : 'Generate Codes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearCodes}
                                        className="w-1/2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                        disabled={processing}
                                    >
                                        Clear All Codes
                                    </button>
                                </div>
                            </form>

                            {/* Display Generated Codes */}
                            {generatedCodes.length > 0 && (
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold text-green-600 mb-4">Generated Voter Codes:</h4>
                                    <ul className="space-y-2">
                                        {generatedCodes.map((code, index) => (
                                            <li key={index} className="bg-gray-50 p-3 rounded-lg shadow-lg hover:shadow-xl transition duration-200">{code}</li>
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
