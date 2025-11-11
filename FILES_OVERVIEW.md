# Project Files Overview

Complete list of all files in the English AI Practice application with descriptions.

## 📁 Root Directory

### Configuration Files
- **`package.json`** - Project dependencies and npm scripts
- **`vite.config.js`** - Vite build tool configuration
- **`index.html`** - HTML entry point with meta tags
- **`.gitignore`** - Git ignore rules (node_modules, dist, etc.)

### Documentation Files
- **`README.md`** - Main project documentation (comprehensive guide)
- **`GET_STARTED.md`** - Quick getting started guide (this is what you should read first!)
- **`QUICKSTART.md`** - 5-minute quick start instructions
- **`DEPLOYMENT.md`** - Detailed deployment instructions
- **`COMMANDS.md`** - All terminal commands reference
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`PROJECT_SUMMARY.md`** - Complete project overview
- **`FILES_OVERVIEW.md`** - This file
- **`LICENSE`** - MIT License

## 🌐 Public Directory (`public/`)

Static files served as-is:
- **`manifest.json`** - PWA manifest for mobile installation
- **`robots.txt`** - SEO robots file

## ⚙️ GitHub Actions (`.github/workflows/`)

- **`deploy.yml`** - Automated deployment to GitHub Pages

## 💻 Source Code (`src/`)

### Main Application Files
- **`main.jsx`** - Application entry point
- **`App.jsx`** - Root component with routing
- **`index.css`** - Global styles and CSS variables

### Components (`src/components/`)
Reusable UI components:

#### Layout Component
- **`Layout.jsx`** - Main layout with header and sidebar navigation
- **`Layout.css`** - Layout styling

#### 3D Avatar Component
- **`Avatar3D.jsx`** - Interactive 3D female avatar using Three.js
- **`Avatar3D.css`** - Avatar container styling and animations

### Context (`src/context/`)
State management:
- **`UserContext.jsx`** - Global user state (profile, settings, auto-login)

### Pages (`src/pages/`)
All page components with their styles:

#### Setup Page
- **`Setup.jsx`** - First-time setup flow (name, language, AI provider)
- **`Setup.css`** - Setup page styling with animations

#### Dashboard
- **`Dashboard.jsx`** - Main dashboard with feature cards
- **`Dashboard.css`** - Dashboard styling

#### Settings Page
- **`Settings.jsx`** - User settings and data management
- **`Settings.css`** - Settings page styling

#### Voice Chat
- **`VoiceChat.jsx`** - Voice conversation with STT/TTS
- **`VoiceChat.css`** - Voice chat interface styling

#### Text Chat
- **`TextChat.jsx`** - Text-based conversations
- **`TextChat.css`** - Text chat interface styling

#### Conversations
- **`Conversations.jsx`** - Scenario-based practice (Office, Market, etc.)
- **`Conversations.css`** - Conversations page styling

#### Grammar Check
- **`GrammarCheck.jsx`** - Grammar correction tool
- **`GrammarCheck.css`** - Grammar check interface styling

### Utilities (`src/utils/`)
Helper functions and services:

- **`aiService.js`** - AI API integration (Gemini & Groq)
  - API calls to both providers
  - System prompts for different scenarios
  - Error handling

- **`speechService.js`** - Voice services
  - Speech-to-Text (STT) using Web Speech API
  - Text-to-Speech (TTS) using Speech Synthesis API
  - Voice management

## 📊 File Statistics

### Total Files by Type
- **JavaScript/JSX**: 16 files
- **CSS**: 9 files
- **Configuration**: 4 files
- **Documentation**: 9 files
- **Total**: ~38 files

### Lines of Code (Approximate)
- **JavaScript/JSX**: ~2,500 lines
- **CSS**: ~1,800 lines
- **Documentation**: ~2,000 lines
- **Total**: ~6,300 lines

## 🗂️ Project Structure Visualization

```
English_AI/
│
├── 📄 Configuration & Setup
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .gitignore
│
├── 📚 Documentation
│   ├── README.md (Main docs)
│   ├── GET_STARTED.md (Start here!)
│   ├── QUICKSTART.md
│   ├── DEPLOYMENT.md
│   ├── COMMANDS.md
│   ├── CONTRIBUTING.md
│   ├── PROJECT_SUMMARY.md
│   ├── FILES_OVERVIEW.md
│   └── LICENSE
│
├── 🌐 public/
│   ├── manifest.json
│   └── robots.txt
│
├── ⚙️ .github/workflows/
│   └── deploy.yml
│
└── 💻 src/
    │
    ├── 📄 Main App
    │   ├── main.jsx
    │   ├── App.jsx
    │   └── index.css
    │
    ├── 🧩 components/
    │   ├── Layout.jsx + .css
    │   └── Avatar3D.jsx + .css
    │
    ├── 🔄 context/
    │   └── UserContext.jsx
    │
    ├── 📱 pages/
    │   ├── Setup.jsx + .css
    │   ├── Dashboard.jsx + .css
    │   ├── Settings.jsx + .css
    │   ├── VoiceChat.jsx + .css
    │   ├── TextChat.jsx + .css
    │   ├── Conversations.jsx + .css
    │   └── GrammarCheck.jsx + .css
    │
    └── 🛠️ utils/
        ├── aiService.js
        └── speechService.js
```

## 🎯 Key Files to Understand

### For Users
1. **`GET_STARTED.md`** - Start here!
2. **`README.md`** - Full documentation
3. **`QUICKSTART.md`** - Quick setup

### For Developers
1. **`src/App.jsx`** - Routing and app structure
2. **`src/context/UserContext.jsx`** - State management
3. **`src/utils/aiService.js`** - AI integration
4. **`src/utils/speechService.js`** - Voice features
5. **`CONTRIBUTING.md`** - Development guidelines

### For Deployment
1. **`DEPLOYMENT.md`** - Deployment guide
2. **`COMMANDS.md`** - Command reference
3. **`.github/workflows/deploy.yml`** - CI/CD

## 📝 File Descriptions by Category

### 🎨 Styling Files (CSS)
All CSS files use:
- CSS Variables for theming
- Flexbox and Grid for layouts
- Smooth animations and transitions
- Responsive breakpoints
- Mobile-first approach

### ⚛️ React Components (JSX)
All components:
- Use functional components
- Use React Hooks
- Have PropTypes or clear prop structures
- Include error handling
- Are fully responsive

### 🔧 Utility Files (JS)
- Pure JavaScript functions
- Well-documented
- Error handling included
- Reusable across components

### 📖 Documentation Files (MD)
- Written in Markdown
- Include code examples
- Have clear sections
- Cross-referenced

## 🔍 Finding Files Quickly

### Want to modify...
- **Colors/Theme**: `src/index.css`
- **Main layout**: `src/components/Layout.jsx`
- **Avatar**: `src/components/Avatar3D.jsx`
- **AI responses**: `src/utils/aiService.js`
- **Voice features**: `src/utils/speechService.js`
- **Scenarios**: `src/pages/Conversations.jsx`
- **Setup flow**: `src/pages/Setup.jsx`

### Want to understand...
- **How routing works**: `src/App.jsx`
- **How user data is stored**: `src/context/UserContext.jsx`
- **How AI calls work**: `src/utils/aiService.js`
- **How voice works**: `src/utils/speechService.js`

### Want to deploy...
- **Read**: `DEPLOYMENT.md`
- **Run**: `npm run deploy`
- **Configure**: `vite.config.js`

## 🎓 Learning Path

### For Complete Beginners
1. Read `GET_STARTED.md`
2. Follow `QUICKSTART.md`
3. Browse `README.md`

### For Developers
1. Read `CONTRIBUTING.md`
2. Study `src/App.jsx`
3. Explore component files
4. Check utility files

### For Deployment
1. Read `DEPLOYMENT.md`
2. Follow `COMMANDS.md`
3. Check `.github/workflows/deploy.yml`

## 📦 Dependencies

All dependencies are listed in `package.json`:

### Main Dependencies
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `@react-three/fiber` - 3D rendering
- `@react-three/drei` - 3D helpers
- `three` - 3D graphics library

### Dev Dependencies
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin
- `gh-pages` - GitHub Pages deployment

## 🎉 You're Ready!

Now you understand every file in the project. Start with `GET_STARTED.md` to begin using the app!

---

**Quick File Access** 💡

```bash
# Open key files quickly:
code README.md              # Main docs
code GET_STARTED.md         # Getting started
code src/App.jsx            # Main app
code package.json           # Dependencies
code DEPLOYMENT.md          # Deploy guide
```

**Happy Coding!** 🚀

