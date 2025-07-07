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
import SkillsManagement from './pages/admin/SkillsManagement';
import AddSkillForm from './pages/admin/AddSkillForm';
import EditSkillForm from './pages/admin/EditSkillForm';


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

            {/* PROTECTED ADMIN ROUTES - NOW WITH ROLE CHECK */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-project"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <AddProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-project/:id"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <EditProjectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <SkillsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-skill"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <AddSkillForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-skill/:id"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <EditSkillForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <ProtectedRoute requiredRole="admin"> {/* <-- ADDED requiredRole */}
                  <MessagesList />
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