/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d7984',  // Base primary color
          light: '#58cbe0',    // Light variant
          dark: '#1d5058',     // Dark variant
          hover: '#266974',    // Hover state
          active: '#1d5058',   // Active state
          lightHover: '#4bbbce', // Light variant hover state
          lightActive: '#3eafc2', // Light variant active state
          darkHover: '#15373e', // Dark variant hover state
          darkActive: '#102b30', // Dark variant active state
        },
        secondary: {
          DEFAULT: '#0062b3',
          light: '#4a94d8',
          dark: '#004b8c',
        },
        accent: {
          DEFAULT: '#58cbe0',
          warm: '#F8C88F',
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
      }
    },
  },
  plugins: [],
}
