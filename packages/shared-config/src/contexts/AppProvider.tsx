import React, { createContext, useContext, ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { NavigationProvider } from './NavigationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppConfig } from '@shared/types';

interface AppContextValue {
  config: AppConfig;
}

const AppContext = createContext<AppContextValue | null>(null);

export const useAppConfig = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppConfig must be used within AppProvider');
  }
  return context;
};

// Client-specific configuration
const clientConfig: AppConfig = {
  appType: 'client',
  environment: process.env.NODE_ENV as 'development' | 'production',
  features: [
    'dashboard',
    'projects',
    'automation',
    'advanced-analytics',
    'custom-integrations',
    'priority-support'
  ],
  apiUrl: process.env.VITE_API_URL || 'https://api.siso.agency'
};

// Partner-specific configuration
const partnerConfig: AppConfig = {
  appType: 'partner',
  environment: process.env.NODE_ENV as 'development' | 'production',
  features: [
    'dashboard',
    'referrals',
    'commissions',
    'client-management',
    'reporting',
    'partner-resources'
  ],
  apiUrl: process.env.VITE_API_URL || 'https://api.siso.agency'
};

// Query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

interface AppProviderProps {
  children: ReactNode;
  appType: 'client' | 'partner';
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, appType }) => {
  const config = appType === 'client' ? clientConfig : partnerConfig;

  return (
    <AppContext.Provider value={{ config }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <NavigationProvider appType={appType}>
              {children}
            </NavigationProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
};
