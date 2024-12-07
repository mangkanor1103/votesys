import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Welcome() {
    const { post } = useForm();
    const [electionId, setElectionId] = useState('');
    const [votes, setVotes] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Fetch election details from localStorage
        const storedElectionId = localStorage.getItem('election_id');
        setElectionId(storedElectionId || 'N/A');

        // Fetch the votes for the election
        if (storedElectionId) {
            fetchVotes(storedElectionId);
        }
    }, []);

    const fetchVotes = async (electionId) => {
        try {
            const response = await fetch(`/api/votes/${electionId}`);  // Adjust your API endpoint accordingly
            const data = await response.json();

            // Ensure the response contains votes data
            if (data && data.votes) {
                setVotes(data.votes);
            } else {
                console.error("Votes data not available or malformed.");
            }
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await post(route('logout')); // Log out the user
            window.location.href = '/'; // Redirect to Welcome.jsx (assuming '/' is the route for Welcome.jsx)
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Group votes by position_id and count occurrences of each candidate_id
    const groupedVotes = votes.reduce((acc, vote) => {
        if (!acc[vote.position_id]) {
            acc[vote.position_id] = {};
        }

        // Count the votes for each candidate
        if (!acc[vote.position_id][vote.candidate_id]) {
            acc[vote.position_id][vote.candidate_id] = 0;
        }
        acc[vote.position_id][vote.candidate_id] += 1;

        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        {/* Title */}
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>

                        {/* Hamburger Icon */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden text-white text-2xl"
                        >
                            <FaBars />
                        </button>

                        {/* Navigation Links */}
                        <div
                            className={`flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0 sm:flex ${isMenuOpen ? 'block' : 'hidden'}`}
                        >
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
                            <Link
                                href={route('result')}
                                className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                            >
                                <FaChalkboardTeacher className="text-xl" /> Result
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
                                Results
                            </h3>
                            <div className="mt-6 space-y-4">
                                <div className="text-green-700 text-lg font-semibold">
                                    <p className="text-xl font-semibold">Election ID:</p>
                                    <p className="text-gray-800 text-2xl">{electionId}</p>
                                </div>
                                <div className="space-y-4 mt-6">
                                    {Object.keys(groupedVotes).length > 0 ? (
                                        Object.keys(groupedVotes).map((positionId) => {
                                            const candidateVotes = groupedVotes[positionId];
                                            const maxVotes = Math.max(...Object.values(candidateVotes));
                                            const winningCandidate = Object.keys(candidateVotes).find(
                                                (candidateId) => candidateVotes[candidateId] === maxVotes
                                            );

                                            return (
                                                <div key={positionId} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                                    <h4 className="text-xl font-semibold text-green-700">
                                                        Position ID: {positionId}
                                                    </h4>
                                                    <table className="min-w-full mt-4">
                                                        <thead>
                                                            <tr>
                                                                <th className="border px-4 py-2 text-left">Candidate ID</th>
                                                                <th className="border px-4 py-2 text-left">Vote Count</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(candidateVotes).map((candidateId) => (
                                                                <tr key={candidateId}>
                                                                    <td className="border px-4 py-2">{candidateId}</td>
                                                                    <td className="border px-4 py-2">{candidateVotes[candidateId]}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <p className="mt-4 text-lg font-semibold text-green-800">
                                                        Winning Candidate ID: {winningCandidate} with {maxVotes} votes
                                                    </p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>No votes found for this election.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
