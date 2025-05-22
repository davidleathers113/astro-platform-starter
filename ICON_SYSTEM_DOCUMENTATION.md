# Icon System Documentation - Astro Platform Starter

## Overview

The Astro Platform Starter features a comprehensive, theme-aware icon system that automatically adapts to both light and dark themes. All icons use `currentColor` to inherit text colors from their parent containers, ensuring perfect theme compatibility.

## Icon Component Structure

All icon components follow a consistent structure located in `/src/components/icons/`:

### Standard Props Interface
```typescript
interface Props {
    class?: string;    // CSS classes for styling
    width?: string;    // Icon width (default varies by icon)
    height?: string;   // Icon height (default varies by icon)
}
```

### Implementation Pattern
```astro
---
const { class: className = "", width = "24", height = "24" } = Astro.props;
---

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width={width} 
  height={height} 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  class={className}
>
  <!-- SVG paths -->
</svg>
```

## Icon Categories

### UI/Navigation Icons
- **CheckIcon** - Checkmark/success indicator
- **XIcon** - Close/cancel action
- **ChevronDownIcon** - Dropdown indicator
- **ChevronRightIcon** - Forward navigation
- **HamburgerIcon** - Mobile menu toggle
- **InfoIcon** - Information indicator

### Financial/Business Icons
- **DollarIcon** - Currency/money symbol
- **CreditCardIcon** - Payment method
- **CreditCardAltIcon** - Alternative payment icon
- **LockIcon** - Security/privacy
- **CheckCircleIcon** - Verified/approved status
- **ShieldIcon** - Protection/security

### Communication Icons
- **EmailIcon** - Email contact
- **PhoneIcon** - Phone contact
- **ModernPhoneIcon** - Modern phone design
- **LocationIcon** - Address/location

### Social Media Icons
- **FacebookIcon** - Facebook social link
- **TwitterIcon** - Twitter social link
- **LinkedInIcon** - LinkedIn social link
- **InstagramIcon** - Instagram social link

### Theme System Icons
- **SunIcon** - Light theme toggle
- **MoonIcon** - Dark theme toggle
- **SystemIcon** - System theme option

### Utility Icons
- **ClockIcon** - Time/schedule
- **PlayIcon** - Video/media play
- **UsersIcon** - People/team
- **StarIcon** - Rating/favorite
- **QuoteIcon** - Testimonial/quote
- **ModernQuoteIcon** - Modern quote design

### Decorative Elements
- **BlobShape1** - Organic background shape
- **BlobShape2** - Alternative background shape
- **DotsPattern** - Dot pattern background

### Trust/Brand Elements
- **TrustLogo1** - Trust indicator badge
- **TrustLogo2** - Alternative trust badge
- **TrustLogo3** - Third trust indicator
- **TrustLogo4** - Fourth trust indicator

## Usage Guidelines

### Basic Usage
```astro
---
import CheckIcon from '../components/icons/CheckIcon.astro';
---

<CheckIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
```

### Theme-Aware Styling
Icons automatically inherit color from text color classes:

```astro
<!-- Light/dark theme text colors -->
<div class="text-gray-900 dark:text-white">
  <CheckIcon class="w-5 h-5" />
</div>

<!-- Brand colors -->
<div class="text-[#2d7984] dark:text-[#58cbe0]">
  <StarIcon class="w-6 h-6" />
</div>

<!-- Status colors -->
<div class="text-green-600 dark:text-green-400">
  <CheckCircleIcon class="w-4 h-4" />
</div>
```

### Icon Buttons
For buttons containing icons, use theme-aware classes on the button:

```astro
<button class="text-gray-900 dark:text-gray-100 hover:text-[#2d7984] dark:hover:text-[#58cbe0]">
  <XIcon class="w-5 h-5" />
</button>
```

## Theme Compatibility Features

### Automatic Color Inheritance
- All icons use `stroke="currentColor"` or `fill="currentColor"`
- Icons inherit text color from parent containers
- No hardcoded colors that break in dark mode

### Recommended Color Patterns
- **Text content**: `text-gray-900 dark:text-white` (headings), `text-gray-600 dark:text-gray-300` (body)
- **Interactive elements**: `text-gray-700 dark:text-gray-300` with hover states
- **Brand colors**: `text-[#2d7984] dark:text-[#58cbe0]`
- **Status indicators**: `text-green-600 dark:text-green-400`, `text-red-600 dark:text-red-400`

## Accessibility Standards

### Icon Button Implementation
```astro
<button 
  aria-label="Close dialog"
  class="p-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
>
  <XIcon class="w-5 h-5" />
</button>
```

### Screen Reader Support
For decorative icons, use `aria-hidden="true"`:
```astro
<BlobShape1 class="absolute opacity-10" aria-hidden="true" />
```

## Advanced Usage

### Decorative Elements with Opacity
```astro
<DotsPattern class="text-primary/40" patternId="unique-dots-1" />
```

### Responsive Icon Sizes
```astro
<CheckIcon class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
```

### Animated Icons (with reduced motion support)
```astro
<style>
  .rotate-icon {
    transition: transform 0.3s ease;
  }
  
  .rotate-icon:hover {
    transform: rotate(15deg);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .rotate-icon,
    .rotate-icon:hover {
      transition: none;
      transform: none;
    }
  }
</style>

<SunIcon class="w-5 h-5 rotate-icon" />
```

## Performance Considerations

### Optimized Implementation
- Icons are implemented as Astro components for optimal bundling
- SVGs are inlined for fast rendering
- No external icon library dependencies
- Minimal CSS overhead with `currentColor`

### Build Optimization
- All icons are tree-shakeable
- Only imported icons are included in the bundle
- SVG optimization through Astro's processing

## Contrast Testing Results

### WCAG AA Compliance
All icon implementations have been tested for contrast compliance:
- **Text icons**: Inherit contrast from parent text (4.5:1+ ratio)
- **Interactive icons**: Meet 3:1 ratio for UI components
- **Brand icons**: Tested against backgrounds for sufficient contrast

### Browser Compatibility
- Works across all modern browsers
- Graceful fallbacks for older browsers
- High contrast mode support

## Best Practices

### Do's
✅ Use theme-aware text color classes on parent containers  
✅ Test icons in both light and dark themes  
✅ Include proper `aria-label` for icon buttons  
✅ Use consistent sizing patterns (`w-4 h-4`, `w-5 h-5`, `w-6 h-6`)  
✅ Respect `prefers-reduced-motion` for animations  

### Don'ts
❌ Hardcode fill or stroke colors  
❌ Use CSS that overrides `currentColor`  
❌ Forget accessibility attributes for interactive icons  
❌ Mix different icon styles or stroke weights  
❌ Use decorative icons without `aria-hidden="true"`  

## Adding New Icons

### Step 1: Create Component
```astro
---
// /src/components/icons/NewIcon.astro
interface Props {
    class?: string;
    width?: string;
    height?: string;
}

const { class: className = "", width = "24", height = "24" } = Astro.props;
---

<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width={width} 
  height={height} 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  class={className}
>
  <!-- Your SVG paths here -->
</svg>
```

### Step 2: Test Implementation
```astro
---
import NewIcon from '../components/icons/NewIcon.astro';
---

<!-- Test in various theme contexts -->
<div class="text-gray-900 dark:text-white">
  <NewIcon class="w-5 h-5" />
</div>

<div class="text-[#2d7984] dark:text-[#58cbe0]">
  <NewIcon class="w-6 h-6" />
</div>
```

### Step 3: Verify Accessibility
- Ensure proper contrast ratios
- Add appropriate ARIA attributes for interactive use
- Test keyboard navigation if used in buttons

## Conclusion

The Astro Platform Starter icon system provides a robust, accessible, and theme-aware foundation for all iconography needs. The consistent use of `currentColor` and proper component structure ensures seamless theme switching while maintaining excellent performance and accessibility standards.

For questions or contributions to the icon system, please refer to the project's contribution guidelines.
