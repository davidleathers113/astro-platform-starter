# Theme Variables Reference Guide

## Table of Contents
- [Overview](#overview)
- [Variable Naming Convention](#variable-naming-convention)
- [Base Variables (Theme-Independent)](#base-variables-theme-independent)
- [Brand Colors](#brand-colors)
- [Light Theme Variables](#light-theme-variables)
- [Dark Theme Variables](#dark-theme-variables)
- [Usage Examples](#usage-examples)
- [Color Palette Visualization](#color-palette-visualization)
- [JavaScript Access](#javascript-access)

## Overview

This document provides a comprehensive reference for all CSS variables used in the Astro Platform Starter theme system. These variables enable consistent theming across light and dark modes while maintaining semantic naming and accessibility compliance.

### Key Features
- **Semantic Naming**: Variables use descriptive names that indicate their purpose
- **RGB Variants**: Many variables include RGB counterparts for transparency support
- **WCAG Compliance**: All color combinations meet WCAG AA contrast requirements
- **Consistency**: Unified color definitions across light and dark themes

## Variable Naming Convention

The theme system uses a hierarchical naming convention:

```
--[category]-[element]-[variant]-[state]
```

### Categories
- `color-*`: All color-related variables
- `font-*`: Typography-related variables
- `theme-*`: Theme system configuration variables

### Elements
- `text-*`: Text colors
- `background-*`: Background colors
- `border-*`: Border colors
- `shadow-*`: Shadow colors
- `primary/secondary/accent`: Brand colors

### Variants
- `primary/secondary/tertiary`: Priority levels
- `light/dark`: Brightness variants
- `subtle/strong`: Intensity variants

### States
- `hover/active/focus`: Interaction states
- `disabled/muted`: Status states

## Base Variables (Theme-Independent)

These variables remain consistent across all themes and define fundamental design tokens.

### Typography

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-sans` | `'Inter Variable', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` | Primary font family for all text |

### Brand Colors

These colors maintain consistent values across light and dark themes to preserve brand identity.

| Variable | Light Value | Dark Value | RGB Variant | Usage |
|----------|-------------|------------|-------------|-------|
| `--color-primary` | `#2d7984` | `#2d7984` | `45, 121, 132` | Primary brand color, buttons, links |
| `--color-primary-light` | `#58cbe0` | `#58cbe0` | `88, 203, 224` | Lighter primary variant |
| `--color-primary-dark` | `#1d5058` | `#1d5058` | `29, 80, 88` | Darker primary variant |
| `--color-secondary` | `#0062b3` | `#0062b3` | `0, 98, 179` | Secondary brand color |
| `--color-secondary-light` | `#4a94d8` | `#4a94d8` | `74, 148, 216` | Lighter secondary variant |
| `--color-secondary-dark` | `#004b8c` | `#004b8c` | `0, 75, 140` | Darker secondary variant |
| `--color-accent` | `#58cbe0` | `#58cbe0` | `88, 203, 224` | Accent color for highlights |
| `--color-accent-warm` | `#F8C88F` | `#F8C88F` | `248, 200, 143` | Warm accent variant |

### State Colors (Base)

Base state colors that are modified for each theme.

| Variable | Base Value | RGB Variant | Usage |
|----------|------------|-------------|-------|
| `--color-success-base` | `#10b981` | `16, 185, 129` | Success state foundation |
| `--color-warning-base` | `#f59e0b` | `245, 158, 11` | Warning state foundation |
| `--color-error-base` | `#ef4444` | `239, 68, 68` | Error state foundation |
| `--color-info-base` | `#3b82f6` | `59, 130, 246` | Info state foundation |

### Theme Transition System

Variables controlling theme change animations.

| Variable | Value | Usage |
|----------|-------|-------|
| `--theme-transition-duration` | `250ms` | Standard transition duration |
| `--theme-transition-duration-fast` | `150ms` | Fast transition duration |
| `--theme-transition-duration-slow` | `400ms` | Slow transition duration |
| `--theme-transition-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing function |
| `--theme-transition-easing-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth easing function |
| `--theme-transition-properties` | `color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity, transform` | Properties to transition |

### Layout & Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--border-radius-sm` | `0.25rem` | Small border radius |
| `--border-radius` | `0.375rem` | Default border radius |
| `--border-radius-lg` | `0.5rem` | Large border radius |
| `--border-radius-xl` | `0.75rem` | Extra large border radius |
| `--focus-ring-width` | `3px` | Focus ring width |
| `--focus-ring-offset` | `2px` | Focus ring offset |

## Light Theme Variables

Applied when light theme is active (`.light-theme`, `:root[data-theme="light"]`, `:root:not([data-theme])`).

### Text Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-text-primary` | `#1a2234` | `26, 34, 52` | Primary text color | Body text, headings |
| `--color-text-secondary` | `#4a5568` | `74, 85, 104` | Secondary text color | Subheadings, descriptions |
| `--color-text-muted` | `#718096` | `113, 128, 150` | Muted text color | Captions, less important text |
| `--color-text-disabled` | `#a0aec0` | `160, 174, 192` | Disabled text color | Disabled form elements |
| `--color-text-inverse` | `#ffffff` | `255, 255, 255` | Inverse text color | Text on dark backgrounds |
| `--color-text-placeholder` | `#a0aec0` | `160, 174, 192` | Placeholder text color | Form placeholders |

#### Text on Colored Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-text-on-primary` | `#ffffff` | `255, 255, 255` | Text on primary color |
| `--color-text-on-secondary` | `#ffffff` | `255, 255, 255` | Text on secondary color |
| `--color-text-on-accent` | `#1a2234` | `26, 34, 52` | Text on accent color |

#### Link Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-text-link` | `#0062b3` | `0, 98, 179` | Default link color |
| `--color-text-link-hover` | `#004b8c` | `0, 75, 140` | Link hover color |
| `--color-text-link-visited` | `#5a4fcf` | `90, 79, 207` | Visited link color |

### Background Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-background-primary` | `#ffffff` | `255, 255, 255` | Primary background | Page background |
| `--color-background-secondary` | `#f7fafc` | `247, 250, 252` | Secondary background | Sections, panels |
| `--color-background-tertiary` | `#edf2f7` | `237, 242, 247` | Tertiary background | Subtle highlights |

#### Form Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-form` | `#f7fafc` | `247, 250, 252` | Form container background |
| `--color-background-input` | `#ffffff` | `255, 255, 255` | Input field background |
| `--color-background-input-disabled` | `#f7fafc` | `247, 250, 252` | Disabled input background |

#### Surface Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-surface` | `#ffffff` | `255, 255, 255` | Card, modal backgrounds |
| `--color-background-elevated` | `#ffffff` | `255, 255, 255` | Elevated surface backgrounds |
| `--color-background-overlay` | `rgba(26, 34, 52, 0.8)` | N/A | Modal overlay background |
| `--color-background-backdrop` | `rgba(26, 34, 52, 0.5)` | N/A | Backdrop background |

#### Interactive Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-hover` | `#f7fafc` | `247, 250, 252` | Hover state background |
| `--color-background-active` | `#edf2f7` | `237, 242, 247` | Active state background |
| `--color-background-selected` | `#e6fffa` | `230, 255, 250` | Selected state background |

#### Code Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-code` | `#f7fafc` | `247, 250, 252` | Inline code background |
| `--color-background-code-block` | `#2d3748` | `45, 55, 72` | Code block background |

### Border Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-border-default` | `#e2e8f0` | `226, 232, 240` | Default border color | Form inputs, cards |
| `--color-border-subtle` | `#f7fafc` | `247, 250, 252` | Subtle border color | Dividers |
| `--color-border-strong` | `#cbd5e0` | `203, 213, 224` | Strong border color | Emphasized borders |
| `--color-border-focus` | `var(--color-primary)` | `var(--color-primary-rgb)` | Focus state border | Focus rings |
| `--color-border-interactive` | `#cbd5e0` | `203, 213, 224` | Interactive element border | Button borders |
| `--color-border-interactive-hover` | `#a0aec0` | `160, 174, 192` | Interactive hover border | Button hover borders |

### Shadow Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-shadow-light` | `rgba(0, 0, 0, 0.05)` | Light shadow for subtle depth |
| `--color-shadow-medium` | `rgba(0, 0, 0, 0.1)` | Medium shadow for cards |
| `--color-shadow-heavy` | `rgba(0, 0, 0, 0.15)` | Heavy shadow for modals |
| `--color-shadow-focus` | `rgba(45, 121, 132, 0.3)` | Focus shadow color |
| `--color-shadow-inset` | `inset 0 2px 4px rgba(0, 0, 0, 0.05)` | Inset shadow |

### State Colors (Light Theme)

#### Success Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-success` | `#10b981` | `16, 185, 129` | Success state color |
| `--color-success-light` | `#d1fae5` | `209, 250, 229` | Light success background |
| `--color-success-dark` | `#059669` | `5, 150, 105` | Dark success variant |
| `--color-text-success` | `#064e3b` | `6, 78, 59` | Success text color |
| `--color-background-success` | `#ecfdf5` | `236, 253, 245` | Success background |
| `--color-border-success` | `#86efac` | `134, 239, 172` | Success border |

#### Warning Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-warning` | `#f59e0b` | `245, 158, 11` | Warning state color |
| `--color-warning-light` | `#fef3c7` | `254, 243, 199` | Light warning background |
| `--color-warning-dark` | `#d97706` | `217, 119, 6` | Dark warning variant |
| `--color-text-warning` | `#92400e` | `146, 64, 14` | Warning text color |
| `--color-background-warning` | `#fffbeb` | `255, 251, 235` | Warning background |
| `--color-border-warning` | `#fcd34d` | `252, 211, 77` | Warning border |

#### Error Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-error` | `#ef4444` | `239, 68, 68` | Error state color |
| `--color-error-light` | `#fecaca` | `254, 202, 202` | Light error background |
| `--color-error-dark` | `#dc2626` | `220, 38, 38` | Dark error variant |
| `--color-text-error` | `#991b1b` | `153, 27, 27` | Error text color |
| `--color-background-error` | `#fef2f2` | `254, 242, 242` | Error background |
| `--color-border-error` | `#fca5a5` | `252, 165, 165` | Error border |

#### Info Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-info` | `#3b82f6` | `59, 130, 246` | Info state color |
| `--color-info-light` | `#dbeafe` | `219, 234, 254` | Light info background |
| `--color-info-dark` | `#2563eb` | `37, 99, 235` | Dark info variant |
| `--color-text-info` | `#1e3a8a` | `30, 58, 138` | Info text color |
| `--color-background-info` | `#eff6ff` | `239, 246, 255` | Info background |
| `--color-border-info` | `#93c5fd` | `147, 197, 253` | Info border |

### Special Backgrounds

| Variable | Value | Usage |
|----------|-------|-------|
| `--background-image-noise` | `linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url('/images/noise.png')` | Noise texture overlay |

## Dark Theme Variables

Applied when dark theme is active (`.dark-theme`, `.dark`, `:root[data-theme="dark"]`).

### Text Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-text-primary` | `#ffffff` | `255, 255, 255` | Primary text color | Body text, headings |
| `--color-text-secondary` | `#e2e8f0` | `226, 232, 240` | Secondary text color | Subheadings, descriptions |
| `--color-text-muted` | `#a0aec0` | `160, 174, 192` | Muted text color | Captions, less important text |
| `--color-text-disabled` | `#718096` | `113, 128, 150` | Disabled text color | Disabled form elements |
| `--color-text-inverse` | `#1a2234` | `26, 34, 52` | Inverse text color | Text on light backgrounds |
| `--color-text-placeholder` | `#718096` | `113, 128, 150` | Placeholder text color | Form placeholders |

#### Text on Colored Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-text-on-primary` | `#ffffff` | `255, 255, 255` | Text on primary color |
| `--color-text-on-secondary` | `#ffffff` | `255, 255, 255` | Text on secondary color |
| `--color-text-on-accent` | `#1a2234` | `26, 34, 52` | Text on accent color |

#### Link Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-text-link` | `#58cbe0` | `88, 203, 224` | Default link color |
| `--color-text-link-hover` | `#4bbbce` | `75, 187, 206` | Link hover color |
| `--color-text-link-visited` | `#9f7aea` | `159, 122, 234` | Visited link color |

### Background Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-background-primary` | `#1a2234` | `26, 34, 52` | Primary background | Page background |
| `--color-background-secondary` | `#202b3d` | `32, 43, 61` | Secondary background | Sections, panels |
| `--color-background-tertiary` | `#2d3748` | `45, 55, 72` | Tertiary background | Subtle highlights |

#### Form Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-form` | `#202b3d` | `32, 43, 61` | Form container background |
| `--color-background-input` | `#2d3748` | `45, 55, 72` | Input field background |
| `--color-background-input-disabled` | `#4a5568` | `74, 85, 104` | Disabled input background |

#### Surface Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-surface` | `#202b3d` | `32, 43, 61` | Card, modal backgrounds |
| `--color-background-elevated` | `#2d3748` | `45, 55, 72` | Elevated surface backgrounds |
| `--color-background-overlay` | `rgba(0, 0, 0, 0.8)` | N/A | Modal overlay background |
| `--color-background-backdrop` | `rgba(0, 0, 0, 0.5)` | N/A | Backdrop background |

#### Interactive Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-hover` | `#2d3748` | `45, 55, 72` | Hover state background |
| `--color-background-active` | `#4a5568` | `74, 85, 104` | Active state background |
| `--color-background-selected` | `#1a365d` | `26, 54, 93` | Selected state background |

#### Code Backgrounds

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-background-code` | `#2d3748` | `45, 55, 72` | Inline code background |
| `--color-background-code-block` | `#1a202c` | `26, 32, 44` | Code block background |

### Border Colors

| Variable | Value | RGB Variant | Usage | Example |
|----------|-------|-------------|-------|---------|
| `--color-border-default` | `#4a5568` | `74, 85, 104` | Default border color | Form inputs, cards |
| `--color-border-subtle` | `#2d3748` | `45, 55, 72` | Subtle border color | Dividers |
| `--color-border-strong` | `#718096` | `113, 128, 150` | Strong border color | Emphasized borders |
| `--color-border-focus` | `var(--color-primary-light)` | `var(--color-primary-light-rgb)` | Focus state border | Focus rings |
| `--color-border-interactive` | `#718096` | `113, 128, 150` | Interactive element border | Button borders |
| `--color-border-interactive-hover` | `#a0aec0` | `160, 174, 192` | Interactive hover border | Button hover borders |

### Shadow Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-shadow-light` | `rgba(0, 0, 0, 0.25)` | Light shadow for subtle depth |
| `--color-shadow-medium` | `rgba(0, 0, 0, 0.5)` | Medium shadow for cards |
| `--color-shadow-heavy` | `rgba(0, 0, 0, 0.75)` | Heavy shadow for modals |
| `--color-shadow-focus` | `rgba(88, 203, 224, 0.4)` | Focus shadow color |
| `--color-shadow-inset` | `inset 0 2px 4px rgba(0, 0, 0, 0.25)` | Inset shadow |

### State Colors (Dark Theme)

#### Success Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-success` | `#68d391` | `104, 211, 145` | Success state color |
| `--color-success-light` | `#276749` | `39, 103, 73` | Light success background |
| `--color-success-dark` | `#9ae6b4` | `154, 230, 180` | Dark success variant |
| `--color-text-success` | `#9ae6b4` | `154, 230, 180` | Success text color |
| `--color-background-success` | `#1a202c` | `26, 32, 44` | Success background |
| `--color-border-success` | `#276749` | `39, 103, 73` | Success border |

#### Warning Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-warning` | `#fbd38d` | `251, 211, 141` | Warning state color |
| `--color-warning-light` | `#744210` | `116, 66, 16` | Light warning background |
| `--color-warning-dark` | `#fed7aa` | `254, 215, 170` | Dark warning variant |
| `--color-text-warning` | `#fed7aa` | `254, 215, 170` | Warning text color |
| `--color-background-warning` | `#1a202c` | `26, 32, 44` | Warning background |
| `--color-border-warning` | `#744210` | `116, 66, 16` | Warning border |

#### Error Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-error` | `#fc8181` | `252, 129, 129` | Error state color |
| `--color-error-light` | `#742a2a` | `116, 42, 42` | Light error background |
| `--color-error-dark` | `#feb2b2` | `254, 178, 178` | Dark error variant |
| `--color-text-error` | `#feb2b2` | `254, 178, 178` | Error text color |
| `--color-background-error` | `#1a202c` | `26, 32, 44` | Error background |
| `--color-border-error` | `#742a2a` | `116, 42, 42` | Error border |

#### Info Colors

| Variable | Value | RGB Variant | Usage |
|----------|-------|-------------|-------|
| `--color-info` | `#90cdf4` | `144, 205, 244` | Info state color |
| `--color-info-light` | `#2a4365` | `42, 67, 101` | Light info background |
| `--color-info-dark` | `#bee3f8` | `190, 227, 248` | Dark info variant |
| `--color-text-info` | `#bee3f8` | `190, 227, 248` | Info text color |
| `--color-background-info` | `#1a202c` | `26, 32, 44` | Info background |
| `--color-border-info` | `#2a4365` | `42, 67, 101` | Info border |

### Special Backgrounds

| Variable | Value | Usage |
|----------|-------|-------|
| `--background-image-noise` | `linear-gradient(to bottom, rgba(10, 15, 25, 0.1), rgba(10, 15, 25, 0.2)), url('/images/noise.png')` | Noise texture overlay |

## Usage Examples

### CSS Usage

#### Basic Variable Usage
```css
.card {
  background-color: var(--color-background-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius);
}
```

#### Using RGB Variants for Transparency
```css
.overlay {
  background-color: rgba(var(--color-primary-rgb), 0.1);
  backdrop-filter: blur(10px);
}

.shadow-custom {
  box-shadow: 0 4px 6px rgba(var(--color-shadow-rgb), 0.3);
}
```

#### State-Based Styling
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button:focus {
  outline: var(--focus-ring-width) solid var(--color-border-focus);
  outline-offset: var(--focus-ring-offset);
}
```

### Tailwind CSS Usage

#### Using Mapped Variables
```html
<div class="bg-background-surface text-text-primary border border-border-default rounded-lg p-4">
  <h2 class="text-text-primary font-bold">Card Title</h2>
  <p class="text-text-secondary">Card description text</p>
</div>
```

#### Combining with Dark Mode Variants
```html
<div class="bg-background-surface dark:bg-background-tertiary text-text-primary p-4">
  Content that uses both CSS variables and Tailwind dark mode
</div>
```

### JavaScript/React Usage

#### Reading CSS Variables
```javascript
// Get computed style value
function getThemeColor(variableName) {
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(variableName).trim();
}

// Example usage
const primaryColor = getThemeColor('--color-primary');
const textColor = getThemeColor('--color-text-primary');
```

#### Setting CSS Variables Dynamically
```javascript
// Set a CSS variable value
function setThemeColor(variableName, value) {
  document.documentElement.style.setProperty(variableName, value);
}

// Example usage
setThemeColor('--color-primary', '#ff6b6b');
```

#### React Hook for Theme Variables
```jsx
import { useEffect, useState } from 'react';

function useThemeVariable(variableName) {
  const [value, setValue] = useState('');
  
  useEffect(() => {
    const updateValue = () => {
      const root = document.documentElement;
      const newValue = getComputedStyle(root).getPropertyValue(variableName).trim();
      setValue(newValue);
    };
    
    updateValue();
    
    // Listen for theme changes
    window.addEventListener('theme-change', updateValue);
    return () => window.removeEventListener('theme-change', updateValue);
  }, [variableName]);
  
  return value;
}

// Usage in component
function ThemedComponent() {
  const primaryColor = useThemeVariable('--color-primary');
  const backgroundColor = useThemeVariable('--color-background-surface');
  
  return (
    <div style={{ backgroundColor, borderLeft: `4px solid ${primaryColor}` }}>
      Theme-aware component
    </div>
  );
}
```

## Color Palette Visualization

### Light Theme Palette

```
Primary Colors:
  ■ #2d7984  Primary
  ■ #58cbe0  Primary Light  
  ■ #1d5058  Primary Dark

Secondary Colors:
  ■ #0062b3  Secondary
  ■ #4a94d8  Secondary Light
  ■ #004b8c  Secondary Dark

Text Colors:
  ■ #1a2234  Primary Text
  ■ #4a5568  Secondary Text
  ■ #718096  Muted Text
  ■ #a0aec0  Disabled Text

Background Colors:
  ■ #ffffff  Primary Background
  ■ #f7fafc  Secondary Background
  ■ #edf2f7  Tertiary Background

State Colors:
  ■ #10b981  Success
  ■ #f59e0b  Warning
  ■ #ef4444  Error
  ■ #3b82f6  Info
```

### Dark Theme Palette

```
Primary Colors:
  ■ #2d7984  Primary (same as light)
  ■ #58cbe0  Primary Light (same as light)
  ■ #1d5058  Primary Dark (same as light)

Secondary Colors:
  ■ #0062b3  Secondary (same as light)
  ■ #4a94d8  Secondary Light (same as light)
  ■ #004b8c  Secondary Dark (same as light)

Text Colors:
  ■ #ffffff  Primary Text
  ■ #e2e8f0  Secondary Text
  ■ #a0aec0  Muted Text
  ■ #718096  Disabled Text

Background Colors:
  ■ #1a2234  Primary Background
  ■ #202b3d  Secondary Background
  ■ #2d3748  Tertiary Background

State Colors:
  ■ #68d391  Success
  ■ #fbd38d  Warning
  ■ #fc8181  Error
  ■ #90cdf4  Info
```

## JavaScript Access

### Theme Variable Helper Functions

```javascript
/**
 * Get the current value of a CSS variable
 */
function getThemeVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/**
 * Set a CSS variable value
 */
function setThemeVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

/**
 * Get all theme variables as an object
 */
function getAllThemeVariables() {
  const variables = {};
  const computedStyle = getComputedStyle(document.documentElement);
  
  // Get all custom properties
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const styleSheet = document.styleSheets[i];
      for (let j = 0; j < styleSheet.cssRules.length; j++) {
        const rule = styleSheet.cssRules[j];
        if (rule.style) {
          for (let k = 0; k < rule.style.length; k++) {
            const property = rule.style[k];
            if (property.startsWith('--')) {
              variables[property] = computedStyle.getPropertyValue(property).trim();
            }
          }
        }
      }
    } catch (e) {
      // Skip stylesheets that can't be accessed (CORS)
    }
  }
  
  return variables;
}

/**
 * Convert hex color to RGB values for use with CSS variables
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    null;
}

/**
 * Create a custom theme by overriding specific variables
 */
function createCustomTheme(overrides) {
  Object.entries(overrides).forEach(([variable, value]) => {
    setThemeVariable(variable, value);
    
    // Also set RGB variant if it's a color
    if (variable.includes('color') && value.startsWith('#')) {
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        const rgbVariable = variable.replace('color-', 'color-').concat('-rgb');
        setThemeVariable(rgbVariable, rgbValue);
      }
    }
  });
}

// Example usage
createCustomTheme({
  '--color-primary': '#ff6b6b',
  '--color-secondary': '#4ecdc4',
  '--color-accent': '#ffe66d'
});
```

### React Hook for Variable Access

```jsx
/**
 * React hook for accessing and updating theme variables
 */
function useThemeVariables() {
  const [variables, setVariables] = useState({});
  
  const updateVariables = useCallback(() => {
    setVariables(getAllThemeVariables());
  }, []);
  
  useEffect(() => {
    updateVariables();
    
    // Update when theme changes
    window.addEventListener('theme-change', updateVariables);
    return () => window.removeEventListener('theme-change', updateVariables);
  }, [updateVariables]);
  
  const setVariable = useCallback((name, value) => {
    setThemeVariable(name, value);
    updateVariables();
  }, [updateVariables]);
  
  return {
    variables,
    getVariable: (name) => variables[name] || getThemeVariable(name),
    setVariable,
    updateVariables
  };
}
```

This comprehensive reference provides all the information needed to effectively use the theme system's CSS variables for creating consistent, accessible, and maintainable user interfaces.
