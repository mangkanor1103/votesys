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
        <div style={styles.body}>
            <Head title="Welcome" />

            <div style={styles.container}>
                <h1 style={styles.title}>Mindoro State University Online Voting System</h1>

                {/* Input for Voter ID */}
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Enter Voter ID"
                        style={styles.input}
                    />
                </div>

                {/* Buttons Section */}
                <div style={styles.buttons}>
                    {/* Submit Button */}
                    <button
                        style={
                            hoveredButton === 'submit'
                                ? { ...styles.btn, ...styles.btnHover }
                                : styles.btn
                        }
                        onMouseEnter={() => handleHover('submit')}
                        onMouseLeave={handleLeave}
                    >
                        <i className="fas fa-check" style={styles.btnIcon}></i> Submit
                    </button>

                    {/* Sub Admin Button */}
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={300}
                        classNames="fade"
                    >
                        <Link
                            href={route('subAdmin.login')}  // Ensure this matches the route name in your Laravel routing
                            style={
                                hoveredButton === 'subAdmin'
                                    ? { ...styles.btn, ...styles.btnHover }
                                    : styles.btn
                            }
                            onMouseEnter={() => handleHover('subAdmin')}
                            onMouseLeave={handleLeave}
                        >
                            <i className="fas fa-user-shield" style={styles.btnIcon}></i> Sub Admin
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
                            style={
                                hoveredButton === 'superAdmin'
                                    ? { ...styles.btn, ...styles.btnHover }
                                    : styles.btn
                            }
                            onMouseEnter={() => handleHover('superAdmin')}
                            onMouseLeave={handleLeave}
                        >
                            <i className="fas fa-user-shield" style={styles.btnIcon}></i> Super Admin
                        </Link>
                    </CSSTransition>
                </div>

                {/* Contact Information */}
                <p style={styles.contactInfo}>
                    If you want to create your own election, please{' '}
                    <a
                        href="https://www.facebook.com/profile.php?id=61568601145118"
                        style={styles.contactLink}
                    >
                        contact us
                    </a>
                    .
                </p>
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
        margin: 0,
        background: 'linear-gradient(135deg, #2e8b57 0%, #32cd32 100%)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        overflow: 'hidden',
        padding: '10px',
    },
    container: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        transition: 'transform 0.3s ease-in-out',
        animation: 'fadeIn 1s ease-out', // Added animation for container fade-in
    },
    title: {
        fontSize: '28px',
        color: '#2d3436',
        marginBottom: '20px',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'color 0.3s ease', // Smooth transition for title color
    },
    inputGroup: {
        marginBottom: '20px',
    },
    input: {
        padding: '12px',
        width: '100%',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '12px',
        background: '#f9f9f9',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        outline: 'none',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#2e8b57',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        fontFamily: 'Arial, sans-serif',
    },
    btnHover: {
        backgroundColor: '#32cd32',
        transform: 'scale(1.1)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        animation: 'pulse 1s infinite', // Added pulse animation on hover
    },
    btnIcon: {
        fontSize: '18px',
        transition: 'transform 0.3s ease',
    },
    contactInfo: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#888',
        animation: 'fadeIn 1.5s ease-out', // Added fade-in animation for contact info
    },
    contactLink: {
        color: '#2e8b57',
        textDecoration: 'underline',
        transition: 'color 0.3s ease',
    },
};

// Keyframes for animations
const globalStyles = {
    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
    '@keyframes pulse': {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
    },
};
