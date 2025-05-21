# Tailwind Dark Mode Configuration

This document explains how dark mode is configured in the Astro Platform Starter project using Tailwind CSS.

## Overview

The dark mode implementation uses a hybrid approach:

1. CSS custom properties (variables) for theme-specific colors
2. Tailwind's `dark:` variant for component-specific styling
3. Class-based theme switching that synchronizes both systems

## Key Files

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
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
        // ... other color mappings
      },
      transitionProperty: {
        'theme': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      }
    },
  },
  // Prevent dark mode classes from being purged
  safelist: [
    'dark',
    'light',
    'dark-theme',
    'light-theme',
    // ... other classes
  ],
  plugins: [],
}
```

### globals.css

The globals.css file defines CSS variables for both light and dark themes:

```css
/* Dark theme (default) */
.dark-theme, .dark, :root {
    --color-background: #1a2234;
    --color-text: #FFFFFF;
    /* ... other variables */
}

/* Light theme */
.light-theme, :root:not(.dark) {
    --color-background: #FFFFFF;
    --color-text: #1a2234;
    /* ... other variables */
}
```

It also includes transition utilities for smooth theme changes:

```css
@layer utilities {
    /* Theme transition utility class */
    .transition-theme {
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
}
```

## Usage

### Using CSS Variables

Components can use CSS variables directly:

```html
<div style="color: var(--color-text); background-color: var(--color-background);">
  This will adapt to theme changes
</div>
```

### Using Tailwind Classes

Components can use Tailwind's color classes that map to CSS variables:

```html
<div class="text-text bg-background">
  This will also adapt to theme changes
</div>
```

### Using Tailwind's Dark Mode Variant

Components can use Tailwind's `dark:` variant for dark mode specific styles:

```html
<div class="bg-white dark:bg-slate-800 text-black dark:text-white">
  This will change styles in dark mode
</div>
```

### Adding Smooth Transitions

Add the transition-theme class for smooth transitions between themes:

```html
<div class="bg-white dark:bg-slate-800 text-black dark:text-white transition-theme duration-300">
  This will change smoothly between themes
</div>
```

## Testing

The DarkModeTest.astro component demonstrates different approaches to dark mode styling:

1. CSS Variables approach
2. Tailwind dark: variant approach
3. Mixed approach combining both

## Best Practices

1. Use semantic color names in your CSS variables (--color-text, --color-background)
2. Map CSS variables to Tailwind colors in the configuration
3. Use the transition-theme utility for smooth theme changes
4. Test all components in both light and dark themes
5. Ensure sufficient color contrast in both themes
