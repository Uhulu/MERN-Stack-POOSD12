import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container" style={styles.container}>
                {/* Link to Home Page */}
                <Link to="/" style={styles.logo}>
                    <h1>Constellations</h1>
                </Link>

                {/* Navigation Links */}
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>
                        Home
                    </Link>
                    <Link to="/starfield" style={styles.navLink}>
                        StarField
                    </Link>
                </nav>
            </div>
        </header>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#0b0b28', // Dark background to match your theme
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    },
    logo: {
        textDecoration: 'none',
        color: '#ffffff', // Star color from your theme
    },
    nav: {
        display: 'flex',
        gap: '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#ffffff', // Star color from your theme
        fontWeight: 'bold',
        fontSize: '1rem',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    navLinkHover: {
        backgroundColor: '#1aac83', // Highlight on hover (your primary color)
    },
};

export default Navbar;
