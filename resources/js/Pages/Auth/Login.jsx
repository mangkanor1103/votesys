import { FaUser, FaLock } from 'react-icons/fa';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Mindoro State University - Super Admin Login" />

            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 border border-green-200">
                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600 transition-opacity duration-500">
                        {status}
                    </div>
                )}

                <h1 className="text-2xl font-semibold text-green-700 text-center mb-4">
                    Mindoro State University Admin Login
                </h1>

                <form onSubmit={submit} className="space-y-4">
                    <div className="relative">
                        <InputLabel htmlFor="email" value="Email" />
                        <div className="flex items-center border border-green-300 rounded-md shadow-sm p-2 transition-colors focus-within:border-green-500">
                            <FaUser className="text-green-500 mr-2" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full outline-none"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="relative">
                        <InputLabel htmlFor="password" value="Password" />
                        <div className="flex items-center border border-green-300 rounded-md shadow-sm p-2 transition-colors focus-within:border-green-500">
                            <FaLock className="text-green-500 mr-2" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full outline-none"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-green-700">Remember me</span>
                    </div>

                    <div className="flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-green-600 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="bg-green-600 hover:bg-green-500 text-white rounded-md shadow-md focus:ring-4 focus:ring-green-300 transition-all"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
