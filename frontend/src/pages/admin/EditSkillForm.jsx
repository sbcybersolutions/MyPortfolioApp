import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './admin.css'; // Shared admin styling

function EditSkillForm() {
  const { id } = useParams(); // Get the skill ID from the URL
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const [loading, setLoading] = useState(true); // Initial loading for fetching skill data
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Effect to fetch skill data when component mounts or ID changes
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/skills/${id}`);
        const skill = response.data;
        setName(skill.name || '');
        setCategory(skill.category || '');
        setLoading(false); // Stop initial loading
      } catch (err) {
        console.error('Error fetching skill for edit:', err);
        setError('Failed to load skill for editing. Please check the ID.');
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, API_URL]); // Re-run effect if ID or API_URL changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!name || !category) {
      setError('Skill name and category are required for update.');
      setSubmitting(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.put(
        `${API_URL}/api/skills/${id}`,
        { name, category },
        config
      );

      setSuccess('Skill updated successfully!');
      setTimeout(() => {
        navigate('/admin/skills'); // Navigate back to skills list
      }, 2000);

    } catch (err) {
      console.error('Error updating skill:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update skill. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-project-container">
        <h1>Loading Skill for Edit...</h1>
        <p>Please wait while we fetch the skill details.</p>
      </div>
    );
  }

  if (error && !submitting) {
    return (
      <div className="add-project-container error-message">
        <h2>Error!</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/admin/skills')} className="btn btn-primary" style={{marginTop: '20px'}}>Back to Skills</button>
      </div>
    );
  }

  return (
    <div className="add-project-container">
      <h1>Edit Skill</h1>
      {error && submitting && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="name">Skill Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Frontend, Backend, Tools"
            required
            disabled={submitting}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Updating Skill...' : 'Update Skill'}
        </button>
        <button type="button" onClick={() => navigate('/admin/skills')} className="btn btn-secondary" style={{ marginTop: '10px', alignSelf: 'flex-start' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditSkillForm;