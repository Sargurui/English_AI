import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-login: Load user data from localStorage
    try {
      const savedUser = localStorage.getItem('englishAI_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          // Only log in development
          if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            console.log('Auto-login successful:', parsedUser.name);
          }
        } catch (error) {
          // Silently handle parse errors on mobile
          localStorage.removeItem('englishAI_user');
        }
      }
    } catch (error) {
      // Handle localStorage access errors on mobile
    } finally {
      // Always set loading to false
      setLoading(false);
    }
  }, []);

  const saveUser = (userData) => {
    localStorage.setItem('englishAI_user', JSON.stringify(userData));
    setUser(userData);
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    saveUser(updatedUser);
  };

  const deleteUserData = () => {
    localStorage.removeItem('englishAI_user');
    localStorage.removeItem('englishAI_conversations');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, updateUser, deleteUserData, loading }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          background: '#0f172a',
          color: '#f1f5f9',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(99, 102, 241, 0.2)',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>English AI Practice</h2>
          <p style={{ color: '#cbd5e1' }}>Loading your learning environment...</p>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

