// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register'; // Import the Register component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<Register />} /> {/* Add the Register route */}
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;