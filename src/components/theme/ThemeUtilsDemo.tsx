import { useState, useEffect } from 'react';
import { 
  useTheme, 
  useThemeStyles, 
  useThemeTransition, 
  useContrastCheck,
  getThemeColor,
  getContrastRatio,
  listenToThemeChanges
} from './useTheme';

export default function ThemeUtilsDemo() {
  const { 
    theme, 
    resolvedTheme, 
    setTheme, 
    toggleTheme, 
    isDarkMode, 
    isLightMode, 
    isSystemTheme,
    themeClass,
    getThemeValue
  } = useTheme();
  
  // Demo for useThemeStyles
  const boxStyles = useThemeStyles({
    backgroundColor: { light: '#f0f4f8', dark: '#2d3748' },
    borderColor: { light: '#cbd5e0', dark: '#4a5568' },
    boxShadow: { light: '0 2px 4px rgba(0,0,0,0.1)', dark: '0 2px 4px rgba(0,0,0,0.3)' }
  });
  
  // Demo for useThemeTransition
  const { isTransitioning, transitionClass } = useThemeTransition();
  
  // Demo for useContrastCheck
  const [testColor, setTestColor] = useState('#42a5b2');
  const contrastInfo = useContrastCheck(testColor);
  
  // Demo for listening to theme changes
  const [lastThemeChange, setLastThemeChange] = useState<string>('None');
  
  // Set up listener on mount
  useEffect(() => {
    const cleanupListener = listenToThemeChanges((theme, resolvedTheme) => {
      setLastThemeChange(`Theme changed to ${theme} (resolved: ${resolvedTheme})`);
    });
    
    return cleanupListener;
  }, []);
  
  return (
    <div className="theme-utils-demo p-6 my-6">
      <h2 className="text-2xl font-bold mb-4">Theme Utilities Demo</h2>
      
      {/* Basic Theme Information Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Enhanced useTheme Hook</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="form-container">
            <p className="text-text-muted mb-1">Theme Setting</p>
            <p className="text-lg font-medium">{theme}</p>
          </div>
          
          <div className="form-container">
            <p className="text-text-muted mb-1">Resolved Theme</p>
            <p className="text-lg font-medium">{resolvedTheme}</p>
          </div>
          
          <div className="form-container">
            <p className="text-text-muted mb-1">Derived Values</p>
            <ul>
              <li><span className="text-text-muted">isDarkMode:</span> {isDarkMode.toString()}</li>
              <li><span className="text-text-muted">isLightMode:</span> {isLightMode.toString()}</li>
              <li><span className="text-text-muted">isSystemTheme:</span> {isSystemTheme.toString()}</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => setTheme('light')} 
            className={`btn ${theme === 'light' ? 'btn-accent' : ''}`}
          >
            Light Mode
          </button>
          <button 
            onClick={() => setTheme('dark')} 
            className={`btn ${theme === 'dark' ? 'btn-accent' : ''}`}
          >
            Dark Mode
          </button>
          <button 
            onClick={() => setTheme('system')} 
            className={`btn ${theme === 'system' ? 'btn-accent' : ''}`}
          >
            System Preference
          </button>
          <button 
            onClick={toggleTheme} 
            className="btn btn-secondary"
          >
            Toggle Theme
          </button>
        </div>
      </section>
      
      {/* themeClass Demo */}
      <section className="mb-8 form-container">
        <h3 className="text-xl font-semibold mb-3">themeClass Utility</h3>
        
        <div className="mb-4">
          <p className="mb-2">This button uses <code>themeClass</code> to apply theme-specific classes:</p>
          <button 
            className={`px-4 py-2 rounded ${themeClass('bg-gray-800 text-white', 'bg-gray-200 text-black')}`}
          >
            Themed Button
          </button>
        </div>
        
        <div className="mb-4">
          <p className="mb-2">This element uses <code>getThemeValue</code> for dynamic content:</p>
          <div className="px-4 py-2 border rounded">
            {getThemeValue({ 
              light: 'This content is shown in light mode', 
              dark: 'This content is shown in dark mode' 
            })}
          </div>
        </div>
      </section>
      
      {/* useThemeStyles Demo */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">useThemeStyles Hook</h3>
        
        <div className="mb-4">
          <p className="mb-2">This box uses <code>useThemeStyles</code> for theme-specific styling:</p>
          <div 
            style={boxStyles} 
            className="p-4 border rounded"
          >
            <p>This box has theme-specific styles applied via React's style prop</p>
          </div>
        </div>
      </section>
      
      {/* useThemeTransition Demo */}
      <section className="mb-8 form-container">
        <h3 className="text-xl font-semibold mb-3">useThemeTransition Hook</h3>
        
        <p className="mb-4">
          {isTransitioning 
            ? 'Theme is currently transitioning!' 
            : 'Theme is stable. Try changing the theme.'}
        </p>
        
        <div 
          className={`p-4 border rounded bg-background ${transitionClass} ${
            isTransitioning ? 'animate-pulse' : ''
          }`}
        >
          <p>This element uses <code>useThemeTransition</code> to detect theme changes and apply animations</p>
        </div>
      </section>
      
      {/* useContrastCheck Demo */}
      <section className="mb-8 form-container">
        <h3 className="text-xl font-semibold mb-3">useContrastCheck Hook</h3>
        
        <div className="mb-4">
          <label className="block mb-2">
            Test a color against the current theme background:
            <input 
              type="color" 
              value={testColor} 
              onChange={(e) => setTestColor(e.target.value)}
              className="ml-2"
            />
          </label>
          
          <div 
            className="p-4 border rounded"
            style={{ color: testColor }}
          >
            <p className="text-xl font-bold">Sample Text</p>
            <p>This text is using the color: {testColor}</p>
          </div>
          
          <div className="mt-4">
            <p><strong>Contrast Ratio:</strong> {contrastInfo.contrastRatio.toFixed(2)}</p>
            <p><strong>Meets WCAG AA:</strong> {contrastInfo.meetsAA ? '✓' : '✗'}</p>
            <p><strong>Meets WCAG AA (Large Text):</strong> {contrastInfo.meetsAALarge ? '✓' : '✗'}</p>
          </div>
        </div>
      </section>
      
      {/* Non-React Utilities Demo */}
      <section className="mb-8 form-container">
        <h3 className="text-xl font-semibold mb-3">Non-React Utilities</h3>
        
        <div className="mb-4">
          <p className="mb-2">Current primary color from CSS variables: <code>{getThemeColor('primary')}</code></p>
          <div style={{ backgroundColor: getThemeColor('primary') }} className="h-8 w-full rounded"></div>
        </div>
        
        <div className="mb-4">
          <p className="mb-2">Theme change listener detected:</p>
          <div className="p-2 border rounded">{lastThemeChange}</div>
        </div>
      </section>
      
      {/* Documentation */}
      <section className="form-container">
        <h3 className="text-xl font-semibold mb-3">Using Theme Utilities</h3>
        <p className="mb-2">Import the utilities you need:</p>
        <pre className="mb-4 p-3 bg-background-form overflow-auto rounded">
          {`import { 
  useTheme, 
  useThemeStyles, 
  useThemeTransition, 
  useContrastCheck 
} from '../components/theme';`}
        </pre>
        
        <p className="mb-2">Basic usage example:</p>
        <pre className="mb-4 p-3 bg-background-form overflow-auto rounded">
          {`function MyComponent() {
  const { isDarkMode, themeClass } = useTheme();
  
  return (
    <div className={themeClass('bg-gray-800', 'bg-gray-100')}>
      {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
    </div>
  );
}`}
        </pre>
      </section>
    </div>
  );
}