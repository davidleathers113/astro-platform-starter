import { useContext } from 'react';
import { ThemeContext, ThemeType } from './ThemeProvider';

// Custom hook to access the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// Helper function to get the current theme outside of React components
export function getDocumentTheme(): ThemeType {
  if (typeof window === 'undefined' || !window.themeManager) {
    return 'system';
  }
  
  return window.themeManager.getTheme();
}

// Helper function to determine if a given theme is currently active
export function isThemeActive(theme: 'light' | 'dark'): boolean {
  if (typeof document === 'undefined') return false;
  
  const isDark = document.documentElement.classList.contains('dark-theme') || 
                 document.documentElement.classList.contains('dark');
                 
  return theme === 'dark' ? isDark : !isDark;
}
