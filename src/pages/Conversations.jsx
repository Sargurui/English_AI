import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import { speechService } from '../utils/speechService';
import { sendMessageToAI, SYSTEM_PROMPTS, getRandomScenarioQuestion } from '../utils/aiService';
import './Conversations.css';

const SCENARIOS = [
  {
    id: 'office',
    title: 'Office',
    icon: '💼',
    description: 'Business conversations and workplace scenarios'
  },
  {
    id: 'bus',
    title: 'Bus/Transport',
    icon: '🚌',
    description: 'Public transportation and travel situations'
  },
  {
    id: 'hospital',
    title: 'Hospital',
    icon: '🏥',
    description: 'Medical appointments and health-related conversations'
  },
  {
    id: 'school',
    title: 'School',
    icon: '🏫',
    description: 'Educational settings and student interactions'
  },
  {
    id: 'college',
    title: 'College',
    icon: '🎓',
    description: 'University life and academic discussions'
  },
  {
    id: 'market',
    title: 'Market',
    icon: '🛒',
    description: 'Shopping and marketplace conversations'
  }
];

function Conversations() {
  const { user } = useUser();
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [conversationMode, setConversationMode] = useState(null); // 'voice' or 'text'
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  // Format text to make **bold** and "quoted" text bold
  const formatMessage = (text) => {
    if (!text) return text;
    
    // Replace **text** with <strong>text</strong>
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Replace "text" with <strong>text</strong>
    formatted = formatted.replace(/"([^"]+)"/g, '<strong>"$1"</strong>');
    
    return formatted;
  };

  const startConversation = (mode) => {
    setConversationMode(mode);
    
    // AI starts with a random scenario-specific question
    const scenarioQuestion = getRandomScenarioQuestion(selectedScenario.title);
    
    const introMessage = {
      role: 'ai',
      content: scenarioQuestion
    };
    setMessages([introMessage]);

    if (mode === 'voice') {
      speechService.speak(introMessage.content);
    }
  };

  const sendMessage = async (content) => {
    const userMessage = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setError('');
    setIsProcessing(true);

    try {
      const response = await sendMessageToAI(
        content,
        user,
        SYSTEM_PROMPTS.conversation(selectedScenario.title)
      );

      const aiMessage = { role: 'ai', content: response };
      setMessages(prev => [...prev, aiMessage]);

      if (conversationMode === 'voice') {
        setIsSpeaking(true);
        speechService.speak(response, () => {
          setIsSpeaking(false);
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    sendMessage(inputText);
  };

  const startVoiceInput = () => {
    if (!speechService.isRecognitionSupported()) {
      setError('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setError('');
    setIsListening(true);

    speechService.startListening(
      (transcript) => {
        setIsListening(false);
        if (transcript && transcript.trim()) {
          sendMessage(transcript);
        } else {
          setError('No speech detected. Please try again.');
        }
      },
      (error) => {
        setIsListening(false);
        if (error === 'no-speech') {
          setError('No speech detected. Please speak clearly into your microphone and try again.');
        } else if (error === 'audio-capture') {
          setError('Microphone not detected. Please check your microphone permissions.');
        } else if (error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone permissions.');
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

  const resetConversation = () => {
    setSelectedScenario(null);
    setConversationMode(null);
    setMessages([]);
    setError('');
    speechService.stopSpeaking();
    setIsSpeaking(false);
  };

  if (!selectedScenario) {
    return (
      <Layout title="Conversations">
        <div className="conversations fade-in">
          <div className="conversations-header">
            <h1>Practice Scenarios</h1>
            <p>Choose a real-life scenario to practice your English</p>
          </div>

          <div className="scenarios-grid">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="scenario-card"
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="scenario-icon">{scenario.icon}</div>
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
                <div className="scenario-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!conversationMode) {
    return (
      <Layout title={selectedScenario.title}>
        <div className="mode-selection fade-in">
          <button className="btn-back" onClick={() => setSelectedScenario(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Back
          </button>

          <div className="mode-content">
            <div className="scenario-banner">
              <span className="scenario-icon-large">{selectedScenario.icon}</span>
              <h1>{selectedScenario.title}</h1>
              <p>{selectedScenario.description}</p>
            </div>

            <h2>Choose Your Mode</h2>
            <div className="mode-cards">
              <div className="mode-card" onClick={() => startConversation('voice')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
                </svg>
                <h3>Voice Conversation</h3>
                <p>Practice speaking with voice input and responses</p>
              </div>

              <div className="mode-card" onClick={() => startConversation('text')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2"/>
                </svg>
                <h3>Text Conversation</h3>
                <p>Practice writing with text-based chat</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={selectedScenario.title}>
      <div className="conversation-active fade-in">
        <div className="conversation-header">
          <button className="btn-back" onClick={resetConversation}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Back
          </button>
          <div className="conversation-info">
            <span className="scenario-badge">
              {selectedScenario.icon} {selectedScenario.title}
            </span>
            <span className="mode-badge">{conversationMode === 'voice' ? '🎤 Voice' : '💬 Text'}</span>
          </div>
        </div>

        <div className="conversation-container">
          <div className="messages-section">
            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div 
                    className="message-content"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                </div>
              ))}
              {isProcessing && (
                <div className="message ai">
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
            </div>

            {error && <div className="error-message">{error}</div>}

            {conversationMode === 'text' ? (
              <form className="input-container" onSubmit={handleTextSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isProcessing}
                />
                <button type="submit" disabled={!inputText.trim() || isProcessing}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="2"/>
                  </svg>
                </button>
              </form>
            ) : (
              <div className="voice-input-container">
                {!isListening && !isProcessing ? (
                  <button className="btn-microphone" onClick={startVoiceInput} disabled={isSpeaking}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" strokeWidth="2"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" strokeWidth="2"/>
                    </svg>
                    <span>Speak</span>
                  </button>
                ) : (
                  <button className="btn-microphone listening" onClick={stopListening}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="6" width="12" height="12" rx="2"/>
                    </svg>
                    <span>Stop</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Conversations;

