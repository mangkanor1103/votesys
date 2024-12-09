import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function StuDashboard() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        try {
            // Fetch student data from localStorage
            const storedStudent = localStorage.getItem('studentData');
            if (storedStudent) {
                const parsedStudent = JSON.parse(storedStudent);
                console.log('Fetched student data:', parsedStudent); // Debug
                setStudent(parsedStudent);
            } else {
                console.log('No student data found in localStorage'); // Debug
            }
        } catch (error) {
            console.error('Error fetching student data from localStorage:', error); // Debug
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Dashboard" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Welcome to the Student Dashboard</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                You're successfully registered as a student at Mindoro State University.
            </p>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {student ? (
                    <div>
                        <p><strong>ID:</strong> {student.id}</p>
                        <p><strong>School ID:</strong> {student.school_id}</p>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                    </div>
                ) : (
                    <p>Loading student information...</p>
                )}
            </div>
        </div>
    );
}
