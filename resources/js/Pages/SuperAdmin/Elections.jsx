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
                        />
                        <InputError message={errors.election_name} className="mt-2 text-red-600" />
                    </div>

                    <div>
                        <input
                            type="date"
                            value={data.election_date}
                            className="block w-full p-4 bg-white border border-green-400 focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-lg shadow-md text-green-900 transition-transform duration-300 ease-in-out transform hover:scale-105"
                            onChange={e => setData('election_date', e.target.value)}
                        />
                        <InputError message={errors.election_date} className="mt-2 text-red-600" />
                    </div>

                    <div className="text-center">
                        <PrimaryButton
                            className="mt-4 px-8 py-3 bg-green-700 text-white text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition-transform duration-300 ease-in-out transform hover:scale-110 rounded-lg shadow-lg disabled:bg-green-300"
                            disabled={processing}
                        >
                            <FaVoteYea className="text-2xl" /> Create Election
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
