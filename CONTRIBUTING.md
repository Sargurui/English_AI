# Contributing to English AI Practice

First off, thank you for considering contributing to English AI Practice! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When you create a bug report, include:
- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Browser and OS** information
- **Console errors** if any

### 💡 Suggesting Features

We love feature suggestions! Before creating a suggestion:
- Check if it's already suggested
- Explain the use case clearly
- Describe how it would benefit users

### 🔧 Pull Requests

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/English_AI.git
cd English_AI

# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Use PropTypes or TypeScript for type checking

### CSS
- Use CSS variables for theming
- Follow BEM naming convention
- Mobile-first responsive design
- Use CSS Grid and Flexbox

### Commits
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and PRs when relevant

## Project Structure

```
English_AI/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── context/         # React context providers
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js
```

## Adding New Features

### Adding a New Scenario

Edit `src/pages/Conversations.jsx`:

```javascript
const SCENARIOS = [
  {
    id: 'your-scenario',
    title: 'Your Scenario',
    icon: '🎯',
    description: 'Brief description'
  },
  // ... existing scenarios
];
```

### Adding a New Language

1. Edit `src/pages/Setup.jsx`:
```jsx
<select>
  <option value="YourLanguage">Your Language (Native Script)</option>
  {/* ... existing options */}
</select>
```

2. Update AI prompts in `src/utils/aiService.js` if needed

### Adding New AI Provider

1. Add API integration in `src/utils/aiService.js`
2. Update Setup page to include new provider option
3. Add configuration in Settings page
4. Update documentation

## Testing

Before submitting a PR:
- [ ] Test all features manually
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Test on different browsers
- [ ] Verify no console errors
- [ ] Check that build succeeds: `npm run build`

## Documentation

When adding features:
- Update README.md
- Add JSDoc comments to functions
- Update QUICKSTART.md if needed
- Include screenshots for UI changes

## Code Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged!

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the app's about section

## Questions?

Feel free to:
- Open an issue for questions
- Ask in pull request discussions
- Reach out to maintainers

## Code of Conduct

### Our Pledge

We pledge to make participation in this project a harassment-free experience for everyone.

### Our Standards

**Positive behavior:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community

**Unacceptable behavior:**
- Trolling, insulting comments, or personal attacks
- Public or private harassment
- Publishing others' private information
- Other unethical or unprofessional conduct

### Enforcement

Instances of unacceptable behavior may be reported to project maintainers. All complaints will be reviewed and investigated.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to English AI Practice! 🙏

Your contributions help learners worldwide improve their English skills! 🌍✨

