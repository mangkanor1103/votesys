import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Welcome() {
    const { post } = useForm();
    const [electionId, setElectionId] = useState('');
    const [electionName, setElectionName] = useState('');
    const [votes, setVotes] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [chartData, setChartData] = useState({}); // For chart data

    useEffect(() => {
        const storedElectionId = localStorage.getItem('election_id');
        const storedElectionName = localStorage.getItem('election_name');
        setElectionId(storedElectionId || 'N/A');
        setElectionName(storedElectionName || 'N/A');

        if (storedElectionId) {
            fetchVotes(storedElectionId);
        }
    }, []);

    const fetchVotes = async (electionId) => {
        try {
            const response = await fetch(`/api/votes/${electionId}`);
            const data = await response.json();

            if (data && data.votes) {
                setVotes(data.votes);
                formatChartData(data.votes); // Process chart data
            } else {
                console.error("Votes data not available or malformed.");
            }
        } catch (error) {
            console.error("Error fetching votes:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await post(route('logout'));
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const groupedVotes = votes.reduce((acc, vote) => {
        if (!acc[vote.position_id]) {
            acc[vote.position_id] = {};
        }

        if (!acc[vote.position_id][vote.candidate_id]) {
            acc[vote.position_id][vote.candidate_id] = 0;
        }
        acc[vote.position_id][vote.candidate_id] += 1;

        return acc;
    }, {});

    const positionMap = votes.reduce((acc, vote) => {
        const position = vote.position_id && vote.position.name;
        if (position) {
            acc[vote.position_id] = position;
        }
        return acc;
    }, {});

    // Format the chart data
    const formatChartData = (votes) => {
        const data = {
            labels: [], // Candidate names
            datasets: [] // Votes count
        };

        // Assuming you want to show one chart per position
        const positionVotes = {};

        votes.forEach((vote) => {
            const position = positionMap[vote.position_id];
            const candidateName = vote.candidate.name;

            if (!positionVotes[position]) {
                positionVotes[position] = {
                    labels: [],
                    votes: []
                };
            }

            if (!positionVotes[position].labels.includes(candidateName)) {
                positionVotes[position].labels.push(candidateName);
                positionVotes[position].votes.push(1); // Initialize vote count
            } else {
                const index = positionVotes[position].labels.indexOf(candidateName);
                positionVotes[position].votes[index] += 1; // Increment vote count
            }
        });

        // Create a separate chart for each position
        const chartDataArr = Object.keys(positionVotes).map((position) => ({
            positionName: position,
            data: {
                labels: positionVotes[position].labels,
                datasets: [{
                    label: position,
                    data: positionVotes[position].votes,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
        }));

        setChartData(chartDataArr); // Set chart data for each position
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Welcome" />

            {/* Navbar */}
            <nav className="bg-transparent text-white shadow-lg border-b-4 border-green-300 transition duration-500 ease-in-out transform hover:scale-105">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <h2 className="text-3xl font-extrabold text-green-100 tracking-wide">
                            Mindoro State University Voting System
                        </h2>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="sm:hidden text-white text-2xl"
                        >
                            <FaBars />
                        </button>

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
                                    <p className="text-xl font-semibold">Election Name:</p>
                                    <p className="text-gray-800 text-2xl">{electionName}</p>
                                </div>

                                {/* Chart Section */}
                                <div className="mt-6">
                                    {chartData.length > 0 && chartData.map((positionData, index) => (
                                        <div key={index} className="mt-6">
                                            <h4 className="text-lg font-semibold text-green-700">
                                                {positionData.positionName}
                                            </h4>
                                            <Bar data={positionData.data} options={{
                                                responsive: true,
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: `${positionData.positionName} Election Results`,
                                                    },
                                                },
                                            }} />
                                        </div>
                                    ))}
                                </div>

                                {/* Display results table */}
                                <div className="space-y-4 mt-6">
                                    {Object.keys(groupedVotes).length > 0 ? (
                                        Object.keys(groupedVotes).map((positionId) => {
                                            const candidateVotes = groupedVotes[positionId];
                                            const maxVotes = Math.max(...Object.values(candidateVotes));
                                            const winningCandidateId = Object.keys(candidateVotes).find(
                                                (candidateId) => candidateVotes[candidateId] === maxVotes
                                            );
                                            const winningCandidate = votes.find(
                                                (vote) => vote.candidate_id == winningCandidateId
                                            );

                                            return (
                                                <div key={positionId} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                                    <h4 className="text-xl font-semibold text-green-700">
                                                        Position Name: {positionMap[positionId] || 'N/A'}
                                                    </h4>
                                                    <table className="min-w-full mt-4">
                                                        <thead>
                                                            <tr>
                                                                <th className="border px-4 py-2 text-left">Candidate Name</th>
                                                                <th className="border px-4 py-2 text-left">Position</th>
                                                                <th className="border px-4 py-2 text-left">Vote Count</th>
                                                                <th className="border px-4 py-2 text-left">Winner</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(candidateVotes).map((candidateId) => {
                                                                const candidate = votes.find(vote => vote.candidate_id == candidateId);
                                                                if (candidate && candidate.candidate.name) {
                                                                    return (
                                                                        <tr key={candidateId}>
                                                                            <td className="border px-4 py-2">{candidate.candidate.name}</td>
                                                                            <td className="border px-4 py-2">{positionMap[positionId]}</td>
                                                                            <td className="border px-4 py-2">{candidateVotes[candidateId]}</td>
                                                                            <td className="border px-4 py-2">{winningCandidateId === candidateId ? 'Winner' : ''}</td>
                                                                        </tr>
                                                                    );
                                                                }
                                                                return null;
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p>No votes cast yet.</p>
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
