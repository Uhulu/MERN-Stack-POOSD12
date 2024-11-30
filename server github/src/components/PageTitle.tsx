import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const PageTitle = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const userData = {
            Password: password,
            Email: email,
        };

        try {
            const response = await axios.post('http://poosd12.xyz:4000/api/user/login', userData);

            // Check the response from the backend
            if (response.data.message === 'Login successful') {
                localStorage.setItem('userId', response.data.userId); // Save userId if needed
                setSuccess(response.data.message); // Show success message
                setError(''); // Clear any error messages
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                setError('Login failed. Please check your credentials.');
                setSuccess(''); // Clear success messages
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            setSuccess('');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="stars"></div>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                    <button type="button" onClick={() => navigate('/register')}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default PageTitle;
