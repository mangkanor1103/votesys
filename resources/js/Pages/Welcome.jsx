import { FaHome, FaUser, FaUsers, FaUserTie, FaSignOutAlt, FaRegFlag, FaSignInAlt  } from 'react-icons/fa'; // Updated icons
import { Head, Link, useForm } from '@inertiajs/react'; // Import useForm hook
import { motion } from 'framer-motion'; // Import motion
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [error, setError] = useState(null); // State to store error message
    const { data, setData, post, processing } = useForm({
        voter_code: '', // Voter code input field
    });

    // Handle input changes
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleHover = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleLeave = () => {
        setHoveredButton(null);
    };

    // Handle form submission for login
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('voter.login'), {
            data: { voter_code: data.voter_code },
            onSuccess: () => {
                const { id, name, date } = yourElectionData; // Replace 'yourElectionData' with the actual object holding these values
                window.location.href = `/voter/dashboard/${id}?election_name=${name}&election_date=${date}`;
            },
            onError: (errors) => {
                setError(errors.voter_code || 'An error occurred. Please try again.');
            },
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
            <Head title="Welcome" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
                {/* Logo Section */}
                <div className="flex justify-center mb-1">
                    <img
                        src="/images/logo.jpg"
                        alt="Logo"
                        className="w-24 h-24 rounded-full"
                    /> {/* Adjusted to make the logo small and circular */}
                </div>

                <h1 className="text-3xl font-extrabold text-green-100 tracking-wide text-center mb-6">
                    Mindoro State University Online Voting System
                </h1>

                {/* Input for Voter ID */}
                <div className="mb-12 flex justify-center">
                    <input
                        type="text"
                        name="voter_code"
                        value={data.voter_code}
                        onChange={handleChange}
                        placeholder="Enter Voter ID"
                        className="w-full max-w-sm p-4 text-lg border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        <p>{error}</p>
                    </div>
                )}

                {/* Buttons Section */}
                <div className="flex justify-center">
                    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
                        <div className="flex flex-col gap-4">

                            {/* First Row: Submit Button */}
                            <motion.button
                                className={`text-white flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg transition transform ${hoveredButton === 'submit' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                                onMouseEnter={() => handleHover('submit')}
                                onMouseLeave={handleLeave}
                                onClick={handleSubmit}
                                disabled={processing}
                                whileHover={{ y: -5 }} // Move up when hovered
                                transition={{ duration: 0.2 }} // Smooth transition
                            >
                                <FaRegFlag className="text-xl" /> Submit
                            </motion.button>

                            {/* Second Row: Super Admin and Sub Admin Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        href={route('subAdmin.login')}
                                        className={`text-white flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg transition transform ${hoveredButton === 'subAdmin' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                                        onMouseEnter={() => handleHover('subAdmin')}
                                        onMouseLeave={handleLeave}
                                    >
                                        <FaUsers className="text-xl" /> Sub Admin
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        href={route('login')}
                                        className={`text-white flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg transition transform ${hoveredButton === 'superAdmin' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                                        onMouseEnter={() => handleHover('superAdmin')}
                                        onMouseLeave={handleLeave}
                                    >
                                        <FaUserTie className="text-xl" /> Super Admin
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Third Row: Register and Log In Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        href={route('student')}
                                        className={`text-white flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg transition transform ${hoveredButton === 'student' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                                        onMouseEnter={() => handleHover('student')}
                                        onMouseLeave={handleLeave}
                                    >
                                        <FaSignInAlt  className="text-xl" /> Log In
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Link
                                        href={route('not_student')}
                                        className={`text-white flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg transition transform ${hoveredButton === 'notStudent' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                                        onMouseEnter={() => handleHover('notStudent')}
                                        onMouseLeave={handleLeave}
                                    >
                                        <FaSignOutAlt className="text-xl" /> Register
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <p className="mt-8 text-center text-white">
                    If you want to create your own election, please{' '}
                    <a
                        href="https://www.facebook.com/profile.php?id=61568601145118"
                        className="text-white underline hover:text-green-700"
                    >
                        contact us
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
