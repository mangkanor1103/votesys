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
                        <FaRegFlag style={styles.btnIcon} /> Submit
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
                            style={
                                hoveredButton === 'subAdmin'
                                    ? { ...styles.btn, ...styles.btnHover }
                                    : styles.btn
                            }
                            onMouseEnter={() => handleHover('subAdmin')}
                            onMouseLeave={handleLeave}
                        >
                            <FaUsers style={styles.btnIcon} /> Sub Admin
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
                            <FaChalkboardTeacher style={styles.btnIcon} /> Super Admin
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
        background: 'radial-gradient(circle, #e6f9e6 0%, #b7e3b7 100%)', // Light green gradient
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        overflow: 'hidden',
        padding: '10px',
    },
    container: {
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(230, 244, 230, 0.9), rgba(204, 240, 204, 0.95))',
        color: '#333',
        padding: '40px',
        borderRadius: '25px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '450px',
        transition: 'transform 0.3s ease-in-out',
        animation: 'fadeIn 1s ease-out',
        backdropFilter: 'blur(10px)',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        letterSpacing: '3px',
        textShadow: '0 2px 10px rgba(80, 160, 80, 0.5)',
        marginBottom: '30px',
    },
    inputGroup: {
        marginBottom: '30px',
    },
    input: {
        padding: '14px',
        width: '100%',
        fontSize: '16px',
        border: '2px solid #66b266', // Green border
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#333',
        boxShadow: '0 4px 15px rgba(80, 160, 80, 0.2)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        outline: 'none',
        fontFamily: 'Arial, sans-serif',
        caretColor: '#4caf50', // Green caret
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#66b266', // Green button
        color: '#333',
        padding: '14px 28px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '35px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        fontFamily: 'Arial, sans-serif',
        textTransform: 'uppercase',
    },
    btnHover: {
        backgroundColor: '#4caf50', // Darker green on hover
        transform: 'scale(1.1)',
        boxShadow: '0 10px 30px rgba(80, 160, 80, 0.4)',
        animation: 'pulse 1s infinite',
    },
    btnIcon: {
        fontSize: '20px',
        transition: 'transform 0.3s ease',
    },
    contactInfo: {
        marginTop: '25px',
        fontSize: '14px',
        color: '#558855', // Green contact text
        animation: 'fadeIn 1.5s ease-out',
    },
    contactLink: {
        color: '#4caf50',
        textDecoration: 'underline',
        transition: 'color 0.3s ease',
    },
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
