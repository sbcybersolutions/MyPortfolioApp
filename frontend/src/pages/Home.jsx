import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for fetching skills
import '../assets/profile-image.jpg';
import './Home.css';

function Home() {
  const [skills, setSkills] = useState([]); // State for skills
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/skills`);
        // Sort skills by category and then name for display
        const sortedSkills = response.data.sort((a, b) => {
          if (a.category < b.category) return -1;
          if (a.category > b.category) return 1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setSkills(sortedSkills);
        setLoadingSkills(false);
      } catch (err) {
        console.error('Error fetching skills for homepage:', err);
        setSkillsError('Failed to load skills.');
        setLoadingSkills(false);
      }
    };
    fetchSkills();
  }, []); // Run once on mount

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill.name);
    return acc;
  }, {});

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Hi, I'm **[Your Name]**</h1>
          <h2>A Full-Stack Developer</h2>
          <p>
            Building robust web applications from frontend to backend.
            I specialize in creating dynamic and user-friendly experiences
            with modern technologies like React, Node.js, and MongoDB.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View My Work</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/assets/profile-image.jpg" alt="Your Profile" />
        </div>
      </section>

      <section className="section-divider">
        <h3>My Expertise</h3>
      </section>

      <section className="skills-summary">
        {loadingSkills ? (
          <p style={{color: 'var(--color-medium-gray)'}}>Loading skills...</p>
        ) : skillsError ? (
          <p className="error-message">{skillsError}</p>
        ) : skills.length === 0 ? (
          <p style={{color: 'var(--color-medium-gray)'}}>No skills added yet. Add some via the admin panel!</p>
        ) : (
          // Dynamically render skill categories and lists
          Object.entries(groupedSkills).map(([category, skillNames]) => (
            <div key={category} className="skill-item">
              <h4>{category}</h4>
              <p>{skillNames.join(', ')}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Home;