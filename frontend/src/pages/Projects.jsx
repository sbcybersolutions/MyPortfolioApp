import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Projects.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth to check if authenticated

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(''); // For delete success message
  const [deleteError, setDeleteError] = useState('');     // For delete error message

  const { isAuthenticated, authToken } = useAuth(); // Get auth state and token

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle project deletion
  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      setDeleteSuccess('');
      setDeleteError('');
      try {
        await axios.delete(`${API_URL}/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send the JWT for protected route
          },
        });
        setDeleteSuccess('Project deleted successfully!');
        // After successful deletion, re-fetch projects to update the list
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
        setDeleteError('Failed to delete project. Please try again.');
      }
    }
  };

  // Handle project edit (redirects to a new edit form page)
  const handleEdit = (projectId) => {
    navigate(`/admin/edit-project/${projectId}`); // We'll create this route and component next
  };


  if (loading) {
    return (
      <div className="projects-container">
        <h2>Loading Projects...</h2>
        <p>Please wait while we fetch your amazing portfolio items.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container error-message">
        <h2>Error!</h2>
        <p>{error}</p>
        <p>Make sure your backend server is running and accessible.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="projects-container">
        <h2>No Projects Yet</h2>
        <p>It looks like there are no projects to display. Add some from your backend!</p>
        {isAuthenticated && (
          <p>
            <Link to="/admin/add-project" className="btn btn-primary">Add New Project</Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      {deleteSuccess && <p className="success-message">{deleteSuccess}</p>}
      {deleteError && <p className="error-message">{deleteError}</p>}
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.title} className="project-image" />
            )}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.technologies && project.technologies.length > 0 && (
              <p className="project-tech">
                **Technologies:** {project.technologies.join(', ')}
              </p>
            )}
            <div className="project-links">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}

              {/* Admin-only buttons */}
              {isAuthenticated && (
                <div className="admin-project-actions">
                  <button
                    onClick={() => handleEdit(project._id)}
                    className="btn btn-edit" // New class for edit button
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="btn btn-delete" // New class for delete button
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;