import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function StuDashboard() {
    const [student, setStudent] = useState(null);
    const [elections, setElections] = useState([]);

    useEffect(() => {
        // Fetch student data from localStorage
        const storedStudent = localStorage.getItem('studentData');
        if (storedStudent) {
            const parsedStudent = JSON.parse(storedStudent);
            setStudent(parsedStudent);
        }
    
        // Fetch elections data from the backend API
        axios.get('/elections') // Adjust the URL if needed
            .then(response => {
                if (response.data && response.data.length > 0) {
                    setElections(response.data);
                } else {
                    console.log('No elections available');
                }
            })
            .catch(error => {
                console.error('Error fetching elections:', error);
                alert('Error fetching elections. Please try again later.');
            });
    }, []);
    

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-200 to-green-500 flex flex-col justify-center items-center">
            <Head title="Student Dashboard" />
            <h1 className="text-4xl font-extrabold text-green-900 mb-6">Welcome to the Student Dashboard</h1>
            <p className="text-lg text-green-800 mb-12 text-center">
                You're successfully registered as a student at Mindoro State University.
            </p>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
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

            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Elections</h2>
                <table className="min-w-full divide-y divide-green-200">
                    <thead className="bg-green-600">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Date</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-white uppercase tracking-wide">Election Code</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-green-100">
                        {elections.length > 0 ? (
                            elections.map((election) => (
                                <tr key={election.id} className="hover:bg-green-50">
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_name}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_date}</td>
                                    <td className="px-6 py-4 text-sm text-green-900">{election.election_code}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-sm text-center text-green-900">No elections created yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
