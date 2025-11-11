import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Layout.css';

function Layout({ children, title }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="layout">
      <header className="header">
        <button 
          className="menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <h1 className="header-title">{title}</h1>
        
        <button 
          className="settings-button"
          onClick={() => navigate('/settings')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" strokeWidth="2"/>
            <path d="M12 1v6m0 6v6M23 12h-6m-6 0H5" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </header>

      {showMenu && (
        <>
          <div className="overlay" onClick={() => setShowMenu(false)}></div>
          <nav className="sidebar">
            <div className="sidebar-header">
              <h2>English AI</h2>
              <p>Welcome, {user?.name}!</p>
            </div>
            
            <div className="nav-links">
              <button onClick={() => { navigate('/'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/>
                </svg>
                Dashboard
              </button>
              
              <button onClick={() => { navigate('/voice-chat'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
                </svg>
                Voice Chat
              </button>
              
              <button onClick={() => { navigate('/text-chat'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
                </svg>
                Text Chat
              </button>
              
              <button onClick={() => { navigate('/conversations'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2"/>
                </svg>
                Conversations
              </button>
              
              <button onClick={() => { navigate('/grammar-check'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                </svg>
                Grammar Check
              </button>
              
              <button onClick={() => { navigate('/reply-generator'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" fill="none"/>
                </svg>
                Reply Generator
              </button>
              
              <button onClick={() => { navigate('/settings'); setShowMenu(false); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3" strokeWidth="2"/>
                  <path d="M12 1v6m0 6v6M23 12h-6m-6 0H5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Settings
              </button>
            </div>
          </nav>
        </>
      )}

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;

