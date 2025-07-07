import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // To get the auth token
import './admin.css';


function AddProjectForm() {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState(''); // Store as comma-separated string initially
  const [demoLink, setDemoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { authToken } = useAuth(); // Get the authentication token from context

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation (can be more extensive)
    if (!title || !description || !technologies) {
      setError('Title, Description, and Technologies are required.');
      setLoading(false);
      return;
    }

    // Convert comma-separated technologies string to an array
    const technologiesArray = technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '');

    try {
      // Make the POST request to the backend
      const response = await axios.post(
        `${API_URL}/api/projects`,
        {
          title,
          description,
          technologies: technologiesArray, // Send as array
          demoLink,
          githubLink,
          imageUrl,
        },
        {
          // Include the Authorization header with the JWT token
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSuccess('Project added successfully!');
      // Optionally, clear the form or redirect after success
      setTitle('');
      setDescription('');
      setTechnologies('');
      setDemoLink('');
      setGithubLink('');
      setImageUrl('');

      // Optional: Redirect back to admin dashboard or projects list after a delay
      setTimeout(() => {
        navigate('/admin'); // Or '/projects' if you want to see it live immediately
      }, 2000);

    } catch (err) {
      console.error('Error adding project:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Backend error message
      } else {
        setError('Failed to add project. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add New Project</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
            disabled={loading}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="technologies">Technologies (comma separated):</label>
          <input
            type="text"
            id="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="e.g., React, Node.js, MongoDB"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="demoLink">Live Demo Link (URL):</label>
          <input
            type="url"
            id="demoLink"
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            placeholder="https://yourproject.com"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="githubLink">GitHub Repository Link (URL):</label>
          <input
            type="url"
            id="githubLink"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/youruser/yourproject"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Project Image URL (URL):</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/project_image.jpg"
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Project...' : 'Add Project'}
        </button>
      </form>
    </div>
  );
}

export default AddProjectForm;