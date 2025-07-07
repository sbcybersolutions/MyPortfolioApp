import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './admin.css'; // Shared admin styling

function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  const { authToken } = useAuth(); // Need auth token for protected routes

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Function to fetch skills from backend
  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/skills`); // Public GET route
      // Sort by category and then by name for better readability
      const sortedSkills = response.data.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      setSkills(sortedSkills);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Failed to load skills. Please try again.');
      setLoading(false);
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []); // Run once on mount

  // Handle deleting a skill
  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setActionSuccess('');
      setActionError('');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        await axios.delete(`${API_URL}/api/skills/${skillId}`, config);
        setActionSuccess('Skill deleted successfully!');
        fetchSkills(); // Re-fetch skills to update list
      } catch (err) {
        console.error('Error deleting skill:', err);
        setActionError('Failed to delete skill. Make sure you are logged in.');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <h2>Loading Skills...</h2>
        <p>Fetching your skills from the database.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-container error-message">
        <h2>Error!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <h1>Manage Skills</h1>
      {actionSuccess && <p className="success-message">{actionSuccess}</p>}
      {actionError && <p className="error-message">{actionError}</p>}

      <div className="admin-actions-grid" style={{ marginBottom: '40px' }}>
        <Link to="/admin/add-skill" className="btn btn-primary">Add New Skill</Link>
      </div>

      {skills.length === 0 ? (
        <p>No skills added yet. Start by adding a new skill!</p>
      ) : (
        <div className="skills-management-list">
          {/* Group skills by category */}
          {Array.from(new Set(skills.map(skill => skill.category))).map(category => (
            <div key={category} className="skill-category-group">
              <h2>{category}</h2>
              <div className="skill-cards-grid">
                {skills.filter(skill => skill.category === category).map(skill => (
                  <div key={skill._id} className="skill-management-card">
                    <span>{skill.name}</span>
                    <div className="skill-actions">
                      <Link to={`/admin/edit-skill/${skill._id}`} className="btn btn-edit">Edit</Link>
                      <button onClick={() => handleDeleteSkill(skill._id)} className="btn btn-delete">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillsManagement;