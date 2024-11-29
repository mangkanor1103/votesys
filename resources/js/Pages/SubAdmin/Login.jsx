import { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Inertia useForm hook

export default function Login() {
    // Form setup with Inertia's useForm hook
    const { data, setData, post, errors, processing } = useForm({
        election_code: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/sub-admin/login'); // Submit the form to the sub-admin login route
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h1 style={styles.title}>Sub Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Enter Election Code"
                            value={data.election_code}
                            onChange={(e) => setData('election_code', e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    {/* Show validation error if exists */}
                    {errors.election_code && <p style={styles.error}>{errors.election_code}</p>}
                    <button type="submit" style={styles.btn} disabled={processing}>
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2e8b57 0%, #32cd32 100%)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    container: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        fontSize: '24px',
        color: '#2d3436',
        marginBottom: '20px',
        fontWeight: '700',
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        padding: '12px',
        width: '100%',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '10px',
        background: '#f9f9f9',
        outline: 'none',
    },
    btn: {
        backgroundColor: '#2e8b57',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    error: {
        color: 'red',
        fontSize: '14px',
        marginBottom: '10px',
    },
};
