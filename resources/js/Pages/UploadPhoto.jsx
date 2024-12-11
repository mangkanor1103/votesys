import React, { useState } from 'react';
import axios from 'axios'; // Install axios if not already installed
import { Head } from '@inertiajs/react';

export default function NotStudent() {
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during upload.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Upload Photo" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Upload Photo</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                Please upload your photo to confirm your identity.
            </p>

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleUpload}>
                    {/* Photo Upload Input */}
                    <div className="mb-6">
                        <label htmlFor="photo" className="block text-green-800 font-semibold mb-2">
                            Upload Photo:
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        />
                    </div>

                    {/* Error or Success Message */}
                    {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

                    {/* Upload Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
}
