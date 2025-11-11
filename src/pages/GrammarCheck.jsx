import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';
import { sendMessageToAI, SYSTEM_PROMPTS } from '../utils/aiService';
import './GrammarCheck.css';

function GrammarCheck() {
  const { user } = useUser();
  const [inputText, setInputText] = useState('');
  const [corrections, setCorrections] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const resultRef = useRef(null);

  // Scroll to result when new correction is added
  useEffect(() => {
    if (corrections.length > 0 && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }, [corrections]);

  // Function to clean and format the AI response
  const cleanResponse = (text) => {
    if (!text) return '';
    
    // Remove any extra formatting, explanations, etc.
    // Just get the core corrected sentence
    let cleaned = text.trim();
    
    // Remove common AI prefixes
    cleaned = cleaned.replace(/^(Corrected Sentence:|Corrected:|Here's the correction:|The corrected sentence is:)\s*/i, '');
    
    // Remove quotes if present
    cleaned = cleaned.replace(/^["']|["']$/g, '');
    
    // Get only the first line if there are multiple lines
    cleaned = cleaned.split('\n')[0].trim();
    
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputText.trim() || isProcessing) return;

    setError('');
    setIsProcessing(true);

    try {
      const response = await sendMessageToAI(
        inputText,
        user,
        SYSTEM_PROMPTS.grammar
      );

      if (!response || response.trim() === '') {
        throw new Error('Received empty response from AI');
      }

      // Clean the response to get only the corrected sentence
      const cleanedResponse = cleanResponse(response);

      const correction = {
        original: inputText,
        corrected: cleanedResponse,
        timestamp: new Date().toISOString()
      };

      setCorrections(prev => [correction, ...prev]);
      setInputText('');
    } catch (err) {
      console.error('Grammar check error:', err);
      setError(err.message || 'Failed to get grammar correction');
    } finally {
      setIsProcessing(false);
    }
  };

  const clearHistory = () => {
    setCorrections([]);
  };

  const exampleSentences = [
    "I goes to school everyday",
    "She don't like coffee",
    "They was playing football yesterday",
    "He have three cats at home",
    "We was very happy last night"
  ];

  const handleExampleClick = (sentence) => {
    setInputText(sentence);
  };

  return (
    <Layout title="Grammar Check">
      <div className="grammar-check fade-in">
        <div className="grammar-header">
          <h1>Grammar Check</h1>
          <p>Submit a sentence and get instant grammar corrections with explanations</p>
        </div>

        <div className="grammar-container">
          <div className="input-section">
            <form onSubmit={handleSubmit}>
              <label htmlFor="sentence">Enter your sentence:</label>
              <textarea
                id="sentence"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your sentence here..."
                rows={5}
                disabled={isProcessing}
              />

              <div className="input-actions">
                <button 
                  type="submit" 
                  className="btn-check"
                  disabled={!inputText.trim() || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Check Grammar</span>
                    </>
                  )}
                </button>
                
                {inputText && (
                  <button 
                    type="button" 
                    className="btn-clear-input"
                    onClick={() => setInputText('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="examples-section">
              <h3>Try these examples:</h3>
              <div className="examples-grid">
                {exampleSentences.map((sentence, index) => (
                  <button
                    key={index}
                    className="example-btn"
                    onClick={() => handleExampleClick(sentence)}
                  >
                    {sentence}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="results-section">
            <div className="results-header">
              <h2>Corrections History</h2>
              {corrections.length > 0 && (
                <button className="btn-clear-history" onClick={clearHistory}>
                  Clear History
                </button>
              )}
            </div>

            <div className="corrections-list">
              {corrections.length === 0 ? (
                <div className="empty-state">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeWidth="2"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeWidth="2"/>
                  </svg>
                  <h3>No corrections yet</h3>
                  <p>Submit a sentence to see grammar corrections</p>
                </div>
              ) : (
                corrections.map((correction, index) => (
                  <div 
                    key={index} 
                    className="correction-card"
                    ref={index === 0 ? resultRef : null}
                  >
                    <div className="correction-label">Original:</div>
                    <div className="correction-original">
                      {correction.original}
                    </div>

                    <div className="correction-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>

                    <div className="correction-label">Corrected:</div>
                    <div className="correction-result">
                      {correction.corrected}
                    </div>

                    <div className="correction-time">
                      {new Date(correction.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="tips-card">
          <h3>💡 Grammar Tips</h3>
          <ul>
            <li>Pay attention to subject-verb agreement</li>
            <li>Use proper tenses consistently</li>
            <li>Check for articles (a, an, the) usage</li>
            <li>Watch out for commonly confused words</li>
            <li>Review prepositions and their correct usage</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default GrammarCheck;

