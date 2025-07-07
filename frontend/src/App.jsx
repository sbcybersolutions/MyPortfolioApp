import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Existing Imports
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Components
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProjectForm from './pages/admin/AddProjectForm';
import EditProjectForm from './pages/admin/EditProjectForm';
import MessagesList from './pages/admin/MessagesList';
import SkillsManagement from './pages/admin/SkillsManagement'; // NEW IMPORT
import AddSkillForm from './pages/admin/AddSkillForm';       // NEW IMPORT
import EditSkillForm from './pages/admin/EditSkillForm';     // NEW IMPORT


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* PROTECTED ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-project"
              element={
                <ProtectedRoute>
                  <AddProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-project/:id"
              element={
                <ProtectedRoute>
                  <EditProjectForm />
                </ProtectedRoute>
              }
            />
            <Route // NEW ROUTE FOR SKILLS MANAGEMENT
              path="/admin/skills"
              element={
                <ProtectedRoute>
                  <SkillsManagement />
                </ProtectedRoute>
              }
            />
            <Route // NEW ROUTE FOR ADD SKILL
              path="/admin/add-skill"
              element={
                <ProtectedRoute>
                  <AddSkillForm />
                </ProtectedRoute>
              }
            />
            <Route // NEW ROUTE FOR EDIT SKILL
              path="/admin/edit-skill/:id"
              element={
                <ProtectedRoute>
                  <EditSkillForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;