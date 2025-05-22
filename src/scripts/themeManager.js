/**
 * Theme Manager
 * ============
 * 
 * A comprehensive theme management system that handles:
 * - Theme switching between light, dark, and system themes
 * - System preference detection and monitoring
 * - Theme persistence in localStorage
 * - DOM class application for styling
 * - Event dispatching for component updates
 * - Cross-browser compatibility
 * 
 * This script is designed to work seamlessly with both vanilla JavaScript
 * and React components, providing a unified theme management solution.
 */

// ===================================================================
// THEME CONSTANTS AND TYPES
// ===================================================================

/**
 * Available theme options
 * @readonly
 * @enum {string}
 */
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

/**
 * Storage key for theme preference
 * @constant {string}
 */
const STORAGE_KEY = 'theme';

/**
 * Class names applied to the document element
 * @constant {Object}
 */
const THEME_CLASSES = {
  DARK: ['dark', 'dark-theme'],
  LIGHT: ['light-theme']
};

/**
 * CSS data attributes for theme indication
 * @constant {Object}
 */
const THEME_ATTRIBUTES = {
  THEME: 'data-theme'
};

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

/**
 * Safely check if we're in a browser environment
 * @returns {boolean} True if running in browser
 */
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Safely get localStorage item with fallback
 * @param {string} key - The storage key
 * @param {string} fallback - Fallback value if key doesn't exist
 * @returns {string} The stored value or fallback
 */
function getStorageItem(key, fallback = '') {
  if (!isBrowser()) return fallback;
  
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    console.warn('localStorage access failed:', error);
    return fallback;
  }
}

/**
 * Safely set localStorage item
 * @param {string} key - The storage key
 * @param {string} value - The value to store
 */
function setStorageItem(key, value) {
  if (!isBrowser()) return;
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('localStorage write failed:', error);
  }
}

/**
 * Get system color scheme preference
 * @returns {'light'|'dark'} The system preference
 */
function getSystemPreference() {
  if (!isBrowser()) return THEMES.DARK; // Default for SSR
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? THEMES.DARK 
      : THEMES.LIGHT;
  } catch (error) {
    console.warn('Media query not supported:', error);
    return THEMES.LIGHT; // Fallback
  }
}

/**
 * Dispatch a custom theme change event
 * @param {string} theme - The new theme value
 * @param {string} resolvedTheme - The resolved theme (light/dark)
 */
function dispatchThemeEvent(theme, resolvedTheme) {
  if (!isBrowser()) return;
  
  try {
    // Dispatch custom event for React components and other listeners
    const event = new CustomEvent('theme-change', {
      detail: { theme, resolvedTheme }
    });
    window.dispatchEvent(event);
    
    // Also dispatch a simpler event for basic listeners
    const simpleEvent = new CustomEvent('themechange', {
      detail: { theme, resolvedTheme }
    });
    window.dispatchEvent(simpleEvent);
  } catch (error) {
    console.warn('Event dispatch failed:', error);
  }
}

// ===================================================================
// CORE THEME MANAGER FUNCTIONS
// ===================================================================

/**
 * Get the current theme preference from storage
 * @returns {string} The current theme (light, dark, or system)
 */
function getTheme() {
  return getStorageItem(STORAGE_KEY, THEMES.SYSTEM);
}

/**
 * Set the theme preference and apply it
 * @param {string} theme - The theme to set (light, dark, or system)
 */
function setTheme(theme) {
  // Validate theme value
  if (!Object.values(THEMES).includes(theme)) {
    console.warn('Invalid theme value:', theme);
    theme = THEMES.SYSTEM;
  }
  
  // Store the preference
  setStorageItem(STORAGE_KEY, theme);
  
  // Apply the theme immediately
  applyTheme(theme);
  
  // Determine resolved theme for event
  const resolvedTheme = theme === THEMES.SYSTEM ? getSystemPreference() : theme;
  
  // Dispatch theme change event
  dispatchThemeEvent(theme, resolvedTheme);
}

/**
 * Apply the specified theme to the document
 * @param {string} theme - The theme to apply
 */
function applyTheme(theme) {
  if (!isBrowser()) return;
  
  try {
    const documentElement = document.documentElement;
    
    // Determine if dark mode should be active
    const shouldUseDarkMode = theme === THEMES.DARK || 
      (theme === THEMES.SYSTEM && getSystemPreference() === THEMES.DARK);
    
    // Remove all theme classes first
    const allThemeClasses = [...THEME_CLASSES.DARK, ...THEME_CLASSES.LIGHT];
    documentElement.classList.remove(...allThemeClasses);
    
    // Apply appropriate theme classes
    if (shouldUseDarkMode) {
      documentElement.classList.add(...THEME_CLASSES.DARK);
      documentElement.setAttribute(THEME_ATTRIBUTES.THEME, THEMES.DARK);
    } else {
      documentElement.classList.add(...THEME_CLASSES.LIGHT);
      documentElement.setAttribute(THEME_ATTRIBUTES.THEME, THEMES.LIGHT);
    }
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(shouldUseDarkMode);
    
  } catch (error) {
    console.error('Theme application failed:', error);
  }
}

/**
 * Update the meta theme-color tag for mobile browsers
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateMetaThemeColor(isDark) {
  if (!isBrowser()) return;
  
  try {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    // Use theme-appropriate colors
    metaThemeColor.content = isDark ? '#1a2234' : '#ffffff';
  } catch (error) {
    console.warn('Meta theme-color update failed:', error);
  }
}

/**
 * Toggle between light and dark themes
 * If current theme is system, it will toggle to the opposite of the current resolved theme
 */
function toggleTheme() {
  const currentTheme = getTheme();
  const currentResolved = currentTheme === THEMES.SYSTEM ? getSystemPreference() : currentTheme;
  
  const newTheme = currentResolved === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  setTheme(newTheme);
}

/**
 * Get the resolved theme (always light or dark, never system)
 * @returns {'light'|'dark'} The resolved theme
 */
function getResolvedTheme() {
  const theme = getTheme();
  return theme === THEMES.SYSTEM ? getSystemPreference() : theme;
}

/**
 * Check if dark mode is currently active
 * @returns {boolean} True if dark mode is active
 */
function isDarkMode() {
  return getResolvedTheme() === THEMES.DARK;
}

/**
 * Check if light mode is currently active
 * @returns {boolean} True if light mode is active
 */
function isLightMode() {
  return getResolvedTheme() === THEMES.LIGHT;
}

/**
 * Check if system theme is currently selected
 * @returns {boolean} True if system theme is selected
 */
function isSystemTheme() {
  return getTheme() === THEMES.SYSTEM;
}

// ===================================================================
// SYSTEM PREFERENCE MONITORING
// ===================================================================

/**
 * Initialize system preference monitoring
 * This function sets up listeners for system theme changes
 */
function initSystemPreferenceMonitoring() {
  if (!isBrowser()) return;
  
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Handler for system preference changes
    const handleSystemChange = (e) => {
      // Only react if we're currently using system theme
      if (getTheme() === THEMES.SYSTEM) {
        const newResolvedTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        
        // Apply the new theme without changing the stored preference
        applyTheme(THEMES.SYSTEM);
        
        // Dispatch event to notify components
        dispatchThemeEvent(THEMES.SYSTEM, newResolvedTheme);
      }
    };
    
    // Add listener using modern method or fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      // Legacy support for older browsers
      mediaQuery.addListener(handleSystemChange);
    }
    
    // Store reference for potential cleanup
    window._themeSystemListener = { mediaQuery, handler: handleSystemChange };
    
  } catch (error) {
    console.warn('System preference monitoring setup failed:', error);
  }
}

/**
 * Clean up system preference monitoring
 */
function cleanupSystemPreferenceMonitoring() {
  if (!isBrowser() || !window._themeSystemListener) return;
  
  try {
    const { mediaQuery, handler } = window._themeSystemListener;
    
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handler);
    } else if (mediaQuery.removeListener) {
      mediaQuery.removeListener(handler);
    }
    
    delete window._themeSystemListener;
  } catch (error) {
    console.warn('System preference monitoring cleanup failed:', error);
  }
}

// ===================================================================
// INITIALIZATION AND SETUP
// ===================================================================

/**
 * Initialize the theme manager
 * This function should be called when the application starts
 */
function initTheme() {
  if (!isBrowser()) {
    console.warn('Theme manager: Not in browser environment');
    return;
  }
  
  try {
    // Get stored theme preference
    const storedTheme = getTheme();
    
    // Apply the theme immediately to prevent flash
    applyTheme(storedTheme);
    
    // Set up system preference monitoring
    initSystemPreferenceMonitoring();
    
    // Dispatch initial theme event
    const resolvedTheme = storedTheme === THEMES.SYSTEM ? getSystemPreference() : storedTheme;
    dispatchThemeEvent(storedTheme, resolvedTheme);
    
    console.log('Theme manager initialized:', { theme: storedTheme, resolved: resolvedTheme });
    
  } catch (error) {
    console.error('Theme manager initialization failed:', error);
  }
}

/**
 * Clean up theme manager
 * Call this when the application is being destroyed
 */
function cleanup() {
  cleanupSystemPreferenceMonitoring();
}

// ===================================================================
// PUBLIC API
// ===================================================================

/**
 * The main theme manager object
 * This will be attached to the window object for global access
 */
const themeManager = {
  // Core functions
  getTheme,
  setTheme,
  applyTheme,
  toggleTheme,
  
  // State queries
  getResolvedTheme,
  isDarkMode,
  isLightMode,
  isSystemTheme,
  
  // System integration
  getSystemPreference,
  
  // Lifecycle
  init: initTheme,
  cleanup,
  
  // Constants for external use
  THEMES,
  
  // Utility functions for advanced use cases
  dispatchThemeEvent,
};

// ===================================================================
// GLOBAL SETUP AND EXPORT
// ===================================================================

// Attach to window for global access
if (isBrowser()) {
  window.themeManager = themeManager;
  
  // Also make it available as a module export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = themeManager;
  }
}

// ES6 module export
export {
  themeManager as default,
  THEMES,
  getTheme,
  setTheme,
  applyTheme,
  toggleTheme,
  getResolvedTheme,
  isDarkMode,
  isLightMode,
  isSystemTheme,
  getSystemPreference,
  initTheme,
  cleanup
};

// Initialize immediately if we're in a browser environment
// This ensures themes are applied as early as possible
if (isBrowser()) {
  // Use a timeout to ensure DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    // DOM is already ready
    setTimeout(initTheme, 0);
  }
}
