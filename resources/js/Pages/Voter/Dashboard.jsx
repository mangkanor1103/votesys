import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2'; // Import SweetAlert2

const VoterDashboard = ({ voterId, voterCode, electionId, electionName, positions, success }) => {
    const [selectedVotes, setSelectedVotes] = useState({}); // Track selected candidates for each position

    // Use useEffect to trigger SweetAlert2 when success message is received
    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'Success!',
                text: success,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000, // Automatically close after 3 seconds
            });
        }
    }, [success]);

    const handleVoteChange = (positionId, candidateId) => {
        setSelectedVotes((prev) => ({
            ...prev,
            [positionId]: candidateId,
        }));
    };

    const handleAbstain = (positionId) => {
        setSelectedVotes((prev) => ({
            ...prev,
            [positionId]: 'abstain',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const votes = Object.entries(selectedVotes).map(([positionId, candidateId]) => ({
            position_id: positionId,
            candidate_id: candidateId,
        }));

        Inertia.post(route('vote.store'), { voter_id: voterId, votes });
    };

    return (
        <div>
            <Head title="Voter Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg sm:rounded-lg border-t-4 border-green-700">
                        <div className="p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">
                                Welcome, Voter {voterId}
                            </h3>
                            <p className="text-lg mb-2"><strong>Voter ID:</strong> {voterId}</p>
                            <p className="text-lg mb-2"><strong>Election Name:</strong> {electionName}</p>

                            {/* Voting Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold mb-3">Vote for Candidates:</h4>
                                    {positions && positions.length > 0 ? (
                                        positions.map((position) => (
                                            <div key={position.id} className="mb-6">
                                                <h5 className="text-lg font-semibold">{position.name}</h5>
                                                <ul className="list-none space-y-2 mt-2">
                                                    {position.candidates && position.candidates.length > 0 ? (
                                                        position.candidates.map((candidate) => (
                                                            <li key={candidate.id} className="flex items-center">
                                                                {/* Candidate Photo as Button */}
                                                                <div
                                                                    onClick={() => handleVoteChange(position.id, candidate.id)}
                                                                    className="w-16 h-16 rounded-full overflow-hidden cursor-pointer border-2 border-gray-400 hover:opacity-80"
                                                                >
                                                                    <img
                                                                        src={candidate.photo}
                                                                        className="object-cover w-full h-full"
                                                                    />
                                                                </div>
                                                                {/* Candidate Name and Abstain Option */}
                                                                <div className="flex justify-between items-center ml-4 w-full">
                                                                    <span className="font-semibold">{candidate.name}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleAbstain(position.id)}
                                                                        className={`py-1 px-3 bg-red-500 text-white rounded-md hover:bg-gray-600 focus:outline-none`}
                                                                    >
                                                                        Abstain
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No candidates for this position.</li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No positions available.</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
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
