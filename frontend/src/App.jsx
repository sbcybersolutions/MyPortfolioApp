import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Keep the existing App.css for basic styling

// Placeholder Components (we'll create these files next)
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar'; // We'll create this

function App() {
  return (
    <Router>
      <Navbar /> {/* This will be our navigation bar */}
      <div className="container"> {/* A simple container for page content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* You can add a 404 Not Found route here later if desired */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;