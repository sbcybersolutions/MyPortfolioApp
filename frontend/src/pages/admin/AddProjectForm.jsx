import React from 'react';

function AddProjectForm() {
  return (
    <div className="add-project-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ color: 'var(--color-yellow)' }}>Add New Project</h1>
      <p style={{ color: '#D0D0D0', marginTop: '20px' }}>
        **Placeholder for the project submission form.**
        You will fill this out to add new projects to your portfolio via the backend API.
      </p>
      {/* Future Project Form will go here */}
      <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '600px',
          margin: '30px auto',
          padding: '30px',
          backgroundColor: '#1A2A47',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          textAlign: 'left'
      }}>
          <input type="text" placeholder="Project Title" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }} />
          <textarea placeholder="Description" rows="5" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }}></textarea>
          <input type="text" placeholder="Technologies (comma separated)" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }} />
          <input type="url" placeholder="Demo Link (URL)" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }} />
          <input type="url" placeholder="GitHub Link (URL)" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }} />
          <input type="url" placeholder="Image URL (for project card)" disabled style={{ padding: '12px', border: '1px solid #0A89A6', borderRadius: '5px', background: '#0C1D40', color: '#E0E0E0' }} />
          <button type="submit" disabled style={{
              backgroundColor: 'var(--color-primary-blue)',
              color: 'white',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'not-allowed',
              fontSize: '1.1em',
              alignSelf: 'flex-start'
          }}>Add Project</button>
      </form>
    </div>
  );
}

export default AddProjectForm;