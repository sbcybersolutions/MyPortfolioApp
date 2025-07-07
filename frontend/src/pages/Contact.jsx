import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'; // Your existing Contact.css

function Contact() {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // State for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');
    setSuccess('');

    // Client-side validation (basic)
    if (!name || !email || !message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) { // Basic email regex
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // Make the POST request to your new message API
      const response = await axios.post(`${API_URL}/api/messages`, {
        name,
        email,
        subject,
        message,
      });

      setSuccess('Your message has been sent successfully! I will get back to you soon.');
      // Clear form fields on success
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

    } catch (err) {
      console.error('Error sending message:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from backend
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

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
              I'm on LinkedIn
            </a>
          </p>
        </div>
        <div className="contact-info-card">
          <h3>GitHub</h3>
          <p>
            <a href="https://github.com/sbcybersolutions" target="_blank" rel="noopener noreferrer">
              I'm on GitHub
            </a>
          </p>
        </div>
      </div>

      <section className="contact-form-section">
        <h2>Send Me a Message</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="contact-form"> {/* Added class for specific styling */}
            <div className="form-group">
                <label htmlFor="name">Your Name:</label>
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
                <label htmlFor="email">Your Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <label htmlFor="subject">Subject (Optional):</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Your Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    required
                    disabled={loading}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
            </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;