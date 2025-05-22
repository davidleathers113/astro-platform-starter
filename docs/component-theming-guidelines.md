# Component Theming Guidelines

## Table of Contents
- [Overview](#overview)
- [Step-by-Step Component Theming Process](#step-by-step-component-theming-process)
- [When to Use CSS Variables vs Tailwind Dark Mode](#when-to-use-css-variables-vs-tailwind-dark-mode)
- [Handling Component States](#handling-component-states)
- [Accessibility and Contrast Requirements](#accessibility-and-contrast-requirements)
- [Testing Components in Both Themes](#testing-components-in-both-themes)
- [Working with Third-Party Components](#working-with-third-party-components)
- [Common Mistakes and How to Avoid Them](#common-mistakes-and-how-to-avoid-them)
- [Component Patterns and Examples](#component-patterns-and-examples)
- [Performance Considerations](#performance-considerations)
- [Troubleshooting Guide](#troubleshooting-guide)

## Overview

This guide provides comprehensive instructions for creating theme-aware components in the Astro Platform Starter project. Following these guidelines ensures consistency, accessibility, and maintainability across all components.

### Core Principles

1. **Accessibility First**: All components must meet WCAG AA contrast requirements
2. **Semantic Variables**: Use meaningful CSS variable names that describe purpose
3. **Progressive Enhancement**: Components should work without JavaScript
4. **Smooth Transitions**: Theme changes should be visually smooth and not jarring
5. **Consistent Patterns**: Follow established patterns for similar components
6. **Performance Conscious**: Minimize unnecessary re-renders and DOM updates

## Step-by-Step Component Theming Process

### Phase 1: Planning and Design

#### 1. Identify Theme-Dependent Properties

Before implementing, identify which properties need theme awareness:

```checklist
☐ Background colors
☐ Text colors  
☐ Border colors
☐ Shadow colors
☐ Icon colors/variants
☐ Image variants (logos, illustrations)
☐ State colors (hover, active, focus, disabled)
☐ Accessibility features (focus rings, contrast)
```

#### 2. Choose Implementation Strategy

Based on complexity, choose the appropriate approach:

| Component Complexity | Recommended Approach | Example |
|---------------------|---------------------|---------|
| Simple static content | CSS Variables only | Text blocks, simple cards |
| Interactive elements | CSS Variables + Tailwind utilities | Buttons, form inputs |
| Complex state management | React hooks + CSS Variables | Data tables, complex forms |
| Dynamic theming needs | React hooks + Tailwind dark variants | Charts, visualizations |

#### 3. Plan State Management

Consider all component states:

```javascript
// Component state matrix
const componentStates = {
  base: { /* default styles */ },
  hover: { /* hover styles */ },
  active: { /* active/pressed styles */ },
  focus: { /* focus styles */ },
  disabled: { /* disabled styles */ },
  loading: { /* loading styles */ },
  error: { /* error styles */ },
  success: { /* success styles */ }
};
```

### Phase 2: Implementation

#### 4. Set Up Base Structure

Start with semantic HTML and proper accessibility attributes:

```astro
<!-- ✅ Good: Semantic structure with accessibility -->
<button 
  class="theme-button"
  type="button"
  aria-label="Submit form"
  data-component="theme-button"
>
  <span class="button-text">Submit</span>
  <svg class="button-icon" aria-hidden="true">
    <!-- Icon content -->
  </svg>
</button>

<!-- ❌ Bad: Non-semantic structure -->
<div class="button-like" onclick="submit()">
  Submit
</div>
```

#### 5. Apply Base Theme Variables

Use semantic CSS variables for core styling:

```css
.theme-button {
  /* Base styling using theme variables */
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: 1px solid var(--color-border-interactive);
  border-radius: var(--border-radius);
  
  /* Transitions for smooth theme changes */
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
  
  /* Spacing and typography */
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25;
}
```

#### 6. Add State Variations

Implement all interactive states:

```css
.theme-button {
  /* Base styles... */
}

/* Hover state */
.theme-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  border-color: var(--color-border-interactive-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px var(--color-shadow-medium);
}

/* Active state */
.theme-button:active:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(0);
  box-shadow: 0 2px 4px var(--color-shadow-light);
}

/* Focus state - critical for accessibility */
.theme-button:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-border-focus);
  outline-offset: var(--focus-ring-offset);
}

/* Disabled state */
.theme-button:disabled {
  background-color: var(--color-text-disabled);
  color: var(--color-background-primary);
  border-color: var(--color-border-subtle);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

#### 7. Add Component Variants

Create variants using modifier classes:

```css
/* Primary variant (default) */
.theme-button {
  /* Primary styles */
}

/* Secondary variant */
.theme-button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-text-on-secondary);
}

.theme-button--secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-dark);
}

/* Outline variant */
.theme-button--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.theme-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

/* Ghost variant */
.theme-button--ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: transparent;
}

.theme-button--ghost:hover:not(:disabled) {
  background-color: var(--color-background-hover);
}
```

### Phase 3: Testing and Validation

#### 8. Test in Both Themes

Always test components in both light and dark themes:

```javascript
// Testing helper function
function testThemeToggle(componentSelector) {
  const component = document.querySelector(componentSelector);
  
  // Test light theme
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light-theme');
  console.log('Light theme styles:', getComputedStyle(component));
  
  // Test dark theme  
  document.documentElement.classList.remove('light-theme');
  document.documentElement.classList.add('dark');
  console.log('Dark theme styles:', getComputedStyle(component));
}
```

#### 9. Validate Accessibility

Check contrast ratios and accessibility features:

```javascript
// Contrast checking helper
function checkContrast(foregroundColor, backgroundColor) {
  // Implementation would calculate WCAG contrast ratio
  const ratio = calculateContrastRatio(foregroundColor, backgroundColor);
  
  return {
    ratio: ratio,
    passesAA: ratio >= 4.5,
    passesAALarge: ratio >= 3.0,
    passesAAA: ratio >= 7.0
  };
}
```

## When to Use CSS Variables vs Tailwind Dark Mode

### Use CSS Variables When:

#### ✅ Complex Color Relationships
```css
/* Good: Complex color calculations */
.card {
  background-color: var(--color-background-surface);
  border: 1px solid var(--color-border-default);
  box-shadow: 0 2px 4px var(--color-shadow-light);
}

.card__header {
  background-color: rgba(var(--color-primary-rgb), 0.1);
  border-bottom: 1px solid var(--color-border-subtle);
}
```

#### ✅ Component-Specific Theming
```css
/* Good: Component has its own theme context */
.data-table {
  --table-header-bg: var(--color-background-secondary);
  --table-row-hover: var(--color-background-hover);
  --table-border: var(--color-border-subtle);
}

.data-table th {
  background-color: var(--table-header-bg);
}

.data-table tr:hover {
  background-color: var(--table-row-hover);
}
```

#### ✅ Dynamic Theming
```javascript
// Good: Runtime theme customization
function applyCustomTheme(primaryColor) {
  document.documentElement.style.setProperty('--color-primary', primaryColor);
  
  // Auto-generate related colors
  const darkVariant = adjustColorBrightness(primaryColor, -20);
  document.documentElement.style.setProperty('--color-primary-dark', darkVariant);
}
```

### Use Tailwind Dark Mode When:

#### ✅ Simple Color Swaps
```html
<!-- Good: Simple light/dark color alternatives -->
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h2 class="text-blue-600 dark:text-blue-400">Title</h2>
  <p class="text-gray-600 dark:text-gray-300">Description</p>
</div>
```

#### ✅ Layout or Structural Changes
```html
<!-- Good: Different layouts for themes -->
<nav class="flex flex-col dark:flex-row border-b dark:border-t border-gray-200 dark:border-gray-700">
  <a class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">Link</a>
</nav>
```

#### ✅ Component Variants
```html
<!-- Good: Theme-specific component variants -->
<button class="
  bg-blue-500 hover:bg-blue-600 
  dark:bg-blue-600 dark:hover:bg-blue-700
  text-white font-medium px-4 py-2 rounded
">
  Action
</button>
```

### Hybrid Approach (Recommended)

Combine both approaches for maximum flexibility:

```astro
---
// Component props
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const { variant = 'primary', size = 'md' } = Astro.props;
---

<button 
  class={`
    theme-button 
    theme-button--${variant} 
    theme-button--${size}
    transition-theme duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-gray-800
  `}
>
  <slot />
</button>

<style>
  .theme-button {
    /* Base styles using CSS variables */
    font-weight: 600;
    border-radius: var(--border-radius);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  /* Variants using CSS variables */
  .theme-button--primary {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: 1px solid var(--color-primary);
  }
  
  .theme-button--primary:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
  }
  
  /* Sizes using utility classes + CSS variables */
  .theme-button--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .theme-button--md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .theme-button--lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
</style>
```

## Handling Component States

### Interactive States

All interactive components must handle these states properly:

#### Base State
```css
.interactive-element {
  /* Default appearance */
  background-color: var(--color-background-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  
  /* Smooth transitions */
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
  
  /* Ensure interactive cursor */
  cursor: pointer;
}
```

#### Hover State
```css
.interactive-element:hover:not(:disabled) {
  background-color: var(--color-background-hover);
  border-color: var(--color-border-interactive-hover);
  
  /* Subtle elevation */
  transform: translateY(-1px);
  box-shadow: 0 2px 4px var(--color-shadow-light);
}
```

#### Active State
```css
.interactive-element:active:not(:disabled) {
  background-color: var(--color-background-active);
  
  /* Pressed effect */
  transform: translateY(0);
  box-shadow: 0 1px 2px var(--color-shadow-light);
}
```

#### Focus State (Critical for Accessibility)
```css
.interactive-element:focus-visible {
  /* High contrast focus ring */
  outline: var(--focus-ring-width) solid var(--color-border-focus);
  outline-offset: var(--focus-ring-offset);
  
  /* Ensure focus is visible in both themes */
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.2);
}

/* Enhanced dark mode focus visibility */
.dark .interactive-element:focus-visible {
  outline-color: var(--color-primary-light);
  box-shadow: 0 0 0 4px rgba(var(--color-primary-light-rgb), 0.3);
}
```

#### Disabled State
```css
.interactive-element:disabled {
  background-color: var(--color-background-input-disabled);
  color: var(--color-text-disabled);
  border-color: var(--color-border-subtle);
  
  /* Remove interactivity */
  cursor: not-allowed;
  pointer-events: none;
  
  /* Reset transforms and shadows */
  transform: none;
  box-shadow: none;
  
  /* Reduce opacity for additional visual cue */
  opacity: 0.6;
}
```

### Loading States

Provide visual feedback during async operations:

```css
.interactive-element--loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.interactive-element--loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-text-disabled);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
```

### Error States

Show validation errors clearly:

```css
.form-field--error .form-input {
  border-color: var(--color-error);
  background-color: var(--color-background-error);
  
  /* Error focus state */
  &:focus {
    outline-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2);
  }
}

.form-field__error-message {
  color: var(--color-text-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: 500;
}
```

## Accessibility and Contrast Requirements

### WCAG Compliance Standards

All components must meet these minimum contrast ratios:

| Content Type | WCAG AA | WCAG AAA |
|--------------|---------|----------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18pt+ or 14pt+ bold) | 3:1 | 4.5:1 |
| UI components (borders, focus indicators) | 3:1 | Not specified |
| Graphical objects | 3:1 | Not specified |

### Contrast Validation

Use this helper to validate contrast in both themes:

```javascript
// Contrast validation helper
function validateComponentContrast(componentSelector) {
  const component = document.querySelector(componentSelector);
  const styles = getComputedStyle(component);
  
  const textColor = styles.color;
  const backgroundColor = styles.backgroundColor;
  
  // Test in both themes
  const themes = ['light', 'dark'];
  const results = {};
  
  themes.forEach(theme => {
    // Switch theme
    document.documentElement.className = theme === 'dark' ? 'dark' : 'light-theme';
    
    // Get colors
    const currentStyles = getComputedStyle(component);
    const currentTextColor = currentStyles.color;
    const currentBgColor = currentStyles.backgroundColor;
    
    // Calculate contrast
    const contrast = calculateContrastRatio(currentTextColor, currentBgColor);
    
    results[theme] = {
      textColor: currentTextColor,
      backgroundColor: currentBgColor,
      contrast: contrast,
      passesAA: contrast >= 4.5,
      passesAALarge: contrast >= 3.0
    };
  });
  
  return results;
}
```

### Focus Indicators

Ensure focus indicators are visible in both themes:

```css
/* Base focus styles */
.focusable:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-border-focus);
  outline-offset: var(--focus-ring-offset);
}

/* Enhanced focus for dark theme */
.dark .focusable:focus-visible {
  outline-color: var(--color-primary-light);
  /* Additional shadow for better visibility */
  box-shadow: 
    0 0 0 var(--focus-ring-offset) var(--color-background-primary),
    0 0 0 calc(var(--focus-ring-offset) + var(--focus-ring-width)) var(--color-primary-light);
}

/* Custom focus for specific components */
.button:focus-visible {
  /* Override default outline with custom style */
  outline: none;
  box-shadow: 
    inset 0 0 0 2px var(--color-background-primary),
    inset 0 0 0 4px var(--color-border-focus);
}
```

### Screen Reader Support

Include appropriate ARIA attributes and hidden text:

```astro
<button 
  class="theme-toggle-button"
  aria-label="Toggle between light and dark theme"
  aria-pressed={isDarkMode ? 'true' : 'false'}
>
  <svg aria-hidden="true" class="theme-icon">
    <!-- Icon content -->
  </svg>
  <span class="sr-only">
    {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  </span>
</button>

<style>
  /* Screen reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
```

## Testing Components in Both Themes

### Manual Testing Checklist

For each component, verify:

```checklist
☐ Component renders correctly in light theme
☐ Component renders correctly in dark theme
☐ All text meets contrast requirements
☐ Interactive states work in both themes
☐ Focus indicators are visible in both themes
☐ Transitions are smooth between themes
☐ No layout shifts occur during theme change
☐ Images/icons have appropriate variants
☐ Loading states work in both themes
☐ Error states work in both themes
☐ Disabled states work in both themes
```

### Automated Testing

Create component tests that cover theme variations:

```javascript
// Example test with theme switching
describe('ThemeButton', () => {
  beforeEach(() => {
    // Reset theme
    document.documentElement.className = '';
  });
  
  test('should have proper contrast in light theme', () => {
    document.documentElement.className = 'light-theme';
    const button = render(<ThemeButton>Test</ThemeButton>);
    
    const contrast = calculateContrastRatio(
      getComputedStyle(button).color,
      getComputedStyle(button).backgroundColor
    );
    
    expect(contrast).toBeGreaterThan(4.5);
  });
  
  test('should have proper contrast in dark theme', () => {
    document.documentElement.className = 'dark';
    const button = render(<ThemeButton>Test</ThemeButton>);
    
    const contrast = calculateContrastRatio(
      getComputedStyle(button).color,
      getComputedStyle(button).backgroundColor
    );
    
    expect(contrast).toBeGreaterThan(4.5);
  });
  
  test('should transition smoothly between themes', () => {
    const button = render(<ThemeButton>Test</ThemeButton>);
    
    // Check transition properties are set
    const styles = getComputedStyle(button);
    expect(styles.transitionProperty).toContain('background-color');
    expect(styles.transitionDuration).toBe('250ms');
  });
});
```

### Visual Regression Testing

Take screenshots in both themes to catch visual issues:

```javascript
// Example with Playwright/Puppeteer
async function captureThemeVariations(page, componentSelector) {
  // Light theme screenshot
  await page.evaluate(() => {
    document.documentElement.className = 'light-theme';
  });
  await page.screenshot({ 
    path: `screenshots/${componentSelector}-light.png`,
    clip: await page.locator(componentSelector).boundingBox()
  });
  
  // Dark theme screenshot  
  await page.evaluate(() => {
    document.documentElement.className = 'dark';
  });
  await page.screenshot({ 
    path: `screenshots/${componentSelector}-dark.png`,
    clip: await page.locator(componentSelector).boundingBox()
  });
}
```

## Working with Third-Party Components

### Wrapper Strategy

Create theme-aware wrappers for third-party components:

```tsx
// Themed wrapper for third-party component
import { useTheme } from '../theme';
import ThirdPartyDatePicker from 'react-datepicker';

function ThemedDatePicker(props) {
  const { isDarkMode, getThemeValue } = useTheme();
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: getThemeValue({
        light: '#ffffff',
        dark: '#2d3748'
      }),
      borderColor: getThemeValue({
        light: '#e2e8f0',
        dark: '#4a5568'
      }),
      color: getThemeValue({
        light: '#1a2234',
        dark: '#ffffff'
      })
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? getThemeValue({ light: '#2d7984', dark: '#58cbe0' })
        : getThemeValue({ light: '#ffffff', dark: '#2d3748' }),
      color: state.isSelected
        ? '#ffffff'
        : getThemeValue({ light: '#1a2234', dark: '#ffffff' })
    })
  };
  
  return (
    <div className="themed-datepicker-wrapper">
      <ThirdPartyDatePicker
        {...props}
        styles={customStyles}
        className={isDarkMode ? 'datepicker-dark' : 'datepicker-light'}
      />
    </div>
  );
}
```

### CSS Override Strategy

Override third-party styles with theme-aware CSS:

```css
/* Override third-party component styles */
.third-party-modal {
  /* Force theme colors */
  background-color: var(--color-background-surface) !important;
  color: var(--color-text-primary) !important;
  border: 1px solid var(--color-border-default) !important;
}

.third-party-modal .modal-header {
  background-color: var(--color-background-secondary) !important;
  border-bottom-color: var(--color-border-subtle) !important;
}

.third-party-modal .modal-button {
  background-color: var(--color-primary) !important;
  color: var(--color-text-on-primary) !important;
}

/* Ensure transitions still work */
.third-party-modal * {
  transition: var(--theme-transition-properties) var(--theme-transition-duration) !important;
}
```

### Configuration Strategy

Configure third-party components with theme-aware props:

```tsx
import { Chart as ChartJS } from 'chart.js';
import { useTheme } from '../theme';

function ThemedChart({ data, options = {} }) {
  const { getThemeValue } = useTheme();
  
  const themedOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        labels: {
          color: getThemeValue({
            light: '#1a2234',
            dark: '#ffffff'
          })
        }
      }
    },
    scales: {
      ...options.scales,
      x: {
        ...options.scales?.x,
        ticks: {
          color: getThemeValue({
            light: '#4a5568',
            dark: '#a0aec0'
          })
        },
        grid: {
          color: getThemeValue({
            light: '#e2e8f0',
            dark: '#4a5568'
          })
        }
      },
      y: {
        ...options.scales?.y,
        ticks: {
          color: getThemeValue({
            light: '#4a5568',
            dark: '#a0aec0'
          })
        },
        grid: {
          color: getThemeValue({
            light: '#e2e8f0',
            dark: '#4a5568'
          })
        }
      }
    }
  };
  
  return <ChartJS data={data} options={themedOptions} />;
}
```

## Common Mistakes and How to Avoid Them

### Mistake 1: Hardcoding Colors

❌ **Bad: Hardcoded colors**
```css
.card {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #cccccc;
}

.dark .card {
  background-color: #1a1a1a;
  color: #ffffff;
  border: 1px solid #444444;
}
```

✅ **Good: Using CSS variables**
```css
.card {
  background-color: var(--color-background-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}
```

### Mistake 2: Forgetting Focus States

❌ **Bad: No focus styling**
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  /* Missing focus styles */
}
```

✅ **Good: Proper focus styling**
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

.button:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-border-focus);
  outline-offset: var(--focus-ring-offset);
}
```

### Mistake 3: Poor Contrast in Dark Mode

❌ **Bad: Insufficient contrast**
```css
.card {
  background-color: var(--color-background-primary);
  color: #888888; /* Too low contrast in dark mode */
}
```

✅ **Good: Proper contrast variables**
```css
.card {
  background-color: var(--color-background-surface);
  color: var(--color-text-primary); /* Ensures proper contrast */
}
```

### Mistake 4: Missing Transitions

❌ **Bad: Jarring theme changes**
```css
.element {
  background-color: var(--color-background);
  /* No transition */
}
```

✅ **Good: Smooth transitions**
```css
.element {
  background-color: var(--color-background);
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
}
```

### Mistake 5: Inconsistent Component APIs

❌ **Bad: Inconsistent prop names**
```tsx
// Different components using different prop names
<Button variant="primary" />
<Card type="primary" />
<Input style="primary" />
```

✅ **Good: Consistent component APIs**
```tsx
// All components use consistent prop names
<Button variant="primary" />
<Card variant="primary" />  
<Input variant="primary" />
```

### Mistake 6: Not Testing Disabled States

❌ **Bad: Missing disabled state styling**
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  /* Missing disabled styles */
}
```

✅ **Good: Complete state handling**
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
}

.button:disabled {
  background-color: var(--color-text-disabled);
  color: var(--color-background-primary);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Mistake 7: Overusing Important Declarations

❌ **Bad: Overusing !important**
```css
.component {
  background-color: var(--color-background) !important;
  color: var(--color-text) !important;
  border: 1px solid var(--color-border) !important;
}
```

✅ **Good: Proper specificity management**
```css
.component {
  background-color: var(--color-background);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/* Use specificity when needed */
.page-content .component {
  background-color: var(--color-background-elevated);
}
```

## Component Patterns and Examples

### Pattern 1: Simple Themed Component

```astro
---
// SimpleCard.astro
interface Props {
  title: string;
  content: string;
  className?: string;
}

const { title, content, className = '' } = Astro.props;
---

<div class={`simple-card ${className}`}>
  <h3 class="simple-card__title">{title}</h3>
  <p class="simple-card__content">{content}</p>
</div>

<style>
  .simple-card {
    background-color: var(--color-background-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  .simple-card__title {
    color: var(--color-text-primary);
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .simple-card__content {
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.6;
  }
</style>
```

### Pattern 2: Interactive Themed Component

```astro
---
// ThemeButton.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const { 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  type = 'button',
  className = '' 
} = Astro.props;

const baseClasses = 'theme-button';
const variantClass = `theme-button--${variant}`;
const sizeClass = `theme-button--${size}`;
const classes = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();
---

<button 
  class={classes}
  type={type}
  disabled={disabled}
  aria-disabled={disabled}
>
  <slot />
</button>

<style>
  .theme-button {
    /* Base styles */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 600;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    border: 1px solid transparent;
    text-decoration: none;
    
    /* Remove default button styling */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  /* Sizes */
  .theme-button--sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .theme-button--md {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .theme-button--lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
  }
  
  /* Variants */
  .theme-button--primary {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border-color: var(--color-primary);
  }
  
  .theme-button--secondary {
    background-color: var(--color-secondary);
    color: var(--color-text-on-secondary);
    border-color: var(--color-secondary);
  }
  
  .theme-button--outline {
    background-color: transparent;
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  
  .theme-button--ghost {
    background-color: transparent;
    color: var(--color-text-primary);
    border-color: transparent;
  }
  
  /* Hover states */
  .theme-button--primary:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px var(--color-shadow-medium);
  }
  
  .theme-button--secondary:hover:not(:disabled) {
    background-color: var(--color-secondary-dark);
    border-color: var(--color-secondary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px var(--color-shadow-medium);
  }
  
  .theme-button--outline:hover:not(:disabled) {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
  
  .theme-button--ghost:hover:not(:disabled) {
    background-color: var(--color-background-hover);
  }
  
  /* Active states */
  .theme-button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px var(--color-shadow-light);
  }
  
  /* Focus states */
  .theme-button:focus-visible {
    outline: var(--focus-ring-width) solid var(--color-border-focus);
    outline-offset: var(--focus-ring-offset);
  }
  
  /* Disabled states */
  .theme-button:disabled {
    background-color: var(--color-text-disabled);
    color: var(--color-background-primary);
    border-color: var(--color-text-disabled);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
  }
</style>
```

### Pattern 3: React Hook Component

```tsx
// ThemedFormField.tsx
import { useTheme } from '../theme';
import { useState, useId } from 'react';

interface Props {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function ThemedFormField({
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  value,
  onChange
}: Props) {
  const { isDarkMode, themeClass } = useTheme();
  const [focused, setFocused] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <div className="theme-form-field">
      <label 
        htmlFor={id}
        className={`
          theme-form-field__label
          ${required ? 'theme-form-field__label--required' : ''}
        `}
      >
        {label}
        {required && <span aria-label="required">*</span>}
      </label>
      
      <div className="theme-form-field__input-wrapper">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className={`
            theme-form-field__input
            ${error ? 'theme-form-field__input--error' : ''}
            ${focused ? 'theme-form-field__input--focused' : ''}
            ${themeClass('theme-form-field__input--dark', 'theme-form-field__input--light')}
          `}
        />
      </div>
      
      {error && (
        <div 
          id={errorId}
          className="theme-form-field__error"
          role="alert"
        >
          {error}
        </div>
      )}
    </div>
  );
}
```

```css
/* ThemedFormField.css */
.theme-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-form-field__label {
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: 0.875rem;
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
}

.theme-form-field__label--required {
  position: relative;
}

.theme-form-field__label--required span {
  color: var(--color-error);
  margin-left: 0.25rem;
}

.theme-form-field__input-wrapper {
  position: relative;
}

.theme-form-field__input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius);
  background-color: var(--color-background-input);
  color: var(--color-text-primary);
  font-size: 1rem;
  line-height: 1.5;
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
}

.theme-form-field__input::placeholder {
  color: var(--color-text-placeholder);
}

.theme-form-field__input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

.theme-form-field__input--error {
  border-color: var(--color-error);
  background-color: var(--color-background-error);
}

.theme-form-field__input--error:focus {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
}

.theme-form-field__error {
  color: var(--color-text-error);
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

/* Dark mode enhancements */
.theme-form-field__input--dark:focus {
  box-shadow: 0 0 0 3px rgba(var(--color-primary-light-rgb), 0.2);
}

.theme-form-field__input--dark.theme-form-field__input--error:focus {
  box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2);
}
```

## Performance Considerations

### CSS Performance

1. **Minimize CSS Variable Lookups**
```css
/* ❌ Bad: Multiple var() lookups */
.element {
  border: 1px solid var(--color-border);
  border-top-color: var(--color-border);
  border-bottom-color: var(--color-border);
}

/* ✅ Good: Single var() lookup */
.element {
  border: 1px solid var(--color-border);
}
```

2. **Use Efficient Selectors**
```css
/* ❌ Bad: Complex nested selectors */
.theme-component .nested .element.with.many.classes {
  background-color: var(--color-background);
}

/* ✅ Good: Simple, specific selectors */
.theme-element {
  background-color: var(--color-background);
}
```

3. **Limit Transition Properties**
```css
/* ❌ Bad: Transitioning all properties */
.element {
  transition: all 250ms ease;
}

/* ✅ Good: Specific properties only */
.element {
  transition: var(--theme-transition-properties) var(--theme-transition-duration);
}
```

### React Performance

1. **Memoize Theme Values**
```tsx
// ✅ Good: Memoized theme calculations
const ThemedComponent = memo(({ data }) => {
  const { getThemeValue } = useTheme();
  
  const themeStyles = useMemo(() => ({
    backgroundColor: getThemeValue({
      light: '#ffffff',
      dark: '#1a2234'
    }),
    color: getThemeValue({
      light: '#1a2234', 
      dark: '#ffffff'
    })
  }), [getThemeValue]);
  
  return <div style={themeStyles}>{data}</div>;
});
```

2. **Avoid Inline Style Objects**
```tsx
// ❌ Bad: Creates new object on every render
function Component() {
  const { isDarkMode } = useTheme();
  
  return (
    <div style={{
      backgroundColor: isDarkMode ? '#1a2234' : '#ffffff'
    }}>
      Content
    </div>
  );
}

// ✅ Good: Use CSS classes
function Component() {
  const { themeClass } = useTheme();
  
  return (
    <div className={themeClass('bg-dark', 'bg-light')}>
      Content
    </div>
  );
}
```

## Troubleshooting Guide

### Issue: Colors Not Updating

**Symptoms**: Component colors don't change when theme switches

**Causes & Solutions**:
1. **CSS Variable not defined**
   ```css
   /* Check if variable exists in globals.css */
   :root { --color-custom: #000000; }
   ```

2. **Typo in variable name**
   ```css
   /* ❌ Wrong */
   color: var(--color-text-primray);
   
   /* ✅ Correct */
   color: var(--color-text-primary);
   ```

3. **Missing theme class**
   ```javascript
   // Ensure theme classes are applied
   console.log(document.documentElement.classList);
   // Should contain 'dark' or 'light-theme'
   ```

### Issue: Focus Not Visible

**Symptoms**: Focus indicators not showing or barely visible

**Solutions**:
1. **Add explicit focus styles**
   ```css
   .element:focus-visible {
     outline: 3px solid var(--color-border-focus);
     outline-offset: 2px;
   }
   ```

2. **Check contrast ratios**
   ```javascript
   // Verify focus color has sufficient contrast
   const focusColor = getComputedStyle(document.documentElement)
     .getPropertyValue('--color-border-focus');
   ```

### Issue: Jarring Theme Transitions

**Symptoms**: Theme changes are sudden and harsh

**Solutions**:
1. **Add transition properties**
   ```css
   .element {
     transition: var(--theme-transition-properties) var(--theme-transition-duration);
   }
   ```

2. **Check for conflicting transitions**
   ```css
   /* Remove conflicting transitions */
   .element {
     transition: none; /* Remove this */
     transition: var(--theme-transition-properties) var(--theme-transition-duration);
   }
   ```

### Issue: React Components Not Updating

**Symptoms**: React components don't respond to theme changes

**Solutions**:
1. **Ensure ThemeProvider is wrapping components**
   ```tsx
   <ThemeProvider>
     <YourComponent />
   </ThemeProvider>
   ```

2. **Check event listeners**
   ```javascript
   // Verify theme change events are firing
   window.addEventListener('theme-change', (e) => {
     console.log('Theme changed:', e.detail);
   });
   ```

3. **Force re-render if needed**
   ```tsx
   const [, forceUpdate] = useReducer(x => x + 1, 0);
   
   useEffect(() => {
     window.addEventListener('theme-change', forceUpdate);
     return () => window.removeEventListener('theme-change', forceUpdate);
   }, []);
   ```

Following these comprehensive guidelines will ensure your components are theme-aware, accessible, and provide an excellent user experience across all themes and usage scenarios.
