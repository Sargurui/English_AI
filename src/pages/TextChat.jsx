import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import { sendMessageToAI, SYSTEM_PROMPTS } from '../utils/aiService';
import './TextChat.css';

// Format text to make **bold** and "quoted" text bold
const formatMessage = (text) => {
  if (!text) return text;
  
  // Replace **text** with <strong>text</strong>
  let formatted = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Replace "text" with <strong>text</strong>
  formatted = formatted.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');
  
  return formatted;
};

function TextChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || isProcessing) return;

    const userMessage = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setError('');
    setIsProcessing(true);

    try {
      const response = await sendMessageToAI(
        inputText,
        user,
        SYSTEM_PROMPTS.general
      );

      const aiMessage = { role: 'ai', content: response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsProcessing(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError('');
  };

  const quickPrompts = [
    "Let's practice introducing ourselves",
    "Can we talk about daily routines?",
    "I want to improve my vocabulary",
    "Help me with business English",
    "Let's discuss current events"
  ];

  const handleQuickPrompt = (prompt) => {
    setInputText(prompt);
    inputRef.current?.focus();
  };

  return (
    <Layout title="Text Chat">
      <div className="text-chat fade-in">
        <div className="text-chat-container">
          <div className="chat-header">
            <div>
              <h2>Text Conversation</h2>
              <p>Practice English through text messages</p>
            </div>
            {messages.length > 0 && (
              <button className="btn-clear" onClick={clearChat}>
                Clear Chat
              </button>
            )}
          </div>

          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
                </svg>
                <h3>Start a conversation</h3>
                <p>Type a message or use a quick prompt below</p>
                
                <div className="quick-prompts">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="quick-prompt-btn"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`message ${message.role}`}
                  >
                    <div className="message-avatar">
                      {message.role === 'user' ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="2"/>
                        </svg>
                      )}
                    </div>
                    <div className="message-content">
                      <div className="message-author">
                        {message.role === 'user' ? user?.name : 'AI Teacher'}
                      </div>
                      <div 
                        className="message-text"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="message ai">
                    <div className="message-avatar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form className="chat-input-container" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              disabled={isProcessing}
            />
            <button 
              type="submit" 
              disabled={!inputText.trim() || isProcessing}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default TextChat;

