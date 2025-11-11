# Quick Start Guide

Get up and running with English AI Practice in 5 minutes!

## 📋 Prerequisites

- Node.js 16+ installed ([Download here](https://nodejs.org/))
- An API key from either:
  - [Google Gemini](https://makersuite.google.com/app/apikey) - Free tier available
  - [Groq](https://console.groq.com/keys) - Free tier available

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sargurui/English_AI.git
cd English_AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎯 First Time Setup

When you open the app for the first time:

### Step 1: Personal Information
1. Enter your name
2. Select your native language (Tamil, Hindi, Telugu, or Other)
3. Click "Continue"

### Step 2: AI Configuration
1. Choose your AI provider:
   - **Google Gemini**: Great for general use, reliable
   - **Groq**: Ultra-fast responses, great for voice chat

2. Enter your API key

3. Click "Get Started"

That's it! You're ready to practice English! 🎉

## 🎓 How to Use

### Voice Chat
1. Click "Voice Chat" from the dashboard
2. Press the microphone button
3. Speak in English
4. AI responds with voice

### Text Chat
1. Click "Text Chat" from the dashboard
2. Type your message
3. Press send or Enter
4. AI responds with text

### Conversations
1. Click "Conversations"
2. Choose a scenario (Office, Bus, Hospital, etc.)
3. Select Voice or Text mode
4. Practice real-life situations!

### Grammar Check
1. Click "Grammar Check"
2. Type or paste a sentence
3. Click "Check Grammar"
4. Get instant corrections and explanations

## 🔑 Getting API Keys

### Google Gemini (Recommended for beginners)

1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Paste it in the app

**Free Tier:** Uses Gemini 2.5 Flash - 15 requests/min, 1 million tokens/day - Perfect for learning!

### Groq (Recommended for speed)

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy your API key
6. Paste it in the app

**Free Tier:** Ultra-fast inference, great for voice conversations!

## 💡 Pro Tips

1. **Use Voice Chat Daily**: Best way to improve pronunciation
2. **Try Different Scenarios**: Each scenario has unique vocabulary
3. **Check Grammar Regularly**: Learn from your mistakes
4. **Practice 15-30 Minutes Daily**: Consistency is key!

## 🔧 Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

## 🌐 Deploy to GitHub Pages

```bash
npm run deploy
```

Your app will be live at `https://[your-username].github.io/English_AI/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### API Key Not Working
1. Check if the key is correct
2. Verify you're using the right provider (Gemini vs Groq)
3. Check if your API quota is exceeded
4. Try generating a new API key

### Voice Not Working
1. Grant microphone permissions in browser
2. Use Chrome, Edge, or Safari (best support)
3. Check browser console for errors

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📱 Browser Support

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Voice Chat | ✅ | ✅ | ✅ (iOS 14.5+) | ⚠️ Limited |
| Text Chat | ✅ | ✅ | ✅ | ✅ |
| Grammar Check | ✅ | ✅ | ✅ | ✅ |
| 3D Avatar | ✅ | ✅ | ✅ | ✅ |

## 🎨 Customization

### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --primary: #6366f1;        /* Main color */
  --secondary: #ec4899;      /* Accent color */
  --background: #0f172a;     /* Background */
  /* ... more colors ... */
}
```

### Add More Scenarios

Edit `src/pages/Conversations.jsx`:

```javascript
const SCENARIOS = [
  // Add your custom scenario
  {
    id: 'restaurant',
    title: 'Restaurant',
    icon: '🍽️',
    description: 'Dining and food ordering'
  },
  // ... existing scenarios
];
```

## 📚 Learn More

- [Full Documentation](README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [GitHub Repository](https://github.com/Sargurui/English_AI)

## 🤝 Need Help?

- Open an issue on GitHub
- Check existing issues for solutions
- Read the full README.md

## 🎉 You're All Set!

Start practicing and improve your English today!

Happy Learning! 📖✨

