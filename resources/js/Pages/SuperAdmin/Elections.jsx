import React, { useState } from "react";
import { FaVoteYea, FaEdit, FaTrash } from 'react-icons/fa';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2'; // Import SweetAlert2
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


export default function Elections({ auth, elections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        election_name: '',
        election_date: '',
    });

    const [editingElection, setEditingElection] = useState(null);
    const [electionsList, setElectionsList] = useState(elections);

    // Handle Submit (Create or Update Election)

    const submit = (e) => { Swal.fire({
        icon: 'success',
        title: 'Election Created Successfully!',
        text: 'The new election has been successfully added to the system.',
    });

        if (editingElection) {
            handleUpdate(); // Handle updating the election if editing
        } else {
            // Send post request to store new election
            post(route('election.store'), {
                data: { election_name: data.election_name, election_date: data.election_date },
                onSuccess: (response) => {
                    console.log("Response after creating election:", response); // Debug log to check the response

                    if (response.props && response.props.election) {
                        const newElection = response.props.election;
                        console.log("New election object:", newElection); // Debug log for new election

                        // Update elections list immediately with the new election
                        setElectionsList(prevElections => [...prevElections, newElection]);

                        // Show success notification after creating the election
                        Swal.fire({
                            icon: 'success',
                            title: 'Election Created Successfully!',
                            text: 'The new election has been successfully added to the system.',
                        });
                    } else {
                        console.error('New election data not returned in the response.');
                    }
                    reset(); // Reset form data after successful submission
                },
                onError: (error) => {
                    console.error('Error:', error); // Optional: handle any errors from the server
                },
            });
        }
    };




    // Handle Edit Election
    const handleEdit = (election) => {
        setEditingElection(election.id);
        setData({
            election_name: election.election_name,
            election_date: election.election_date,
        });
    };

    // Handle Update Election
    const handleUpdate = () => {
        post(route('election.update', editingElection), {
            data: { election_name: data.election_name, election_date: data.election_date },
            onSuccess: (response) => {
                // Update the election in the local state without refreshing the page
                setElectionsList(prev =>
                    prev.map(election =>
                        election.id === editingElection
                            ? { ...election, election_name: data.election_name, election_date: data.election_date }
                            : election
                    )
                );
                setEditingElection(null);
                reset();

                // Show success notification after successful update
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'The election has been updated successfully.',
                });
            },
            onError: (error) => {
                console.error('Error:', error); // Optional: handle any errors from the server
            },
        });
    };

    // Handle Delete Election with SweetAlert2
    const handleDelete = (electionId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // Optimistic UI update: Remove election from the list immediately
                setElectionsList(prevElections => prevElections.filter(election => election.id !== electionId));

                Inertia.delete(route('election.destroy', electionId), {
                    onError: () => {
                        // If deletion fails, add the election back to the list
                        setElectionsList(prevElections => [...prevElections, prevElections.find(election => election.id === electionId)]);
                    },
                });

                Swal.fire('Deleted!', 'The election has been deleted.', 'success');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Elections" />

            <div className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12 bg-gradient-to-r from-green-500 via-green-400 to-green-300 shadow-lg rounded-lg">
                {/* Election Form */}
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={data.election_name}
                            placeholder="Election Name"
                            className="block w-full p-4 bg-white border border-green-400 focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg shadow-md text-green-900 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            onChange={e => setData('election_name', e.target.value)}
                            disabled={editingElection !== null} // Disable input if editing
                        />
                        <InputError message={errors.election_name} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <input
                            type="date"
                            value={data.election_date}
                            className="block w-full p-4 bg-white border border-green-400 focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg shadow-md text-green-900 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            onChange={e => setData('election_date', e.target.value)}
                            disabled={editingElection !== null} // Disable input if editing
                        />
                        <InputError message={errors.election_date} className="mt-2 text-red-600" />
                    </div>

                    <div className="text-center">
                        <PrimaryButton
                            type="submit" // Ensure form submission is triggered
                            className="mt-4 px-8 py-3 bg-green-700 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg shadow-lg disabled:bg-green-300"
                            disabled={processing}
                        >
                            {editingElection ? (
                                <span>Update Election</span> // Show Update when editing
                            ) : (
                                <>
                                    <FaVoteYea className="text-2xl" /> Create Election
                                </>
                            )}
                        </PrimaryButton>
                    </div>
                </form>

                {/* Election List Table */}
                <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-green-200">
                        <thead className="bg-green-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Name</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Date</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Code</th>
                                <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-100">
                            {electionsList.map((election) => (
                                <tr key={election.id} className="hover:bg-green-50">
                                    <td className="px-6 py-4 text-sm text-green-900">
                                        {editingElection === election.id ? (
                                            <input
                                                type="text"
                                                value={data.election_name}
                                                onChange={e => setData('election_name', e.target.value)}
                                                className="block w-full p-2 bg-white border border-green-400 focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg"
                                            />
                                        ) : (
                                            election.election_name
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_date}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_code}</td> {/* Displaying election code */}
                                    <td className="px-6 py-4 text-sm text-green-900">
                                        {editingElection === election.id ? (
                                            <button
                                                type="submit" // Submit the form to update election
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FaEdit className="inline mr-2" /> Update
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(election)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <FaEdit className="inline mr-2" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(election.id)}
                                                    className="ml-4 text-red-600 hover:text-red-800"
                                                >
                                                    <FaTrash className="inline mr-2" /> Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
