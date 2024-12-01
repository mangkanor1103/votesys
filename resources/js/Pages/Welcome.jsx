import { FaHome, FaRegFlag, FaUsers, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa'; // Icons
import { Head, Link } from '@inertiajs/react';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleHover = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-700 to-teal-700">
            <Head title="Welcome" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-extrabold text-green-100 tracking-wide text-center mb-12">
                    Mindoro State University Online Voting System
                </h1>

                {/* Input for Voter ID */}
                <div className="mb-12 flex justify-center">
                    <input
                        type="text"
                        placeholder="Enter Voter ID"
                        className="w-full max-w-sm p-4 text-lg border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    {/* Submit Button */}
                    <button
                        className={`text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform ${hoveredButton === 'submit' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                        onMouseEnter={() => handleHover('submit')}
                        onMouseLeave={handleLeave}
                    >
                        <FaRegFlag className="text-xl" /> Submit
                    </button>

                    {/* Sub Admin Button */}
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <Link
                            href={route('subAdmin.login')}
                            className={`text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform ${hoveredButton === 'subAdmin' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                            onMouseEnter={() => handleHover('subAdmin')}
                            onMouseLeave={handleLeave}
                        >
                            <FaUsers className="text-xl" /> Sub Admin
                        </Link>
                    </CSSTransition>

                    {/* Super Admin Button */}
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <Link
                            href={route('login')}
                            className={`text-white flex items-center gap-2 px-6 py-3 rounded-lg transition transform ${hoveredButton === 'superAdmin' ? 'bg-green-700 scale-105' : 'bg-green-500 hover:bg-green-700'} duration-300`}
                            onMouseEnter={() => handleHover('superAdmin')}
                            onMouseLeave={handleLeave}
                        >
                            <FaChalkboardTeacher className="text-xl" /> Super Admin
                        </Link>
                    </CSSTransition>
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
