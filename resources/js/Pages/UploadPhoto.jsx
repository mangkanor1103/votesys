import React, { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';

export default function NotStudent() {
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!photo) {
            setError('Please select a photo to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await axios.post('/upload-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.redirect) {
                window.location.href = response.data.redirect; // Redirect to /not-student
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during the upload.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Upload Photo" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Upload Your Photo</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                Upload your photo to proceed to the NotStudent page.
            </p>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleUpload}>
                    {/* Photo Upload Input */}
                    <div className="mb-6">
                        <label htmlFor="photo" className="block text-green-800 font-semibold mb-2">
                            Select Photo:
                        </label>
                        <input
                            type="file"
                            id="photo"
                            onChange={handlePhotoChange}
                            accept="image/*"
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                    {/* Upload Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
                    >
                        Upload Photo
                    </button>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center w-full">
                        <a
                            href="/"
                            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300 text-center"
                            >
                            Home
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
}
