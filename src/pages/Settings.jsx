import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const { user, updateUser, deleteUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    nativeLanguage: user?.nativeLanguage || '',
    aiProvider: user?.aiProvider || '',
    apiKey: user?.apiKey || ''
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteUserData();
    navigate('/setup');
  };

  return (
    <Layout title="Settings">
      <div className="settings fade-in">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2>Profile Information</h2>
            {!isEditing && (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                </svg>
                Edit
              </button>
            )}
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label>Native Language</label>
              <select
                value={formData.nativeLanguage}
                onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                disabled={!isEditing}
              >
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <h2>AI Configuration</h2>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>AI Provider</label>
              <div className="provider-display">
                {formData.aiProvider === 'gemini' ? (
                  <>
                    <div className="provider-badge">Google Gemini 2.5 Flash</div>
                    <span className="helper-text">Using Google's latest Gemini model</span>
                  </>
                ) : (
                  <>
                    <div className="provider-badge">Groq</div>
                    <span className="helper-text">Using Groq's ultra-fast inference</span>
                  </>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>API Key</label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                disabled={!isEditing}
              />
              {isEditing && (
                <small className="helper-text">
                  {formData.aiProvider === 'gemini' 
                    ? '🔑 Get your API key from: https://aistudio.google.com/app/apikey'
                    : '🔑 Get your API key from: https://console.groq.com/keys'}
                </small>
              )}
            </div>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <div className="section-header">
            <h2>Danger Zone</h2>
          </div>

          <div className="danger-content">
            <div>
              <h3>Delete All Data</h3>
              <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
            </div>
            <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
              Delete Data
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete All Data?</h2>
            <p>Are you sure you want to delete all your data? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Settings;

