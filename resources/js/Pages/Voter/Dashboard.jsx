import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import axios from 'axios';

const VoterDashboard = ({ voterId, electionName, electionId, positions }) => {
    const { props } = usePage();
    const successMessage = props.success; // Get the success message from the props

    const [selectedVotes, setSelectedVotes] = useState({});
    const [candidatesData, setCandidatesData] = useState({});

    // Fetch candidates for a specific position
    const fetchCandidates = async (positionId) => {
        try {
            const response = await axios.get(`/api/candidates/${positionId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching candidates for position ${positionId}:`, error);
            return [];
        }
    };

    // Load candidates data for all positions on component mount
    useEffect(() => {
        const loadCandidates = async () => {
            const data = {};
            for (const position of positions) {
                const candidates = await fetchCandidates(position.id);
                data[position.id] = candidates;
            }
            setCandidatesData(data);
        };

        loadCandidates();
    }, [positions]);

    // Handle vote selection
    const handleVoteChange = (positionId, candidateId) => {
        setSelectedVotes((prev) => ({
            ...prev,
            [positionId]: candidateId,
        }));
    };

    // Handle abstaining
    const handleAbstain = (positionId) => {
        setSelectedVotes((prev) => ({
            ...prev,
            [positionId]: 'abstain',
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const votes = Object.entries(selectedVotes).map(([positionId, candidateId]) => ({
            position_id: positionId,
            candidate_id: candidateId === 'abstain' ? null : candidateId,
        }));

        try {
            // Submit the vote
            const response = await Inertia.post(route('vote.store'), {
                voter_id: voterId,
                election_id: electionId,
                votes,
            });

            // Show SweetAlert on success
            if (response.props.success) {
                Swal.fire({
                    title: 'Success!',
                    text: response.props.success, // Use success message from the backend
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.href = '/'; // Redirect to home after success
                });
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            Swal.fire({
                title: 'Success!',
                confirmButtonText: 'OK',
            }).then(() => {
                window.location.href = '/'; // Redirect to home after success
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: 'url(/images/bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Head title="Voter Dashboard" />

            <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-xl">
                <div className="text-center mb-6">
                    <h3 className="text-3xl font-bold text-green-800">Welcome, Voter {voterId}</h3>
                    <p className="text-lg text-gray-700 mt-2">
                        <strong>Election Name:</strong> {electionName}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <h4 className="text-2xl font-semibold text-gray-800">Vote for Candidates</h4>
                        <p className="text-lg text-gray-600">Please choose your preferred candidates for each position.</p>
                    </div>

                    <div className="space-y-6">
                        {positions.map((position) => (
                            <div key={position.id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h5 className="text-xl font-semibold text-gray-800">{position.name}</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    {candidatesData[position.id]?.length > 0 ? (
                                        candidatesData[position.id].map((candidate) => (
                                            <div
                                                key={candidate.id}
                                                className={`cursor-pointer text-center p-4 rounded-lg border-2 ${selectedVotes[position.id] === candidate.id ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
                                                onClick={() => handleVoteChange(position.id, candidate.id)}
                                            >
                                                <img
                                                    src={`/storage/${candidate.photo}`}
                                                    alt={`${candidate.name}'s Photo`}
                                                    className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                                                />
                                                <h6 className="font-semibold text-gray-800">{candidate.name}</h6>
                                                <p className="text-sm text-gray-500">{candidate.platform}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="col-span-2 text-center text-gray-400">No candidates available.</p>
                                    )}
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleAbstain(position.id)}
                                        className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                                    >
                                        Abstain
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="py-3 px-8 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Submit Votes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VoterDashboard;
