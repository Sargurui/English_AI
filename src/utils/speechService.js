// Speech Recognition (STT) and Speech Synthesis (TTS) utilities

export class SpeechService {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.voices = [];
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }

    // Load available voices
    this.loadVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    this.voices = this.synthesis.getVoices();
  }

  // Start listening for speech
  startListening(onResult, onError) {
    if (!this.recognition) {
      onError('not-supported');
      return;
    }

    if (this.isListening) {
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript && transcript.trim()) {
        onResult(transcript);
      } else {
        onError('no-speech');
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError(event.error);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error('Failed to start recognition:', error);
      onError('failed-to-start');
      this.isListening = false;
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Speak text using TTS
  speak(text, onEnd) {
    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a female English voice
    const femaleVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('samantha') ||
       voice.name.toLowerCase().includes('karen') ||
       voice.name.toLowerCase().includes('victoria'))
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    } else {
      // Fallback to any English voice
      const englishVoice = this.voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synthesis.speak(utterance);
  }

  // Stop speaking
  stopSpeaking() {
    this.synthesis.cancel();
  }

  // Check if speech recognition is supported
  isRecognitionSupported() {
    return this.recognition !== null;
  }

  // Check if speech synthesis is supported
  isSynthesisSupported() {
    return 'speechSynthesis' in window;
  }
}

// Export singleton instance
export const speechService = new SpeechService();

