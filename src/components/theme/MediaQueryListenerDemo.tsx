import { useState, useEffect, useRef } from 'react';
import { 
  getSystemPreference, 
  addPreferenceChangeListener, 
  removePreferenceChangeListener
} from './systemTheme';
import type { ThemePreference } from './systemTheme';
import { useTheme } from './useTheme';

export default function MediaQueryListenerDemo() {
  const { theme, resolvedTheme } = useTheme();
  const [systemPreference, setSystemPreference] = useState<ThemePreference>(getSystemPreference());
  const [changeEvents, setChangeEvents] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(true);
  const changeCount = useRef(0);
  
  // Start listening for system preference changes immediately
  useEffect(() => {
    if (!isListening) return;
    
    const handleChange = (preference: ThemePreference) => {
      changeCount.current += 1;
      const timestamp = new Date().toLocaleTimeString();
      setSystemPreference(preference);
      setChangeEvents(prev => [...prev, `${timestamp}: Changed to ${preference} (event #${changeCount.current})`]);
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
  
  // Clear event log
  const clearEvents = () => {
    setChangeEvents([]);
    changeCount.current = 0;
  };
  
  // Generate a simulated change event (for testing)
  const simulateChange = () => {
    const newPreference = systemPreference === 'dark' ? 'light' : 'dark';
    const timestamp = new Date().toLocaleTimeString();
    setSystemPreference(newPreference);
    setChangeEvents(prev => [...prev, `${timestamp}: Simulated change to ${newPreference}`]);
  };
  
  return (
    <div className="media-query-demo p-6 my-6 border border-border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Media Query Listener Demo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Theme Status</h3>
          <div className="space-y-2">
            <p><span className="text-text-muted">Current Theme Setting:</span> <span className="font-medium">{theme}</span></p>
            <p><span className="text-text-muted">Resolved Theme:</span> <span className="font-medium">{resolvedTheme}</span></p>
            <p><span className="text-text-muted">System Preference:</span> <span className="font-medium">{systemPreference}</span></p>
            <p><span className="text-text-muted">Listener Status:</span> <span className="font-medium">{isListening ? 'Active' : 'Inactive'}</span></p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Event Log</h3>
          <div className="h-[150px] overflow-y-auto p-3 bg-surface-2 rounded text-sm">
            {changeEvents.length === 0 ? (
              <p className="text-text-muted">No events recorded yet.</p>
            ) : (
              <ul className="space-y-1">
                {changeEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={toggleListener}
          className={`btn ${isListening ? 'btn-accent' : ''}`}
        >
          {isListening ? 'Disable' : 'Enable'} Listener
        </button>
        
        <button 
          onClick={clearEvents}
          className="btn"
        >
          Clear Events
        </button>
        
        <button 
          onClick={simulateChange}
          className="btn btn-secondary"
        >
          Simulate Preference Change
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-surface-2 rounded-lg">
        <h3 className="font-bold mb-2">How to Test</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Change your system's color scheme (light/dark mode) in your OS settings</li>
          <li>Observe the event log as listeners detect and respond to changes</li>
          <li>Try disabling the listener and change your system theme again</li>
          <li>Notice that when using "system" theme, the app theme follows system changes</li>
          <li>With "light" or "dark" theme selected, system changes are detected but not applied</li>
        </ol>
      </div>
    </div>
  );
}
