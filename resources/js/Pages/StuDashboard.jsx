import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function StuDashboard() {
    const [student, setStudent] = useState(null);
    const [elections, setElections] = useState([]);
    const [voters, setVoters] = useState([]);
    const [filteredVoters, setFilteredVoters] = useState([]);
    const [selectedElection, setSelectedElection] = useState('');

    useEffect(() => {
        // Fetch student data from localStorage
        const storedStudent = localStorage.getItem('studentData');
        if (storedStudent) {
            const parsedStudent = JSON.parse(storedStudent);
            setStudent(parsedStudent);
        }

        // Fetch elections data from the backend API
        axios.get('/elections') // Adjust the URL if needed
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setElections(response.data);
                } else {
                    console.log('No elections available');
                }
            })
            .catch(error => {
                console.error('Error fetching elections:', error);
                alert('Error fetching elections. Please try again later.');
            });

        // Fetch voters data from the backend API
        axios.get('/voters') // Adjust the URL if needed
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setVoters(response.data);
                } else {
                    console.log('No voters available');
                }
            })
            .catch(error => {
                console.error('Error fetching voters:', error);
                alert('Error fetching voters. Please try again later.');
            });
    }, []);

    // Handle election selection
    const handleElectionChange = (event) => {
        const selectedElectionId = event.target.value;
        setSelectedElection(selectedElectionId);

        // Filter voters for the selected election
        if (selectedElectionId) {
            const filtered = voters.filter(
                (voter) => voter.election_id === parseInt(selectedElectionId)
            );
            setFilteredVoters(filtered);
        } else {
            setFilteredVoters([]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Dashboard" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Welcome to the Student Dashboard</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                You're successfully registered as a student at Mindoro State University.
            </p>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
                {student ? (
                    <div>
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>School ID:</strong> {student.school_id}</p>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                    </div>
                ) : (
                    <p>Loading student information...</p>
                )}
            </div>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Select Election</h2>
                <select
                    value={selectedElection}
                    onChange={handleElectionChange}
                    className="w-full border border-green-300 rounded-md px-4 py-2 text-green-900"
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
                        Showing voters for election: {elections.find(e => e.id === parseInt(selectedElection))?.election_name || ''}
                    </p>
                )}
            </div>

            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Voters</h2>
                <table className="min-w-full divide-y divide-green-200">
                    <thead className="bg-green-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Voter Code</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-green-100">
                        {filteredVoters.length > 0 ? (
                            filteredVoters.map((voter) => (
                                <tr key={voter.id} className="hover:bg-green-50">
                                    <td className="px-6 py-4 text-sm text-green-900">{voter.voter_code}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="1" className="px-6 py-4 text-sm text-center text-green-900">No voters found for the selected election.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
