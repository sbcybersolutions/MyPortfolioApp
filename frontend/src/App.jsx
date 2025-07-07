import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Existing Imports
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

// NEW AUTH IMPORTS
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// We'll add an AdminDashboard and AddProjectForm later
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AddProjectForm from './pages/admin/AddProjectForm';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* NEW AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes will go here later */}
          {/*
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-project" element={<ProtectedRoute><AddProjectForm /></ProtectedRoute>} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;