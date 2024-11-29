import React from "react";
import { FaVoteYea } from 'react-icons/fa'; // Use an icon for elections
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Elections({ auth, elections }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        election_name: '',
        election_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('election.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Elections" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-green-50">
                {/* Election Form */}
                <form onSubmit={submit} className="space-y-4">
                    <input
                        type="text"
                        value={data.election_name}
                        placeholder="Election Name"
                        className="block w-full p-3 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm text-green-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onChange={e => setData('election_name', e.target.value)}
                    />
                    <InputError message={errors.election_name} className="mt-2 text-red-500" />

                    <input
                        type="date"
                        value={data.election_date}
                        className="block w-full p-3 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm text-green-900 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onChange={e => setData('election_date', e.target.value)}
                    />
                    <InputError message={errors.election_date} className="mt-2 text-red-500" />

                    <PrimaryButton className="mt-4 bg-green-600 text-white hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-green-300" disabled={processing}>
                        <FaVoteYea className="mr-2 text-xl" /> Create Election
                    </PrimaryButton>
                </form>

                {/* Election List Table */}
                <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-green-200">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-green-900 uppercase tracking-wider">Election Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-green-900 uppercase tracking-wider">Election Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-green-900 uppercase tracking-wider">Election Code</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-green-100">
                            {elections.map((election) => (
                                <tr key={election.id} className="hover:bg-green-50">
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_name}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_date}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
