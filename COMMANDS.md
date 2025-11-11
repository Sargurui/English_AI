# Command Reference

Quick reference for all commands used in this project.

## 📦 Installation

```bash
# Install all dependencies
npm install

# Install specific dependency
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>
```

## 🚀 Development

```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Start on specific port
npm run dev -- --port 3000

# Start and open in browser
npm run dev -- --open
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Clean build directory
rm -rf dist
```

## 🌐 Deployment

```bash
# Deploy to GitHub Pages (recommended)
npm run deploy

# Manual deployment steps
npm run build
npx gh-pages -d dist
```

## 🧪 Testing & Quality

```bash
# Run linter (if configured)
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check for type errors
npm run type-check
```

## 📂 File Operations

```bash
# View project structure
tree -I 'node_modules|dist'

# Count lines of code
find src -name '*.jsx' -o -name '*.js' -o -name '*.css' | xargs wc -l

# Search for text in files
grep -r "search term" src/
```

## 🔧 Git Commands

```bash
# Initial setup
git init
git remote add origin https://github.com/Sargurui/English_AI.git

# Stage all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# View status
git status

# View commit history
git log --oneline
```

## 🎯 First-Time Setup Commands

```bash
# 1. Clone the repository
git clone https://github.com/Sargurui/English_AI.git
cd English_AI

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173
```

## 🔥 Quick Deploy to GitHub Pages

```bash
# One-command deploy
npm run deploy

# Or step by step:
npm run build              # Build the project
git add dist -f            # Add dist folder
git commit -m "Deploy"     # Commit changes
git subtree push --prefix dist origin gh-pages  # Push to gh-pages
```

## 🐛 Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update all packages
npm update

# Fix npm permissions (Unix/Mac)
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

## 📊 Project Information

```bash
# List all dependencies
npm list --depth=0

# Check package version
npm list <package-name>

# View package info
npm info <package-name>

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 🔄 Package Management

```bash
# Add new package
npm install <package-name>

# Remove package
npm uninstall <package-name>

# Update specific package
npm update <package-name>

# Install exact version
npm install <package-name>@<version>
```

## 💻 Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes and test
npm run dev

# 3. Build to verify
npm run build

# 4. Commit changes
git add .
git commit -m "Add my feature"

# 5. Push to GitHub
git push origin feature/my-feature

# 6. Create Pull Request on GitHub

# 7. After merge, update main
git checkout main
git pull origin main
```

## 🚀 Production Deployment Workflow

```bash
# 1. Ensure you're on main branch
git checkout main

# 2. Pull latest changes
git pull origin main

# 3. Install dependencies
npm install

# 4. Build project
npm run build

# 5. Test build locally
npm run preview

# 6. Deploy to GitHub Pages
npm run deploy

# 7. Verify deployment
# Visit: https://Sargurui.github.io/English_AI/
```

## 🔍 Useful Checks

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check installed packages
npm list --depth=0

# Check project size
du -sh .
du -sh node_modules
du -sh dist

# Count files
find . -type f | wc -l
find src -name "*.jsx" | wc -l
```

## 📝 Documentation Commands

```bash
# Generate documentation (if configured)
npm run docs

# Serve documentation
npm run docs:serve
```

## 🎨 Code Formatting

```bash
# Format code with Prettier (if configured)
npx prettier --write .

# Check formatting
npx prettier --check .
```

## 🔒 Environment Variables

```bash
# Create .env file
echo "VITE_API_KEY=your_key_here" > .env.local

# Never commit .env files!
# They should be in .gitignore
```

## 📱 Mobile Testing

```bash
# Get local IP address
# Windows
ipconfig

# Mac/Linux
ifconfig
ip addr show

# Access on mobile device
# Use: http://[your-ip]:5173
```

## 🎯 Quick Commands Summary

```bash
# Most used commands:
npm install          # Install dependencies
npm run dev         # Start development
npm run build       # Build for production
npm run deploy      # Deploy to GitHub Pages

# Git basics:
git status          # Check status
git add .           # Stage all changes
git commit -m "msg" # Commit changes
git push            # Push to GitHub
```

## 🆘 Help Commands

```bash
# Get help for npm commands
npm help

# Get help for specific command
npm help install
npm help run

# View npm scripts
npm run

# View package.json scripts
cat package.json | grep "scripts" -A 10
```

## ⚡ Performance Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer

# Check lighthouse score
npx lighthouse https://Sargurui.github.io/English_AI/
```

## 🎉 Success Verification

After deployment, verify:

```bash
# 1. Check build success
npm run build
# Should complete without errors

# 2. Preview locally
npm run preview
# Should run at http://localhost:4173

# 3. Check deployed site
curl -I https://Sargurui.github.io/English_AI/
# Should return 200 OK

# 4. Test on mobile
# Open https://Sargurui.github.io/English_AI/ on phone
```

---

## 📚 Additional Resources

- [npm documentation](https://docs.npmjs.com/)
- [Vite documentation](https://vitejs.dev/)
- [Git documentation](https://git-scm.com/doc)
- [GitHub Pages documentation](https://docs.github.com/pages)

---

**Quick Reference Card** 💳

```
Development:  npm run dev
Build:        npm run build
Deploy:       npm run deploy
Install:      npm install
Help:         npm help
```

Save this file for quick reference! 📌

