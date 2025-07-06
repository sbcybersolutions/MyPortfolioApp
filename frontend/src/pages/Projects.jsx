import React, { useState, useEffect } from 'react';
import axios from 'axios'; // We'll install axios for easier HTTP requests
import './Projects.css'; // Optional: for project-specific styling

function Projects() {
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);   // State to store any error messages

  // Define your backend API URL
  // In development, this is your localhost backend port (e.g., 5000)
  // When deployed, this will be your actual backend domain
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Use Vite's env variable

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make a GET request to your backend's /api/projects endpoint
        const response = await axios.get(`${API_URL}/api/projects`);
        setProjects(response.data); // Update the state with the fetched projects
        setLoading(false);         // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.'); // Set an error message
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProjects(); // Call the fetch function when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once on mount

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
      </div>
    );
  }

  return (
    <div className="projects-container">
      <h1>My Projects</h1>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;