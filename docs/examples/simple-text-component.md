# Simple Text-Based Component Example

This example demonstrates how to create a simple text-based component that properly supports theming. This type of component is common for cards, information panels, and content blocks.

## Component Requirements

- Display title and description text
- Support different visual styles (default, highlighted, muted)
- Maintain proper contrast in both themes
- Include smooth theme transitions

## Complete Implementation

### Component Code (SimpleInfoCard.astro)

```astro
---
// Simple text-based themed component
interface Props {
  title: string;
  description: string;
  variant?: 'default' | 'highlighted' | 'muted';
  className?: string;
}

const { 
  title, 
  description, 
  variant = 'default',
  className = '' 
} = Astro.props;

const baseClass = 'info-card';
const variantClass = `info-card--${variant}`;
const classes = `${baseClass} ${variantClass} ${className}`.trim();
---

<div class={classes}>
  <h3 class="info-card__title">{title}</h3>
  <p class="info-card__description">{description}</p>
</div>

<style>
  .info-card {
    /* Base styling using semantic CSS variables */
    background-color: var(--color-background-surface);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    
    /* Smooth theme transitions */
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    
    /* Subtle shadow for depth */
    box-shadow: 0 2px 4px var(--color-shadow-light);
  }
  
  .info-card__title {
    /* Title styling with proper hierarchy */
    color: var(--color-text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 0.75rem 0;
    
    /* Ensure smooth theme transitions */
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  .info-card__description {
    /* Description with proper secondary text color */
    color: var(--color-text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    
    /* Ensure smooth theme transitions */
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  /* Variant: Highlighted */
  .info-card--highlighted {
    background-color: var(--color-background-secondary);
    border-color: var(--color-primary);
    border-width: 2px;
    
    /* Enhanced shadow for highlighted variant */
    box-shadow: 0 4px 8px var(--color-shadow-medium);
  }
  
  .info-card--highlighted .info-card__title {
    color: var(--color-primary);
  }
  
  /* Variant: Muted */
  .info-card--muted {
    background-color: var(--color-background-tertiary);
    border-color: var(--color-border-subtle);
  }
  
  .info-card--muted .info-card__title {
    color: var(--color-text-secondary);
    font-weight: 500;
  }
  
  .info-card--muted .info-card__description {
    color: var(--color-text-muted);
  }
</style>
```

## Usage Examples

### Basic Usage
```astro
<SimpleInfoCard 
  title="Getting Started"
  description="Learn the basics of our theme system with this comprehensive guide."
/>
```

### Highlighted Variant
```astro
<SimpleInfoCard 
  title="Important Notice"
  description="This feature requires special attention and careful implementation."
  variant="highlighted"
/>
```

### Muted Variant
```astro
<SimpleInfoCard 
  title="Additional Information"
  description="Optional details that provide context but aren't critical to the main flow."
  variant="muted"
/>
```

### With Custom Classes
```astro
<SimpleInfoCard 
  title="Custom Styled Card"
  description="This card includes additional custom styling."
  className="mb-4 max-w-md"
/>
```

## Theme Variations

### Light Theme Appearance
- **Background**: Clean white surface (`#ffffff`)
- **Title**: Dark blue-gray text (`#1a2234`) for strong contrast
- **Description**: Medium gray text (`#4a5568`) for hierarchy
- **Border**: Light gray (`#e2e8f0`) for subtle definition
- **Shadow**: Subtle dark shadow (`rgba(0, 0, 0, 0.05)`)

### Dark Theme Appearance
- **Background**: Dark blue surface (`#202b3d`)
- **Title**: White text (`#ffffff`) for strong contrast
- **Description**: Light gray text (`#e2e8f0`) for hierarchy
- **Border**: Medium gray (`#4a5568`) for definition
- **Shadow**: Deeper dark shadow (`rgba(0, 0, 0, 0.25)`)

## Accessibility Features

### Contrast Compliance
All text combinations meet WCAG AA standards:
- **Title text**: 4.5:1 contrast ratio minimum
- **Description text**: 4.5:1 contrast ratio minimum
- **Border visibility**: 3:1 contrast ratio minimum

### Semantic Structure
- Uses proper heading hierarchy (`h3` for title)
- Maintains logical content flow
- Provides meaningful text content

### Screen Reader Support
- Clear content structure with semantic HTML
- No reliance on color alone for meaning
- Proper heading levels for navigation

## Implementation Notes

### CSS Variable Strategy
This component demonstrates the recommended approach for simple text-based components:

1. **Use semantic variables**: `--color-text-primary` instead of specific colors
2. **Include transitions**: Smooth theme changes with `var(--theme-transition-properties)`
3. **Maintain hierarchy**: Different text colors for title vs description
4. **Consistent spacing**: Use design system values for padding and margins

### Performance Considerations
- **Minimal CSS**: Only necessary styles included
- **No JavaScript**: Pure CSS implementation for optimal performance
- **Efficient selectors**: Simple, specific CSS selectors
- **Cached variables**: CSS variables are computed once per theme change

### Browser Compatibility
- **CSS Variables**: Supported in all modern browsers (IE11+)
- **CSS Transitions**: Universal support
- **Fallback**: Component works without transitions in older browsers

## Testing Checklist

When implementing this component, verify:

```checklist
☐ Component renders correctly in light theme
☐ Component renders correctly in dark theme
☐ All text meets contrast requirements (use browser dev tools)
☐ Transitions are smooth when switching themes
☐ All variants (default, highlighted, muted) work in both themes
☐ Component is accessible via keyboard navigation
☐ Screen reader announces content properly
☐ Component works without JavaScript enabled
☐ No layout shifts occur during theme changes
☐ Border and shadow visibility is appropriate in both themes
```

## Common Variations

### With Icon
```astro
---
// Add icon support
interface Props {
  title: string;
  description: string;
  icon?: string; // Icon name or path
  variant?: 'default' | 'highlighted' | 'muted';
}

const { title, description, icon, variant = 'default' } = Astro.props;
---

<div class={`info-card info-card--${variant}`}>
  {icon && (
    <div class="info-card__icon">
      <svg class="info-card__icon-svg" aria-hidden="true">
        <!-- Icon SVG content -->
      </svg>
    </div>
  )}
  <div class="info-card__content">
    <h3 class="info-card__title">{title}</h3>
    <p class="info-card__description">{description}</p>
  </div>
</div>

<style>
  .info-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .info-card__icon {
    flex-shrink: 0;
    padding: 0.75rem;
    background-color: var(--color-background-tertiary);
    border-radius: var(--border-radius);
  }
  
  .info-card__icon-svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-primary);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  .info-card__content {
    flex: 1;
  }
</style>
```

### With Action Link
```astro
<div class="info-card">
  <h3 class="info-card__title">{title}</h3>
  <p class="info-card__description">{description}</p>
  {actionText && actionHref && (
    <a href={actionHref} class="info-card__action">
      {actionText}
      <svg class="info-card__action-icon" aria-hidden="true">
        <!-- Arrow icon -->
      </svg>
    </a>
  )}
</div>

<style>
  .info-card__action {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    margin-top: 1rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  .info-card__action:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }
  
  .info-card__action-icon {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;
  }
  
  .info-card__action:hover .info-card__action-icon {
    transform: translateX(2px);
  }
</style>
```

This simple text-based component example provides a solid foundation for understanding theme implementation principles while maintaining accessibility and performance best practices.
