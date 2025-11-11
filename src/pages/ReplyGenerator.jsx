import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import { sendMessageToAI } from '../utils/aiService';
import './ReplyGenerator.css';

function ReplyGenerator() {
  const { user } = useUser();
  const [conversationContext, setConversationContext] = useState('');
  const [tone, setTone] = useState('');
  const [platform, setPlatform] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const resultRef = useRef(null);

  // Scroll to result when reply is generated
  useEffect(() => {
    if (generatedReply && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [generatedReply]);

  const tones = [
    { id: 'formal', label: 'Formal', icon: '👔', description: 'Professional and polite' },
    { id: 'casual', label: 'Casual', icon: '😊', description: 'Relaxed and friendly' },
    { id: 'friendly', label: 'Friendly', icon: '🤗', description: 'Warm and approachable' },
    { id: 'professional', label: 'Professional', icon: '💼', description: 'Business appropriate' },
  ];

  const platforms = [
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'teams', label: 'Microsoft Teams', icon: '👥' },
    { id: 'slack', label: 'Slack', icon: '💼' },
    { id: 'sms', label: 'SMS/Text', icon: '📱' },
    { id: 'general', label: 'General Message', icon: '✉️' },
  ];

  const handleContextInput = (e) => {
    const text = e.target.value;
    setConversationContext(text);
    
    // Show options when user starts typing
    if (text.trim().length > 10 && !showOptions) {
      setShowOptions(true);
    }
  };

  const generateReply = async () => {
    if (!conversationContext.trim() || !tone || !platform) {
      setError('Please provide conversation context, select a tone, and choose a platform');
      return;
    }

    setError('');
    setIsProcessing(true);
    setGeneratedReply('');

    try {
      const prompt = `Based on the following conversation context, generate an appropriate reply.

Conversation Context:
${conversationContext}

Reply Requirements:
- Tone: ${tone}
- Platform: ${platform}
- Keep it natural and conversational
- Match the ${platform} communication style
- Be ${tone} in approach

Generate ONLY the reply message, nothing else. No explanations, no labels, just the reply text that can be directly copy-pasted.`;

      const response = await sendMessageToAI(
        prompt,
        user,
        ''
      );

      if (!response || response.trim() === '') {
        throw new Error('Received empty response from AI');
      }

      setGeneratedReply(response.trim());
    } catch (err) {
      console.error('Reply generation error:', err);
      setError(err.message || 'Failed to generate reply');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
    // Show a brief "Copied!" message
    const btn = document.querySelector('.btn-copy');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  };

  const resetForm = () => {
    setConversationContext('');
    setTone('');
    setPlatform('');
    setGeneratedReply('');
    setError('');
    setShowOptions(false);
  };

  const exampleContexts = [
    "Hi, I received your email about the project deadline. Can we discuss extending it by a week?",
    "Thanks for your message! I'd love to meet up this weekend. What time works for you?",
    "I noticed the report you sent. Could you clarify the data in section 3?",
  ];

  return (
    <Layout title="Reply Generator">
      <div className="reply-generator fade-in">
        <div className="reply-header">
          <h1>💬 Smart Reply Generator</h1>
          <p>Generate perfect replies based on conversation context, tone, and platform</p>
        </div>

        <div className="reply-container">
          {/* Input Section */}
          <div className="input-section">
            <div className="form-group">
              <label htmlFor="context">
                Paste the conversation or message you received:
              </label>
              <textarea
                id="context"
                value={conversationContext}
                onChange={handleContextInput}
                placeholder="Paste the message you need to reply to... (e.g., email content, WhatsApp message, etc.)"
                rows={8}
                disabled={isProcessing}
              />
              {!conversationContext && (
                <div className="examples-hint">
                  <strong>Examples:</strong>
                  {exampleContexts.map((example, index) => (
                    <button
                      key={index}
                      className="example-hint-btn"
                      onClick={() => {
                        setConversationContext(example);
                        setShowOptions(true);
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Show options after user inputs context */}
            {showOptions && (
              <div className="options-section">
                {/* Tone Selection */}
                <div className="form-group">
                  <label>Select Tone:</label>
                  <div className="tone-grid">
                    {tones.map((t) => (
                      <div
                        key={t.id}
                        className={`tone-card ${tone === t.id ? 'selected' : ''}`}
                        onClick={() => setTone(t.id)}
                      >
                        <div className="tone-icon">{t.icon}</div>
                        <div className="tone-label">{t.label}</div>
                        <div className="tone-desc">{t.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Platform Selection */}
                <div className="form-group">
                  <label>Select Platform:</label>
                  <div className="platform-grid">
                    {platforms.map((p) => (
                      <div
                        key={p.id}
                        className={`platform-card ${platform === p.id ? 'selected' : ''}`}
                        onClick={() => setPlatform(p.id)}
                      >
                        <div className="platform-icon">{p.icon}</div>
                        <div className="platform-label">{p.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <div className="action-buttons">
                  <button
                    className="btn-generate"
                    onClick={generateReply}
                    disabled={!conversationContext.trim() || !tone || !platform || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="spinner"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Generate Reply</span>
                      </>
                    )}
                  </button>
                  <button className="btn-reset" onClick={resetForm}>
                    Reset
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
          </div>

          {/* Generated Reply Section */}
          {generatedReply && (
            <div className="result-section" ref={resultRef}>
              <div className="result-header">
                <h3>Generated Reply:</h3>
                <div className="result-meta">
                  <span className="meta-badge">{tone}</span>
                  <span className="meta-badge">{platform}</span>
                </div>
              </div>

              <div className="generated-reply">
                {generatedReply}
              </div>

              <div className="result-actions">
                <button className="btn-copy" onClick={copyToClipboard}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2"/>
                  </svg>
                  Copy to Clipboard
                </button>
                <button className="btn-regenerate" onClick={generateReply}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" strokeWidth="2"/>
                  </svg>
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>💡 Tips for Best Results</h3>
          <ul>
            <li>Paste the complete message or conversation you received</li>
            <li>Choose the tone that matches your relationship with the recipient</li>
            <li>Select the platform to match communication style (emails are more formal)</li>
            <li>You can regenerate if the first reply isn't perfect</li>
            <li>Edit the generated reply to add your personal touch</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default ReplyGenerator;

