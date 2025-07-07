import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import '../assets/profile-image.jpg'; // Placeholder for your image
import './Home.css'; // Create this CSS file for Home page specific styles

function Home() {
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
          {/* Replace with your actual profile image path */}
          <img src="/src/assets/profile-image.jpg" alt="Your Profile" />
        </div>
      </section>

      <section className="section-divider">
        <h3>My Expertise</h3>
      </section>

      <section className="skills-summary">
        <div className="skill-item">
          <h4>Frontend Development</h4>
          <p>React, JavaScript (ES6+), HTML5, CSS3, Responsive Design</p>
        </div>
        <div className="skill-item">
          <h4>Backend Development</h4>
          <p>Node.js, Express.js, RESTful APIs</p>
        </div>
        <div className="skill-item">
          <h4>Database Management</h4>
          <p>MongoDB, Mongoose</p>
        </div>
      </section>
    </div>
  );
}

export default Home;