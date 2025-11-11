import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import VoiceChat from './pages/VoiceChat';
import TextChat from './pages/TextChat';
import Conversations from './pages/Conversations';
import GrammarCheck from './pages/GrammarCheck';
import ReplyGenerator from './pages/ReplyGenerator';

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#0f172a'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTop: '3px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/setup" replace />;
}

function SetupRoute({ children }) {
  const { user, loading } = useUser();
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#0f172a'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTop: '3px solid #6366f1',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }
  
  // If user is already logged in, redirect to home
  return user ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route 
            path="/setup" 
            element={
              <SetupRoute>
                <Setup />
              </SetupRoute>
            } 
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/voice-chat"
            element={
              <ProtectedRoute>
                <VoiceChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/text-chat"
            element={
              <ProtectedRoute>
                <TextChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversations"
            element={
              <ProtectedRoute>
                <Conversations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grammar-check"
            element={
              <ProtectedRoute>
                <GrammarCheck />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reply-generator"
            element={
              <ProtectedRoute>
                <ReplyGenerator />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;

