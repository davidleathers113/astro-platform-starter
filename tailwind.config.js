/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode strategy
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind colors
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          warm: 'var(--color-warm-accent)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          form: 'var(--color-form-bg)',
          input: 'var(--color-input-bg)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          button: 'var(--color-button-text)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        complementary: {
          DEFAULT: 'var(--color-complementary)',
        },
      },
      transitionProperty: {
        'theme': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      backgroundImage: {
        'noise': 'var(--background-image-noise)',
      }
    },
  },
  // Prevent dark mode classes from being purged
  safelist: [
    'dark',
    'light',
    'dark-theme',
    'light-theme',
    'dark:bg-background',
    'dark:text-text',
    'transition-theme',
    'duration-300',
    'sm:text-5xl',
    'sm:text-3xl',
    'sm:text-4xl',
    'text-4xl',
    'text-2xl',
    'text-3xl',
    'text-5xl'
  ],
  plugins: [],
}
