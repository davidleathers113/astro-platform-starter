# Theme-Aware Component Utilities

This document provides comprehensive documentation for the theme-aware component utilities in the Astro Platform Starter project.

## Overview

The theme-aware component utilities provide an easy way for developers to create components that respond to theme changes. These utilities build upon the theme context provider and system preference detection utility to offer a rich set of features for building theme-aware user interfaces.

## Available Utilities

### Enhanced useTheme Hook

The `useTheme` hook provides access to the theme context with additional derived utilities:

```typescript
const { 
  // Original properties
  theme,            // Current theme setting ('light', 'dark', or 'system')
  resolvedTheme,    // Actual applied theme ('light' or 'dark')
  setTheme,         // Function to change the theme
  toggleTheme,      // Function to toggle between light and dark

  // Enhanced properties
  isDarkMode,       // Boolean indicating if dark mode is active
  isLightMode,      // Boolean indicating if light mode is active
  isSystemTheme,    // Boolean indicating if theme is set to follow system
  themeClass,       // Function to apply conditional classes based on theme
  getThemeValue     // Function to get theme-specific values
} = useTheme();
```

#### Usage Examples

**Conditional Classes:**

```tsx
// Apply different Tailwind classes based on theme
<div className={themeClass('bg-gray-800 text-white', 'bg-white text-gray-800')}>
  This element has theme-specific styling
</div>
```

**Theme-Specific Values:**

```tsx
// Display different content based on theme
<p>
  {getThemeValue({
    light: '☀️ Light mode content',
    dark: '🌙 Dark mode content'
  })}
</p>
```

### Theme Styling Hooks

#### useThemeStyles

The `useThemeStyles` hook provides theme-aware styles for React components:

```typescript
const styles = useThemeStyles({
  backgroundColor: { light: '#ffffff', dark: '#1a2234' },
  color: { light: '#1a2234', dark: '#ffffff' },
  borderColor: { light: '#e2e8f0', dark: '#2d3748' }
});

// Use in a component
<div style={styles}>Styled content</div>
```

#### useThemeTransition

The `useThemeTransition` hook helps with animations during theme changes:

```typescript
const { isTransitioning, transitionClass } = useThemeTransition();

// Use in a component
<div className={`${transitionClass} ${isTransitioning ? 'animate-pulse' : ''}`}>
  This animates during theme changes
</div>
```

#### useContrastCheck

The `useContrastCheck` hook helps ensure color contrast accessibility:

```typescript
const { contrastRatio, meetsAA, meetsAALarge } = useContrastCheck('#ff0000');

// Use in a component
<div>
  <p>Contrast Ratio: {contrastRatio.toFixed(2)}</p>
  <p>Meets WCAG AA: {meetsAA ? '✓' : '✗'}</p>
  <p>Meets WCAG AA (Large Text): {meetsAALarge ? '✓' : '✗'}</p>
</div>
```

### Non-React Utilities

These utilities can be used outside of React components:

#### getDocumentTheme

```typescript
// Get the current theme setting ('light', 'dark', or 'system')
const currentTheme = getDocumentTheme();
```

#### getResolvedTheme

```typescript
// Get the actual applied theme ('light' or 'dark')
const resolvedTheme = getResolvedTheme();
```

#### isThemeActive

```typescript
// Check if a specific theme is active
const isDarkActive = isThemeActive('dark');
```

#### getThemeColor

```typescript
// Get a CSS variable value for the current theme
const primaryColor = getThemeColor('primary');
```

#### listenToThemeChanges

```typescript
// Subscribe to theme changes
const cleanup = listenToThemeChanges((theme, resolvedTheme) => {
  console.log(`Theme changed to ${theme} (resolved: ${resolvedTheme})`);
});

// Later, clean up the listener
cleanup();
```

#### getContrastRatio

```typescript
// Calculate contrast ratio between two colors
const ratio = getContrastRatio('#ffffff', '#000000');
```

## Type Definitions

The utilities include TypeScript type definitions for better developer experience:

### ThemeValues<T>

```typescript
interface ThemeValues<T> {
  light: T;
  dark: T;
}
```

### ThemeAwareStyles

```typescript
interface ThemeAwareStyles {
  [key: string]: ThemeValues<string | number>;
}
```

### EnhancedThemeContext

```typescript
interface EnhancedThemeContext {
  theme: ThemeType;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  isLightMode: boolean;
  isSystemTheme: boolean;
  themeClass: (darkClass: string, lightClass?: string) => string;
  getThemeValue: <T>(values: ThemeValues<T>) => T;
}
```

## Practical Examples

### Basic Theme-Aware Component

```tsx
import { useTheme } from '../components/theme';

function ThemeAwareButton({ children, onClick }) {
  const { isDarkMode, themeClass } = useTheme();
  
  return (
    <button 
      onClick={onClick}
      className={themeClass(
        'bg-gray-800 text-white hover:bg-gray-700', 
        'bg-gray-200 text-gray-800 hover:bg-gray-300'
      )}
    >
      {isDarkMode ? '🌙' : '☀️'} {children}
    </button>
  );
}
```

### Theme-Specific Styling

```tsx
import { useThemeStyles } from '../components/theme';

function StyledCard({ title, content }) {
  const cardStyles = useThemeStyles({
    backgroundColor: { light: '#f7fafc', dark: '#2d3748' },
    boxShadow: { 
      light: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      dark: '0 4px 6px rgba(0, 0, 0, 0.3)' 
    },
    borderColor: { light: '#e2e8f0', dark: '#4a5568' }
  });
  
  return (
    <div style={cardStyles} className="p-4 rounded-lg border">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

### Theme Transitions

```tsx
import { useThemeTransition } from '../components/theme';

function TransitioningElement() {
  const { isTransitioning, transitionClass } = useThemeTransition();
  
  return (
    <div 
      className={`p-4 rounded-lg bg-background ${transitionClass} ${
        isTransitioning ? 'scale-105' : 'scale-100'
      }`}
    >
      This element animates during theme changes
    </div>
  );
}
```

### Contrast Checking

```tsx
import { useState } from 'react';
import { useContrastCheck } from '../components/theme';

function ContrastChecker() {
  const [color, setColor] = useState('#3b82f6');
  const { contrastRatio, meetsAA } = useContrastCheck(color);
  
  return (
    <div>
      <input 
        type="color" 
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      
      <div style={{ color }} className="my-4">
        <p className="text-xl">Sample Text in {color}</p>
      </div>
      
      <div>
        <p>Contrast Ratio: {contrastRatio.toFixed(2)}</p>
        <p>
          Accessibility: {meetsAA 
            ? '✓ Compliant with WCAG AA' 
            : '✗ Does not meet WCAG AA requirements'}
        </p>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Use the enhanced useTheme hook** for most theme-related functionality in React components.

2. **Prefer themeClass over conditional rendering** for applying theme-specific classes to keep your component logic cleaner.

3. **Use useThemeStyles for complex styling** that needs to be applied via the style prop rather than classes.

4. **Check contrast ratios** for custom colors to ensure accessibility compliance in both themes.

5. **Clean up event listeners** properly when using listenToThemeChanges outside of React components.

6. **Consider theme transitions** for a smoother user experience when switching themes.

7. **Use TypeScript types** for better type checking and developer experience.

## Troubleshooting

### Theme Not Updating

If theme changes aren't reflected in your component:

1. Ensure your component is wrapped in a `ThemeProvider`
2. Check that you're using the `useTheme` hook correctly
3. Verify that the `window.themeManager` is properly initialized

### Performance Issues

If you notice performance issues:

1. Memoize expensive calculations with `useMemo`
2. Use the `useCallback` hook for functions that are passed as props
3. Consider using `React.memo` for components that don't need to re-render on every theme change

### Contrast Issues

If you're having trouble meeting contrast requirements:

1. Use the `useContrastCheck` hook to verify contrast ratios
2. Adjust your color values until they meet WCAG AA standards
3. Consider using different colors for text and backgrounds in different themes