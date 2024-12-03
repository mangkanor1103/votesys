import React, { useState } from "react";
import { FaVoteYea, FaTrash, FaEdit } from 'react-icons/fa'; // Import trash and edit icons
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from '@inertiajs/inertia';

export default function Elections({ auth, elections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        election_name: '',
        election_date: '',
    });

    const [editingElection, setEditingElection] = useState(null); // Track which election is being edited

    const submit = (e) => {
        e.preventDefault();
        post(route('election.store'), {
            onSuccess: () => reset(),
        });
    };

    // Handle Delete Election
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this election?")) {
            Inertia.delete(route('election.delete', id), {
                onSuccess: () => {
                    // Optional: Handle the success, like refreshing the list or showing a success message
                }
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
    const handleUpdate = (electionId) => {
        post(route('election.update', electionId), {
            data: { election_name: data.election_name, election_date: data.election_date },
            onSuccess: () => {
                setEditingElection(null); // Reset editing mode
                reset(); // Reset form
            },
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
                        {editingElection ? (
                            <PrimaryButton
                                className="mt-4 px-8 py-3 bg-green-700 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg shadow-lg disabled:bg-green-300"
                                disabled={processing}
                                onClick={() => handleUpdate(editingElection)}
                            >
                                Update Election
                            </PrimaryButton>
                        ) : (
                            <PrimaryButton
                                className="mt-4 px-8 py-3 bg-green-700 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg shadow-lg disabled:bg-green-300"
                                disabled={processing}
                            >
                                <FaVoteYea className="text-2xl" /> Create Election
                            </PrimaryButton>
                        )}
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
                            {elections.map((election) => (
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
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_code}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">
                                        {editingElection === election.id ? (
                                            <button
                                                onClick={() => handleUpdate(election.id)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FaEdit className="inline mr-2" /> Update
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(election)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FaEdit className="inline mr-2" /> Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(election.id)}
                                            className="text-red-600 hover:text-red-800 ml-4"
                                        >
                                            <FaTrash className="inline mr-2" /> Delete
                                        </button>
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
