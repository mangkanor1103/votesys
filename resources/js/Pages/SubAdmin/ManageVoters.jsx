import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { FaUsers, FaHome, FaRegFlag, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function ManageVoters() {
    const [numCodes, setNumCodes] = useState('');
    const [electionId, setElectionId] = useState(''); // State for election ID
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [generatedCodes, setGeneratedCodes] = useState([]);

    // Automatically populate election ID from localStorage
    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        if (storedElectionId) {
            setElectionId(storedElectionId);
            fetchCodes(); // Fetch voter codes on component mount
        }
    }, [electionId]); // Dependency ensures it updates when electionId changes
    
    // Fetch generated voter codes for the current election
    const fetchCodes = async () => {
        if (!electionId) return; // Ensure election ID is set
        try {
            const response = await axios.get(`/voters/${electionId}`);
            setGeneratedCodes(response.data.voters.map((voter) => voter.voter_code));
        } catch (error) {
            console.error('Error fetching voter codes:', error);
            setErrors(['Failed to load voter codes.']);
        }
    };

    // Handle generating new voter codes
    const handleGenerateCodes = async (event) => {
        event.preventDefault();
    
        if (!electionId || !numCodes || numCodes <= 0) {
            setErrors(['Please ensure both Election ID and Number of Codes are valid.']);
            return;
        }
    
        setProcessing(true);
        try {
            await axios.post('/voters/generate', {
                election_id: electionId,
                number_of_codes: numCodes,
            });
    
            alert('Voter codes generated successfully!');
            fetchCodes(); // Fetch and update voter codes
            setNumCodes('');
            setErrors([]);
        } catch (error) {
            console.error('Error generating voter codes:', error);
            setErrors([error.response?.data?.message || 'An error occurred']);
        } finally {
            setProcessing(false);
        }
    };

    // Handle clearing all voter codes
    const handleClearCodes = async () => {
        if (!electionId) {
            setErrors(['Election ID is required to clear codes.']);
            return;
        }

        try {
            await axios.delete(`/voters/${electionId}/clear`);
            alert('All voter codes cleared successfully!');
            setGeneratedCodes([]); // Clear state
        } catch (error) {
            console.error('Error clearing voter codes:', error);
            setErrors(['Failed to clear voter codes.']);
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
                                        readOnly // Election ID is read-only
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
                                {/* Flex container for buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800"
                                        disabled={processing}
                                    >
                                        {processing ? 'Generating...' : 'Generate Codes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearCodes}
                                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        disabled={processing} // Disable the button while generating
                                    >
                                        Clear All Codes
                                    </button>
                                </div>
                            </form>

                            {/* Display Generated Codes */}
                            {generatedCodes.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold text-green-600">Generated Voter Codes:</h4>
                                    <ul className="mt-2 list-disc pl-6">
                                        {generatedCodes.map((code, index) => (
                                            <li key={index} className="text-gray-700">{code}</li>
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
