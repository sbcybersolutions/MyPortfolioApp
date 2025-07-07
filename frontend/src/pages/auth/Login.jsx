import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // For navigation and linking to register
import axios from 'axios';
import '../auth/auth.css'; // Import shared auth styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Define your backend API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');      // Clear previous errors
    setLoading(true);  // Set loading state

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      // Assuming your backend sends the token in response.data.token
      const { token, _id, username: loggedInUsername } = response.data;

      // Store token and user info in localStorage (or sessionStorage for less persistence)
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ _id, username: loggedInUsername }));

      // Redirect to an admin dashboard or home page after successful login
      navigate('/admin'); // We'll create this admin route soon!
      // Optionally, refresh page to re-render components that check auth status
      window.location.reload();

    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from backend
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <p className="auth-switch-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;