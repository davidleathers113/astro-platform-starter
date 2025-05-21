import { useState, useEffect } from 'react';
import { 
  getSystemPreference, 
  isSystemDarkMode, 
  addPreferenceChangeListener, 
  removePreferenceChangeListener,
  ThemePreference
} from './systemTheme';

export default function SystemThemeDemo() {
  const [currentPreference, setCurrentPreference] = useState<ThemePreference>(getSystemPreference());
  const [isListening, setIsListening] = useState(false);
  
  // Effect to handle listeners
  useEffect(() => {
    if (!isListening) return;
    
    const handleChange = (preference: ThemePreference) => {
      setCurrentPreference(preference);
      console.log('System preference changed to:', preference);
    };
    
    // Add listener
    addPreferenceChangeListener(handleChange);
    
    // Cleanup
    return () => {
      removePreferenceChangeListener(handleChange);
    };
  }, [isListening]);
  
  // Toggle listener
  const toggleListener = () => {
    setIsListening(prev => !prev);
  };
  
  // Manually check the current preference
  const checkPreference = () => {
    setCurrentPreference(getSystemPreference());
  };
  
  return (
    <div className="system-theme-demo p-6 my-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">System Theme Detection Demo</h2>
      
      <div className="mb-6">
        <p className="mb-2 text-text-muted">Current System Preference:</p>
        <p className="text-xl font-semibold">{currentPreference}</p>
        <p className="text-sm text-text-muted mt-1">
          is{!isSystemDarkMode() && ' not'} dark mode
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <button 
          onClick={checkPreference}
          className="btn"
        >
          Check Current Preference
        </button>
        
        <button 
          onClick={toggleListener}
          className={`btn ${isListening ? 'btn-accent' : ''}`}
        >
          {isListening ? 'Stop' : 'Start'} Listening for Changes
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-surface-2 rounded-lg">
        <p className="text-text-muted mb-2">This component demonstrates:</p>
        <ul className="list-disc pl-5">
          <li>Getting the current system preference</li>
          <li>Checking if the system is in dark mode</li>
          <li>Adding/removing preference change listeners</li>
          <li>Handling system preference changes in real-time</li>
        </ul>
        {isListening && (
          <p className="mt-4 text-sm italic">
            Try changing your system appearance settings while this listener is active. The display will update automatically.
          </p>
        )}
      </div>
    </div>
  );
}
