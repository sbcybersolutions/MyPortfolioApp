import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './admin.css'; // Import shared admin styling

function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(''); // For actions like read/delete
  const [actionError, setActionError] = useState('');

  const { authToken } = useAuth(); // Need auth token for protected routes

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Function to fetch messages from backend
  const fetchMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/messages`, config);
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Make sure you are logged in and backend is running.');
      setLoading(false);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    if (authToken) { // Only fetch if authenticated
      fetchMessages();
    } else {
      setLoading(false);
      setError('You must be logged in to view messages.');
    }
  }, [authToken]); // Re-fetch if authToken changes

  // Handle marking a message as read
  const handleMarkAsRead = async (messageId) => {
    setActionSuccess('');
    setActionError('');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.put(`${API_URL}/api/messages/${messageId}/read`, {}, config);
      setActionSuccess('Message marked as read!');
      fetchMessages(); // Re-fetch messages to update status
    } catch (err) {
      console.error('Error marking message as read:', err);
      setActionError('Failed to mark message as read.');
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      setActionSuccess('');
      setActionError('');
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        await axios.delete(`${API_URL}/api/messages/${messageId}`, config);
        setActionSuccess('Message deleted successfully!');
        fetchMessages(); // Re-fetch messages to update list
      } catch (err) {
        console.error('Error deleting message:', err);
        setActionError('Failed to delete message.');
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <h2>Loading Messages...</h2>
        <p>Please wait while we fetch your contact messages.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-container error-message">
        <h2>Error!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="admin-dashboard-container">
        <h1>Contact Messages</h1>
        <p>No messages received yet.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <h1>Contact Messages</h1>
      {actionSuccess && <p className="success-message">{actionSuccess}</p>}
      {actionError && <p className="error-message">{actionError}</p>}
      <div className="messages-list">
        {messages.map((message) => (
          <div key={message._id} className={`message-card ${message.isRead ? 'read' : 'unread'}`}>
            <h3>From: {message.name} &lt;{message.email}&gt;</h3>
            {message.subject && <p><strong>Subject:</strong> {message.subject}</p>}
            <p className="message-content">{message.message}</p>
            <p className="message-date">Received: {new Date(message.createdAt).toLocaleString()}</p>
            <div className="message-actions">
              {!message.isRead && (
                <button
                  onClick={() => handleMarkAsRead(message._id)}
                  className="btn btn-edit" // Re-using btn-edit style
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDeleteMessage(message._id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MessagesList;