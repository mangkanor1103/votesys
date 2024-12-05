import { Head } from '@inertiajs/react';
import React from 'react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia for navigation

const VoterDashboard = ({ voterId, voterCode, electionId, electionName, positions }) => {
    // Logout handler
    const handleLogout = () => {
        Inertia.post(route('logout'), {
            onSuccess: () => {
                Inertia.get(route('login')); // Redirect to login page after logout
            },
        });
    };

    return (
        <div>
            <Head title="Voter Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Background Gradient and Styling */}
                    <div className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg sm:rounded-lg border-t-4 border-green-700">
                        <div className="p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">
                                Welcome, Voter {voterId}
                            </h3>
                            <p className="text-lg mb-2"><strong>Voter ID:</strong> {voterId}</p>
                            <p className="text-lg mb-2"><strong>Voter Code:</strong> {voterCode}</p>
                            <p className="text-lg mb-2"><strong>Election ID:</strong> {electionId}</p>
                            <p className="text-lg mb-2"><strong>Election Name:</strong> {electionName}</p>

                            {/* Display Positions */}
                            <div className="mt-6">
                                <h4 className="text-xl font-semibold mb-3">Available Positions:</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    {positions && positions.length > 0 ? (
                                        positions.map((position) => (
                                            <li key={position.id}>
                                                <strong>{position.name}</strong>
                                                {position.maxVotes && ` (Max Votes: ${position.maxVotes})`}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No positions available.</li>
                                    )}
                                </ul>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout} // Trigger logout when clicked
                                className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;
