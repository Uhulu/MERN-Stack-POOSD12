import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [birthMonth, setBirthMonth] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false); // Added loading state
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const createStars = () => {
            const starsContainer = document.querySelector('.stars');
            if (starsContainer) {
                for (let i = 0; i < 100; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.top = `${Math.random() * 100}%`;
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.animationDelay = `${Math.random() * 5}s`;
                    starsContainer.appendChild(star);
                }
            }
        };

        createStars();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading to true during the API call

        const userData = {
            Login: login,
            Password: password,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            BirthMonth: birthMonth,
        };

        try {
            const response = await axios.post('http://poosd12.xyz:4000/api/register/signup', userData);

            if (response.status === 201) {
                setSuccess(response.data.message); // Display the success message
                setError('');
                // Redirect to login after a delay
                setTimeout(() => {
                    navigate('/'); // Redirect to login page
                }, 3000);
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            setSuccess('');
            console.error('Error during registration:', err);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <div className="stars"></div>
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input
                        type="text"
                        placeholder="Login"
                        required
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Birth Month"
                        required
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
