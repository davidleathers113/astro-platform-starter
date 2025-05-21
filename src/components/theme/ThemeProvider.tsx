import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getSystemPreference, addPreferenceChangeListener, removePreferenceChangeListener } from './systemTheme';

// Define the available theme types
export type ThemeType = 'light' | 'dark' | 'system';

// Define the shape of our theme context
interface ThemeContextType {
  theme: ThemeType;
  resolvedTheme: 'light' | 'dark'; // The actual theme being displayed (resolved from 'system' if needed)
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // We'll use window.themeManager's value to initialize our state
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

  // Set the theme using themeManager to keep everything in sync
  const setTheme = useCallback((newTheme: ThemeType) => {
    if (typeof window !== 'undefined' && window.themeManager) {
      window.themeManager.setTheme(newTheme);
      // Note: We don't need to update state here, as the event listener will catch the change
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  // Handler for theme changes from window.themeManager or storage events
  const handleThemeChange = useCallback((e: CustomEvent<{ theme: ThemeType }>) => {
    setThemeState(e.detail.theme);
    setResolvedTheme(e.detail.theme === 'system' ? getSystemPreference() : e.detail.theme);
  }, []);

  // Handler for system preference changes
  const handleSystemPreferenceChange = useCallback((preference: 'light' | 'dark') => {
    if (theme === 'system') {
      console.log('System preference changed to:', preference);
      setResolvedTheme(preference);
    }
  }, [theme]);

  // Initialize theme from themeManager and set up theme-change event listener
  useEffect(() => {
    // Ensure we're running in browser context
    if (typeof window === 'undefined' || !window.themeManager) return;

    try {
      // Get initial theme from themeManager
      const currentTheme = window.themeManager.getTheme() as ThemeType;
      setThemeState(currentTheme);

      // Determine the resolved theme
      setResolvedTheme(currentTheme === 'system' ? getSystemPreference() : currentTheme);

      // Set up listener for theme changes from other sources
      window.addEventListener('theme-change', handleThemeChange as EventListener);

      // Clean up listener when component unmounts
      return () => {
        window.removeEventListener('theme-change', handleThemeChange as EventListener);
      };
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, [handleThemeChange]);

  // Set up listener for system preference changes
  useEffect(() => {
    try {
      // Add listener for system preference changes
      addPreferenceChangeListener(handleSystemPreferenceChange);
      
      // Clean up listener when component unmounts or dependencies change
      return () => {
        removePreferenceChangeListener(handleSystemPreferenceChange);
      };
    } catch (error) {
      console.error('Error setting up system preference listener:', error);
    }
  }, [handleSystemPreferenceChange]);

  // Create our context value
  const contextValue: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

// Add type declaration for themeManager on the Window object
declare global {
  interface Window {
    themeManager: {
      getTheme: () => ThemeType;
      setTheme: (theme: ThemeType) => void;
    };
  }
}
