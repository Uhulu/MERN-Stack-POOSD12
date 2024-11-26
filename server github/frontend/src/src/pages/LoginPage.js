// src/pages/LoginPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const createStars = () => {
            const starsContainer = document.querySelector('.stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                starsContainer.appendChild(star);
            }
        };

        createStars();
    }, []);

    return (
        <div>
            <div className="stars"></div>
            <div className="login-container">
                <form className="login-form">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => navigate('/register')}>Register</button> {/* Navigate to Register page */}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;