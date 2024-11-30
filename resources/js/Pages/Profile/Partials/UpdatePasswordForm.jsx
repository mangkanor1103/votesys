import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`${className} bg-green-900 p-6 rounded-lg shadow-md`}>
            <header>
                <h2 className="text-2xl font-semibold text-green-50">
                    Update Password
                </h2>

                <p className="mt-2 text-sm text-green-200">
                    Ensure your account is using a strong, unique password for better security.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/* Current Password Input */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                        className="text-green-50"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-red-400"
                    />
                </div>

                {/* New Password Input */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="New Password"
                        className="text-green-50"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2 text-red-400"
                    />
                </div>

                {/* Password Confirmation Input */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-green-50"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-400"
                    />
                </div>

                {/* Save Button and Success Transition */}
                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-200">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
