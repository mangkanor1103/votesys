import { useState } from 'react';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Login({ status }) {
    const [electionCode, setElectionCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleRedirect = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/validate-election-code', {
                election_code: electionCode,
            });

            if (response.data.success) {
                // Retrieve election data from the response
                const { id, code, name, date } = response.data.election;

                // Store election ID, code, name, and date in localStorage
                localStorage.setItem('election_id', id);
                localStorage.setItem('election_code', code);
                localStorage.setItem('election_name', name);
                localStorage.setItem('election_date', date);

                // Redirect to the dashboard with the correct parameters
                window.location.href = `/subdashboard?election_id=${id}&election_code=${code}&election_name=${name}&election_date=${date}`;
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'An error occurred. Please try again.'
            );
        }
    };

    return (
        <GuestLayout>
            <Head title="Sub Admin Login" />

            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 mt-8 border border-green-300">
                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <h1 className="text-3xl font-semibold text-green-700 text-center mb-6">
                    Sub Admin Login
                </h1>

                <form className="space-y-6" onSubmit={handleRedirect}>
                    <div className="relative">
                        <InputLabel htmlFor="election_code" value="Election Code" className="text-green-700" />
                        <div className="flex items-center border border-green-300 rounded-lg shadow-sm p-3 focus-within:border-green-500">
                            <FaUser className="text-green-500 mr-3" />
                            <TextInput
                                id="election_code"
                                type="text"
                                name="election_code"
                                className="w-full text-sm outline-none focus:ring-0"
                                autoComplete="off"
                                value={electionCode}
                                onChange={(e) => setElectionCode(e.target.value)}
                                isFocused={true}
                            />
                        </div>
                        <InputError message={errorMessage} className="mt-2 text-red-500" />
                    </div>

                    <div className="flex items-center justify-center">
                        <PrimaryButton
                            className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-6 rounded-lg shadow-lg focus:ring-4 focus:ring-green-300 transition-all"
                        >
                            Go to Dashboard
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
