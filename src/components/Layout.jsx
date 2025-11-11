import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Layout.css';

function Layout({ children, title }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
    { path: '/voice-chat', label: 'Voice Chat', icon: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8' },
    { path: '/text-chat', label: 'Text Chat', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { path: '/conversations', label: 'Conversations', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { path: '/grammar-check', label: 'Grammar', icon: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' },
    { path: '/reply-generator', label: 'Reply Gen', icon: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' },
  ];

  return (
    <div className="layout">
      {/* 3D Animated Background */}
      <div className="animated-background">
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="cube cube-3"></div>
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
      </div>

      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button 
              className="menu-button mobile-only"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <h1 className="header-title">
              <span className="logo-icon">🎓</span>
              <span className="desktop-title">English AI</span>
            </h1>
          </div>

          {/* Desktop Horizontal Menu */}
          <nav className="desktop-nav">
            {menuItems.map((item) => (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={window.location.hash.includes(item.path) && item.path !== '/' ? 'active' : ''}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={item.icon}/>
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <button 
            className="settings-button"
            onClick={() => navigate('/settings')}
            title="Settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" strokeWidth="2"/>
              <path d="M12 1v6m0 6v6M23 12h-6m-6 0H5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {showMenu && (
        <>
          <div className="overlay" onClick={() => setShowMenu(false)}></div>
          <nav className="sidebar">
            <div className="sidebar-header">
              <h2>🎓 English AI</h2>
              <p>Welcome, {user?.name}!</p>
            </div>
            
            <div className="nav-links">
              {menuItems.map((item) => (
                <button 
                  key={item.path}
                  onClick={() => { navigate(item.path); setShowMenu(false); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={item.icon}/>
                  </svg>
                  {item.label}
                </button>
              ))}
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
