/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Transition utilities for dark mode
      transitionProperty: {
        'theme': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity',
        'colors': 'color, background-color, border-color',
        'backgrounds': 'background-color, background-image',
        'borders': 'border-color, border-width, border-opacity',
        'shadows': 'box-shadow, text-shadow',
        'layout': 'width, height, margin, padding',
        'all-theme': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke, opacity, transform, filter',
      },
      transitionDuration: {
        '50': '50ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        'theme-fast': '150ms',
        'theme': '250ms',
        'theme-slow': '400ms',
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'theme-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'theme-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'theme-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'bounce-light': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      colors: {
        primary: {
          // Base colors
          DEFAULT: '#2d7984',     // Base primary color
          light: '#58cbe0',       // Light variant
          dark: '#1d5058',        // Dark variant

          // Hover states
          hover: '#266974',       // Base hover state
          lightHover: '#4bbbce',  // Light variant hover
          darkHover: '#15373e',   // Dark variant hover

          // Active states
          active: '#1d5058',      // Base active state
          lightActive: '#3eafc2', // Light variant active
          darkActive: '#102b30',  // Dark variant active

          // Focus states
          focus: '#2d7984',       // Base focus state
          lightFocus: '#58cbe0',  // Light variant focus
          darkFocus: '#1d5058',   // Dark variant focus

          // Disabled states
          disabled: '#a3c5cb',    // Base disabled state
          lightDisabled: '#b8e0ea', // Light variant disabled
          darkDisabled: '#6a8a8f', // Dark variant disabled
          
          // Text on primary backgrounds
          textOnPrimary: '#ffffff',      // Text on base primary
          textOnLight: '#1a2234',        // Text on light variant
          textOnDark: '#ffffff',         // Text on dark variant
        },
        secondary: {
          // Base colors
          DEFAULT: '#0062b3',     // Base secondary color
          light: '#4a94d8',       // Light variant
          dark: '#004b8c',        // Dark variant

          // Hover states
          hover: '#0055a0',       // Base hover state
          lightHover: '#3a85c9',  // Light variant hover
          darkHover: '#003e73',   // Dark variant hover

          // Active states
          active: '#00488c',      // Base active state
          lightActive: '#2a75b9', // Light variant active
          darkActive: '#00315c',  // Dark variant active

          // Focus states
          focus: '#0062b3',       // Base focus state
          lightFocus: '#4a94d8',  // Light variant focus
          darkFocus: '#004b8c',   // Dark variant focus

          // Disabled states
          disabled: '#7da7d1',    // Base disabled state
          lightDisabled: '#9cc0e8', // Light variant disabled
          darkDisabled: '#495d7a', // Dark variant disabled
          
          // Text on secondary backgrounds
          textOnSecondary: '#ffffff',      // Text on base secondary
          textOnLight: '#1a2234',        // Text on light variant
          textOnDark: '#ffffff',         // Text on dark variant
        },
        accent: {
          // Base colors
          DEFAULT: '#58cbe0',     // Base accent color (teal)
          light: '#7fdff2',       // Light variant
          dark: '#3ba6b9',        // Dark variant
          warm: '#F8C88F',        // Warm accent (peach)
          warmLight: '#fbd7ab',   // Light warm variant
          warmDark: '#f6b973',    // Dark warm variant

          // Hover states
          hover: '#42bfd5',       // Base hover state
          lightHover: '#6dd3e7',  // Light variant hover
          darkHover: '#3291a2',   // Dark variant hover
          warmHover: '#f7bd7c',   // Warm variant hover

          // Active states
          active: '#37a4b8',      // Base active state
          lightActive: '#5cc8dc', // Light variant active
          darkActive: '#297c8c',  // Dark variant active
          warmActive: '#f5b269',  // Warm variant active

          // Focus states
          focus: '#58cbe0',       // Base focus state
          lightFocus: '#7fdff2',  // Light variant focus
          darkFocus: '#3ba6b9',   // Dark variant focus
          warmFocus: '#F8C88F',   // Warm variant focus

          // Disabled states
          disabled: '#aadbe5',    // Base disabled state
          lightDisabled: '#c4ecf5', // Light variant disabled
          darkDisabled: '#78a7b0', // Dark variant disabled
          warmDisabled: '#f9dcc0', // Warm variant disabled
          
          // Text on accent backgrounds
          textOnAccent: '#1a2234',      // Text on base accent
          textOnLight: '#1a2234',        // Text on light variant
          textOnDark: '#ffffff',         // Text on dark variant
          textOnWarm: '#1a2234',         // Text on warm variant
          textOnWarmLight: '#1a2234',    // Text on light warm variant
          textOnWarmDark: '#1a2234',     // Text on dark warm variant
        },
        background: {
          // Base background colors
          DEFAULT: '#ffffff',     // Light mode default
          light: '#ffffff',       // Explicit light mode
          dark: '#1a2234',        // Dark mode (dark blue)
          
          // Form backgrounds
          form: {
            DEFAULT: '#F7FAFC',   // Light mode default
            light: '#F7FAFC',     // Light form background (very light gray)
            dark: '#202b3d',      // Dark form background (darker blue)
          },
          
          // Input backgrounds
          input: {
            DEFAULT: '#EDF2F7',   // Light mode default
            light: '#EDF2F7',     // Light input background (light gray)
            dark: '#151d2c',      // Dark input background (darkest blue)
          },
          
          // Surface backgrounds for cards, panels, etc.
          surface: {
            DEFAULT: '#ffffff',   // Light mode default
            light: '#ffffff',     // Light surface (white)
            dark: '#1a2234',      // Dark surface (same as main dark bg)
            elevated: {
              light: '#ffffff',   // Light elevated surface
              dark: '#202b3d',    // Dark elevated surface (slightly lighter)
            }
          },
          
          // Overlay backgrounds
          overlay: {
            light: 'rgba(0, 0, 0, 0.5)',      // Dark overlay for light mode
            dark: 'rgba(0, 0, 0, 0.7)',       // Darker overlay for dark mode
          }
        },
        text: {
          // Primary text colors
          DEFAULT: '#1a2234',     // Light mode default (dark blue-gray)
          light: '#1a2234',       // Explicit light mode text
          dark: '#ffffff',        // Dark mode text (white)
          
          // Muted text colors
          muted: {
            DEFAULT: '#4A5568',   // Light mode default
            light: '#4A5568',     // Light mode muted (medium gray)
            dark: '#b0c0d0',      // Dark mode muted (light blue-gray)
          },
          
          // Secondary text colors
          secondary: {
            DEFAULT: '#718096',   // Light mode default
            light: '#718096',     // Light mode secondary (lighter gray)
            dark: '#a0aec0',      // Dark mode secondary (medium blue-gray)
          },
          
          // Button text colors
          button: {
            DEFAULT: '#ffffff',   // Default button text (white)
            primary: '#ffffff',   // Text on primary buttons
            accent: '#1a2234',    // Text on accent buttons (dark on light)
            outline: {
              light: '#1a2234',   // Text for outline buttons in light mode
              dark: '#ffffff',    // Text for outline buttons in dark mode
            }
          },
          
          // Placeholder text
          placeholder: {
            DEFAULT: '#718096',   // Light mode default
            light: '#718096',     // Light mode placeholder
            dark: '#8896ac',      // Dark mode placeholder (lighter for visibility)
          },
          
          // Inverse text (for use on opposite backgrounds)
          inverse: {
            light: '#ffffff',     // White text for dark backgrounds in light mode
            dark: '#1a2234',      // Dark text for light backgrounds in dark mode
          }
        },
        border: {
          // Base border colors
          DEFAULT: '#E2E8F0',     // Light mode default
          light: '#E2E8F0',       // Light mode border (light gray)
          dark: '#2D3748',        // Dark mode border (dark gray)
          
          // Focus border colors
          focus: {
            DEFAULT: '#2d7984',   // Default focus border (primary color)
            light: '#2d7984',     // Light mode focus
            dark: '#58cbe0',      // Dark mode focus (brighter for visibility)
          },
          
          // Subtle borders
          subtle: {
            light: '#F7FAFC',     // Very light border for light mode
            dark: '#1a2234',      // Subtle border for dark mode
          },
          
          // Error borders
          error: {
            DEFAULT: '#e53e3e',   // Default error border
            light: '#e53e3e',     // Light mode error
            dark: '#fc8181',      // Dark mode error (lighter for visibility)
          }
        },
        complementary: {
          // Complementary/neutral colors
          DEFAULT: '#F7FAFC',     // Light mode default
          light: '#F7FAFC',       // Light complementary (very light gray)
          dark: '#1a2234',        // Dark complementary (same as dark background)
          
          // Alternative complementary colors
          alt: {
            light: '#EDF2F7',     // Alternative light complementary
            dark: '#202b3d',      // Alternative dark complementary
          }
        },
        error: {
          // Error/danger colors
          DEFAULT: '#e53e3e',     // Light mode default
          light: '#e53e3e',       // Light mode error (red)
          dark: '#fc8181',        // Dark mode error (lighter red for visibility)
          
          // Error background colors
          bg: {
            light: '#fed7d7',     // Light error background
            dark: '#2d1b1b',      // Dark error background
          },
          
          // Error text colors
          text: {
            light: '#c53030',     // Light mode error text
            dark: '#feb2b2',      // Dark mode error text
          }
        },
        success: {
          // Success colors
          DEFAULT: '#10b981',     // Base success color
          light: '#10b981',       // Light mode success (green)
          dark: '#68d391',        // Dark mode success (lighter green)
          
          // Success background colors
          bg: {
            light: '#c6f6d5',     // Light success background
            dark: '#1a2e1a',      // Dark success background
          },
          
          // Success text colors
          text: {
            light: '#22543d',     // Light mode success text
            dark: '#9ae6b4',      // Dark mode success text
          }
        },
        warning: {
          // Warning colors
          DEFAULT: '#f59e0b',     // Base warning color
          light: '#f59e0b',       // Light mode warning (amber)
          dark: '#fbbf24',        // Dark mode warning (lighter amber)
          
          // Warning background colors
          bg: {
            light: '#fef3c7',     // Light warning background
            dark: '#2d2412',      // Dark warning background
          },
          
          // Warning text colors
          text: {
            light: '#92400e',     // Light mode warning text
            dark: '#fcd34d',      // Dark mode warning text
          }
        },
        info: {
          // Info colors
          DEFAULT: '#3b82f6',     // Base info color
          light: '#3b82f6',       // Light mode info (blue)
          dark: '#60a5fa',        // Dark mode info (lighter blue)
          
          // Info background colors
          bg: {
            light: '#dbeafe',     // Light info background
            dark: '#1e293b',      // Dark info background
          },
          
          // Info text colors
          text: {
            light: '#1e40af',     // Light mode info text
            dark: '#93c5fd',      // Dark mode info text
          }
        },
      },
      backgroundImage: {
        'noise': 'linear-gradient(to bottom, rgba(250, 250, 255, 0.05), rgba(250, 250, 255, 0.1)), url("/images/noise.png")',
      },
      boxShadow: {
        'cta': '0 20px 45px -10px rgba(0,0,0,.35)',
      }
    },
  },
  plugins: [
    // Dark mode transition plugin
    function({ addBase, addComponents, addUtilities, theme }) {
      // Add base transition styles for theme switching
      addBase({
        // Global transition base styles
        '*': {
          '@media (prefers-reduced-motion: no-preference)': {
            'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
            'transition-duration': theme('transitionDuration.theme'),
            'transition-timing-function': theme('transitionTimingFunction.theme'),
          }
        },
        
        // Respect reduced motion preference
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            'transition-property': 'none !important',
            'transition-duration': '0s !important',
            'animation': 'none !important',
          }
        },
        
        // Enhanced transitions for interactive elements
        'button, a, input, select, textarea': {
          '@media (prefers-reduced-motion: no-preference)': {
            'transition-property': 'color, background-color, border-color, box-shadow, outline-color, transform, opacity',
            'transition-duration': theme('transitionDuration.theme-fast'),
            'transition-timing-function': theme('transitionTimingFunction.theme'),
          }
        },
        
        // Smooth transitions for hover effects
        'button:hover, a:hover': {
          '@media (prefers-reduced-motion: no-preference)': {
            'transition-timing-function': theme('transitionTimingFunction.theme-out'),
          }
        },
        
        // SVG elements for icon transitions
        'svg': {
          '@media (prefers-reduced-motion: no-preference)': {
            'transition-property': 'fill, stroke, transform, opacity',
            'transition-duration': theme('transitionDuration.theme-fast'),
            'transition-timing-function': theme('transitionTimingFunction.theme'),
          }
        }
      });
      
      // Add component-level transitions
      addComponents({
        // Theme transition utility classes
        '.transition-theme': {
          'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
          'transition-duration': theme('transitionDuration.theme'),
          'transition-timing-function': theme('transitionTimingFunction.theme'),
        },
        
        '.transition-theme-fast': {
          'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
          'transition-duration': theme('transitionDuration.theme-fast'),
          'transition-timing-function': theme('transitionTimingFunction.theme'),
        },
        
        '.transition-theme-slow': {
          'transition-property': 'color, background-color, border-color, box-shadow, outline-color, fill, stroke',
          'transition-duration': theme('transitionDuration.theme-slow'),
          'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
        },
        
        '.transition-colors-smooth': {
          'transition-property': 'color, background-color, border-color',
          'transition-duration': theme('transitionDuration.theme'),
          'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
        },
        
        '.transition-shadows': {
          'transition-property': 'box-shadow, text-shadow',
          'transition-duration': theme('transitionDuration.theme-fast'),
          'transition-timing-function': theme('transitionTimingFunction.theme'),
        },
        
        '.transition-transform-smooth': {
          'transition-property': 'transform, opacity',
          'transition-duration': theme('transitionDuration.300'),
          'transition-timing-function': theme('transitionTimingFunction.theme-smooth'),
        },
        
        // No transition utility for cases where transitions should be disabled
        '.transition-none-important': {
          'transition': 'none !important',
        },
        
        // Smooth bounce effect for interactive elements
        '.transition-bounce': {
          'transition-property': 'transform',
          'transition-duration': theme('transitionDuration.300'),
          'transition-timing-function': theme('transitionTimingFunction.bounce-light'),
        }
      });
      
      // Add utility classes for specific transition scenarios
      addUtilities({
        // Quick utility for theme-aware elements
        '.theme-transition': {
          'transition': `color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}`,
        },
        
        // Utility for elements that need all theme properties
        '.theme-transition-all': {
          'transition': `color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, box-shadow ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}, outline-color ${theme('transitionDuration.theme')} ${theme('transitionTimingFunction.theme')}`,
        },
        
        // Fast transitions for interactive feedback
        '.theme-transition-fast': {
          'transition': `color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}, background-color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}, border-color ${theme('transitionDuration.theme-fast')} ${theme('transitionTimingFunction.theme')}`,
        }
      });
    }
  ],
}
