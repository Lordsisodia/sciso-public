import React, { createContext, useContext, ReactNode } from 'react';
import type { NavigationItem } from '@shared/types';

interface NavigationContextValue {
  navigation: NavigationItem[];
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

// Client navigation items
const clientNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/clients/dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/clients/projects',
  },
  {
    id: 'automation',
    label: 'Automation',
    href: '/clients/automation',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/clients/analytics',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    href: '/clients/integrations',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/clients/profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/clients/settings',
  },
];

// Partner navigation items
const partnerNavigation: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/partners/dashboard',
  },
  {
    id: 'referrals',
    label: 'Referrals',
    href: '/partners/referrals',
  },
  {
    id: 'commissions',
    label: 'Commissions',
    href: '/partners/commissions',
  },
  {
    id: 'clients',
    label: 'My Clients',
    href: '/partners/clients',
  },
  {
    id: 'reporting',
    label: 'Reports',
    href: '/partners/reporting',
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/partners/resources',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/partners/profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/partners/settings',
  },
];

interface NavigationProviderProps {
  children: ReactNode;
  appType: 'client' | 'partner';
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  appType 
}) => {
  const [currentPath, setCurrentPath] = React.useState('');
  
  React.useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const navigation = appType === 'client' ? clientNavigation : partnerNavigation;

  const value: NavigationContextValue = {
    navigation,
    currentPath,
    setCurrentPath,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
