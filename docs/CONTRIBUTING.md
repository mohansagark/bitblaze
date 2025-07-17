# Contributing to BitBlaze

We welcome contributions to the BitBlaze project! This guide will help you get started with contributing code, reporting issues, and suggesting improvements.

## 🤝 Ways to Contribute

- **Bug Reports**: Report bugs or issues you encounter
- **Feature Requests**: Suggest new games or features
- **Code Contributions**: Submit pull requests with improvements
- **Documentation**: Improve or add documentation
- **Testing**: Help test new features and report feedback
- **Design**: Contribute UI/UX improvements

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher (or yarn 1.22.x)
- Git
- A GitHub account

### Setting Up Development Environment

1. **Fork the Repository**

   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/games.git
   cd bitblaze
   ```

2. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/mohansagark/games.git
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start Development Server**

   ```bash
   npm start
   ```

5. **Verify Setup**
   - Visit http://localhost:3000
   - Ensure all games load correctly
   - Check browser console for errors

## 📋 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/add-tic-tac-toe-game
git checkout -b bugfix/fix-chess-move-validation
git checkout -b docs/improve-api-documentation
```

### 2. Make Your Changes

Follow our coding standards and best practices:

#### Code Style Guidelines

**JavaScript/React**:

```javascript
// Use functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects here
  }, [dependencies]);

  const handleClick = useCallback(
    (event) => {
      // Event handler logic
    },
    [dependencies]
  );

  return (
    <div className="my-component">
      <Button onClick={handleClick}>{prop1}</Button>
    </div>
  );
};

export default MyComponent;
```

**Naming Conventions**:

- Components: `PascalCase` (e.g., `GameBoard`)
- Variables/Functions: `camelCase` (e.g., `handlePlayerMove`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_BOARD_SIZE`)
- Files: `kebab-case` or `PascalCase` (e.g., `game-board.jsx` or `GameBoard.jsx`)

**Import Organization**:

```javascript
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Third-party libraries
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

// 3. Internal utilities
import { useAudio } from "helpers/hooks";

// 4. Components
import Button from "components/common/Button";

// 5. Relative imports
import "./Component.scss";
```

### 3. Adding New Games

When contributing a new game, follow this structure:

```bash
# Create game directory
mkdir src/pages/Games/YourGame
cd src/pages/Games/YourGame

# Create necessary files
touch index.jsx
touch YourGame.scss
touch README.md
```

**Game Component Template**:

```javascript
import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useAudio, useConfetti } from "../../../helpers/hooks";
import Button from "../../../components/common/Button";
import "./YourGame.scss";

const YourGame = () => {
  const [gameState, setGameState] = useState("idle"); // idle, playing, paused, finished
  const [score, setScore] = useState(0);
  const { playSound, registerAudio } = useAudio();
  const { showConfetti } = useConfetti();

  useEffect(() => {
    // Register audio files
    registerAudio("game-start", "button");
    registerAudio("game-win", "bell");
    registerAudio("game-lose", "aww");
  }, [registerAudio]);

  const startGame = () => {
    playSound("game-start");
    setGameState("playing");
    // Initialize game logic
  };

  const endGame = (result) => {
    if (result === "win") {
      playSound("game-win");
      showConfetti();
    } else {
      playSound("game-lose");
    }
    setGameState("finished");
  };

  const resetGame = () => {
    setGameState("idle");
    setScore(0);
  };

  return (
    <Container className="your-game">
      <Typography variant="h4" className="game-title">
        Your Game Name
      </Typography>

      {gameState === "idle" && (
        <div className="game-start">
          <Button onClick={startGame} variant="primary">
            Start Game
          </Button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="game-board">
          {/* Game logic and UI here */}
          <Typography variant="h6">Score: {score}</Typography>
        </div>
      )}

      {gameState === "finished" && (
        <div className="game-result">
          <Typography variant="h5">Game Over!</Typography>
          <Typography variant="body1">Final Score: {score}</Typography>
          <Button onClick={resetGame} variant="primary">
            Play Again
          </Button>
        </div>
      )}
    </Container>
  );
};

export default YourGame;
```

**Add Route**:

```javascript
// In src/router/routeConstants.js
export const routePaths = {
  // ...existing paths
  yourGame: '/your-game'
};

// In src/router/routes.jsx
import YourGame from '../pages/Games/YourGame';

// Add to routes array
{
  path: routePaths.yourGame,
  element: <YourGame />
}
```

**Add Navigation**:

```javascript
// In src/helpers/config.js
import { YourGameIcon } from "react-icons/your-icon-library";

export const gameMenuItems = [
  // ...existing items
  {
    label: "Your Game",
    path: routePaths.yourGame,
    icon: YourGameIcon,
    category: "games",
    description: "Brief description of your game",
  },
];
```

### 4. Writing Tests

All new features should include tests:

```javascript
// YourGame.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import YourGame from "./index";

const renderWithProvider = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("YourGame", () => {
  test("renders game title", () => {
    renderWithProvider(<YourGame />);
    expect(screen.getByText("Your Game Name")).toBeInTheDocument();
  });

  test("starts game when start button is clicked", () => {
    renderWithProvider(<YourGame />);
    const startButton = screen.getByText("Start Game");
    fireEvent.click(startButton);
    expect(screen.getByText("Score: 0")).toBeInTheDocument();
  });

  test("resets game correctly", () => {
    renderWithProvider(<YourGame />);
    // Test game reset logic
  });
});
```

**Run Tests**:

```bash
# Run all tests
npm test

# Run specific test file
npm test YourGame.test.jsx

# Run tests with coverage
npm test -- --coverage
```

### 5. Commit Your Changes

Follow conventional commit format:

```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "type(scope): description"

# Examples:
git commit -m "feat(games): add tic-tac-toe game with AI opponent"
git commit -m "fix(chess): resolve piece movement validation issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "style(ui): improve mobile responsiveness for card game"
git commit -m "test(games): add unit tests for rock-paper-scissors"
```

**Commit Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 6. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create pull request on GitHub
# Use the provided template and fill in details
```

## 📝 Pull Request Guidelines

### PR Template

When creating a pull request, use this template:

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Changes Made

- List of specific changes
- Include any new files created
- Mention any dependencies added/removed

## Testing

- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots/GIFs

If applicable, add screenshots or GIFs showing the changes.

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] No console errors or warnings
```

### PR Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and builds
2. **Code Review**: Maintainers review code for quality and standards
3. **Feedback**: Address any requested changes
4. **Approval**: PR approved by maintainers
5. **Merge**: Changes merged into main branch

## 🐛 Reporting Issues

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g. iOS, Windows, macOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone6, Desktop]

**Additional Context**
Add any other context about the problem here.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## 🏗️ Code Review Guidelines

### For Contributors

- Keep PRs focused and small
- Write clear commit messages
- Add tests for new functionality
- Update documentation as needed
- Respond promptly to review feedback

### For Reviewers

- Be constructive and respectful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests cover new functionality
- Ensure documentation is updated

## 🎨 Design Contributions

### UI/UX Guidelines

- Follow Material Design principles
- Maintain consistency with existing design
- Ensure mobile responsiveness
- Consider accessibility requirements
- Use the established color scheme

### Asset Contributions

- **Images**: SVG preferred, PNG acceptable
- **Icons**: Use React Icons library when possible
- **Audio**: MP3 format, reasonable file sizes
- **Animations**: Use Framer Motion for consistency

## 📚 Documentation Contributions

### Documentation Standards

- Use Markdown format
- Include code examples
- Keep language clear and concise
- Update relevant sections when making changes
- Add screenshots for visual features

### Types of Documentation

- **API Documentation**: Function signatures and usage
- **Component Documentation**: Props and examples
- **Game Documentation**: Rules and implementation details
- **Setup Guides**: Installation and configuration
- **Troubleshooting**: Common issues and solutions

## 🌟 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- GitHub contributors graph
- Special thanks in documentation

## ❓ Getting Help

If you need help or have questions:

1. **Check Documentation**: Read existing docs first
2. **Search Issues**: Look for similar questions/issues
3. **Ask Questions**: Create a discussion or issue
4. **Contact Maintainers**: Reach out directly if needed

## 📜 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## 🙏 Thank You

Thank you for contributing to BitBlaze! Your contributions help make this project better for everyone.

---

**Happy Contributing!** 🎮✨
