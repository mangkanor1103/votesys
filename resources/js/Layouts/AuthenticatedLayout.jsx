// Import additional components as needed
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaLeaf } from 'react-icons/fa';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-green-900 text-green-50">
            <nav className="border-b bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto text-green-50" />
                                <span className="ml-2 font-semibold text-lg text-green-50">RKA Team</span>
                            </Link>

                            <div className="hidden space-x-8 sm:flex sm:ml-10">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-green-200 hover:text-green-300"
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route('superadmin.elections')}
                                    active={route().current('superadmin.elections')}
                                    className="text-green-200 hover:text-green-300"
                                >
                                    Elections
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center px-3 py-2 bg-green-700 rounded-full text-green-50 hover:bg-green-800 focus:outline-none">
                                        <FaLeaf className="mr-2" />
                                        <span className="text-sm font-medium mr-2">{user.name}</span>
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="flex sm:hidden items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center p-2 text-green-100 hover:text-green-300 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 py-2 bg-green-800">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-green-200 hover:text-green-300"
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('superadmin.elections')}
                            active={route().current('superadmin.elections')}
                            className="text-green-200 hover:text-green-300"
                        >
                            Elections
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-green-300 py-4 bg-green-800">
                        <div className="px-4">
                            <div className="text-base font-medium text-green-50">{user.name}</div>
                            <div className="text-sm font-medium text-green-300">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-green-200 hover:text-green-300">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-green-200 hover:text-green-300">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-gradient-to-r from-green-700 via-teal-700 to-green-500 shadow-md">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <h1 className="text-xl font-semibold text-green-50">{header}</h1>
                    </div>
                </header>
            )}

            <main className="bg-green-900">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
