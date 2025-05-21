/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
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
          DEFAULT: 'var(--color-background, #ffffff)',
          form: 'var(--color-form-bg, #F7FAFC)',
          input: 'var(--color-input-bg, #EDF2F7)',
        },
        text: {
          DEFAULT: 'var(--color-text, #1a2234)',
          muted: 'var(--color-text-muted, #4A5568)',
          button: 'var(--color-button-text, #FFFFFF)',
          accent: 'var(--color-accent-button-text, #1a2234)',
        },
        border: {
          DEFAULT: 'var(--color-border, #E2E8F0)',
        },
        complementary: {
          DEFAULT: 'var(--color-complementary, #F7FAFC)',
        },
        error: {
          DEFAULT: 'var(--color-error, #e53e3e)',
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
  plugins: [],
}
