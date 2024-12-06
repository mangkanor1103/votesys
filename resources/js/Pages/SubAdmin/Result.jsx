import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Result() {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        // Fetch the vote results from your backend API
        fetch('/api/votes') // Adjust the URL as needed
            .then(response => response.json())
            .then(data => setVotes(data))
            .catch(error => console.error('Error fetching vote data:', error));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Voting Results" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        {/* Title */}
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>

                        {/* Hamburger Icon */}
                        <button className="sm:hidden text-white text-2xl">
                            <FaBars />
                        </button>

                        {/* Navigation Links */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0 sm:flex">
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
                            <button className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300">
                                <FaSignOutAlt className="text-xl" /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Vote Results Display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-4">Vote Results</h2>
                <table className="min-w-full table-auto bg-white text-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Voter ID</th>
                            <th className="px-4 py-2 border-b text-left">Position</th>
                            <th className="px-4 py-2 border-b text-left">Candidate</th>
                            <th className="px-4 py-2 border-b text-left">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center">No votes recorded</td>
                            </tr>
                        ) : (
                            votes.map((vote) => (
                                <tr key={vote.id}>
                                    <td className="px-4 py-2 border-b">{vote.voter_id}</td>
                                    <td className="px-4 py-2 border-b">{vote.position_id}</td>
                                    <td className="px-4 py-2 border-b">{vote.candidate_id}</td>
                                    <td className="px-4 py-2 border-b">{vote.created_at}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
