import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import { speechService } from '../utils/speechService';
import { sendMessageToAI, SYSTEM_PROMPTS } from '../utils/aiService';
import './VoiceChat.css';

// Format text to make **bold** and "quoted" text bold
const formatMessage = (text) => {
  if (!text) return text;
  
  // Replace **text** with <strong>text</strong>
  let formatted = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Replace "text" with <strong>text</strong>
  formatted = formatted.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');
  
  return formatted;
};

function VoiceChat() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = () => {
    if (!speechService.isRecognitionSupported()) {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setError('');
    setIsListening(true);

    speechService.startListening(
      async (transcript) => {
        setIsListening(false);
        
        if (!transcript || !transcript.trim()) {
          setError('No speech detected. Please try again.');
          return;
        }
        
        // Add user message
        const userMessage = { role: 'user', content: transcript };
        setMessages(prev => [...prev, userMessage]);

        // Get AI response
        setIsProcessing(true);
        try {
          const response = await sendMessageToAI(
            transcript,
            user,
            SYSTEM_PROMPTS.general
          );

          const aiMessage = { role: 'ai', content: response };
          setMessages(prev => [...prev, aiMessage]);

          // Speak the response
          setIsSpeaking(true);
          speechService.speak(response, () => {
            setIsSpeaking(false);
          });
        } catch (err) {
          setError(err.message || 'Failed to get AI response');
        } finally {
          setIsProcessing(false);
        }
      },
      (error) => {
        setIsListening(false);
        if (error === 'no-speech') {
          setError('No speech detected. Please speak clearly into your microphone and try again.');
        } else if (error === 'audio-capture') {
          setError('Microphone not detected. Please check your microphone permissions.');
        } else if (error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone permissions in your browser.');
        } else if (error === 'not-supported') {
          setError('Speech recognition is not supported in your browser.');
        } else {
          setError(`Speech recognition error: ${error}. Please try again.`);
        }
      }
    );
  };

  const stopListening = () => {
    speechService.stopListening();
    setIsListening(false);
  };

  const stopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  const clearChat = () => {
    setMessages([]);
    setError('');
  };

  return (
    <Layout title="Voice Chat">
      <div className="voice-chat fade-in">
        <div className="voice-chat-container">
          <div className="chat-section">
            <div className="chat-header">
              <div className="header-content">
                <h2>Voice Conversation</h2>
                <div className="status-indicators">
                  {isListening && (
                    <div className="status-badge listening">
                      <span className="pulse-dot"></span>
                      Listening...
                    </div>
                  )}
                  {isSpeaking && (
                    <div className="status-badge speaking">
                      <span className="pulse-dot"></span>
                      Speaking...
                    </div>
                  )}
                  {isProcessing && (
                    <div className="status-badge processing">
                      <span className="pulse-dot"></span>
                      Processing...
                    </div>
                  )}
                </div>
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
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
                  </svg>
                  <h3>Start a voice conversation</h3>
                  <p>Press the microphone button to start speaking</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`message ${message.role}`}
                    >
                      <div 
                        className="message-content"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="voice-controls">
              {!isListening && !isProcessing ? (
                <button 
                  className="btn-microphone"
                  onClick={startListening}
                  disabled={isSpeaking}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
                  </svg>
                  <span>Start Speaking</span>
                </button>
              ) : (
                <button 
                  className="btn-microphone listening-active"
                  onClick={stopListening}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                  </svg>
                  <span>Stop</span>
                </button>
              )}

              {isSpeaking && (
                <button 
                  className="btn-stop-speaking"
                  onClick={stopSpeaking}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M23 4v6h-6M1 20v-6h6" strokeWidth="2"/>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeWidth="2"/>
                  </svg>
                  Stop Speaking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default VoiceChat;

