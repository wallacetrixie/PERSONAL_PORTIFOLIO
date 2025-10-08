import { useEffect } from 'react';

type Theme = 'dark';

// Always use dark mode - no toggling
export const useDarkMode = (): [Theme, () => void] => {
  useEffect(() => {
    const root = window.document.documentElement;
    // Always add dark class
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  // Empty toggle function since we don't actually toggle
  const toggleTheme = () => {
    // Do nothing - always stay in dark mode
  };

  return ['dark', toggleTheme];
};
