# English AI Practice 🎓

An interactive AI-powered English conversation practice application with voice and text capabilities. Practice real-life scenarios, improve your grammar, and enhance your English skills with the help of AI.

![English AI Practice](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎤 Voice Chat
- Real-time voice conversations with AI
- Speech-to-Text (STT) for input
- Text-to-Speech (TTS) for AI responses
- Interactive 3D female avatar that animates while speaking

### 💬 Text Chat
- Natural text-based conversations
- Quick prompt suggestions
- Real-time AI responses
- Chat history management

### 🎭 Scenario-Based Conversations
Practice English in real-life scenarios:
- **Office** - Business conversations and workplace scenarios
- **Bus/Transport** - Public transportation situations
- **Hospital** - Medical appointments and health-related conversations
- **School** - Educational settings and student interactions
- **College** - University life and academic discussions
- **Market** - Shopping and marketplace conversations

Each scenario supports both voice and text modes!

### ✍️ Grammar Check
- Instant grammar corrections
- Clean, simple output
- Example sentences to practice
- Correction history tracking

### 💬 Reply Generator (New!)
- Generate smart replies for any conversation
- Multiple tone options (formal, casual, friendly, professional)
- Platform-specific replies (Email, WhatsApp, Teams, Slack, SMS)
- Copy to clipboard feature
- Regenerate option

### 🌐 Multi-Language Support
Native language selection for better learning:
- Tamil (தமிழ்)
- Hindi (हिंदी)
- Telugu (తెలుగు)
- Other languages

### 🤖 AI Provider Options
Choose your preferred AI provider:
- **Google Gemini 2.5 Flash** - Fast and reliable AI responses with generous free tier
- **Groq** - Ultra-fast inference speed (Free tier available)

### 🔐 Privacy First
- All data stored locally in your browser
- No server-side data storage
- Full control over your data with delete option

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- An API key from either:
  - [Google Gemini](https://aistudio.google.com/app/apikey) - Free tier with 15 requests/min
  - [Groq](https://console.groq.com/keys) - Free tier available

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sargurui/English_AI.git
cd English_AI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### First-Time Setup

When you first open the application:

1. **Enter Your Name** - Personalize your experience
2. **Select Native Language** - Choose your preferred language (Tamil, Hindi, Telugu, or Other)
3. **Choose AI Provider** - Select Gemini or Groq
4. **Enter API Key** - Provide your API key for the chosen provider

Your settings are saved locally and you'll be automatically logged in next time!

#### 🔑 Getting API Keys

**Google Gemini (Recommended):**
- Visit: https://aistudio.google.com/app/apikey
- Sign in with Google account
- Create API key (Free tier: 15 requests/min, 1M tokens/day)
- **Uses Gemini 2.5 Flash model** - Latest and fastest!

**Groq:**
- Visit: https://console.groq.com/keys
- Sign up for free account
- Create API key
- Ultra-fast responses, great for voice chat

## 📦 Building for Production

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deploy to GitHub Pages

1. Update the `homepage` in `package.json` with your GitHub repository URL
2. Deploy to GitHub Pages:

```bash
npm run deploy
```

Your app will be live at `https://[your-username].github.io/English_AI/`

## 🎨 Features in Detail

### Voice Recognition
Uses the Web Speech API for speech recognition. Supported in:
- Chrome (Desktop & Android)
- Edge
- Safari (iOS 14.5+)

### Text-to-Speech
Uses the Web Speech Synthesis API for natural-sounding voice responses.

### 3D Avatar
Built with Three.js and React Three Fiber:
- Smooth animations
- Speaking indicators
- Interactive controls

### Responsive Design
Fully responsive design that works on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Web Speech API** - Voice recognition and synthesis
- **Local Storage** - Data persistence

## 🎯 Usage Tips

1. **Daily Practice** - Use the app for at least 15 minutes daily
2. **Don't Fear Mistakes** - Mistakes are part of learning
3. **Try Different Scenarios** - Expand your vocabulary
4. **Use Voice Chat** - Improve pronunciation
5. **Review Corrections** - Learn from grammar mistakes
6. **Reply Generator** - Use it to craft professional emails and messages

## 📝 Browser Support

| Browser | Voice Chat | Text Chat | Grammar Check | Reply Generator |
|---------|------------|-----------|---------------|-----------------|
| Chrome  | ✅ | ✅ | ✅ | ✅ |
| Edge    | ✅ | ✅ | ✅ | ✅ |
| Safari  | ✅ (iOS 14.5+) | ✅ | ✅ | ✅ |
| Firefox | ⚠️ Limited | ✅ | ✅ | ✅ |

## 🔒 Privacy & Security

- All conversations are processed through your chosen AI provider
- User data is stored locally in browser localStorage
- No server-side data collection
- API keys are stored securely in localStorage
- Full data deletion available in settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Groq for ultra-fast inference
- Web Speech API for voice features
- Three.js community for 3D rendering

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for English learners worldwide

**Live Demo:** [https://Sargurui.github.io/English_AI](https://Sargurui.github.io/English_AI)

