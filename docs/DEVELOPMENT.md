# Development Guide

This guide provides comprehensive information for developers working on the BitBlaze project.

## Getting Started

### Prerequisites

- **Node.js**: 16.x or higher
- **npm**: 8.x or higher (or yarn 1.22.x)
- **Git**: Latest version
- **VS Code**: Recommended IDE

### Development Environment Setup

1. **Clone and Setup**

   ```bash
   git clone https://github.com/mohansagark/games.git
   cd bitblaze
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:

   ```bash
   # Analytics (Optional)
   REACT_APP_VERCEL_ANALYTICS_ID=your_analytics_id

   # Development settings
   REACT_APP_ENV=development
   REACT_APP_DEBUG=true

   # Feature flags
   REACT_APP_ENABLE_CONFETTI=true
   REACT_APP_ENABLE_SOUND=true
   ```

3. **Start Development Server**

   ```bash
   npm start
   ```

4. **Verify Setup**
   - Open http://localhost:3000
   - Check browser console for errors
   - Verify all games load correctly

## Project Architecture

### Folder Structure Philosophy

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input)
│   └── Layout/          # Layout-specific components
├── pages/               # Route-level components
│   ├── Games/           # Game implementations
│   ├── Apps/            # Application features
│   └── common/          # Shared pages (404, Error)
├── themes/              # Theme system
├── redux/               # State management
├── router/              # Navigation setup
├── helpers/             # Utilities and hooks
├── data/                # Static data files
└── assets/              # Static assets (images, audio)
```

### Component Organization

- **Atomic Design**: Components follow atomic design principles
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Complex UIs built by composing simple components

### State Management Architecture

```
Redux Store
├── general/             # App-wide state (theme, UI)
├── games/               # Game-specific state
├── user/                # User preferences
└── notifications/       # App notifications
```

## Development Workflow

### 1. Feature Development

#### Creating a New Feature

```bash
# Create feature branch
git checkout -b feature/awesome-new-game

# Create component structure
mkdir src/pages/Games/AwesomeGame
touch src/pages/Games/AwesomeGame/index.jsx
touch src/pages/Games/AwesomeGame/AwesomeGame.scss

# Add route
# Update src/router/routes.jsx
# Update src/router/routeConstants.js
```

#### Component Template

```jsx
import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useAudio, useConfetti } from "../../../helpers/hooks";
import Button from "../../../components/common/Button";
import "./AwesomeGame.scss";

const AwesomeGame = () => {
  const [gameState, setGameState] = useState("idle");
  const { playSound, registerAudio } = useAudio();
  const { showConfetti } = useConfetti();

  useEffect(() => {
    // Register audio files
    registerAudio("start-sound", "button");
    registerAudio("win-sound", "bell");
  }, [registerAudio]);

  const startGame = () => {
    playSound("start-sound");
    setGameState("playing");
  };

  const winGame = () => {
    playSound("win-sound");
    showConfetti();
    setGameState("won");
  };

  return (
    <Container className="awesome-game">
      <Typography variant="h4" className="game-title">
        Awesome Game
      </Typography>

      {gameState === "idle" && <Button onClick={startGame}>Start Game</Button>}

      {gameState === "playing" && (
        <div className="game-board">{/* Game logic here */}</div>
      )}

      {gameState === "won" && (
        <div className="game-result">
          <Typography variant="h5">You Won!</Typography>
          <Button onClick={() => setGameState("idle")}>Play Again</Button>
        </div>
      )}
    </Container>
  );
};

export default AwesomeGame;
```

### 2. Code Style and Standards

#### JavaScript/React Standards

- **ES6+**: Use modern JavaScript features
- **Functional Components**: Prefer hooks over class components
- **Arrow Functions**: Use arrow functions for consistency
- **Destructuring**: Destructure props and state where appropriate
- **Template Literals**: Use template literals for string interpolation

#### Naming Conventions

```javascript
// Components: PascalCase
const MyComponent = () => {};

// Variables and functions: camelCase
const userName = "john";
const handleButtonClick = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";

// Files: kebab-case or PascalCase
// my-component.jsx or MyComponent.jsx
```

#### Import Organization

```jsx
// 1. React imports
import React, { useState, useEffect } from "react";

// 2. Third-party libraries
import { Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

// 3. Internal utilities/hooks
import { useAudio } from "helpers/hooks";

// 4. Components
import Button from "components/common/Button";

// 5. Relative imports
import "./Component.scss";
```

### 3. Styling Guidelines

#### CSS Architecture

- **Tailwind-first**: Use Tailwind utilities when possible
- **SCSS for complex styles**: Use SCSS for component-specific styling
- **BEM methodology**: Follow BEM naming for CSS classes

#### Responsive Design

```scss
// Mobile-first approach
.game-board {
  padding: 1rem;

  // Tablet
  @media (min-width: 768px) {
    padding: 2rem;
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: 3rem;
  }
}
```

#### Theme Integration

```jsx
// Use theme colors
const StyledComponent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

// Or with Tailwind + CSS variables
<div className="bg-primary text-white">Content</div>;
```

### 4. Testing Strategy

#### Unit Tests

```javascript
// Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Integration Tests

```javascript
// Game.integration.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Game from "./Game";

const renderWithProvider = (component) => {
  return render(<Provider store={store}>{component}</Provider>);
};

test("complete game flow", () => {
  renderWithProvider(<Game />);

  fireEvent.click(screen.getByText("Start Game"));
  expect(screen.getByText("Game in progress")).toBeInTheDocument();

  // Simulate game completion
  fireEvent.click(screen.getByText("Win Game"));
  expect(screen.getByText("You Won!")).toBeInTheDocument();
});
```

### 5. Performance Optimization

#### Code Splitting

```jsx
// Lazy load components
import { lazy, Suspense } from "react";

const LazyGame = lazy(() => import("./pages/Games/ExpensiveGame"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyGame />
    </Suspense>
  );
}
```

#### Memoization

```jsx
import React, { memo, useMemo, useCallback } from "react";

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      processed: true,
    }));
  }, [data]);

  const handleClick = useCallback(
    (id) => {
      onUpdate(id);
    },
    [onUpdate]
  );

  return (
    <div>
      {processedData.map((item) => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});
```

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

## Debugging and Troubleshooting

### Common Development Issues

#### 1. Component Not Rendering

```javascript
// Check console for errors
console.error("Component error:", error);

// Use React Developer Tools
// Check component props and state
```

#### 2. State Not Updating

```javascript
// Check Redux DevTools
// Verify action dispatching
// Check reducer logic
```

#### 3. Styling Issues

```scss
// Use browser dev tools
// Check CSS specificity
// Verify theme variables

.debug-border {
  border: 1px solid red !important;
}
```

#### 4. Performance Issues

```javascript
// Use React Profiler
import { Profiler } from "react";

function onRenderCallback(id, phase, actualDuration) {
  console.log("Render:", id, phase, actualDuration);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>;
```

### Development Tools

#### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-react-native",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

#### Browser Extensions

- React Developer Tools
- Redux DevTools
- Lighthouse
- Web Vitals

## Git Workflow

### Branch Strategy

```bash
main                    # Production branch
├── develop            # Development branch
├── feature/game-name  # Feature branches
├── bugfix/issue-123   # Bug fix branches
└── hotfix/critical    # Hotfix branches
```

### Commit Messages

```bash
# Format: type(scope): description
feat(games): add chess game implementation
fix(ui): resolve mobile navigation issues
docs(readme): update installation instructions
style(themes): improve dark theme colors
refactor(hooks): optimize audio hook performance
test(games): add unit tests for card game
```

### Pull Request Process

1. Create feature branch
2. Implement feature with tests
3. Update documentation
4. Submit PR with description
5. Code review
6. Merge after approval

## Deployment

### Build Process

```bash
# Development build
npm run build:dev

# Production build
npm run build

# Analyze bundle
npm run analyze
```

### Environment-Specific Builds

```bash
# Staging
REACT_APP_ENV=staging npm run build

# Production
REACT_APP_ENV=production npm run build
```

### Deployment Checklist

- [ ] All tests passing
- [ ] Build successful
- [ ] Performance audit passed
- [ ] Accessibility audit passed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified

## Maintenance

### Regular Tasks

- **Dependencies**: Update packages monthly
- **Security**: Run security audits weekly
- **Performance**: Monitor bundle size
- **Testing**: Maintain >80% test coverage

### Monitoring

- Error tracking with console logging
- Performance monitoring with Vercel Analytics
- User feedback collection

### Documentation Updates

- Keep API documentation current
- Update component documentation
- Maintain deployment guides
