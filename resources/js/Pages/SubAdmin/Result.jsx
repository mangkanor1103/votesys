import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Result() {
    const [votes, setVotes] = useState([]);
    const [positions, setPositions] = useState([]);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await fetch('/api/votes');
                const data = await response.json();
                console.log(data); // Add this line to check if data is received
                setVotes(data.votes);
            } catch (error) {
                console.error("Error fetching votes:", error);
            }
        };

        const fetchPositions = async () => {
            try {
                const response = await fetch('/api/positions');
                const data = await response.json();
                setPositions(data.positions);
            } catch (error) {
                console.error("Error fetching positions:", error);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch('/api/candidates');
                const data = await response.json();
                setCandidates(data.candidates);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchVotes();
        fetchPositions();
        fetchCandidates();
    }, []);

    const getPositionName = (positionId) => {
        const position = positions.find((p) => p.id === positionId);
        return position ? position.name : 'Unknown Position';
    };

    const getCandidateName = (candidateId) => {
        const candidate = candidates.find((c) => c.id === candidateId);
        return candidate ? candidate.name : 'Unknown Candidate';
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Voting Results" />

            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>
                        <button className="sm:hidden text-white text-2xl">
                            <FaBars />
                        </button>

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-4">Vote Results</h2>
                <table className="min-w-full table-auto bg-white text-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Voter ID</th>
                            <th className="px-4 py-2 border-b text-left">Position</th>
                            <th className="px-4 py-2 border-b text-left">Candidate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center">No votes recorded</td>
                            </tr>
                        ) : (
                            votes.map((vote) => (
                                <tr key={vote.id}>
                                    <td className="px-4 py-2 border-b">{vote.voter_id}</td>
                                    <td className="px-4 py-2 border-b">{vote.position.name}</td>
                                    <td className="px-4 py-2 border-b">{vote.candidate.name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
