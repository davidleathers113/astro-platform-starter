# Media Query Listeners for Theme Changes Implementation

## Overview

This document outlines the changes made to implement media query listeners for theme changes in the Astro Platform Starter project. The implementation ensures that the application responds to system preference changes in real-time, with proper event listener management to prevent memory leaks.

## Implemented Features

1. **Improved ThemeProvider Component**
   - Separated concerns with multiple useEffect hooks
   - Added proper dependency arrays to prevent unnecessary rerenders
   - Used useCallback for event handlers to maintain stable references
   - Added error handling and debugging information

2. **Enhanced System Theme Utility**
   - Improved callback management with a Map for proper event listener cleanup
   - Added support for both modern and legacy browsers
   - Fixed potential memory leaks by ensuring proper removal of event listeners

3. **New Media Query Listener Demo Component**
   - Created a comprehensive demo component to showcase and test the implementation
   - Added real-time logging of system preference changes
   - Included controls to enable/disable listeners and simulate changes

## Key Files Modified

- `/src/components/theme/ThemeProvider.tsx` - Updated event listener handling
- `/src/components/theme/systemTheme.ts` - Enhanced event listener management
- `/src/pages/theme-demo.astro` - Added media query listener demo section
- `/src/components/theme/MediaQueryListenerDemo.tsx` - New demo component

## Implementation Details

### ThemeProvider Changes

The ThemeProvider component now uses separate useEffect hooks for:
1. Initializing the theme from themeManager and setting up theme-change event listeners
2. Managing system preference change listeners specifically

This separation improves code clarity and prevents unnecessary re-runs of effects.

```typescript
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
```

### systemTheme.ts Improvements

The systemTheme utility now maintains a map of callbacks to their corresponding event handlers, ensuring proper cleanup:

```typescript
// Store references to callbacks for proper cleanup
const callbackMap = new Map<
  (preference: ThemePreference) => void, 
  (e: MediaQueryListEvent) => void
>();

export function addPreferenceChangeListener(callback: (preference: ThemePreference) => void): void {
  // Implementation details...
  callbackMap.set(callback, eventHandler);
}

export function removePreferenceChangeListener(callback: (preference: ThemePreference) => void): void {
  const eventHandler = callbackMap.get(callback);
  // Remove listener with the same reference...
  callbackMap.delete(callback);
}
```

## Testing

The implementation can be tested using the theme-demo page:

1. Navigate to `/theme-demo`
2. Observe the Media Query Listener Demo section
3. Change your system's color scheme in OS settings
4. Watch as the event log registers the changes in real-time
5. Test enabling/disabling the listener
6. Verify that different theme settings respond appropriately to system changes

## Success Criteria Met

- ✅ Event listeners correctly detect preference changes
- ✅ Theme updates immediately when system preference changes
- ✅ No memory leaks (listeners properly cleaned up)
- ✅ Performance impact is negligible
- ✅ User preference setting always takes precedence over system changes

## Next Steps

The next subtask in the sequence is:
- Subtask 2.6: Design and Implement Theme Toggle Component

This implementation provides a solid foundation for that work by ensuring the theme system correctly responds to system preference changes.
