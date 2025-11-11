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
    const savedUser = localStorage.getItem('englishAI_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('Auto-login successful:', parsedUser.name);
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('englishAI_user');
      }
    }
    setLoading(false);
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
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          background: '#0f172a',
          color: '#f1f5f9'
        }}>
          Loading...
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

