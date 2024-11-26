import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Register.css'; // Import the CSS file

const Register = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Prepare the data to send to the backend
        const userData = {
            Login: login,
            Password: password,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            BirthMonth: birthMonth
        };

        try {
            const response = await axios.post('http://localhost:4000/api/register/signup', userData); // Replace with your actual endpoint
            setSuccess('Registration successful!'); // Set success message
            setError(''); // Clear any previous error
            console.log(response.data); // Handle response as needed
        } catch (err) {
            setError('Registration failed. Please try again.'); // Set error message
            setSuccess(''); // Clear any previous success
            console.error(err); // Log the error
        }
    };

    return (
        <div>
            <div className="stars"></div> {/* Add stars background */}
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
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
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value)}
                    />
                    <button type="submit">Register</button>
                    {error && <p className="error">{error}</p>} {/* Display error message */}
                    {success && <p className="success">{success}</p>} {/* Display success message */}
                </form>
            </div>
        </div>
    );
};

export default Register;