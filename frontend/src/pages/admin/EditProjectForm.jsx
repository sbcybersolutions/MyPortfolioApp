import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams to get ID
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './admin.css'; // Import shared admin styling

function EditProjectForm() {
  const { id } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate();
  const { authToken } = useAuth();

  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // State for UI feedback and data fetching
  const [loading, setLoading] = useState(true); // Initial loading for fetching project data
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // useEffect to fetch project data when component mounts or ID changes
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/${id}`);
        const project = response.data;
        setTitle(project.title || '');
        setDescription(project.description || '');
        setTechnologies(project.technologies ? project.technologies.join(', ') : '');
        setDemoLink(project.demoLink || '');
        setGithubLink(project.githubLink || '');
        setImageUrl(project.imageUrl || '');
        setLoading(false); // Stop initial loading
      } catch (err) {
        console.error('Error fetching project for edit:', err);
        setError('Failed to load project for editing. Please check the ID.');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, API_URL]); // Re-run effect if ID or API_URL changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!title || !description || !technologies) {
      setError('Title, Description, and Technologies are required.');
      setSubmitting(false);
      return;
    }

    const technologiesArray = technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '');

    try {
      // Make the PUT request to update the project
      await axios.put(
        `${API_URL}/api/projects/${id}`,
        {
          title,
          description,
          technologies: technologiesArray,
          demoLink,
          githubLink,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSuccess('Project updated successfully!');
      setTimeout(() => {
        navigate('/projects'); // Navigate back to projects list after update
      }, 2000);

    } catch (err) {
      console.error('Error updating project:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update project. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="add-project-container">
        <h1>Loading Project for Edit...</h1>
        <p>Please wait while we fetch the project details.</p>
      </div>
    );
  }

  if (error && !submitting) { // Show initial fetch error, but not submission error here
    return (
      <div className="add-project-container error-message">
        <h2>Error!</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/admin')} className="btn btn-primary" style={{marginTop: '20px'}}>Back to Admin</button>
      </div>
    );
  }

  return (
    <div className="add-project-container">
      <h1>Edit Project</h1>
      {error && submitting && <p className="error-message">{error}</p>} {/* Show submission error here */}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Updating Project...' : 'Update Project'}
        </button>
        <button type="button" onClick={() => navigate('/projects')} className="btn btn-secondary" style={{ marginTop: '10px', alignSelf: 'flex-start' }}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProjectForm;