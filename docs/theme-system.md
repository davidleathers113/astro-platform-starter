# Theme System Documentation

## Overview

The Astro Platform Starter now includes a robust theme system with the following features:

- System preference detection (light/dark mode)
- User preference saving in localStorage
- Prevention of flash of incorrect theme (FOIT)
- Cross-tab/window synchronization
- Smooth transitions between themes
- React Context Provider for theme management

## Implementation Details

### 1. Theme Detection Script

An inline script in the document `<head>` detects and applies the appropriate theme before the page renders:

- Checks for saved preference in localStorage
- Detects system preference using `prefers-color-scheme` media query
- Applies the appropriate class to the HTML element
- Provides a global `themeManager` object for theme manipulation

### 2. Tailwind Configuration

Tailwind CSS is configured to use the class strategy for dark mode:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... other configurations
}
```

### 3. CSS Variables

Theme colors are defined as CSS variables in `globals.css`:

```css
/* Dark theme */
.dark-theme, :root {
    --color-background: #1a2234;
    /* ... other dark theme variables */
}

/* Light theme */
.light-theme {
    --color-background: #FFFFFF;
    /* ... other light theme variables */
}
```

### 4. Theme Context Provider

A React context provider is available for theme state management:

```tsx
// Import in your Astro component
import { ThemeProvider } from '../components/theme';

// Use in your Astro template
<ThemeProvider client:load>
  <YourComponent client:load />
</ThemeProvider>
```

## Usage

### JavaScript API

#### Getting the Current Theme

```js
const currentTheme = window.themeManager.getTheme();
// Returns: 'light', 'dark', or 'system'
```

#### Setting the Theme

```js
window.themeManager.setTheme('dark'); // Set to dark theme
window.themeManager.setTheme('light'); // Set to light theme
window.themeManager.setTheme('system'); // Use system preference
```

#### Listening for Theme Changes

```js
window.addEventListener('theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

### React Hook API

#### Using the Theme Context Hook

```tsx
import { useTheme } from '../components/theme';

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

#### Helper Functions

```tsx
import { getDocumentTheme, isThemeActive } from '../components/theme';

// Get theme outside React components
const currentTheme = getDocumentTheme();

// Check if a specific theme is active
const isDarkMode = isThemeActive('dark');
```

## Best Practices

1. Use CSS variables for theme-specific colors and styles
2. Use Tailwind's `dark:` variant for dark mode styles
3. Use the React Context API for React components
4. Test both light and dark themes during development
5. Ensure sufficient color contrast in both themes

## Known Limitations

- The ThemeToggle component will need to be updated in subsequent tasks to use the ThemeProvider
- System preference changes require a reload or a manual theme change to take effect in some browsers

## Future Improvements

- Add more theme options beyond light/dark
- Implement time-based automatic theme switching
- Add transitions/animations for theme changes
