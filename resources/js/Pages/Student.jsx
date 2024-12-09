import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { Head } from '@inertiajs/react';

export default function Student() {
    const [formData, setFormData] = useState({
        school_id: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate empty fields before sending
        if (!formData.school_id || !formData.password) {
            setError('All fields are required.');
            return;
        }

        setIsLoading(true); // Set loading state

        try {
            const response = await axios.post('/student-login', formData);
            console.log('Login Response:', response.data); // Debug response

            if (response.data.success) {
                // Save student data to localStorage
                localStorage.setItem('studentData', JSON.stringify(response.data.student));
                // Redirect to the dashboard
                window.location.href = '/StuDashboard';
            } else {
                setError(response.data.message || 'Invalid credentials, please try again.');
            }
        } catch (err) {
            console.error('Login Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'An error occurred during login.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Login" />
            <h1 className="text-4xl font-bold text-white mb-6">Student Login</h1>
            <p className="text-lg text-white mb-8 text-center">
                Please enter your credentials to access your student dashboard.
            </p>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    {/* School ID Input */}
                    <div className="mb-4">
                        <label htmlFor="school-id" className="block text-green-800 font-bold mb-2">
                            School ID:
                        </label>
                        <input
                            type="text"
                            id="school-id"
                            name="school_id"
                            value={formData.school_id}
                            onChange={handleChange}
                            placeholder="Enter your school ID"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-green-800 font-bold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                        } transition duration-300`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>

            {/* Green Leaf Icon */}
            <div className="absolute bottom-10">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2935/2935432.png"
                    alt="Green Leaf"
                    className="w-16 h-16 opacity-60"
                />
            </div>
        </div>
    );
}
