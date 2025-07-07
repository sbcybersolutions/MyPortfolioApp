import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './admin.css'; // Shared admin styling

function AddSkillForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { authToken } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!name || !category) {
      setError('Skill name and category are required.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.post(`${API_URL}/api/skills`, { name, category }, config);

      setSuccess('Skill added successfully!');
      setName(''); // Clear form
      setCategory('');
      setTimeout(() => {
        navigate('/admin/skills'); // Redirect to skills management list
      }, 2000);

    } catch (err) {
      console.error('Error adding skill:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add skill. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container"> {/* Re-using container for consistency */}
      <h1>Add New Skill</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="project-form"> {/* Re-using form styling */}
        <div className="form-group">
          <label htmlFor="name">Skill Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Skill...' : 'Add Skill'}
        </button>
        <button type="button" onClick={() => navigate('/admin/skills')} className="btn btn-secondary" style={{ marginTop: '10px', alignSelf: 'flex-start' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddSkillForm;