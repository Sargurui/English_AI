import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  const features = [
    {
      title: 'Voice Chat',
      description: 'Practice speaking English with AI voice responses',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
        </svg>
      ),
      path: '/voice-chat',
      color: 'primary'
    },
    {
      title: 'Text Chat',
      description: 'Have natural text conversations in English',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
        </svg>
      ),
      path: '/text-chat',
      color: 'secondary'
    },
    {
      title: 'Conversations',
      description: 'Practice real-life scenarios in different settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2"/>
        </svg>
      ),
      path: '/conversations',
      color: 'success'
    },
    {
      title: 'Grammar Check',
      description: 'Improve your grammar with instant corrections',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
        </svg>
      ),
      path: '/grammar-check',
      color: 'accent'
    },
    {
      title: 'Reply Generator',
      description: 'Generate smart replies for any conversation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      path: '/reply-generator',
      color: 'primary'
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="dashboard fade-in">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Ready to practice your English today?</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>AI Provider</h3>
              <p>{user?.aiProvider === 'gemini' ? 'Google Gemini' : 'Groq'}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.2)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Native Language</h3>
              <p>{user?.nativeLanguage}</p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Choose Your Practice Mode</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card feature-${feature.color}`}
                onClick={() => navigate(feature.path)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tips-section">
          <h3>💡 Tips for Better Learning</h3>
          <ul>
            <li>Practice daily for at least 15 minutes</li>
            <li>Don't be afraid to make mistakes - they help you learn</li>
            <li>Try different scenarios to expand your vocabulary</li>
            <li>Use voice chat to improve pronunciation</li>
            <li>Review grammar corrections to understand patterns</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

