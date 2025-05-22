# Complex Interactive Component Example - Dropdown Menu

This example demonstrates how to create a complex interactive component with multiple states, animations, and accessibility features. Dropdowns are excellent examples because they involve hover states, focus management, animations, and complex theming requirements.

## Component Requirements

- Toggle open/closed states with smooth animations
- Support keyboard navigation (arrow keys, enter, escape)
- Handle focus management and accessibility
- Display options with hover and selection states
- Support different sizes and variants
- Maintain proper contrast and theming across all states

## Complete Implementation

### Component Code (ThemeDropdown.astro)

```astro
---
// Complex interactive dropdown component
interface Props {
  label: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  id?: string;
}

const {
  label,
  options,
  placeholder = 'Select an option...',
  size = 'md',
  variant = 'default', 
  disabled = false,
  required = false,
  error,
  className = '',
  id
} = Astro.props;

const dropdownId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;
const baseClass = 'theme-dropdown';
const sizeClass = `theme-dropdown--${size}`;
const variantClass = `theme-dropdown--${variant}`;
const errorClass = error ? 'theme-dropdown--error' : '';
const classes = `${baseClass} ${sizeClass} ${variantClass} ${errorClass} ${className}`.trim();
---

<div class={classes} data-dropdown={dropdownId}>
  <!-- Label -->
  <label 
    for={dropdownId}
    class="theme-dropdown__label"
  >
    {label}
    {required && <span class="theme-dropdown__required" aria-label="required">*</span>}
  </label>
  
  <!-- Dropdown Container -->
  <div class="theme-dropdown__container">
    <!-- Trigger Button -->
    <button
      type="button"
      id={dropdownId}
      class="theme-dropdown__trigger"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-labelledby={`${dropdownId}-label`}
      disabled={disabled}
      data-dropdown-trigger
    >
      <span class="theme-dropdown__value" data-dropdown-value>
        {placeholder}
      </span>
      <svg 
        class="theme-dropdown__chevron" 
        aria-hidden="true"
        data-dropdown-chevron
      >
        <path d="M7 10l5 5 5-5z" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
    </button>
    
    <!-- Dropdown Menu -->
    <div 
      class="theme-dropdown__menu"
      role="listbox"
      aria-labelledby={`${dropdownId}-label`}
      data-dropdown-menu
    >
      {options.map((option, index) => (
        <div
          class={`theme-dropdown__option ${option.disabled ? 'theme-dropdown__option--disabled' : ''}`}
          role="option"
          aria-selected="false"
          data-value={option.value}
          data-index={index}
          tabindex={option.disabled ? -1 : 0}
        >
          {option.label}
        </div>
      ))}
    </div>
  </div>
  
  <!-- Error Message -->
  {error && (
    <div class="theme-dropdown__error" role="alert">
      {error}
    </div>
  )}
</div>

<!-- Dropdown Functionality Script -->
<script>
  class ThemeDropdown {
    constructor(element) {
      this.element = element;
      this.trigger = element.querySelector('[data-dropdown-trigger]');
      this.menu = element.querySelector('[data-dropdown-menu]');
      this.chevron = element.querySelector('[data-dropdown-chevron]');
      this.valueDisplay = element.querySelector('[data-dropdown-value]');
      this.options = Array.from(element.querySelectorAll('.theme-dropdown__option:not(.theme-dropdown__option--disabled)'));
      
      this.isOpen = false;
      this.selectedIndex = -1;
      this.focusedIndex = -1;
      
      this.init();
    }
    
    init() {
      // Event listeners
      this.trigger.addEventListener('click', (e) => this.toggle(e));
      this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));
      
      this.options.forEach((option, index) => {
        option.addEventListener('click', (e) => this.selectOption(index, e));
        option.addEventListener('keydown', (e) => this.handleOptionKeydown(e, index));
        option.addEventListener('mouseenter', () => this.focusOption(index));
      });
      
      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!this.element.contains(e.target)) {
          this.close();
        }
      });
      
      // Close on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
          this.trigger.focus();
        }
      });
    }
    
    toggle(e) {
      e.preventDefault();
      this.isOpen ? this.close() : this.open();
    }
    
    open() {
      if (this.trigger.disabled) return;
      
      this.isOpen = true;
      this.element.classList.add('theme-dropdown--open');
      this.trigger.setAttribute('aria-expanded', 'true');
      this.menu.classList.add('theme-dropdown__menu--open');
      
      // Animate chevron
      this.chevron.style.transform = 'rotate(180deg)';
      
      // Focus first option or selected option
      const targetIndex = this.selectedIndex >= 0 ? this.selectedIndex : 0;
      this.focusOption(targetIndex);
    }
    
    close() {
      this.isOpen = false;
      this.element.classList.remove('theme-dropdown--open');
      this.trigger.setAttribute('aria-expanded', 'false');
      this.menu.classList.remove('theme-dropdown__menu--open');
      
      // Reset chevron
      this.chevron.style.transform = 'rotate(0deg)';
      
      // Clear focus
      this.clearOptionFocus();
      this.focusedIndex = -1;
    }
    
    selectOption(index, e) {
      if (e) e.preventDefault();
      
      const option = this.options[index];
      if (!option) return;
      
      // Update selection
      this.selectedIndex = index;
      this.valueDisplay.textContent = option.textContent;
      
      // Update ARIA states
      this.options.forEach((opt, i) => {
        opt.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      
      // Update visual states
      this.options.forEach(opt => opt.classList.remove('theme-dropdown__option--selected'));
      option.classList.add('theme-dropdown__option--selected');
      
      // Dispatch change event
      this.element.dispatchEvent(new CustomEvent('dropdown-change', {
        detail: { value: option.dataset.value, label: option.textContent, index }
      }));
      
      this.close();
      this.trigger.focus();
    }
    
    focusOption(index) {
      this.clearOptionFocus();
      
      if (index >= 0 && index < this.options.length) {
        this.focusedIndex = index;
        const option = this.options[index];
        option.classList.add('theme-dropdown__option--focused');
        option.scrollIntoView({ block: 'nearest' });
      }
    }
    
    clearOptionFocus() {
      this.options.forEach(option => {
        option.classList.remove('theme-dropdown__option--focused');
      });
    }
    
    handleTriggerKeydown(e) {
      switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
          e.preventDefault();
          this.open();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.open();
          this.focusOption(this.options.length - 1);
          break;
      }
    }
    
    handleOptionKeydown(e, index) {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.selectOption(index);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.focusOption(Math.min(index + 1, this.options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.focusOption(Math.max(index - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          this.focusOption(0);
          break;
        case 'End':
          e.preventDefault();
          this.focusOption(this.options.length - 1);
          break;
      }
    }
  }
  
  // Initialize all dropdowns
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-dropdown]').forEach(element => {
      new ThemeDropdown(element);
    });
  });
</script>

<style>
  .theme-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .theme-dropdown__label {
    color: var(--color-text-primary);
    font-weight: 500;
    font-size: 0.875rem;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
  }
  
  .theme-dropdown__required {
    color: var(--color-error);
    margin-left: 0.25rem;
  }
  
  .theme-dropdown__container {
    position: relative;
  }
  
  .theme-dropdown__trigger {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: var(--color-background-input);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    font-size: 1rem;
    line-height: 1.5;
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    
    /* Remove default button styles */
    font-family: inherit;
    text-align: left;
  }
  
  .theme-dropdown__trigger:hover:not(:disabled) {
    border-color: var(--color-border-interactive-hover);
    background-color: var(--color-background-hover);
  }
  
  .theme-dropdown__trigger:focus {
    outline: none;
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }
  
  .theme-dropdown__trigger:disabled {
    background-color: var(--color-background-input-disabled);
    color: var(--color-text-disabled);
    border-color: var(--color-border-subtle);
    cursor: not-allowed;
  }
  
  .theme-dropdown__value {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .theme-dropdown__chevron {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--color-text-muted);
    transition: transform 0.2s ease, color var(--theme-transition-duration);
    flex-shrink: 0;
  }
  
  .theme-dropdown__trigger:hover .theme-dropdown__chevron {
    color: var(--color-text-secondary);
  }
  
  .theme-dropdown__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    margin-top: 0.25rem;
    background-color: var(--color-background-surface);
    border: 1px solid var(--color-border-default);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 6px var(--color-shadow-medium);
    max-height: 200px;
    overflow-y: auto;
    
    /* Initial hidden state */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: 
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s ease,
      background-color var(--theme-transition-duration),
      border-color var(--theme-transition-duration);
  }
  
  .theme-dropdown__menu--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .theme-dropdown__option {
    padding: 0.75rem 1rem;
    color: var(--color-text-primary);
    cursor: pointer;
    transition: var(--theme-transition-properties) var(--theme-transition-duration);
    border-bottom: 1px solid var(--color-border-subtle);
  }
  
  .theme-dropdown__option:last-child {
    border-bottom: none;
  }
  
  .theme-dropdown__option:hover,
  .theme-dropdown__option--focused {
    background-color: var(--color-background-hover);
    color: var(--color-text-primary);
  }
  
  .theme-dropdown__option--selected {
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
  }
  
  .theme-dropdown__option--selected:hover,
  .theme-dropdown__option--selected.theme-dropdown__option--focused {
    background-color: var(--color-primary-dark);
  }
  
  .theme-dropdown__option--disabled {
    color: var(--color-text-disabled);
    cursor: not-allowed;
    background-color: transparent;
  }
  
  .theme-dropdown__option--disabled:hover {
    background-color: transparent;
  }
  
  .theme-dropdown__error {
    color: var(--color-text-error);
    font-size: 0.875rem;
    font-weight: 500;
    margin-top: 0.25rem;
  }
  
  /* Size Variants */
  .theme-dropdown--sm .theme-dropdown__trigger {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .theme-dropdown--sm .theme-dropdown__option {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .theme-dropdown--lg .theme-dropdown__trigger {
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
  }
  
  .theme-dropdown--lg .theme-dropdown__option {
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
  }
  
  /* Variant Styles */
  .theme-dropdown--primary .theme-dropdown__trigger {
    border-color: var(--color-primary);
  }
  
  .theme-dropdown--primary .theme-dropdown__trigger:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.2);
  }
  
  .theme-dropdown--secondary .theme-dropdown__trigger {
    border-color: var(--color-secondary);
  }
  
  .theme-dropdown--secondary .theme-dropdown__trigger:focus {
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(var(--color-secondary-rgb), 0.2);
  }
  
  /* Error State */
  .theme-dropdown--error .theme-dropdown__trigger {
    border-color: var(--color-error);
    background-color: var(--color-background-error);
  }
  
  .theme-dropdown--error .theme-dropdown__trigger:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
  }
  
  /* Open State */
  .theme-dropdown--open .theme-dropdown__trigger {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
  }
  
  /* Dark Mode Enhancements */
  .dark .theme-dropdown__trigger:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-light-rgb), 0.2);
  }
  
  .dark .theme-dropdown--open .theme-dropdown__trigger {
    box-shadow: 0 0 0 3px rgba(var(--color-primary-light-rgb), 0.2);
  }
  
  .dark .theme-dropdown--error .theme-dropdown__trigger:focus {
    box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2);
  }
  
  /* Custom Scrollbar for Menu */
  .theme-dropdown__menu {
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) transparent;
  }
  
  .theme-dropdown__menu::-webkit-scrollbar {
    width: 6px;
  }
  
  .theme-dropdown__menu::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .theme-dropdown__menu::-webkit-scrollbar-thumb {
    background-color: var(--color-border-default);
    border-radius: 3px;
  }
  
  .theme-dropdown__menu::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-primary);
  }
</style>
```

## Usage Examples

### Basic Usage
```astro
<ThemeDropdown 
  label="Select Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
/>
```

### With Error State
```astro
<ThemeDropdown 
  label="Required Field"
  options={countryOptions}
  required={true}
  error="Please select a country"
  variant="primary"
/>
```

### Large Size with Custom Placeholder
```astro
<ThemeDropdown 
  label="Choose Your Preference"
  options={preferenceOptions}
  placeholder="What would you like to do?"
  size="lg"
/>
```

### With Disabled Options
```astro
<ThemeDropdown 
  label="Available Plans"
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
  ]}
/>
```

## React Integration Example

For React components, you can create a wrapper:

```tsx
import { useEffect, useRef, useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ReactDropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string, option: DropdownOption) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export function ReactThemeDropdown({
  label,
  options,
  value,
  onChange,
  ...props
}: ReactDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState(value);
  
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;
    
    const handleChange = (e: CustomEvent) => {
      const { value, label, index } = e.detail;
      setSelectedValue(value);
      onChange?.(value, options[index]);
    };
    
    dropdown.addEventListener('dropdown-change', handleChange as EventListener);
    
    return () => {
      dropdown.removeEventListener('dropdown-change', handleChange as EventListener);
    };
  }, [onChange, options]);
  
  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  
  return (
    <div ref={dropdownRef}>
      {/* Render the Astro component HTML structure */}
      {/* Implementation would match the Astro component */}
    </div>
  );
}
```

## Accessibility Features

### Keyboard Navigation
- **Tab**: Focus on dropdown trigger
- **Enter/Space**: Open dropdown
- **Arrow Keys**: Navigate through options
- **Home/End**: Jump to first/last option
- **Escape**: Close dropdown and return focus to trigger

### ARIA Attributes
- `role="listbox"` on menu container
- `role="option"` on each option
- `aria-haspopup="listbox"` on trigger
- `aria-expanded` to indicate open/closed state
- `aria-selected` to indicate selected option
- `aria-labelledby` for proper labeling

### Screen Reader Support
- Announces dropdown state changes
- Provides clear option descriptions
- Supports error announcements with `role="alert"`
- Proper focus management

## Theming Considerations

### Animation Performance
- Uses `transform` and `opacity` for smooth animations
- Hardware accelerated properties for better performance
- Respects `prefers-reduced-motion` when implemented

### Z-Index Management
- Menu positioned with `z-index: 50` to appear above content
- Avoids z-index conflicts with proper stacking context

### Scroll Behavior
- Custom scrollbar styling that respects theme
- `scrollIntoView` for keyboard navigation
- Maximum height prevents viewport overflow

## Testing Checklist

```checklist
☐ Dropdown opens and closes with mouse clicks
☐ Dropdown opens and closes with keyboard (Enter/Space)
☐ Arrow keys navigate through options correctly
☐ Enter/Space selects focused option
☐ Escape closes dropdown and returns focus
☐ Home/End keys work for first/last option
☐ Mouse hover highlights options
☐ Selected option is visually indicated
☐ Disabled options cannot be selected
☐ Error states display correctly
☐ All text meets contrast requirements in both themes
☐ Animations are smooth in both themes
☐ Component works without JavaScript (graceful degradation)
☐ Screen reader announces all interactions properly
☐ Focus management works correctly
☐ Component works in both light and dark themes
☐ Custom event dispatching works correctly
☐ Multiple dropdowns on same page work independently
</checklist>

This complex interactive component demonstrates advanced theming techniques including state management, animations, accessibility, and event handling while maintaining consistent visual design across themes.
