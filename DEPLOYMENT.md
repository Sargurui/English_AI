# Deployment Guide

## 🚀 Deploying to GitHub Pages

### Method 1: Using npm deploy script (Recommended)

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build and deploy**:
   ```bash
   npm run deploy
   ```

This will build your application and push it to the `gh-pages` branch.

### Method 2: Using GitHub Actions (Automatic)

The project includes a GitHub Actions workflow that automatically deploys your app when you push to the main branch.

1. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)` → Save

2. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. Your app will be automatically built and deployed!

### Method 3: Manual Deploy

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Install gh-pages** (if not already):
   ```bash
   npm install -g gh-pages
   ```

3. **Deploy the dist folder**:
   ```bash
   gh-pages -d dist
   ```

## 🔧 Configuration

### Update Base URL

If you're deploying to a different repository, update the `base` in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Change this
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
```

Also update `homepage` in `package.json`:

```json
{
  "homepage": "https://your-username.github.io/your-repo-name"
}
```

## 🌐 Accessing Your App

After deployment, your app will be available at:
```
https://your-username.github.io/your-repo-name/
```

For this project:
```
https://Sargurui.github.io/English_AI/
```

## 🔍 Troubleshooting

### 404 Error on GitHub Pages

1. Make sure `base` in `vite.config.js` matches your repository name
2. Check that GitHub Pages is enabled and set to the `gh-pages` branch
3. Wait a few minutes for GitHub Pages to update

### Build Fails

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Run `npm run build` to check for errors

### Assets Not Loading

1. Verify the `base` URL in `vite.config.js`
2. Make sure all imports use relative paths
3. Check browser console for 404 errors

## 📝 Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in development
- [ ] API keys are not hardcoded
- [ ] README is updated
- [ ] `.gitignore` includes `node_modules/` and `dist/`

## 🎯 Post-Deployment

After deployment:

1. Visit your deployed site
2. Test all features:
   - Setup flow
   - Voice chat
   - Text chat
   - Conversations
   - Grammar check
   - Settings
3. Test on different devices (mobile, tablet, desktop)
4. Test on different browsers

## 🔒 Security Notes

- Never commit API keys to the repository
- Use environment variables for sensitive data
- The app stores API keys in localStorage (client-side only)
- Clear instructions for users to provide their own API keys

## 📱 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

Example `CNAME` file:
```
your-domain.com
```

## 🎉 Success!

Your English AI Practice app is now live! Share it with learners around the world.

---

Need help? Open an issue on GitHub!

