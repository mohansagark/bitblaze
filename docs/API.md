# API Documentation

This document outlines the internal APIs, hooks, and utilities used throughout the BitBlaze application.

## Custom Hooks

### useAudio Hook

**Location**: `src/helpers/hooks.js`

A custom hook for managing audio playback throughout the application.

**Methods**:

- `playSound(id)` - Play a registered audio file
- `registerAudio(id, filename)` - Register an audio file for later use
- `stopSound(id)` - Stop a playing audio file
- `setVolume(volume)` - Set global volume (0-1)

**Usage**:

```jsx
import { useAudio } from "helpers/hooks";

const MyComponent = () => {
  const { playSound, registerAudio } = useAudio();

  useEffect(() => {
    registerAudio("button-click", "button");
    registerAudio("success", "bell");
  }, [registerAudio]);

  const handleClick = () => {
    playSound("button-click");
  };

  return <button onClick={handleClick}>Click Me</button>;
};
```

**Audio Files**:

- `bell.mp3` - Success/notification sound
- `button.mp3` - Button click sound
- `error.mp3` - Error notification
- `aww.mp3` - Disappointment/loss sound
- `mouse.mp3` - Mouse interaction sound
- `trumpet.mp3` - Victory/celebration sound

### useConfetti Hook

**Location**: `src/helpers/hooks.js`

A hook for triggering confetti animations on celebrations.

**Methods**:

- `showConfetti(options)` - Display confetti animation
- `hideConfetti()` - Stop confetti animation

**Options**:

```javascript
{
  duration: 3000,        // Animation duration in ms
  particleCount: 100,    // Number of particles
  colors: ['#ff0000', '#00ff00', '#0000ff'], // Custom colors
  origin: { x: 0.5, y: 0.5 } // Starting position
}
```

**Usage**:

```jsx
import { useConfetti } from "helpers/hooks";

const GameComponent = () => {
  const { showConfetti } = useConfetti();

  const handleWin = () => {
    showConfetti({
      particleCount: 150,
      duration: 5000,
    });
  };

  return <button onClick={handleWin}>Win Game</button>;
};
```

## Utility Functions

### General Helpers

**Location**: `src/helpers/general.js`

#### `debounce(func, delay)`

Debounces a function to prevent excessive calls.

**Parameters**:

- `func` - Function to debounce
- `delay` - Delay in milliseconds

**Usage**:

```jsx
import { debounce } from "helpers/general";

const debouncedSearch = debounce((query) => {
  performSearch(query);
}, 300);
```

#### `throttle(func, limit)`

Throttles a function to limit execution frequency.

#### `formatDate(date, format)`

Formats a date according to the specified format.

#### `generateId(length)`

Generates a random ID string.

#### `deepClone(obj)`

Creates a deep copy of an object.

#### `isValidEmail(email)`

Validates email format.

#### `capitalizeFirst(str)`

Capitalizes the first letter of a string.

#### `truncateText(text, maxLength)`

Truncates text to a specified length with ellipsis.

## Configuration System

### App Configuration

**Location**: `src/helpers/config.js`

Central configuration file for application constants and settings.

#### Navigation Configuration

```javascript
export const menuItems = [
  {
    label: "Snakes & Ladders",
    path: routePaths.snakesAndLadders,
    icon: GiRollingDices,
    category: "games",
  },
  {
    label: "Chess Board",
    path: routePaths.chessboard,
    icon: FaChess,
    category: "games",
  },
  // ... more items
];
```

#### Social Links

```javascript
export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/mohansagark",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/your-profile",
    icon: FaLinkedin,
  },
];
```

#### Layout Constants

```javascript
export const layoutConstants = {
  headerHeight: "64px",
  footerHeight: "100px",
  sidebarWidth: "250px",
  mobileSidebarWidth: "80vw",
};
```

#### Animation Settings

```javascript
export const animationSettings = {
  scrollDuration: 1000,
  transitionDuration: 300,
  easing: "ease-in-out",
};
```

## State Management API

### Redux Store Structure

**Location**: `src/redux/store.js`

The application uses Redux Toolkit for state management.

#### Store Configuration

```javascript
import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
```

### General Slice

**Location**: `src/redux/slices/generalSlice.js`

Manages application-wide state including theme, user preferences, and UI state.

#### State Structure

```javascript
const initialState = {
  theme: "light",
  sidebarOpen: false,
  loading: false,
  notifications: [],
  userPreferences: {
    soundEnabled: true,
    animationsEnabled: true,
    language: "en",
  },
};
```

#### Actions

- `setTheme(theme)` - Change application theme
- `toggleSidebar()` - Toggle sidebar visibility
- `setLoading(status)` - Set loading state
- `addNotification(notification)` - Add notification
- `removeNotification(id)` - Remove notification
- `updateUserPreferences(preferences)` - Update user settings

#### Usage

```jsx
import { useSelector, useDispatch } from "react-redux";
import { setTheme, toggleSidebar } from "redux/slices/generalSlice";

const MyComponent = () => {
  const { theme, sidebarOpen } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return (
    <div>
      <button onClick={() => dispatch(toggleSidebar())}>Toggle Sidebar</button>
    </div>
  );
};
```

## Theme System API

### Theme Provider

**Location**: `src/themes/index.jsx`

Manages theme context and switching.

#### Theme Structure

```javascript
const themeObject = {
  name: "light",
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    background: "#ffffff",
    surface: "#f8f9fa",
    text: "#212529",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "3rem",
  },
};
```

#### Available Themes

- `light` - Default light theme
- `dark` - Dark mode theme
- `coral-light` - Coral color scheme (light)
- `coral-dark` - Coral color scheme (dark)
- `vivid-light` - High contrast light theme
- `vivid-dark` - High contrast dark theme

#### Usage

```jsx
import { useTheme } from "themes";

const MyComponent = () => {
  const { currentTheme, changeTheme, availableThemes } = useTheme();

  return (
    <div
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
      }}
    >
      <select onChange={(e) => changeTheme(e.target.value)}>
        {availableThemes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Routing API

### Route Configuration

**Location**: `src/router/routes.jsx`

Defines application routes and their corresponding components.

#### Route Structure

```javascript
const routes = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
    description: "Welcome to BitBlaze",
  },
  {
    path: "/games/:gameId",
    element: <GameWrapper />,
    title: "Games",
    protected: false,
  },
];
```

#### Route Constants

**Location**: `src/router/routeConstants.js`

```javascript
export const routePaths = {
  home: "/",
  snakesAndLadders: "/snakes-and-ladders",
  chessboard: "/chessboard",
  rockPaperScissors: "/rock-paper-scissors",
  cards: "/cards",
  whatsAppChat: "/whatsapp-chat",
  notFound: "/404",
};
```

#### Navigation Utilities

```javascript
import { useNavigate, useLocation } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToGame = (gameName) => {
    navigate(routePaths[gameName]);
  };

  const goBack = () => {
    navigate(-1);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return { goToGame, goBack, isCurrentPath };
};
```

## Game APIs

### Game State Management

Each game implements a standard interface for state management:

```javascript
const useGameState = () => {
  const [gameState, setGameState] = useState("idle"); // idle, playing, paused, finished
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState(null);
  const [gameData, setGameData] = useState({});

  const startGame = () => {
    setGameState("playing");
    initializeGame();
  };

  const pauseGame = () => {
    setGameState("paused");
  };

  const endGame = (result) => {
    setGameState("finished");
    handleGameEnd(result);
  };

  const resetGame = () => {
    setGameState("idle");
    setScore(0);
    setGameData({});
  };

  return {
    gameState,
    score,
    player,
    gameData,
    startGame,
    pauseGame,
    endGame,
    resetGame,
  };
};
```

### Game Events

Games emit events for important actions:

```javascript
const gameEvents = {
  GAME_START: "game:start",
  GAME_END: "game:end",
  SCORE_UPDATE: "game:score:update",
  PLAYER_MOVE: "game:player:move",
  GAME_PAUSE: "game:pause",
  GAME_RESUME: "game:resume",
};
```

## Error Handling

### Error Boundary API

```jsx
import ErrorBoundary from "components/common/ErrorBoundary";

<ErrorBoundary
  fallback={<ErrorFallback />}
  onError={(error, errorInfo) => {
    console.error("Error caught:", error, errorInfo);
  }}
>
  <App />
</ErrorBoundary>;
```

### Error Reporting

```javascript
const reportError = (error, context = {}) => {
  console.error("Error:", error);

  // Send to error reporting service
  if (process.env.NODE_ENV === "production") {
    // Analytics or error reporting service
  }
};
```

## Performance Monitoring

### Metrics Collection

The application includes performance monitoring through Vercel Analytics:

```javascript
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Included in app root
<Analytics />
<SpeedInsights />
```

### Custom Performance Hooks

```javascript
const usePerformance = () => {
  const [performanceData, setPerformanceData] = useState({});

  const measureRender = (componentName) => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      setPerformanceData((prev) => ({
        ...prev,
        [componentName]: renderTime,
      }));
    };
  };

  return { performanceData, measureRender };
};
```
