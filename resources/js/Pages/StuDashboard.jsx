import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import axios from 'axios';
import { FaUser, FaVoteYea, FaSearch, FaChalkboardTeacher } from 'react-icons/fa';

export default function StuDashboard() {
    const [student, setStudent] = useState(null);
    const [elections, setElections] = useState([]);
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [selectedElection, setSelectedElection] = useState('');

    useEffect(() => {
        const storedStudent = localStorage.getItem('studentData');
        if (storedStudent) {
            setStudent(JSON.parse(storedStudent));
        }

        axios.get('/elections')
            .then(response => setElections(response.data))
            .catch(error => console.error('Error fetching elections:', error));

        axios.get('/voters')
            .then(response => setVoters(response.data))
            .catch(error => console.error('Error fetching voters:', error));
    }, []);

    const handleElectionChange = (event) => {
        const selectedElectionId = event.target.value;
        setSelectedElection(selectedElectionId);
        setFilteredVoters(voters.filter(voter => voter.election_id === parseInt(selectedElectionId)));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col items-center px-4">
            <Head title="Student Dashboard" />

            {/* Logout Button */}
            <div className="w-full max-w-6xl flex justify-end p-4">
                <Link
                    href={route('welcome')}
                    className="text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform hover:bg-green-700 hover:scale-105 ease-in-out duration-300"
                >
                    <FaChalkboardTeacher className="text-xl" /> Logout
                </Link>
            </div>

            {/* Dashboard Heading */}
            <h1 className="text-4xl font-extrabold text-green-900 mb-4 animate-fade-in">Student Dashboard</h1>
            <p className="text-lg text-green-800 mb-8 text-center animate-slide-up">
                Welcome! You're registered as a student at Mindoro State University.
            </p>

            {/* Student Information */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2">
                    <FaUser className="text-green-500" /> Your Information
                </h2>
                {student ? (
                    <div className="mt-4 space-y-2">
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>School ID:</strong> {student.school_id}</p>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                    </div>
                ) : (
                    <p>Loading student information...</p>
                )}
            </div>

            {/* Election Dropdown */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2">
                    <FaVoteYea className="text-green-500" /> Select Election
                </h2>
                <select
                    value={selectedElection}
                    onChange={handleElectionChange}
                    className="mt-4 w-full border border-green-300 rounded-md px-4 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                    <option value="">-- Select an Election --</option>
                    {elections.map((election) => (
                        <option key={election.id} value={election.id}>
                            {election.election_name}
                        </option>
                    ))}
                </select>
                {selectedElection && (
                    <p className="mt-4 text-green-800">
                        Viewing voters for: <strong>{elections.find(e => e.id === parseInt(selectedElection))?.election_name}</strong>
                    </p>
                )}
            </div>

            {/* Voters Table */}
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <h2 className="text-2xl font-semibold text-green-900 flex items-center gap-2 mb-4">
                    <FaSearch className="text-green-500" /> Voters List
                </h2>
                <table className="min-w-full divide-y divide-green-200 animate-slide-up">
                    <thead className="bg-green-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Voter Code</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-green-100">
                        {filteredVoters.length > 0 ? (
                            filteredVoters.map((voter) => (
                                <tr key={voter.id} className="hover:bg-green-50 transition">
                                    <td className="px-6 py-4 text-sm text-green-900">{voter.voter_code}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="1" className="px-6 py-4 text-sm text-center text-green-900">
                                    No voters found for the selected election.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
