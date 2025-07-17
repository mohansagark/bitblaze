# Component Documentation

This document provides detailed information about the reusable components in the BitBlaze application.

## Common Components

### Button Component

**Location**: `src/components/common/Button/index.jsx`

A customizable button component with theme support.

**Props**:

- `children` - Button content
- `variant` - Button style variant
- `onClick` - Click handler function
- `disabled` - Whether button is disabled

**Usage**:

```jsx
import Button from "components/common/Button";

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>;
```

### Input Component

**Location**: `src/components/common/Input/index.jsx`

A flexible input component with validation support.

**Props**:

- `type` - Input type (text, email, password, etc.)
- `placeholder` - Placeholder text
- `value` - Input value
- `onChange` - Change handler
- `error` - Error message to display

**Usage**:

```jsx
import Input from "components/common/Input";

<Input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={setName}
  error={nameError}
/>;
```

### Search Component

**Location**: `src/components/common/Search/index.jsx`

A search input component with filtering capabilities.

**Features**:

- Real-time search filtering
- Debounced input handling
- Clear search functionality

### Switch Component

**Location**: `src/components/common/Switch/index.jsx`

A toggle switch component for boolean values.

**Props**:

- `checked` - Whether switch is on/off
- `onChange` - Change handler
- `label` - Optional label text

### Container Component

**Location**: `src/components/common/Container/index.jsx`

A responsive container component for content layout.

**Features**:

- Responsive max-width
- Centered content
- Padding management

### HamburgerIcon Component

**Location**: `src/components/common/HamburgerIcon/index.jsx`

An animated hamburger menu icon for mobile navigation.

**Features**:

- Smooth open/close animation
- Theme-aware styling

## Layout Components

### Header Component

**Location**: `src/components/Layout/Header/index.jsx`

The main application header with navigation.

**Features**:

- Responsive navigation menu
- Theme toggle
- Mobile hamburger menu
- Logo integration

### Footer Component

**Location**: `src/components/Layout/Footer/index.jsx`

Application footer with links and information.

**Features**:

- Social media links
- Copyright information
- Responsive layout

### Sidebar Component

**Location**: `src/components/Layout/Sidebar/index.jsx`

Navigation sidebar for larger screens.

**Features**:

- Collapsible design
- Theme integration
- Navigation links

### Menu Component

**Location**: `src/components/Layout/Menu/index.jsx`

Navigation menu system.

**Components**:

- `Menu/index.jsx` - Main menu component
- `Menu/MenuBlock.jsx` - Individual menu blocks

### Logo Component

**Location**: `src/components/Layout/Logo/index.jsx`

Application logo component with branding.

### ThemeSettings Component

**Location**: `src/components/Layout/ThemeSettings/index.jsx`

Theme selection and configuration panel.

**Features**:

- Multiple theme options
- Color scheme selection
- Live preview
- Persistent theme storage

### UserProfile Component

**Location**: `src/components/Layout/UserProfile/index.jsx`

User profile display and management.

## Component Architecture

### Design Principles

1. **Reusability**: Components are designed to be reusable across different parts of the application
2. **Composition**: Components can be composed together to create complex UIs
3. **Props Interface**: Clear and consistent props interface for all components
4. **Theme Support**: All components support the application's theme system
5. **Responsive Design**: Components adapt to different screen sizes

### Styling Approach

Components use a combination of:

- **Tailwind CSS**: For utility-first styling
- **SCSS Modules**: For component-specific styles
- **Material-UI**: For advanced UI components
- **Theme Variables**: For consistent theming

### State Management

- **Local State**: Component-specific state using React hooks
- **Global State**: Application-wide state using Redux
- **Theme State**: Theme preferences stored in Redux

### Component Guidelines

#### Creating New Components

1. **File Structure**:

   ```
   components/
     ComponentName/
       index.jsx
       ComponentName.scss (if needed)
   ```

2. **Component Template**:

   ```jsx
   import React from "react";
   import "./ComponentName.scss";

   const ComponentName = ({ prop1, prop2, ...props }) => {
     return (
       <div className="component-name" {...props}>
         {/* Component content */}
       </div>
     );
   };

   export default ComponentName;
   ```

3. **PropTypes** (recommended):

   ```jsx
   import PropTypes from "prop-types";

   ComponentName.propTypes = {
     prop1: PropTypes.string.isRequired,
     prop2: PropTypes.func,
   };

   ComponentName.defaultProps = {
     prop2: () => {},
   };
   ```

#### Best Practices

1. **Single Responsibility**: Each component should have a single, well-defined purpose
2. **Pure Components**: Prefer pure functional components when possible
3. **Custom Hooks**: Extract complex logic into custom hooks
4. **Accessibility**: Include proper ARIA attributes and semantic HTML
5. **Performance**: Use React.memo() for expensive components
6. **Testing**: Write unit tests for complex components

#### Component Communication

1. **Parent to Child**: Props
2. **Child to Parent**: Callback functions
3. **Sibling Components**: Lift state up to common parent
4. **Distant Components**: Redux or Context API

#### Error Boundaries

For components that might throw errors, wrap them in error boundaries:

```jsx
import ErrorBoundary from "components/common/ErrorBoundary";

<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>;
```

## Component Testing

### Testing Strategy

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test component interactions
3. **Snapshot Tests**: Detect unexpected changes in component output

### Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation

### Example Test

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
