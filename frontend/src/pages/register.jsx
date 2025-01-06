import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
            console.log("Registration successful!", response.data);
            setMessage("Registration successful! Redirecting to login...");
            
            // Redirect to login page after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error("Error:", error.response?.data);
            setError(error.response?.data?.error || "An error occurred during registration.");
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h1>Register Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username</label><br />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br />
                <label>Email</label><br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /><br />
                <label>Password</label><br />
                <input
                    type="password"
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                /><br />
                <label>Confirm Password</label><br />
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                /><br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
