import { useTheme } from './useTheme';

export default function ThemeTest() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <div className="form-container p-6 my-6">
      <h2 className="text-2xl font-bold mb-4">Theme Context Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="mb-2 text-text-muted">Current Theme Setting:</p>
          <p className="text-xl font-semibold">{theme}</p>
        </div>
        <div>
          <p className="mb-2 text-text-muted">Resolved Theme:</p>
          <p className="text-xl font-semibold">{resolvedTheme}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
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
      </div>
      
      <button 
        onClick={toggleTheme} 
        className="btn btn-secondary"
      >
        Toggle Theme (Light/Dark)
      </button>
      
      <div className="mt-6 p-4 border border-border rounded-lg">
        <p className="text-text-muted mb-2">This component demonstrates:</p>
        <ul className="list-disc pl-5">
          <li>Reading current theme state from context</li>
          <li>Setting specific themes</li>
          <li>Toggling between light and dark</li>
          <li>Automatically syncing with themeManager</li>
        </ul>
      </div>
    </div>
  );
}
