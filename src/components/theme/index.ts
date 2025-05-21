export { ThemeProvider, ThemeContext } from './ThemeProvider';
export type { ThemeType } from './ThemeProvider';
export { 
  // Original exports
  useTheme, 
  getDocumentTheme, 
  isThemeActive,
  
  // New exports
  useThemeStyles,
  useThemeTransition,
  useContrastCheck,
  getResolvedTheme,
  getThemeColor,
  listenToThemeChanges,
  getContrastRatio
} from './useTheme';
export type { 
  EnhancedThemeContext,
  ThemeValues,
  ThemeAwareStyles
} from './useTheme';
export { 
  getSystemPreference, 
  isSystemDarkMode, 
  addPreferenceChangeListener, 
  removePreferenceChangeListener,
  createSystemThemeManager 
} from './systemTheme';
export type { ThemePreference, SystemThemeManager } from './systemTheme';
