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
      <div className="admin-actions-grid">
        <Link to="/admin/add-project" className="btn btn-primary">Add New Project</Link>
        <Link to="/admin/messages" className="btn btn-primary">View Contact Messages</Link>
        <Link to="/admin/skills" className="btn btn-primary">Manage Skills</Link> {/* NEW LINK */}
      </div>
    </div>
  );
}

export default AdminDashboard;