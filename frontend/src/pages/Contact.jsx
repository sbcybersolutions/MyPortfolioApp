import React from 'react';
import './Contact.css'; // Create this CSS file for Contact page specific styles

function Contact() {
  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p className="contact-intro">
        Have a project in mind, a question, or just want to say hello?
        Feel free to reach out using the options below or fill out the form.
      </p>

      <div className="contact-info-grid">
        <div className="contact-info-card">
          <h3>Email</h3>
          <p>
            <a href="mailto:christian@sbcyber.net">christian@sbcyber.net</a>
          </p>
        </div>
        <div className="contact-info-card">
          <h3>LinkedIn</h3>
          <p>
            <a href="https://linkedin.com/in/christiansalafia" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/christiansalafia
            </a>
          </p>
        </div>
        <div className="contact-info-card">
          <h3>GitHub</h3>
          <p>
            <a href="https://github.com/sbcybersolutions" target="_blank" rel="noopener noreferrer">
              github.com/sbcybersolutions
            </a>
          </p>
        </div>
      </div>

      <section className="contact-form-section">
        <h2>Send Me a Message</h2>
        <p>
          **Placeholder for the Contact Form.**
          We will build the actual form here that sends data to your Node.js backend.
        </p>
        {/* Future Contact Form will go here */}
        <form className="placeholder-form">
            <input type="text" placeholder="Your Name" disabled />
            <input type="email" placeholder="Your Email" disabled />
            <textarea placeholder="Your Message" rows="5" disabled></textarea>
            <button type="submit" disabled className="btn btn-primary">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;