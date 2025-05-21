/**
 * Contrast Ratio Testing Utility
 * 
 * This script helps validate color contrast ratios against WCAG AA standards.
 * Run it in the browser console to test the current theme's color combinations.
 */

/**
 * Calculate the relative luminance of a color (for WCAG contrast calculations)
 * @param {string} hexColor - Hex color in format #RRGGBB
 * @returns {number} - Relative luminance value
 */
function getLuminance(hexColor) {
  // Remove # if present
  hexColor = hexColor.replace(/^#/, '');
  
  // Parse the hex values
  const r = parseInt(hexColor.substring(0, 2), 16) / 255;
  const g = parseInt(hexColor.substring(2, 4), 16) / 255;
  const b = parseInt(hexColor.substring(4, 6), 16) / 255;
  
  // Convert RGB to luminance using the formula
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} - Contrast ratio
 */
function getContrastRatio(color1, color2) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  // Determine which is lighter/darker
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  // Calculate ratio
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a contrast ratio meets WCAG AA requirements
 * @param {number} ratio - Contrast ratio
 * @param {boolean} isLargeText - Whether text is large (≥18pt or ≥14pt bold)
 * @returns {boolean} - Whether it passes WCAG AA
 */
function meetsWCAGAA(ratio, isLargeText = false) {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Get computed color value from CSS variable
 * @param {string} varName - CSS variable name (without --)
 * @returns {string} - Color value in hex format
 */
function getColorFromVar(varName) {
  const computedValue = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${varName}`).trim();
  
  // If it's a hex value, ensure it has the # prefix
  if (computedValue.match(/^#?[0-9a-f]{6}$/i)) {
    return computedValue.startsWith('#') ? computedValue : `#${computedValue}`;
  }
  
  // If it's an RGB value, convert to hex
  if (computedValue.startsWith('rgb')) {
    const rgb = computedValue.match(/\d+/g);
    if (rgb && rgb.length === 3) {
      return `#${rgb.map(n => parseInt(n).toString(16).padStart(2, '0')).join('')}`;
    }
  }
  
  // Return as is if we can't process it
  return computedValue;
}

/**
 * Test all theme color combinations and report compliance
 */
function testThemeContrast() {
  // Test data with color pairs to check
  const testPairs = [
    { name: 'Primary text on background', color1: 'text', color2: 'background', isLargeText: false },
    { name: 'Muted text on background', color1: 'text-muted', color2: 'background', isLargeText: false },
    { name: 'White text on primary button', color1: 'button-text', color2: 'primary', isLargeText: false },
    { name: 'White text on secondary button', color1: 'button-text', color2: 'secondary', isLargeText: false },
    { name: 'Links on background', color1: 'secondary', color2: 'background', isLargeText: false },
    { name: 'Error messages on background', color1: 'error', color2: 'background', isLargeText: false },
    { name: 'Placeholder text on input', color1: 'placeholder', color2: 'input-bg', isLargeText: false }
  ];
  
  // Get theme mode
  const isDarkTheme = document.documentElement.classList.contains('dark') || 
                      document.documentElement.classList.contains('dark-theme');
  
  console.log(`%cTesting ${isDarkTheme ? 'DARK' : 'LIGHT'} theme contrast ratios:`, 'font-weight: bold; font-size: 16px;');
  console.log('-----------------------------------------------------');
  
  // Test and report each pair
  const results = testPairs.map(({ name, color1, color2, isLargeText }) => {
    const color1Value = getColorFromVar(color1);
    const color2Value = getColorFromVar(color2);
    const ratio = getContrastRatio(color1Value, color2Value);
    const passes = meetsWCAGAA(ratio, isLargeText);
    
    // Format for display
    const requirement = isLargeText ? '3:1' : '4.5:1';
    const formattedRatio = ratio.toFixed(2) + ':1';
    const status = passes 
      ? `%cPASS%c (${formattedRatio} vs required ${requirement})` 
      : `%cFAIL%c (${formattedRatio} vs required ${requirement})`;
    
    console.log(
      `${name}: ${status}`,
      passes ? 'background: green; color: white; padding: 2px 4px;' : 'background: red; color: white; padding: 2px 4px;',
      'color: inherit'
    );
    
    return { name, color1Value, color2Value, ratio, passes };
  });
  
  // Summary
  const passCount = results.filter(r => r.passes).length;
  console.log('-----------------------------------------------------');
  console.log(
    `%cOverall: ${passCount}/${results.length} tests passed`,
    passCount === results.length 
      ? 'color: green; font-weight: bold;' 
      : 'color: red; font-weight: bold;'
  );
  
  // Special check for dark mode links
  if (isDarkTheme) {
    // Get an actual link and check its color
    const sampleLink = document.querySelector('a:not(.btn)');
    if (sampleLink) {
      const linkColor = window.getComputedStyle(sampleLink).color;
      const bgColor = getColorFromVar('background');
      
      // Convert RGB to hex if needed
      let linkHex;
      if (linkColor.startsWith('rgb')) {
        const rgb = linkColor.match(/\d+/g);
        if (rgb && rgb.length === 3) {
          linkHex = `#${rgb.map(n => parseInt(n).toString(16).padStart(2, '0')).join('')}`;
        }
      }
      
      if (linkHex) {
        const ratio = getContrastRatio(linkHex, bgColor);
        const passes = meetsWCAGAA(ratio, false);
        
        console.log('-----------------------------------------------------');
        console.log(`%cSpecial check - Actual link color on background:`, 'font-style: italic;');
        console.log(
          `Link color ${linkHex} on background ${bgColor}: ${passes 
            ? `%cPASS%c (${ratio.toFixed(2)}:1)` 
            : `%cFAIL%c (${ratio.toFixed(2)}:1)`}`,
          passes ? 'background: green; color: white; padding: 2px 4px;' : 'background: red; color: white; padding: 2px 4px;',
          'color: inherit'
        );
      }
    }
  }
  
  return results;
}

// Usage instructions
console.log('%cContrast Testing Utility Loaded', 'font-size: 16px; font-weight: bold; color: #0062b3;');
console.log('Run testThemeContrast() to check current theme\'s color contrast');
console.log('Toggle between light/dark themes and run the test again to check both themes');
