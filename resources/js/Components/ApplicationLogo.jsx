export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="images/logo.jpg" // Replace with the actual path to your logo image
            alt="Logo"
            style={{
                width: '50px', // Smaller size
                height: '50px', // Keep it square for a perfect circle
                borderRadius: '50%', // This makes the image circular
                objectFit: 'cover' // Ensures the image covers the entire circle
            }}
        />
    );
}
