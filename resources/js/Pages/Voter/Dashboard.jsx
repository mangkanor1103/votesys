import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2'; // Import SweetAlert2 for success notifications

const VoterDashboard = ({ voterId, electionName, electionId, positions }) => {
    const { props } = usePage(); // Access the Inertia page props
    const successMessage = props.success; // Success message from server

    const [selectedVotes, setSelectedVotes] = useState({}); // Track selected candidates for each position

    // Handle selection of a candidate
    const handleVoteChange = (positionId, candidateId) => {
        setSelectedVotes((prev) => ({
            ...prev,
            [positionId]: candidateId,
        }));
    };

    // Handle abstaining from voting for a position
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
            candidate_id: candidateId === 'abstain' ? null : candidateId, // Ensure null is set for abstain
        }));
        
        try {
            // Submit the votes
            await Inertia.post(route('vote.store'), {
                voter_id: voterId,
                election_id: electionId, // Include election_id in the payload
                votes,
            });
    
            // Show success notification using SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Your vote has been submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                // Redirect to Welcome.jsx after clicking OK
                window.location.href = '/'; // Assuming '/' is the route for Welcome.jsx
            });
        } catch (error) {
            console.error("Error submitting vote:", error);
            // Optionally, show an error alert
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue submitting your vote. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    

    return (
        <div>
            <Head title="Voter Dashboard" />
            
            {/* Display success message if it exists */}
            {successMessage && (
                <div className="bg-green-500 text-white p-4 mb-4 rounded-md">
                    {successMessage}
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg sm:rounded-lg border-t-4 border-green-700">
                        <div className="p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">Welcome, Voter {voterId}</h3>
                            <p className="text-lg mb-2">
                                <strong>Election Name:</strong> {electionName}
                            </p>

                            {/* Voting Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold mb-3">Vote for Candidates:</h4>
                                    {positions && positions.length > 0 ? (
                                        positions.map((position) => (
                                            <div key={position.id} className="mb-8">
                                                <h5 className="text-lg font-semibold mb-4">{position.name}</h5>
                                                <table className="table-auto w-full text-left">
                                                    <thead>
                                                        <tr>
                                                            <th className="border px-4 py-2">Photo</th>
                                                            <th className="border px-4 py-2">Name</th>
                                                            <th className="border px-4 py-2">Select</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {position.candidates && position.candidates.length > 0 ? (
                                                            position.candidates.map((candidate) => (
                                                                <tr key={candidate.id}>
                                                                    <td className="border px-4 py-2">
                                                                        <img
                                                                            src={`/storage/${candidate.photo}`}
                                                                            alt="Candidate Photo"
                                                                            className="w-16 h-16 rounded-full object-cover"
                                                                        />
                                                                    </td>
                                                                    <td className="border px-4 py-2">{candidate.name}</td>
                                                                    <td className="border px-4 py-2">
                                                                        <input
                                                                            type="radio"
                                                                            name={`position-${position.id}`}
                                                                            value={candidate.id}
                                                                            checked={selectedVotes[position.id] === candidate.id}
                                                                            onChange={() => handleVoteChange(position.id, candidate.id)}
                                                                            disabled={selectedVotes[position.id]}
                                                                            className="form-radio"
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td
                                                                    colSpan="3"
                                                                    className="border px-4 py-2 text-center text-gray-400"
                                                                >
                                                                    No candidates available.
                                                                </td>
                                                            </tr>
                                                        )}
                                                        <tr>
                                                            <td colSpan="3" className="text-center py-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleAbstain(position.id)}
                                                                    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
                                                                >
                                                                    Abstain
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No positions available.</p>
                                    )}
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
