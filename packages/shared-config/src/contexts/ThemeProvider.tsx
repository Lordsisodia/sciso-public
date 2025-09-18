import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Theme, ThemeMode } from '@shared/types';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

const lightTheme: Theme = {
  colors: {
    primary: 'hsl(221.2 83.2% 53.3%)',
    secondary: 'hsl(210 40% 98%)',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    muted: 'hsl(210 40% 96%)',
    accent: 'hsl(210 40% 96%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    input: 'hsl(214.3 31.8% 91.4%)',
    ring: 'hsl(221.2 83.2% 53.3%)',
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  spacing: {
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
  },
  borderRadius: {
    'none': '0',
    'sm': '0.125rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    'full': '9999px',
  },
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: 'hsl(217.2 91.2% 59.8%)',
    secondary: 'hsl(217.2 32.6% 17.5%)',
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    muted: 'hsl(217.2 32.6% 17.5%)',
    accent: 'hsl(217.2 32.6% 17.5%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    border: 'hsl(217.2 32.6% 17.5%)',
    input: 'hsl(217.2 32.6% 17.5%)',
    ring: 'hsl(217.2 91.2% 59.8%)',
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('siso_theme_mode') as ThemeMode;
    if (stored) {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('siso_theme_mode', mode);
    
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedMode(mediaQuery.matches ? 'dark' : 'light');
      
      const handler = (e: MediaQueryListEvent) => {
        setResolvedMode(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedMode(mode);
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedMode]);

  const toggleMode = () => {
    setMode(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  const theme = resolvedMode === 'dark' ? darkTheme : lightTheme;

  const value: ThemeContextValue = {
    theme,
    mode,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
