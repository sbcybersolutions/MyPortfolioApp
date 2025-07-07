import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';
import { useAuth } from '../context/AuthContext'; // NEW: Import useAuth hook

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/login'); // Redirect to login page after logout
    window.location.reload(); // Optional: A full reload can ensure all components update
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">My Portfolio</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isAuthenticated ? (
          // If authenticated, show Admin Dashboard and Logout
          <>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-button">Logout ({user?.username})</button>
            </li>
          </>
        ) : (
          // If not authenticated, show Login and Register
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;