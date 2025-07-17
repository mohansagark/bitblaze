# Helpers Documentation

This directory contains utility functions, hooks, and configuration files that provide common functionality across the BitBlaze application.

## Files Overview

### 🎣 `hooks.js`

Custom React hooks for common functionality:

- **useTheme()** - Theme context management
- **useConfetti()** - Confetti animation controls
- **useMenu()** - Sidebar menu state management
- **useAudio()** - Audio playback with error handling

### ⚙️ `config.js`

Application configuration and constants:

- Layout dimensions (header height, sidebar width, etc.)
- Menu items configuration
- Social media links
- Animation settings
- Navigation breakpoints

### 🛠️ `general.js`

General utility functions:

- Local storage helpers (fetchStore, setStore)
- Common helper functions

### 🌍 `environment.js`

Environment configuration utilities:

- Environment variable validation
- Feature flag checks
- Development/production mode detection
- Configuration logging

### 📋 `constants.js`

Application-wide constants:

- Game states and types
- Audio file mappings
- Theme configurations
- Error/success messages
- Layout constants

### ✅ `validation.js`

Data validation utilities:

- Form validation functions
- Game move validation
- Input sanitization
- File upload validation

## Usage Examples

### Using Custom Hooks

```javascript
import { useAudio, useConfetti, useTheme } from 'helpers/hooks';

const MyComponent = () => {
  const { playSound, registerAudio } = useAudio();
  const { showConfetti } = useConfetti();
  const { currentTheme, changeTheme } = useTheme();

  useEffect(() => {
    registerAudio('win-sound', 'bell');
  }, [registerAudio]);

  const handleWin = () => {
    playSound('win-sound');
    showConfetti();
  };

  return <button onClick={handleWin}>Win Game</button>;
};
```

### Using Environment Utilities

```javascript
import { isFeatureEnabled, isDevelopment } from 'helpers/environment';

const MyComponent = () => {
  const showAnalytics = isFeatureEnabled('analytics');
  const debugMode = isDevelopment();

  return (
    <div>
      {showAnalytics && <AnalyticsComponent />}
      {debugMode && <DebugPanel />}
    </div>
  );
};
```

### Using Constants

```javascript
import { GAME_STATES, AUDIO_FILES } from 'helpers/constants';

const GameComponent = () => {
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);

  const startGame = () => {
    setGameState(GAME_STATES.PLAYING);
    playSound(AUDIO_FILES.BUTTON);
  };
};
```

### Using Validation

```javascript
import { validateEmail, validateGameMove } from 'helpers/validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };
};
```

## Best Practices

### 1. Hook Usage

- Always call hooks at the top level of components
- Use dependency arrays properly in useEffect
- Handle cleanup in useEffect when needed

### 2. Environment Variables

- Use environment utilities instead of direct process.env access
- Validate environment variables at application startup
- Use feature flags for conditional functionality

### 3. Constants

- Import only what you need to reduce bundle size
- Use descriptive constant names
- Group related constants together

### 4. Validation

- Validate user inputs before processing
- Provide clear error messages
- Sanitize inputs to prevent security issues

### 5. Error Handling

- Always handle potential errors in utility functions
- Provide fallback values for missing configuration
- Log errors appropriately based on environment

## Adding New Utilities

When adding new utility functions:

1. **Choose the right file** - Place functions in the most appropriate file
2. **Document the function** - Include JSDoc comments
3. **Add error handling** - Handle edge cases gracefully
4. **Write tests** - Create corresponding test files
5. **Export properly** - Add to default exports if needed

### Example New Utility

```javascript
/**
 * Format currency value
 * @param {number} value - Value to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currency} ${value}`;
  }
};
```

## Testing Utilities

When testing components that use these utilities:

```javascript
// Mock hooks in tests
jest.mock('helpers/hooks', () => ({
  useAudio: () => ({
    playSound: jest.fn(),
    registerAudio: jest.fn(),
  }),
  useConfetti: () => ({
    showConfetti: jest.fn(),
  }),
}));

// Mock environment functions
jest.mock('helpers/environment', () => ({
  isFeatureEnabled: jest.fn(() => true),
  isDevelopment: jest.fn(() => true),
}));
```

## Performance Considerations

- **Tree Shaking**: Import only what you need
- **Memoization**: Use React.memo() and useMemo() for expensive operations
- **Lazy Loading**: Lazy load heavy utilities when possible
- **Bundle Analysis**: Monitor bundle size impact of new utilities

## Migration Guide

When updating utility functions:

1. **Deprecation**: Mark old functions as deprecated
2. **Documentation**: Update documentation with migration notes
3. **Backward Compatibility**: Maintain backward compatibility when possible
4. **Testing**: Ensure all tests pass with changes
5. **Communication**: Notify team of breaking changes
