import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth(); // <-- ADDED isAdmin
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
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
        {isAdmin ? ( // <-- Only show admin links if isAdmin is true
          // If authenticated AND is Admin, show Admin Dashboard and Logout
          <>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-button">Logout ({user?.username})</button>
            </li>
          </>
        ) : isAuthenticated ? ( // If authenticated but NOT admin (normal user)
          <>
            <li>
              {/* You could add a 'My Profile' or similar link for regular users here */}
              <button onClick={handleLogout} className="nav-button">Logout ({user?.username})</button>
            </li>
          </>
        ) : ( // If not authenticated at all
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