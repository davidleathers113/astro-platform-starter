// Define types
export type ThemePreference = 'light' | 'dark';
export type ThemeType = ThemePreference | 'system';

export interface SystemThemeManager {
  getSystemPreference: () => ThemePreference;
  isSystemDarkMode: () => boolean;
  addPreferenceChangeListener: (callback: (preference: ThemePreference) => void) => void;
  removePreferenceChangeListener: (callback: (preference: ThemePreference) => void) => void;
}

/**
 * Gets the current system color scheme preference
 * @returns 'dark' if system prefers dark mode, 'light' otherwise
 */
export function getSystemPreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    console.warn('Error detecting system preference:', error);
    return 'light'; // Fallback to light
  }
}

/**
 * Checks if the system is currently in dark mode
 * @returns true if system prefers dark mode, false otherwise
 */
export function isSystemDarkMode(): boolean {
  return getSystemPreference() === 'dark';
}

/**
 * Creates a MediaQueryList for dark mode preference if supported
 * @returns MediaQueryList or null if not supported
 */
function getDarkModeMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)');
  } catch (error) {
    console.warn('MediaQueryList not supported:', error);
    return null;
  }
}

// Store references to callbacks for proper cleanup
const callbackMap = new Map<
  (preference: ThemePreference) => void, 
  (e: MediaQueryListEvent) => void
>();

/**
 * Adds an event listener for system preference changes
 * @param callback Function to call when preference changes
 */
export function addPreferenceChangeListener(
  callback: (preference: ThemePreference) => void
): void {
  const mediaQuery = getDarkModeMediaQuery();
  if (!mediaQuery) return;
  
  // Create a wrapper function that converts MediaQueryListEvent to ThemePreference
  const eventHandler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  // Store the mapping between the original callback and the event handler
  callbackMap.set(callback, eventHandler);
  
  // For modern browsers
  try {
    mediaQuery.addEventListener('change', eventHandler);
  } catch (error) {
    // For older browsers
    try {
      (mediaQuery as any).addListener(eventHandler);
    } catch (fallbackError) {
      console.warn('Unable to add preference change listener:', fallbackError);
    }
  }
}

/**
 * Removes an event listener for system preference changes
 * @param callback Function to remove
 */
export function removePreferenceChangeListener(
  callback: (preference: ThemePreference) => void
): void {
  const mediaQuery = getDarkModeMediaQuery();
  if (!mediaQuery) return;
  
  // Get the stored event handler for this callback
  const eventHandler = callbackMap.get(callback);
  if (!eventHandler) {
    console.warn('No event handler found for callback');
    return;
  }
  
  // For modern browsers
  try {
    mediaQuery.removeEventListener('change', eventHandler);
  } catch (error) {
    // For older browsers
    try {
      (mediaQuery as any).removeListener(eventHandler);
    } catch (fallbackError) {
      console.warn('Unable to remove preference change listener:', fallbackError);
    }
  }
  
  // Remove the mapping
  callbackMap.delete(callback);
}

/**
 * Creates a system theme manager with all necessary functions
 * @returns SystemThemeManager object
 */
export function createSystemThemeManager(): SystemThemeManager {
  return {
    getSystemPreference,
    isSystemDarkMode,
    addPreferenceChangeListener,
    removePreferenceChangeListener,
  };
}
