import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you might link to other admin pages
import { useAuth } from '../../context/AuthContext'; // To display logged-in user
import './admin.css'; // Importing admin-specific styles

function AdminDashboard() {
  const { user } = useAuth(); // Get user details from context

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <p>
        This is your private admin area. Here you can manage your portfolio content.
      </p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/admin/add-project" style={{
            backgroundColor: 'var(--color-primary-blue)',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1em',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            display: 'inline-block'
        }}>Add New Project</Link>
        {/* Future links for managing skills, messages, etc. */}
        <p style={{ color: '#aaa', marginTop: '20px' }}>
            (Other admin functionalities like 'Edit Projects', 'Manage Skills', 'View Messages' will go here)
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;