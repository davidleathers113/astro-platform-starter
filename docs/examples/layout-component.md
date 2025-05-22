# Layout Component Example - Responsive Content Layout

This example demonstrates how to create a complex layout component that adapts to different screen sizes while maintaining proper theming across all breakpoints. Layout components are critical because they provide the structural foundation for pages and must handle theme transitions smoothly without causing layout shifts.

## Component Requirements

- Responsive design that adapts to mobile, tablet, and desktop
- Support for different layout variants (sidebar, centered, full-width)
- Handle header, sidebar, main content, and footer areas
- Maintain proper spacing and proportions across themes
- Support theme-aware backgrounds, borders, and shadows
- Ensure accessibility with proper landmark roles

## Complete Implementation

### Component Code (ResponsiveLayout.astro)

```astro
---
// Responsive layout component with comprehensive theming
interface Props {
  title: string;
  variant?: 'sidebar' | 'centered' | 'full-width';
  sidebarPosition?: 'left' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  headerContent?: any;
  sidebarContent?: any;
  footerContent?: any;
  className?: string;
}

const {
  title,
  variant = 'centered',
  sidebarPosition = 'left',
  maxWidth = 'lg',
  showHeader = true,
  showFooter = true,
  showSidebar = false,
  className = ''
} = Astro.props;

const layoutClass = `responsive-layout responsive-layout--${variant}`;
const containerClass = `responsive-layout__container responsive-layout__container--${maxWidth}`;
const sidebarPositionClass = showSidebar ? `responsive-layout--sidebar-${sidebarPosition}` : '';
const classes = `${layoutClass} ${sidebarPositionClass} ${className}`.trim();
---

<div class={classes}>
  <!-- Skip Navigation Link for Accessibility -->
  <a href="#main-content" class="responsive-layout__skip-link">
    Skip to main content
  </a>

  <!-- Header Section -->
  {showHeader && (
    <header class="responsive-layout__header" role="banner">
      <div class={containerClass}>
        {Astro.slots.headerContent && (
          <slot name="headerContent" />
        ) || (
          <div class="responsive-layout__header-default">
            <h1 class="responsive-layout__title">{title}</h1>
            <nav class="responsive-layout__nav" role="navigation" aria-label="Main navigation">
              <slot name="navigation" />
            </nav>
          </div>
        )}
      </div>
    </header>
  )}

  <!-- Main Layout Container -->
  <div class="responsive-layout__body">
    <div class={containerClass}>
      <div class="responsive-layout__content-wrapper">

        <!-- Sidebar -->
        {showSidebar && (
          <aside
            class="responsive-layout__sidebar"
            role="complementary"
            aria-label="Sidebar content"
          >
            <div class="responsive-layout__sidebar-content">
              {Astro.slots.sidebarContent && (
                <slot name="sidebarContent" />
              ) || (
                <div class="responsive-layout__sidebar-placeholder">
                  <p>Sidebar content goes here</p>
                </div>
              )}
            </div>
          </aside>
        )}

        <!-- Main Content Area -->
        <main
          class="responsive-layout__main"
          role="main"
          id="main-content"
        >
          <div class="responsive-layout__main-content">
            <slot />
          </div>
        </main>

      </div>
    </div>
  </div>

  <!-- Footer Section -->
  {showFooter && (
    <footer class="responsive-layout__footer" role="contentinfo">
      <div class={containerClass}>
        {Astro.slots.footerContent && (
          <slot name="footerContent" />
        ) || (
          <div class="responsive-layout__footer-default">
            <p class="responsive-layout__footer-text">
              © 2024 Your Company Name. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  )}
</div>

<style>
  /* Base Layout Styles */
  .responsive-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background-page);
    color: var(--color-text-primary);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Skip Link for Accessibility */
  .responsive-layout__skip-link {
    position: absolute;
    top: -100px;
    left: 0;
    z-index: 1000;
    padding: 0.75rem 1rem;
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-decoration: none;
    font-weight: 600;
    border-radius: 0 0 var(--border-radius) 0;
    transition: top 0.2s ease, var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .responsive-layout__skip-link:focus {
    top: 0;
  }

  /* Container Sizing */
  .responsive-layout__container {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .responsive-layout__container--sm {
    max-width: 640px;
  }

  .responsive-layout__container--md {
    max-width: 768px;
  }

  .responsive-layout__container--lg {
    max-width: 1024px;
  }

  .responsive-layout__container--xl {
    max-width: 1280px;
  }

  .responsive-layout__container--full {
    max-width: none;
  }

  /* Header Styles */
  .responsive-layout__header {
    background-color: var(--color-background-surface);
    border-bottom: 1px solid var(--color-border-default);
    box-shadow: 0 2px 4px var(--color-shadow-light);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .responsive-layout__header-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    min-height: 4rem;
    gap: 1rem;
  }

  .responsive-layout__title {
    color: var(--color-text-primary);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .responsive-layout__nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  /* Body and Content Wrapper */
  .responsive-layout__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .responsive-layout__content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
    padding: 2rem 0;
  }

  /* Main Content Area */
  .responsive-layout__main {
    flex: 1;
    order: 2;
  }

  .responsive-layout__main-content {
    background-color: var(--color-background-surface);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-subtle);
    box-shadow: 0 2px 8px var(--color-shadow-light);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Sidebar Styles */
  .responsive-layout__sidebar {
    order: 1;
    flex-shrink: 0;
  }

  .responsive-layout__sidebar-content {
    background-color: var(--color-background-tertiary);
    padding: 1.5rem;
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border-subtle);
    box-shadow: 0 2px 4px var(--color-shadow-light);
    height: fit-content;
    position: sticky;
    top: calc(4rem + 2rem); /* Header height + padding */
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .responsive-layout__sidebar-placeholder p {
    color: var(--color-text-secondary);
    margin: 0;
    font-style: italic;
  }

  /* Footer Styles */
  .responsive-layout__footer {
    background-color: var(--color-background-surface);
    border-top: 1px solid var(--color-border-default);
    margin-top: auto;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .responsive-layout__footer-default {
    padding: 2rem 0;
    text-align: center;
  }

  .responsive-layout__footer-text {
    color: var(--color-text-secondary);
    margin: 0;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  /* Responsive Breakpoints */

  /* Tablet and larger */
  @media (min-width: 768px) {
    .responsive-layout__container {
      padding: 0 2rem;
    }

    .responsive-layout__content-wrapper {
      gap: 3rem;
      padding: 3rem 0;
    }

    .responsive-layout__main-content {
      padding: 3rem;
    }

    .responsive-layout__sidebar-content {
      padding: 2rem;
    }
  }

  /* Desktop and larger */
  @media (min-width: 1024px) {
    .responsive-layout__content-wrapper {
      flex-direction: row;
      align-items: flex-start;
    }

    .responsive-layout__main {
      order: unset;
    }

    .responsive-layout__sidebar {
      order: unset;
      width: 280px;
      flex-shrink: 0;
    }

    /* Sidebar positioning */
    .responsive-layout--sidebar-right .responsive-layout__sidebar {
      order: 2;
    }

    .responsive-layout--sidebar-right .responsive-layout__main {
      order: 1;
    }
  }

  /* Layout Variants */

  /* Centered Layout */
  .responsive-layout--centered .responsive-layout__main-content {
    max-width: none;
  }

  /* Sidebar Layout */
  .responsive-layout--sidebar .responsive-layout__content-wrapper {
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    .responsive-layout--sidebar .responsive-layout__content-wrapper {
      gap: 3rem;
    }
  }

  /* Full Width Layout */
  .responsive-layout--full-width .responsive-layout__container {
    max-width: none;
    padding: 0;
  }

  .responsive-layout--full-width .responsive-layout__main-content {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .responsive-layout--full-width .responsive-layout__header {
    border-radius: 0;
  }

  /* Dark Mode Enhancements */
  .dark .responsive-layout__header {
    box-shadow: 0 2px 8px var(--color-shadow-dark);
  }

  .dark .responsive-layout__main-content {
    box-shadow: 0 4px 12px var(--color-shadow-dark);
  }

  .dark .responsive-layout__sidebar-content {
    box-shadow: 0 2px 8px var(--color-shadow-dark);
  }

  /* Print Styles */
  @media print {
    .responsive-layout__skip-link,
    .responsive-layout__header,
    .responsive-layout__sidebar,
    .responsive-layout__footer {
      display: none;
    }

    .responsive-layout__main-content {
      box-shadow: none;
      border: none;
      padding: 0;
    }

    .responsive-layout {
      background: white;
      color: black;
    }
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    .responsive-layout,
    .responsive-layout__skip-link,
    .responsive-layout__header,
    .responsive-layout__main-content,
    .responsive-layout__sidebar-content,
    .responsive-layout__footer,
    .responsive-layout__title,
    .responsive-layout__footer-text {
      transition: none;
    }
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    .responsive-layout__header,
    .responsive-layout__main-content,
    .responsive-layout__sidebar-content,
    .responsive-layout__footer {
      border-width: 2px;
    }
  }
</style>
```

## Usage Examples

### Basic Centered Layout

```astro
---
import ResponsiveLayout from '../components/ResponsiveLayout.astro';
---

<ResponsiveLayout title="My Page" variant="centered">
  <h1>Welcome to My Site</h1>
  <p>This is the main content area.</p>
</ResponsiveLayout>
```

### Layout with Sidebar

```astro
<ResponsiveLayout
  title="Documentation"
  variant="sidebar"
  showSidebar={true}
  sidebarPosition="left"
  maxWidth="xl"
>
  <!-- Sidebar Content -->
  <nav slot="sidebarContent">
    <ul class="space-y-2">
      <li><a href="/docs/getting-started">Getting Started</a></li>
      <li><a href="/docs/components">Components</a></li>
      <li><a href="/docs/theming">Theming</a></li>
    </ul>
  </nav>

  <!-- Main Content -->
  <article>
    <h1>Documentation</h1>
    <p>Comprehensive guide to using our component library.</p>
  </article>
</ResponsiveLayout>
```

### Full Width Layout with Custom Header

```astro
<ResponsiveLayout
  title="Dashboard"
  variant="full-width"
  maxWidth="full"
>
  <!-- Custom Header -->
  <div slot="headerContent">
    <div class="flex items-center justify-between py-4">
      <div class="flex items-center gap-4">
        <img src="/logo.svg" alt="Logo" class="h-8 w-8" />
        <h1 class="text-xl font-bold">Dashboard</h1>
      </div>
      <div class="flex items-center gap-4">
        <button class="btn btn--secondary">Settings</button>
        <button class="btn btn--primary">Profile</button>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card">
      <h2>Metric 1</h2>
      <p class="text-2xl font-bold">1,234</p>
    </div>
    <div class="card">
      <h2>Metric 2</h2>
      <p class="text-2xl font-bold">5,678</p>
    </div>
    <div class="card">
      <h2>Metric 3</h2>
      <p class="text-2xl font-bold">9,012</p>
    </div>
  </div>

  <!-- Custom Footer -->
  <div slot="footerContent">
    <div class="py-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          © 2024 Your Company. All rights reserved.
        </p>
        <div class="flex gap-4">
          <a href="/privacy" class="text-sm hover:underline">Privacy</a>
          <a href="/terms" class="text-sm hover:underline">Terms</a>
          <a href="/contact" class="text-sm hover:underline">Contact</a>
        </div>
      </div>
    </div>
  </div>
</ResponsiveLayout>
```

### Right Sidebar Layout

```astro
<ResponsiveLayout
  title="Blog Post"
  variant="sidebar"
  showSidebar={true}
  sidebarPosition="right"
>
  <!-- Main Article Content -->
  <article class="prose prose-lg dark:prose-invert">
    <h1>Understanding Theme Implementation</h1>
    <p class="lead">A comprehensive guide to building theme-aware components...</p>
    <!-- Article content -->
  </article>

  <!-- Right Sidebar -->
  <aside slot="sidebarContent">
    <div class="space-y-6">
      <div>
        <h3 class="font-semibold mb-3">Table of Contents</h3>
        <nav class="space-y-2">
          <a href="#introduction" class="block text-sm hover:underline">Introduction</a>
          <a href="#implementation" class="block text-sm hover:underline">Implementation</a>
          <a href="#best-practices" class="block text-sm hover:underline">Best Practices</a>
        </nav>
      </div>
      <div>
        <h3 class="font-semibold mb-3">Related Articles</h3>
        <div class="space-y-3">
          <a href="/blog/css-variables" class="block p-3 rounded border hover:bg-gray-50 dark:hover:bg-gray-800">
            <h4 class="font-medium">CSS Variables Deep Dive</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">Learn advanced CSS variable techniques...</p>
          </a>
        </div>
      </div>
    </div>
  </aside>
</ResponsiveLayout>
```

## Layout Patterns and Variations

### Admin Dashboard Layout

```astro
<ResponsiveLayout
  title="Admin Dashboard"
  variant="sidebar"
  showSidebar={true}
  sidebarPosition="left"
  maxWidth="full"
>
  <!-- Admin Navigation -->
  <nav slot="sidebarContent" class="admin-nav">
    <div class="space-y-1">
      <a href="/admin/dashboard" class="nav-item nav-item--active">
        <svg class="nav-icon"><!-- Dashboard icon --></svg>
        Dashboard
      </a>
      <a href="/admin/users" class="nav-item">
        <svg class="nav-icon"><!-- Users icon --></svg>
        Users
      </a>
      <a href="/admin/settings" class="nav-item">
        <svg class="nav-icon"><!-- Settings icon --></svg>
        Settings
      </a>
    </div>
  </nav>

  <!-- Main Dashboard Content -->
  <div class="dashboard-grid">
    <!-- Dashboard widgets and content -->
  </div>
</ResponsiveLayout>

<style>
  .admin-nav {
    padding: 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    color: var(--color-text-secondary);
    text-decoration: none;
    border-radius: var(--border-radius);
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }

  .nav-item:hover {
    background-color: var(--color-background-hover);
    color: var(--color-text-primary);
  }

  .nav-item--active {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }

  .nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
</style>
```

## Accessibility Features

### Landmark Roles

- `banner` for header
- `main` for primary content
- `complementary` for sidebar
- `contentinfo` for footer
- `navigation` for nav elements

### Keyboard Navigation

- Skip link allows users to bypass navigation
- Focus management for interactive elements
- Proper tab order through content areas

### Screen Reader Support

- Semantic HTML structure
- Descriptive aria-labels for regions
- Proper heading hierarchy

### ARIA Enhancements

```astro
<aside
  class="responsive-layout__sidebar"
  role="complementary"
  aria-label="Page navigation and related content"
  aria-describedby="sidebar-description"
>
  <div id="sidebar-description" class="sr-only">
    Additional navigation and supplementary information for this page.
  </div>
  <slot name="sidebarContent" />
</aside>
```

## Performance Considerations

### CSS Optimization

- Uses CSS Grid and Flexbox for efficient layouts
- Minimal reflows during theme transitions
- Efficient use of CSS custom properties

### Responsive Strategy

- Mobile-first approach with progressive enhancement
- Efficient media queries that minimize recalculation
- Sticky positioning for headers and sidebars

### Memory Management

- No JavaScript dependencies for core functionality
- Efficient CSS selectors
- Minimal DOM complexity

## Theme Variations

### Light Theme Characteristics

- **Page Background**: Clean white or very light gray
- **Surface Background**: Pure white with subtle shadows
- **Borders**: Light gray for subtle definition
- **Text Hierarchy**: Strong contrast between primary and secondary text

### Dark Theme Characteristics

- **Page Background**: Deep dark blue or black
- **Surface Background**: Elevated dark surfaces with stronger shadows
- **Borders**: Medium gray for definition against dark backgrounds
- **Text Hierarchy**: High contrast white and light gray text

### Theme Transition Behavior

- Smooth transitions for all color properties
- Background images and patterns that work in both themes
- Shadow adjustments that maintain depth perception
- Border visibility that works across theme changes

## Testing Checklist

```checklist
☐ Layout renders correctly on mobile devices (320px+)
☐ Layout adapts properly on tablets (768px+)
☐ Layout works correctly on desktop (1024px+)
☐ Sidebar positioning works for both left and right
☐ Sticky header behavior works correctly
☐ Skip link appears and functions when focused
☐ All layout variants (centered, sidebar, full-width) work
☐ Theme transitions are smooth without layout shifts
☐ All text meets contrast requirements in both themes
☐ Borders and shadows are visible in both themes
☐ Print styles hide non-essential elements
☐ Reduced motion preferences are respected
☐ High contrast mode enhances visibility
☐ Keyboard navigation works through all areas
☐ Screen readers announce layout regions correctly
☐ Focus management works properly
☐ No horizontal scrolling on small screens
☐ Content remains accessible when sidebar is hidden
☐ Footer stays at bottom with short content
☐ Header remains sticky during scroll
```

## Advanced Layout Patterns

### Two-Column Content Layout

```astro
<ResponsiveLayout title="Two Column Article">
  <div class="two-column-layout">
    <div class="column-primary">
      <h1>Main Article Content</h1>
      <p>Primary content goes here...</p>
    </div>
    <div class="column-secondary">
      <h2>Related Information</h2>
      <p>Supporting content...</p>
    </div>
  </div>
</ResponsiveLayout>

<style>
  .two-column-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .two-column-layout {
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }
  }

  .column-primary,
  .column-secondary {
    min-width: 0; /* Prevent grid overflow */
  }
</style>
```

### Masonry-Style Card Layout

```astro
<ResponsiveLayout title="Portfolio" variant="full-width">
  <div class="masonry-grid">
    <!-- Card items with varying heights -->
    <div class="masonry-item">
      <img src="/project1.jpg" alt="Project 1" />
      <h3>Project Title</h3>
      <p>Project description...</p>
    </div>
    <!-- More items -->
  </div>
</ResponsiveLayout>

<style>
  .masonry-grid {
    columns: 1;
    column-gap: 2rem;
  }

  @media (min-width: 640px) {
    .masonry-grid {
      columns: 2;
    }
  }

  @media (min-width: 1024px) {
    .masonry-grid {
      columns: 3;
    }
  }

  .masonry-item {
    break-inside: avoid;
    margin-bottom: 2rem;
    background-color: var(--color-background-surface);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    border: 1px solid var(--color-border-subtle);
  }
</style>
```

This layout component example demonstrates comprehensive theme implementation including responsive design, accessibility features, multiple layout variants, and smooth theme transitions while maintaining semantic HTML structure and optimal performance.
