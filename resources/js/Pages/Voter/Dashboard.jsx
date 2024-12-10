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
        <div>
            <Head title="Voter Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg sm:rounded-lg border-t-4 border-green-700">
                        <div className="p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">Welcome, Voter {voterId}</h3>
                            <p className="text-lg mb-2">
                                <strong>Election Name:</strong> {electionName}
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold mb-3">Vote for Candidates:</h4>
                                    {positions.map((position) => (
                                        <div key={position.id} className="mb-8">
                                            <h5 className="text-lg font-semibold mb-4">{position.name}</h5>
                                            <div className="grid grid-cols-2 gap-4">
                                                {candidatesData[position.id]?.length > 0 ? (
                                                    candidatesData[position.id].map((candidate) => (
                                                        <div
                                                            key={candidate.id}
                                                            className={`cursor-pointer text-center p-4 rounded-md border ${selectedVotes[position.id] === candidate.id ? 'bg-blue-500' : 'bg-white'}`}
                                                            onClick={() => handleVoteChange(position.id, candidate.id)}
                                                        >
                                                            <img
                                                                src={`/storage/${candidate.photo}`}
                                                                alt={`${candidate.name}'s Photo`}
                                                                className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                                                            />
                                                            <h6 className="font-semibold">{candidate.name}</h6>
                                                            <p className="text-sm text-gray-500">{candidate.platform}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-gray-400 col-span-2">No candidates available.</p>
                                                )}
                                            </div>
                                            <div className="text-center mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleAbstain(position.id)}
                                                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-gray-600"
                                                >
                                                    Abstain
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 py-2 px-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                                >
                                    Submit Votes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;
