import { useEffect } from 'react';

type Theme = 'dark';

// Always use dark mode - no toggling
export const useDarkMode = (): [Theme] => {
  useEffect(() => {
    const root = window.document.documentElement;
    // Always add dark class
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return ['dark'];
};
