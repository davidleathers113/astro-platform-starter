import { useContext, useMemo, useCallback, useState, useEffect, CSSProperties } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeType } from './ThemeProvider';
import { getSystemPreference } from './systemTheme';

/**
 * Theme-specific values for a property
 */
export interface ThemeValues<T> {
  light: T;
  dark: T;
}

/**
 * Theme-aware style properties
 */
export interface ThemeAwareStyles {
  [key: string]: ThemeValues<string | number>;
}

/**
 * Enhanced Theme Context return type
 */
export interface EnhancedThemeContext {
  // Original properties from ThemeContext
  theme: ThemeType;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  
  // Enhanced properties
  isDarkMode: boolean;
  isLightMode: boolean;
  isSystemTheme: boolean;
  themeClass: (darkClass: string, lightClass?: string) => string;
  getThemeValue: <T>(values: ThemeValues<T>) => T;
}

/**
 * Custom hook to access the theme context with enhanced utilities
 * @returns The enhanced theme context with additional utilities
 */
export function useTheme(): EnhancedThemeContext {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  // Derive additional properties
  const isDarkMode = context.resolvedTheme === 'dark';
  const isLightMode = context.resolvedTheme === 'light';
  const isSystemTheme = context.theme === 'system';
  
  /**
   * Returns appropriate class based on current theme
   * @param darkClass Class to use in dark mode
   * @param lightClass Class to use in light mode (defaults to empty string)
   * @returns The appropriate class for the current theme
   */
  const themeClass = useCallback(
    (darkClass: string, lightClass: string = ''): string => {
      return isDarkMode ? darkClass : lightClass;
    },
    [isDarkMode]
  );
  
  /**
   * Gets the appropriate value for the current theme
   * @param values Object containing theme-specific values
   * @returns The value for the current theme
   */
  const getThemeValue = useCallback(
    <T,>(values: ThemeValues<T>): T => {
      return isDarkMode ? values.dark : values.light;
    },
    [isDarkMode]
  );
  
  // Return the enhanced context
  return {
    ...context,
    isDarkMode,
    isLightMode,
    isSystemTheme,
    themeClass,
    getThemeValue,
  };
}

/**
 * Hook for theme-specific styles in components
 * @param themeStyles Object containing theme-specific styles
 * @returns The styles for the current theme
 */
export function useThemeStyles(themeStyles: ThemeAwareStyles): CSSProperties {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => {
    const result: CSSProperties = {};
    
    Object.entries(themeStyles).forEach(([key, values]) => {
      result[key as keyof CSSProperties] = 
        resolvedTheme === 'dark' ? values.dark : values.light;
    });
    
    return result;
  }, [themeStyles, resolvedTheme]);
}

/**
 * Hook for handling theme transition animations
 * @param duration Optional custom duration (in ms)
 * @returns Animation-related utilities
 */
export function useThemeTransition(duration: number = 300) {
  const { resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle theme changes for animation purposes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [resolvedTheme, duration]);
  
  return {
    isTransitioning,
    transitionClass: `transition-theme duration-${duration}`,
  };
}

/**
 * Hook for checking color contrast with current theme
 * @param foreground CSS color value (hex, rgb, etc)
 * @param background CSS color value (defaults to theme background)
 * @returns Contrast information
 */
export function useContrastCheck(foreground: string, background?: string) {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => {
    // Get the background color
    const bgColor = background || 
      (resolvedTheme === 'dark' ? '#1a2234' : '#FFFFFF');
    
    // Calculate contrast ratio
    const contrastRatio = getContrastRatio(foreground, bgColor);
    
    // Check if it meets WCAG AA standards
    const meetsAA = contrastRatio >= 4.5;
    const meetsAALarge = contrastRatio >= 3;
    
    return {
      contrastRatio,
      meetsAA,
      meetsAALarge,
      isLegible: meetsAALarge,
    };
  }, [foreground, background, resolvedTheme]);
}

/**
 * Helper function to get the current theme outside of React components
 * @returns The current theme setting (light, dark, or system)
 */
export function getDocumentTheme(): ThemeType {
  if (typeof window === 'undefined' || !window.themeManager) {
    return 'system';
  }
  
  return window.themeManager.getTheme();
}

/**
 * Helper function to get the resolved theme outside of React components
 * @returns The resolved theme (light or dark)
 */
export function getResolvedTheme(): 'light' | 'dark' {
  const theme = getDocumentTheme();
  if (theme === 'system') {
    return getSystemPreference();
  }
  return theme;
}

/**
 * Helper function to determine if a given theme is currently active
 * @param theme The theme to check
 * @returns True if the specified theme is active
 */
export function isThemeActive(theme: 'light' | 'dark'): boolean {
  if (typeof document === 'undefined') {
    // Fallback for server-side rendering
    return theme === 'light'; // Default to light theme
  }
  
  const isDark = document.documentElement.classList.contains('dark-theme') || 
                 document.documentElement.classList.contains('dark');
                 
  return theme === 'dark' ? isDark : !isDark;
}

/**
 * Get a CSS variable value for the current theme
 * @param variableName CSS variable name (without --) 
 * @returns The value of the CSS variable
 */
export function getThemeColor(variableName: string): string {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    // Fallback for server-side rendering
    // Return default colors based on variable name
    switch (variableName) {
      case 'primary':
        return '#2d7984';
      case 'secondary':
        return '#0062b3';
      case 'accent':
        return '#58cbe0';
      default:
        return '#2d7984';
    }
  }
  
  try {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(`--color-${variableName}`).trim();
  } catch (e) {
    console.error('Error getting theme color:', e);
    return '#2d7984'; // Fallback to primary color
  }
}

/**
 * Subscribe to theme changes outside of React
 * @param callback Function to call when theme changes
 * @returns Cleanup function to remove the listener
 */
export function listenToThemeChanges(
  callback: (theme: ThemeType, resolvedTheme: 'light' | 'dark') => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  const handleThemeChange = () => {
    const theme = getDocumentTheme();
    const resolvedTheme = theme === 'system' ? getSystemPreference() : theme;
    callback(theme, resolvedTheme);
  };
  
  window.addEventListener('theme-change', handleThemeChange as EventListener);
  
  return () => {
    window.removeEventListener('theme-change', handleThemeChange as EventListener);
  };
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 First color (CSS color value)
 * @param color2 Second color (CSS color value)
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Convert colors to luminance values
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  // Calculate contrast ratio
  const lighterLum = Math.max(luminance1, luminance2);
  const darkerLum = Math.min(luminance1, luminance2);
  
  return (lighterLum + 0.05) / (darkerLum + 0.05);
}

/**
 * Calculate relative luminance of a color
 * @param color CSS color value
 * @returns Relative luminance (0-1)
 */
function getLuminance(color: string): number {
  // Check if we're in a browser environment
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    // Server-side rendering fallback - return a reasonable default
    return 0.5;
  }

  try {
    // Create a temporary element to use the browser's color parsing
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);
    
    // Get the computed color
    const computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    
    // Parse the RGB values
    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!rgbMatch) return 0;
    
    const r = parseInt(rgbMatch[1], 10) / 255;
    const g = parseInt(rgbMatch[2], 10) / 255;
    const b = parseInt(rgbMatch[3], 10) / 255;
    
    // Adjust for gamma
    const adjustedR = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const adjustedG = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const adjustedB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * adjustedR + 0.7152 * adjustedG + 0.0722 * adjustedB;
  } catch (error) {
    // Fallback in case of any errors
    console.error('Error calculating luminance:', error);
    return 0.5;
  }
}