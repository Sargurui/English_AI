import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
    return null; // or a loading spinner
  }
  
  return user ? children : <Navigate to="/setup" replace />;
}

function SetupRoute({ children }) {
  const { user, loading } = useUser();
  
  if (loading) {
    return null;
  }
  
  // If user is already logged in, redirect to home
  return user ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <Router basename="/English_AI">
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

