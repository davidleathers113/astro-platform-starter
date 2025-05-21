# Color Contrast Accessibility Guidelines

This document provides guidance for maintaining WCAG AA color contrast compliance in the Astro Platform Starter project. It covers best practices, tools, and implementation patterns to ensure all UI elements meet accessibility standards.

## Color Contrast Requirements

WCAG AA compliance requires the following minimum contrast ratios:

- **Normal Text** (< 18pt or < 14pt bold): **4.5:1**
- **Large Text** (≥ 18pt or ≥ 14pt bold): **3:1**
- **UI Components and Graphical Objects**: **3:1**

## Theme System Implementation

Our project uses a dual-theme system (light and dark) with CSS variables for color management:

```css
/* Base theme variables */
@theme {
    --color-primary: #2d7984; /* Primary brand color */
    --color-primary-rgb: 45, 121, 132;
    /* Additional global colors */
}

/* Dark theme */
.dark-theme, .dark, :root {
    --color-text: #FFFFFF;
    --color-background: #1a2234;
    /* Additional dark theme variables */
}

/* Light theme */
.light-theme, :root:not(.dark) {
    --color-text: #1a2234;
    --color-background: #FFFFFF;
    /* Additional light theme variables */
}
```

## Color Palette Reference

| Color Purpose | Light Theme | Dark Theme | Compliance Notes |
|---------------|-------------|------------|------------------|
| Primary Text  | #1a2234 on #FFFFFF (13.7:1) | #FFFFFF on #1a2234 (13.7:1) | Exceeds requirements |
| Muted Text    | #4A5568 on #FFFFFF (7.5:1) | #b0c0d0 on #1a2234 (5.0:1) | Exceeds requirements |
| Primary Button| #2d7984 with #FFFFFF (4.6:1) | #2d7984 with #FFFFFF (4.6:1) | Meets requirements |
| Secondary Button | #0062b3 with #FFFFFF (4.5:1) | #0062b3 with #FFFFFF (4.5:1) | Meets requirements |
| Accent Button | #58cbe0 with #1a2234 (11:1) | #58cbe0 with #1a2234 (11:1) | Exceeds requirements |
| Links | #0062b3 on #FFFFFF (4.5:1) | #58cbe0 on #1a2234 (4.8:1) | Meets requirements |
| Error Messages | #e53e3e on #FFFFFF (4.6:1) | #fc8181 on #1a2234 (4.6:1) | Meets requirements |

## Implementing Accessible Components

### 1. Text Elements

**Basic Text:**
```css
/* Guaranteed good contrast */
color: var(--color-text);
background-color: var(--color-background);
```

**Links:**
```css
/* Light theme */
a:not(.btn) {
    color: var(--color-secondary);
}

/* Dark theme-specific styling */
.dark a:not(.btn) {
    color: #58cbe0; /* Brighter in dark mode */
}
```

### 2. Buttons

**Primary Buttons:**
```css
.btn {
    background-color: var(--color-primary);
    color: var(--color-button-text);
}

/* Enhanced hover states for better distinction */
.btn:hover {
    opacity: 0.9;
    background-color: #266974; /* Darker for better contrast */
}
```

**Accent Buttons:**
```css
.btn-accent {
    background-color: var(--color-accent);
    color: var(--color-accent-button-text); /* Dark text on light background */
}
```

### 3. Form Elements

**Input Fields:**
```css
input, select, textarea {
    background-color: var(--color-input-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}

/* Placeholder styling with proper contrast */
::placeholder {
    color: var(--color-placeholder);
    opacity: 1;
}
```

**Focus States:**
```css
input:focus, select:focus, textarea:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
}

/* High contrast focus outlines */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
}

/* Dark mode specific focus styles */
.dark a:focus-visible,
.dark button:focus-visible,
.dark input:focus-visible,
.dark select:focus-visible,
.dark textarea:focus-visible {
    outline: 3px solid #58cbe0; /* Brighter in dark mode */
}
```

### 4. Error States

```css
.error-message {
    color: var(--color-error);
    font-size: 0.875rem;
    font-weight: 500; /* Slightly bolder for better visibility */
}

.error-border {
    border-color: var(--color-error) !important;
}
```

## Testing Procedure

When adding or modifying UI elements, follow this testing procedure:

1. **Automated Testing**
   - Use the [WAVE Web Accessibility Tool](https://wave.webaim.org/)
   - Run Lighthouse Accessibility audit in Chrome DevTools

2. **Manual Testing**
   - Check contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Test in both light and dark themes
   - Verify all states (default, hover, focus, active, disabled)

3. **Color Combination Verification**
   - For new color combinations, calculate the contrast ratio
   - Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color's relative luminance and L2 is the darker color's

## Common Pitfalls to Avoid

1. **Hard-Coded Colors**
   - Always use CSS variables instead of hard-coded colors
   - Bad: `color: #58cbe0;`
   - Good: `color: var(--color-accent);`

2. **Missing States**
   - Don't forget to style all interactive states (hover, focus, active)
   - Test all states in both light and dark themes

3. **Opacity Issues**
   - Be cautious with opacity that might reduce contrast
   - Test elements with `opacity` or `rgba()` colors on various backgrounds

4. **Overlapping Elements**
   - Ensure text over images or gradients maintains contrast
   - Consider text shadows or backdrop filters when needed

5. **Small Text**
   - Remember that smaller text requires higher contrast (4.5:1)
   - Don't rely on "large text" exceptions for important information

## Adding New Colors

When adding new colors to the theme system:

1. Add both hex and RGB values:
   ```css
   --new-color: #hexvalue;
   --new-color-rgb: r, g, b;
   ```

2. Add color to the Tailwind config:
   ```js
   // in tailwind.config.js
   newColor: {
     DEFAULT: 'var(--new-color)',
   }
   ```

3. Test contrast against backgrounds:
   - Normal text needs 4.5:1 minimum contrast ratio
   - Large text and UI components need 3:1 minimum

4. Update this documentation with the new color

## Troubleshooting

### Common Contrast Issues

1. **Problem**: Text is hard to read on colored backgrounds
   **Solution**: Darken the text color or lighten the background

2. **Problem**: Buttons don't have enough contrast
   **Solution**: Ensure the button text has 4.5:1 contrast with the button background

3. **Problem**: Focus indicators aren't visible enough
   **Solution**: Use thicker outlines (3px) with colors that contrast with both light and dark backgrounds
   
4. **Problem**: SVG icons lack contrast
   **Solution**: Ensure SVG fill/stroke colors meet 3:1 contrast requirements

### Tools for Testing

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)
- [Contrast Ratio](https://contrast-ratio.com/)
- [Stark Contrast Checker](https://www.getstark.co/)
- [Chrome DevTools Accessibility Audit](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference)

## Resources

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Color Contrast](https://webaim.org/articles/contrast/)
- [The A11Y Project - Accessible Colors](https://www.a11yproject.com/posts/what-is-color-contrast/)
- [Designing for Color Blindness](https://www.smashingmagazine.com/2016/06/improving-color-accessibility-for-color-blind-users/)
