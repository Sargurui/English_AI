import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Setup.css';

function Setup() {
  const navigate = useNavigate();
  const { saveUser } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    nativeLanguage: '',
    aiProvider: '',
    apiKey: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1 && formData.name && formData.nativeLanguage) {
      setStep(2);
    } else if (step === 2 && formData.aiProvider && formData.apiKey) {
      saveUser(formData);
      navigate('/');
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="setup-card fade-in">
        <div className="setup-header">
          <h1>Welcome to English AI Practice</h1>
          <p>Let's set up your personalized learning experience</p>
        </div>

        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Personal Info</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>AI Setup</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="name">What's your name?</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nativeLanguage">Select your native language</label>
                <select
                  id="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                  required
                >
                  <option value="">Choose language</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="aiProvider">Choose AI Provider</label>
                <div className="ai-provider-cards">
                  <div 
                    className={`provider-card ${formData.aiProvider === 'gemini' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, aiProvider: 'gemini' })}
                  >
                    <h3>Google Gemini</h3>
                    <p>Fast and reliable AI responses</p>
                    <span className="free-badge">Free Tier Available</span>
                  </div>
                  <div 
                    className={`provider-card ${formData.aiProvider === 'groq' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, aiProvider: 'groq' })}
                  >
                    <h3>Groq</h3>
                    <p>Ultra-fast inference speed</p>
                    <span className="free-badge">Free Tier Available</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="apiKey">
                  {formData.aiProvider === 'gemini' ? 'Gemini API Key' : 'Groq API Key'}
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder={`Enter your ${formData.aiProvider === 'gemini' ? 'Gemini' : 'Groq'} API key`}
                  required
                />
                <small className="helper-text">
                  {formData.aiProvider === 'gemini' 
                    ? '🔑 Get your free API key from: https://aistudio.google.com/app/apikey'
                    : '🔑 Get your free API key from: https://console.groq.com/keys'}
                </small>
              </div>

              <div className="info-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 16v-4M12 8h.01" strokeWidth="2"/>
                </svg>
                <div>
                  <strong>Free Tier Information:</strong>
                  <ul>
                    {formData.aiProvider === 'gemini' ? (
                      <>
                        <li>Using Gemini 2.5 Flash model</li>
                        <li>15 requests per minute</li>
                        <li>1 million tokens per day</li>
                        <li>Perfect for daily English practice!</li>
                      </>
                    ) : (
                      <>
                        <li>Groq offers ultra-fast free inference</li>
                        <li>Great for voice conversations</li>
                        <li>Generous free tier for learners</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step === 2 && (
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="btn btn-secondary"
              >
                Back
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {step === 1 ? 'Continue' : 'Get Started'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setup;

