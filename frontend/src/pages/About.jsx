import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import './About.css'; // Create this CSS file for About page specific styles

function About() {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <section className="about-introduction">
        <p>
          Hello! I'm Christian, a passionate Full-Stack Developer with a knack for
          creating efficient, scalable, and user-friendly web applications. My journey
          into the world of coding began with a fascination for how technology solves
          real-world problems, and it has since evolved into a dedicated career in web development.
        </p>
        <p>
          I thrive on bringing ideas to life, from conceptualization and design
          to deployment and maintenance. My approach is always client-focused,
          ensuring that the final product not only meets but exceeds expectations.
        </p>
      </section>

      <section className="about-skills">
        <h2>My Core Skills</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Frontend</h3>
            <ul>
              <li>React.js</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML5 & CSS3</li>
              <li>Responsive Design</li>
              <li>UI/UX Principles</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>RESTful APIs</li>
              <li>Authentication & Authorization</li>
              <li>Deployment</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Databases</h3>
            <ul>
              <li>MongoDB</li>
              <li>Mongoose ODM</li>
              <li>SQL (PostgreSQL/MySQL - if applicable)</li>
              <li>Database Design</li>
            </ul>
          </div>
          <div className="skill-card">
            <h3>Tools & Others</h3>
            <ul>
              <li>Git & GitHub</li>
              <li>VS Code</li>
              <li>Postman / Insomnia</li>
              <li>Netlify / Vercel (for frontend)</li>
              <li>Render / Heroku (for backend)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-journey">
        <h2>My Journey</h2>
        <p>
          I started my professional career in [Previous Industry/Role] where I honed my skills in
          [relevant skills, e.g., problem-solving, project management, communication].
          Driven by a desire for [reason for career change], I transitioned into software
          development, immersing myself in bootcamps and self-learning resources.
          This transition has been incredibly rewarding, allowing me to combine my
          [previous skills] with my passion for technology.
        </p>
        <p>
          I am continuously learning and adapting to new technologies, always striving
          to improve my craft and deliver high-quality solutions.
        </p>
      </section>

      <section className="about-cta">
        <p>Ready to bring your ideas to life? Let's connect!</p>
        <Link to="/contact" className="btn btn-primary">Contact Me</Link>
      </section>
    </div>
  );
}

export default About;