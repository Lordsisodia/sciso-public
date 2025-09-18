// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'partner' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

// API Types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Client Types
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  budget: number;
  deadline?: string;
  created_at: string;
  updated_at: string;
}

// Partner Types
export interface Partner {
  id: string;
  name: string;
  email: string;
  commission_rate: number;
  total_earnings: number;
  status: 'active' | 'inactive' | 'pending';
  referral_code: string;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  partner_id: string;
  client_id: string;
  commission_amount: number;
  status: 'pending' | 'approved' | 'paid';
  created_at: string;
  updated_at: string;
}

// UI Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// Business Types
export interface Dashboard {
  metrics: {
    totalClients: number;
    activeProjects: number;
    totalRevenue: number;
    monthlyGrowth: number;
  };
  recentActivity: Activity[];
  upcomingDeadlines: Project[];
}

export interface Activity {
  id: string;
  type: 'project_created' | 'client_added' | 'payment_received' | 'partner_joined';
  title: string;
  description: string;
  timestamp: string;
  user_id: string;
}

// App Configuration Types
export interface AppConfig {
  appType: 'client' | 'partner';
  environment: 'development' | 'production';
  features: string[];
  apiUrl: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType;
  badge?: string | number;
  children?: NavigationItem[];
}

// Event Types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    destructive: string;
    border: string;
    input: string;
    ring: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
}

export type ThemeMode = 'light' | 'dark' | 'system';
