# Astro Platform Starter - Theme System Documentation

## Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Theme System Architecture](#theme-system-architecture)
- [Theme Initialization and Detection](#theme-initialization-and-detection)
- [Theme Context Provider and Hooks](#theme-context-provider-and-hooks)
- [Theme Toggle Component](#theme-toggle-component)
- [Tailwind and CSS Configuration](#tailwind-and-css-configuration)
- [Creating Theme-Aware Components](#creating-theme-aware-components)
- [Accessibility Considerations](#accessibility-considerations)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)
- [Troubleshooting and FAQ](#troubleshooting-and-faq)
- [API Reference](#api-reference)

## Overview

The Astro Platform Starter includes a robust, accessible theme system with the following features:

- **Light and Dark Themes**: Complete support for light and dark mode
- **System Preference Detection**: Automatically follows the user's system color scheme preference
- **User Preference Saving**: Persists theme choice in localStorage
- **Zero Flash of Incorrect Theme (FOIT)**: Prevents visible theme flicker on page load
- **Smooth Theme Transitions**: Elegant animations when switching themes
- **Accessibility Compliance**: WCAG AA color contrast in both themes
- **React Integration**: Full React support via Context Provider and custom hooks
- **Non-React Utilities**: JavaScript API for use outside React
- **Consistent API**: Unified approach to theme management across the application
- **Cross-Browser Support**: Works across all modern browsers

## Quick Start

### Basic Integration

Add the theme toggle to your layout or navigation:

```astro
---
// In your Astro component or layout
import ThemeToggle from '../components/ThemeToggle.astro';
---

<header>
  <nav>
    <!-- Other navigation items -->
    <ThemeToggle />
  </nav>
</header>
```

### Using with React Components

Wrap your React components with the ThemeProvider:

```astro
---
import { ThemeProvider } from '../components/theme';
import MyReactComponent from '../components/MyReactComponent';
---

<ThemeProvider client:load>
  <MyReactComponent client:load />
</ThemeProvider>
```

### Accessing Theme in React

Use the `useTheme` hook in your React components:

```tsx
import { useTheme } from '../components/theme';

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Actual theme being applied: {resolvedTheme}</p>
      <p>Is dark mode active? {isDarkMode ? 'Yes' : 'No'}</p>
      
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Using in JavaScript (Non-React)

Access the theme with the global themeManager:

```js
// Get current theme
const currentTheme = window.themeManager.getTheme();
// Returns: 'light', 'dark', or 'system'

// Set theme
window.themeManager.setTheme('dark');
window.themeManager.setTheme('light');
window.themeManager.setTheme('system');

// Listen for theme changes
window.addEventListener('theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

## Theme System Architecture

The theme system is built with a layered architecture to provide a consistent experience across different types of components.

### Key Components

![Theme System Architecture Diagram](../src/assets/theme-system-diagram.png)

1. **Theme Detection Script** (in Layout.astro)
   - Runs in the document head before page render
   - Prevents flash of incorrect theme (FOIT)
   - Initializes the `themeManager` global object

2. **ThemeManager** (global JavaScript object)
   - Provides theme storage and synchronization
   - Exposes methods for theme manipulation
   - Dispatches theme change events

3. **ThemeProvider** (React Context)
   - Wraps React components that need theme awareness
   - Syncs with `themeManager` to maintain consistency
   - Provides hooks for React components

4. **System Preference Detection** (systemTheme.ts)
   - Detects OS/browser dark mode preference
   - Listens for system preference changes
   - Provides utilities for theme resolution

5. **ThemeToggle Component** (ThemeToggle.astro)
   - Provides user interface for theme switching
   - Implements accessibility features
   - Supports keyboard navigation

6. **Theme-Aware Styles** (globals.css & Tailwind)
   - CSS variables for theme colors
   - Tailwind dark mode configuration
   - Transition animations

### Key Files

- `/src/layouts/Layout.astro`: Contains initial theme detection script
- `/src/components/theme/ThemeProvider.tsx`: React context provider
- `/src/components/theme/useTheme.ts`: React hooks and utilities
- `/src/components/theme/systemTheme.ts`: System preference detection
- `/src/components/ThemeToggle.astro`: Theme toggle UI component
- `/src/styles/globals.css`: CSS variables and theme styles
- `/tailwind.config.js`: Tailwind dark mode configuration

### Data Flow

1. Initial page load:
   - Theme detection script runs in `<head>`
   - Checks localStorage or falls back to system preference
   - Sets appropriate class on `<html>` element
   - Initializes `window.themeManager`

2. Theme changes:
   - User toggles theme via ThemeToggle component
   - ThemeToggle updates theme via `window.themeManager`
   - ThemeManager updates localStorage and document classes
   - ThemeManager dispatches 'theme-change' event
   - ThemeProvider responds to event and updates React context
   - Components re-render with new theme
   - CSS transitions animate the change

## Theme Initialization and Detection

### Initial Theme Detection

A script in the document `<head>` detects and applies the appropriate theme before page render:

```html
<script is:inline>
  // Get stored theme or fallback to system preference
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determine which theme to use
  let currentTheme;
  if (storedTheme === 'dark' || storedTheme === 'light') {
    currentTheme = storedTheme;
  } else {
    currentTheme = systemPrefersDark ? 'dark' : 'light';
    // Mark as system-derived
    document.documentElement.setAttribute('data-theme-source', 'system');
  }
  
  // Apply theme immediately to prevent flash
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  document.documentElement.classList.toggle('dark-theme', currentTheme === 'dark');
  document.documentElement.classList.toggle('light-theme', currentTheme === 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
</script>
```

### Theme Manager

The global `themeManager` object provides theme management functions:

```javascript
// Initialized after theme detection
window.themeManager = {
  // Get current theme setting (light, dark, or system)
  getTheme: function() {
    const theme = localStorage.getItem('theme');
    return theme || 'system';
  },
  
  // Set theme and dispatch change event
  setTheme: function(theme) {
    if (theme === 'system') {
      localStorage.removeItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      this._applyTheme(systemTheme);
    } else {
      localStorage.setItem('theme', theme);
      this._applyTheme(theme);
    }
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme: theme } 
    }));
  },
  
  // Internal method to apply theme classes
  _applyTheme: function(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }
};
```

### System Preference Detection

The system preference detection utilities in `systemTheme.ts` provide methods to detect and respond to system color scheme preferences:

```typescript
// Get current system preference
export function getSystemPreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    console.warn('Error detecting system preference:', error);
    return 'light'; // Fallback to light
  }
}

// Check if system is in dark mode
export function isSystemDarkMode(): boolean {
  return getSystemPreference() === 'dark';
}

// Listen for system preference changes
export function addPreferenceChangeListener(
  callback: (preference: ThemePreference) => void
): void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Create wrapper function
  const eventHandler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  // Store mapping for cleanup
  callbackMap.set(callback, eventHandler);
  
  // Add listener with browser compatibility
  try {
    mediaQuery.addEventListener('change', eventHandler);
  } catch (error) {
    // For older browsers
    try {
      (mediaQuery as any).addListener(eventHandler);
    } catch (fallbackError) {
      console.warn('Unable to add preference change listener:', fallbackError);
    }
  }
}

// Remove listener (important to prevent memory leaks)
export function removePreferenceChangeListener(
  callback: (preference: ThemePreference) => void
): void {
  // Implementation details...
}
```

## Theme Context Provider and Hooks

### ThemeProvider

The React context provider in `ThemeProvider.tsx` makes theme state available to React components:

```tsx
export function ThemeProvider({ children }: ThemeProviderProps) {
  // State to track current theme
  const [theme, setThemeState] = useState<ThemeType>('system');
  // State to track resolved theme (what's actually applied)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Set theme using themeManager
  const setTheme = useCallback((newTheme: ThemeType) => {
    if (typeof window !== 'undefined' && window.themeManager) {
      window.themeManager.setTheme(newTheme);
    }
  }, []);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Handle theme changes from themeManager
  useEffect(() => {
    // Implementation details...
  }, [handleThemeChange]);

  // Handle system preference changes
  useEffect(() => {
    // Implementation details...
  }, [handleSystemPreferenceChange]);

  // Create context value
  const contextValue = {
    theme, resolvedTheme, setTheme, toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### useTheme Hook

The enhanced `useTheme` hook in `useTheme.ts` provides convenient theme utilities:

```tsx
export function useTheme(): EnhancedThemeContext {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Derive additional properties
  const isDarkMode = context.resolvedTheme === 'dark';
  const isLightMode = context.resolvedTheme === 'light';
  const isSystemTheme = context.theme === 'system';
  
  // Get class based on theme
  const themeClass = useCallback(
    (darkClass: string, lightClass: string = ''): string => {
      return isDarkMode ? darkClass : lightClass;
    },
    [isDarkMode]
  );
  
  // Get theme-specific value
  const getThemeValue = useCallback(
    <T,>(values: ThemeValues<T>): T => {
      return isDarkMode ? values.dark : values.light;
    },
    [isDarkMode]
  );
  
  // Return enhanced context
  return {
    ...context,
    isDarkMode,
    isLightMode,
    isSystemTheme,
    themeClass,
    getThemeValue,
  };
}
```

### Specialized Hooks

Several specialized hooks make it easier to work with theme-aware components:

#### useThemeStyles

Create theme-dependent styles for React components:

```tsx
function useThemeStyles(themeStyles: ThemeAwareStyles): CSSProperties {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => {
    const result: CSSProperties = {};
    
    Object.entries(themeStyles).forEach(([key, values]) => {
      result[key as keyof CSSProperties] = 
        resolvedTheme === 'dark' ? values.dark : values.light;
    });
    
    return result;
  }, [themeStyles, resolvedTheme]);
}

// Usage
function MyComponent() {
  const styles = useThemeStyles({
    backgroundColor: { light: '#ffffff', dark: '#1a2234' },
    color: { light: '#1a2234', dark: '#ffffff' },
    borderColor: { light: '#e2e8f0', dark: '#2d3748' }
  });
  
  return <div style={styles}>Theme-aware content</div>;
}
```

#### useThemeTransition

Handle animations during theme changes:

```tsx
function useThemeTransition(duration: number = 300) {
  const { resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Implementation details...
  
  return {
    isTransitioning,
    transitionClass: `transition-theme duration-${duration}`,
  };
}

// Usage
function TransitionDemo() {
  const { isTransitioning, transitionClass } = useThemeTransition();
  
  return (
    <div className={transitionClass}>
      {isTransitioning ? 'Theme is changing...' : 'Theme is stable'}
    </div>
  );
}
```

#### useContrastCheck

Verify color contrast for accessibility:

```tsx
function useContrastCheck(foreground: string, background?: string) {
  const { resolvedTheme } = useTheme();
  
  // Implementation details...
  
  return {
    contrastRatio,
    meetsAA,
    meetsAALarge,
    isLegible
  };
}

// Usage
function AccessibleText() {
  const textColor = '#ff0000';
  const { contrastRatio, meetsAA } = useContrastCheck(textColor);
  
  return (
    <div>
      <p style={{ color: textColor }}>
        This text is {meetsAA ? 'accessible' : 'not accessible'}
        (Contrast ratio: {contrastRatio.toFixed(2)})
      </p>
    </div>
  );
}
```

### Non-React Utilities

For non-React components, several utility functions are available:

```typescript
// Get current theme setting
export function getDocumentTheme(): ThemeType {
  if (typeof window === 'undefined' || !window.themeManager) {
    return 'system';
  }
  
  return window.themeManager.getTheme();
}

// Get resolved theme (light or dark)
export function getResolvedTheme(): 'light' | 'dark' {
  const theme = getDocumentTheme();
  if (theme === 'system') {
    return getSystemPreference();
  }
  return theme;
}

// Check if a theme is active
export function isThemeActive(theme: 'light' | 'dark'): boolean {
  if (typeof document === 'undefined') return false;
  
  const isDark = document.documentElement.classList.contains('dark-theme') || 
                 document.documentElement.classList.contains('dark');
                 
  return theme === 'dark' ? isDark : !isDark;
}

// Listen for theme changes
export function listenToThemeChanges(
  callback: (theme: ThemeType, resolvedTheme: 'light' | 'dark') => void
): () => void {
  // Implementation details...
}
```

## Theme Toggle Component

The ThemeToggle component provides a user interface for switching between themes:

### Component Structure

```astro
<div class="theme-toggle-container" data-theme-toggle>
  <div class="theme-toggle" role="radiogroup" aria-label="Theme Selection" tabindex="0">
    <button 
      class="theme-option" 
      data-theme="light" 
      role="radio" 
      aria-checked="false"
      aria-label="Light theme">
      <svg><!-- Light icon --></svg>
      <span class="sr-only">Light theme</span>
    </button>
    
    <button 
      class="theme-option" 
      data-theme="system" 
      role="radio" 
      aria-checked="false"
      aria-label="System theme">
      <svg><!-- System icon --></svg>
      <span class="sr-only">System theme</span>
    </button>
    
    <button 
      class="theme-option" 
      data-theme="dark" 
      role="radio" 
      aria-checked="false"
      aria-label="Dark theme">
      <svg><!-- Dark icon --></svg>
      <span class="sr-only">Dark theme</span>
    </button>
  </div>
  
  <div aria-live="polite" class="sr-only" id="theme-announcement"></div>
</div>
```

### Accessibility Features

The ThemeToggle component includes several accessibility features:

1. **ARIA Attributes**
   - `role="radiogroup"` for the container
   - `aria-label="Theme Selection"` for clear labeling
   - `role="radio"` for each option
   - `aria-checked` to indicate the selected state
   - `aria-live="polite"` region for announcing changes

2. **Keyboard Navigation**
   - Arrow keys to navigate between options
   - Enter/Space to select an option
   - Tab navigation for the toggle group
   - Focus management to maintain position

3. **Screen Reader Support**
   - Hidden text with `.sr-only` for icon descriptions
   - Announcements of theme changes
   - Proper labeling of controls

### Custom Styling

You can customize the appearance of the ThemeToggle component by modifying the CSS variables:

```css
.theme-toggle-container {
  --toggle-bg: var(--color-form-bg);
  --border-color: var(--color-border);
  --focus-color: var(--color-primary);
  --selected-bg: var(--color-primary);
  --selected-text: white;
}
```

## Tailwind and CSS Configuration

### Tailwind Configuration

The theme system uses Tailwind's dark mode class strategy:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode strategy
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind colors
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        // Other color mappings...
      },
      transitionProperty: {
        'theme': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      backgroundImage: {
        'noise': 'var(--background-image-noise)',
      }
    },
  },
  // Prevent dark mode classes from being purged
  safelist: [
    'dark',
    'light',
    'dark-theme',
    'light-theme',
    // Other safelisted classes...
  ],
  plugins: [],
}
```

### CSS Variables

Theme colors are defined as CSS variables in `globals.css`:

```css
/* Base theme variables */
@theme {
    --font-sans: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
    
    /* Brand colors (consistent across themes) */
    --color-primary: #2d7984;
    --color-primary-rgb: 45, 121, 132;
    /* Other brand colors... */
    
    /* Theme transition variables */
    --theme-transition-duration: 250ms;
    --theme-transition-easing: ease;
    --theme-transition-properties: color, background-color, border-color, box-shadow, outline-color, fill, stroke;
}

/* Dark theme */
.dark-theme, .dark, :root {
    /* Background colors */
    --color-background: #1a2234;
    --color-background-rgb: 26, 34, 52;
    /* Other dark theme variables... */
}

/* Light theme */
.light-theme, :root:not(.dark) {
    /* Background colors */
    --color-background: #FFFFFF;
    --color-background-rgb: 255, 255, 255;
    /* Other light theme variables... */
}

/* Support for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    :root {
        --theme-transition-duration: 0ms;
    }
}
```

### Theme Transitions

Smooth transitions between themes are implemented using CSS transitions:

```css
@layer base {
    html {
        /* Apply theme transitions */
        transition: 
            var(--theme-transition-properties) 
            var(--theme-transition-duration) 
            var(--theme-transition-easing);
    }
    
    body {
        color: var(--color-text);
        background-color: var(--color-background);
        /* Apply theme transitions */
        transition: 
            var(--theme-transition-properties) 
            var(--theme-transition-duration) 
            var(--theme-transition-easing);
    }
    
    /* Apply transitions to other elements... */
}
```

## Creating Theme-Aware Components

### Using CSS Variables

The simplest way to create theme-aware components is to use CSS variables:

```astro
<div class="theme-aware-card">
  <h3>Theme-Aware Card</h3>
  <p>This card automatically adapts to the current theme.</p>
</div>

<style>
  .theme-aware-card {
    background-color: var(--color-form-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px var(--shadow-color-light);
  }
</style>
```

### Using Tailwind Dark Mode

You can use Tailwind's `dark:` variant to apply different styles in dark mode:

```astro
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-lg shadow">
  <h3 class="text-xl font-bold mb-2">Tailwind Dark Mode Example</h3>
  <p class="text-gray-700 dark:text-gray-300">This component uses Tailwind's dark mode variant.</p>
</div>
```

### Using Tailwind with CSS Variables

Combine Tailwind with CSS variables for consistency:

```astro
<div class="bg-background text-text p-4 rounded-lg shadow">
  <h3 class="text-xl font-bold mb-2">Combined Approach</h3>
  <p class="text-text-muted">This uses Tailwind classes mapped to CSS variables.</p>
</div>
```

### React Components with useTheme

Create theme-aware React components using the `useTheme` hook:

```tsx
import { useTheme } from '../components/theme';

function ThemeAwareCard({ title, content }) {
  const { isDarkMode, themeClass } = useTheme();
  
  return (
    <div className={`
      p-4 rounded-lg shadow
      ${themeClass('bg-gray-800 text-white', 'bg-white text-gray-900')}
    `}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={themeClass('text-gray-300', 'text-gray-700')}>{content}</p>
      
      {isDarkMode && (
        <span className="text-xs text-gray-400">Dark mode content</span>
      )}
    </div>
  );
}
```

### With useThemeStyles

For more complex styling, use the `useThemeStyles` hook:

```tsx
import { useTheme, useThemeStyles } from '../components/theme';

function StyledComponent() {
  const styles = useThemeStyles({
    backgroundColor: { light: '#f7fafc', dark: '#1a202c' },
    color: { light: '#2d3748', dark: '#e2e8f0' },
    borderColor: { light: '#e2e8f0', dark: '#2d3748' },
    boxShadow: { 
      light: '0 1px 3px rgba(0,0,0,0.1)', 
      dark: '0 1px 3px rgba(0,0,0,0.3)' 
    }
  });
  
  return (
    <div style={styles} className="p-4 rounded-lg border">
      <h3>Styled Component</h3>
      <p>This component uses theme-aware inline styles.</p>
    </div>
  );
}
```

### Conditional Content

Render different content based on theme:

```tsx
import { useTheme } from '../components/theme';

function ConditionalContent() {
  const { isDarkMode, getThemeValue } = useTheme();
  
  const message = getThemeValue({
    light: 'This message appears in light mode',
    dark: 'This message appears in dark mode'
  });
  
  return (
    <div>
      <p>{message}</p>
      
      {isDarkMode ? (
        <img src="/dark-mode-image.svg" alt="Dark mode illustration" />
      ) : (
        <img src="/light-mode-image.svg" alt="Light mode illustration" />
      )}
    </div>
  );
}
```

## Accessibility Considerations

### Color Contrast

The theme system ensures proper color contrast in both themes:

- **Normal text** (< 18pt or < 14pt bold): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18pt or ≥ 14pt bold): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

You can verify contrast ratios using the `useContrastCheck` hook:

```tsx
import { useContrastCheck } from '../components/theme';

function ContrastDemo() {
  const { contrastRatio, meetsAA } = useContrastCheck('#ff0000');
  
  return (
    <div>
      <p>Contrast ratio: {contrastRatio.toFixed(2)}</p>
      <p>Meets WCAG AA: {meetsAA ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### Focus States

Both themes include accessible focus states:

```css
/* Focus styles in base layer */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
    transition: outline-color var(--theme-transition-duration) var(--theme-transition-easing);
}

/* Enhanced dark mode focus */
.dark a:focus-visible,
.dark button:focus-visible,
.dark input:focus-visible,
.dark select:focus-visible,
.dark textarea:focus-visible {
    outline: 3px solid #58cbe0; /* Brighter outline in dark mode */
}
```

### Reduced Motion

The theme system respects the user's preference for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
    :root {
        --theme-transition-duration: 0ms;
    }
}
```

### ARIA Attributes

Use appropriate ARIA attributes for interactive components:

```astro
<button 
  aria-label="Toggle dark mode"
  aria-pressed={isDarkMode ? 'true' : 'false'}
  className="theme-toggle-button"
  onClick={toggleTheme}
>
  <span className="sr-only">
    {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  </span>
  <svg><!-- Icon --></svg>
</button>
```

## Advanced Usage

### Combining Theme with Other Context

Use the theme context alongside other context providers:

```tsx
import { ThemeProvider } from '../components/theme';
import { UserProvider } from '../components/user';
import { PreferencesProvider } from '../components/preferences';

function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
```

### Theme-Aware Images

Switch images based on the current theme:

```tsx
import { useTheme } from '../components/theme';

function ThemeAwareImage() {
  const { isDarkMode } = useTheme();
  
  return (
    <img
      src={isDarkMode ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
      alt="Logo"
      className="theme-aware-image"
    />
  );
}
```

### Advanced Theme Transitions

Create custom transition effects for theme changes:

```tsx
import { useTheme, useThemeTransition } from '../components/theme';

function TransitionDemo() {
  const { isDarkMode } = useTheme();
  const { isTransitioning } = useThemeTransition(500);
  
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg p-6
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        transition-all duration-500
      `}
    >
      <div
        className={`
          absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500
          transition-opacity duration-500
          ${isDarkMode ? 'opacity-20' : 'opacity-5'}
        `}
      />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4">
          {isTransitioning ? 'Changing...' : 'Theme Demo'}
        </h3>
        <p>Advanced theme transition example.</p>
      </div>
    </div>
  );
}
```

### Theme-Aware Charts and Visualizations

Adapt chart colors based on the current theme:

```tsx
import { useTheme } from '../components/theme';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function ThemeAwareChart({ data }) {
  const { isDarkMode, getThemeValue } = useTheme();
  
  const chartColors = {
    grid: getThemeValue({ light: '#e2e8f0', dark: '#2d3748' }),
    line: getThemeValue({ light: '#3182ce', dark: '#63b3ed' }),
    text: getThemeValue({ light: '#2d3748', dark: '#e2e8f0' }),
    background: getThemeValue({ light: '#ffffff', dark: '#1a202c' })
  };
  
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      style={{ background: chartColors.background }}
    >
      <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke={chartColors.text} />
      <YAxis stroke={chartColors.text} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: chartColors.background,
          borderColor: chartColors.grid,
          color: chartColors.text
        }} 
      />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={chartColors.line} 
        strokeWidth={2} 
      />
    </LineChart>
  );
}
```

## Best Practices

### Use CSS Variables for Theme Colors

Always use CSS variables for theme-specific colors:

```css
/* ❌ Bad: Hardcoded colors */
.card {
  background-color: white;
  color: #333;
}
.dark .card {
  background-color: #1a2234;
  color: white;
}

/* ✅ Good: Using CSS variables */
.card {
  background-color: var(--color-form-bg);
  color: var(--color-text);
}
```

### Combine Tailwind and CSS Variables

Use Tailwind's theme mapping to CSS variables:

```astro
<!-- ❌ Bad: Hardcoded Tailwind colors -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

<!-- ✅ Good: Using theme-mapped Tailwind classes -->
<div class="bg-background text-text">
```

### Test Both Themes During Development

Always test your components in both light and dark themes:

```jsx
// Development helper component
function ThemePreview({ children }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-white">
        <h3 className="mb-4">Light Theme</h3>
        <div className="light">{children}</div>
      </div>
      <div className="p-4 bg-gray-800">
        <h3 className="mb-4 text-white">Dark Theme</h3>
        <div className="dark">{children}</div>
      </div>
    </div>
  );
}
```

### Ensure Proper Contrast

Always verify contrast ratios in both themes:

```tsx
import { useContrastCheck } from '../components/theme';

function ContrastDemo({ textColor }) {
  const { contrastRatio, meetsAA } = useContrastCheck(textColor);
  
  // Warn if contrast is insufficient
  if (!meetsAA) {
    console.warn(`Poor contrast ratio (${contrastRatio.toFixed(2)}) for color ${textColor}`);
  }
  
  return (
    <p style={{ color: textColor }}>
      {meetsAA ? 'This text has sufficient contrast' : 'WARNING: Poor contrast'}
    </p>
  );
}
```

### Respect Reduced Motion Preferences

Always include reduced motion alternatives:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### Clean Up Event Listeners

Properly clean up event listeners to prevent memory leaks:

```tsx
useEffect(() => {
  // Add listener
  addPreferenceChangeListener(handlePreferenceChange);
  
  // Clean up
  return () => {
    removePreferenceChangeListener(handlePreferenceChange);
  };
}, [handlePreferenceChange]);
```

## Troubleshooting and FAQ

### Common Issues

#### Flash of Incorrect Theme (FOIT)

**Issue**: Page briefly shows the wrong theme before switching.

**Solution**: Ensure the theme detection script runs before any content renders:

1. The script must be in the `<head>` section
2. Use the `is:inline` directive in Astro
3. Apply the theme class directly to the `<html>` element

#### Theme Not Persisting

**Issue**: Theme resets on page reload.

**Solution**: Check localStorage implementation:

1. Verify localStorage is properly set/read
2. Check for errors in browser console
3. Ensure `themeManager.setTheme()` is called

#### React Context Not Working

**Issue**: useTheme hook throws "must be used within a ThemeProvider" error.

**Solution**: Ensure component is wrapped with ThemeProvider:

1. Add ThemeProvider higher in component tree
2. Add `client:load` directive to both provider and component

#### System Preference Not Detected

**Issue**: System preference changes don't affect the theme.

**Solution**: Verify media query listeners:

1. Check implementation of preference change listeners
2. Ensure event listeners are properly added/removed
3. Consider adding a manual update mechanism as fallback

### Performance Considerations

1. **Minimize DOM Updates**
   - Batch theme-related DOM changes
   - Use efficient selectors
   - Avoid querying the DOM repeatedly

2. **Optimize Transitions**
   - Only transition specific properties (color, background, etc.)
   - Avoid transitioning layout properties (width, height, etc.)
   - Use hardware-accelerated properties when possible

3. **Reduce JavaScript Overhead**
   - Debounce event handlers for preference changes
   - Memoize theme-related values in React components
   - Prefer CSS variables over JavaScript for theme switching

### Browser Compatibility

The theme system works in all modern browsers, with fallbacks for older browsers:

| Feature | Support | Fallback |
|---------|---------|----------|
| CSS Variables | IE11+ | Default theme |
| localStorage | All modern browsers | System preference |
| matchMedia | IE10+ | Default to light theme |
| CSS Transitions | All modern browsers | Instant theme change |
| Event Listeners | All modern browsers | Legacy event API |

## API Reference

### ThemeProvider

```tsx
import { ThemeProvider } from '../components/theme';

<ThemeProvider>
  {children}
</ThemeProvider>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | Required | Child components to render |

### useTheme Hook

```tsx
import { useTheme } from '../components/theme';

function MyComponent() {
  const { 
    theme, 
    resolvedTheme, 
    setTheme, 
    toggleTheme,
    isDarkMode,
    isLightMode,
    isSystemTheme,
    themeClass,
    getThemeValue
  } = useTheme();
  
  // Component implementation...
}
```

#### Return Value

| Property | Type | Description |
|----------|------|-------------|
| theme | 'light' \| 'dark' \| 'system' | The current theme setting |
| resolvedTheme | 'light' \| 'dark' | The actual theme being applied |
| setTheme | (theme: ThemeType) => void | Function to change the theme |
| toggleTheme | () => void | Function to toggle between light and dark |
| isDarkMode | boolean | True if dark theme is currently active |
| isLightMode | boolean | True if light theme is currently active |
| isSystemTheme | boolean | True if system preference is being used |
| themeClass | (darkClass: string, lightClass?: string) => string | Get appropriate class based on theme |
| getThemeValue | <T>(values: { light: T, dark: T }) => T | Get appropriate value based on theme |

### Specialized Hooks

#### useThemeStyles

```tsx
import { useThemeStyles } from '../components/theme';

function MyComponent() {
  const styles = useThemeStyles({
    backgroundColor: { light: '#ffffff', dark: '#1a2234' },
    color: { light: '#1a2234', dark: '#ffffff' }
  });
  
  return <div style={styles}>Styled content</div>;
}
```

#### useThemeTransition

```tsx
import { useThemeTransition } from '../components/theme';

function MyComponent() {
  const { isTransitioning, transitionClass } = useThemeTransition(300);
  
  return <div className={transitionClass}>Animated content</div>;
}
```

#### useContrastCheck

```tsx
import { useContrastCheck } from '../components/theme';

function MyComponent() {
  const { contrastRatio, meetsAA, meetsAALarge } = useContrastCheck('#ff0000');
  
  return <div>Contrast info</div>;
}
```

### Non-React Utilities

#### themeManager (Global Object)

```javascript
// Get current theme
const currentTheme = window.themeManager.getTheme();

// Set theme
window.themeManager.setTheme('dark');
window.themeManager.setTheme('light');
window.themeManager.setTheme('system');
```

#### System Preference Utilities

```typescript
import { 
  getSystemPreference, 
  isSystemDarkMode, 
  addPreferenceChangeListener, 
  removePreferenceChangeListener 
} from '../components/theme';

// Get current system preference
const preference = getSystemPreference(); // 'dark' or 'light'

// Check if system is in dark mode
const isDark = isSystemDarkMode(); // true or false

// Listen for changes
const handleChange = (newPreference) => {
  console.log('System preference changed to:', newPreference);
};

// Add listener
addPreferenceChangeListener(handleChange);

// Remove listener
removePreferenceChangeListener(handleChange);
```

#### Theme Utility Functions

```typescript
import { 
  getDocumentTheme, 
  getResolvedTheme, 
  isThemeActive, 
  getThemeColor, 
  listenToThemeChanges 
} from '../components/theme';

// Get current theme setting
const theme = getDocumentTheme(); // 'light', 'dark', or 'system'

// Get resolved theme
const resolvedTheme = getResolvedTheme(); // 'light' or 'dark'

// Check if a theme is active
const isDark = isThemeActive('dark'); // true or false

// Get a CSS variable value
const primaryColor = getThemeColor('primary'); // e.g., '#2d7984'

// Listen for theme changes
const cleanup = listenToThemeChanges((theme, resolvedTheme) => {
  console.log('Theme changed:', theme, resolvedTheme);
});

// Clean up listener
cleanup();
```
