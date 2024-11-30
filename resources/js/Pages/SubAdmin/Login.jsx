import { FaUser } from 'react-icons/fa';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Login({ status }) {

    const handleRedirect = (e) => {
        e.preventDefault(); // Prevent form submission
        window.location.href = '/subdashboard'; // Directly links to the dashboard
    };

    return (
        <GuestLayout>
            <Head title="Sub Admin Login" />

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 border border-green-200">
                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <h1 className="text-2xl font-semibold text-green-700 text-center mb-4">
                    Sub Admin Login
                </h1>

                {/* Display the Election Code input field */}
                <form className="space-y-4">
                    <div className="relative">
                        <InputLabel htmlFor="election_code" value="Election Code" />
                        <div className="flex items-center border border-green-300 rounded-md shadow-sm p-2 transition-colors focus-within:border-green-500">
                            <FaUser className="text-green-500 mr-2" />
                            <TextInput
                                id="election_code"
                                type="text"
                                name="election_code"
                                className="w-full outline-none"
                                autoComplete="off"
                                isFocused={true}
                                readOnly
                            />
                        </div>
                        <InputError message="" className="mt-2" />
                    </div>

                    {/* Button that redirects directly to the dashboard */}
                    <div className="flex items-center justify-between">
                        <PrimaryButton
                            className="bg-green-600 hover:bg-green-500 text-white rounded-md shadow-md focus:ring-4 focus:ring-green-300 transition-all"
                            onClick={handleRedirect} // Prevent form submission and redirect
                        >
                            Go to Dashboard
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
