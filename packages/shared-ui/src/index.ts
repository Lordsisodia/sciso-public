/**
 * Shared UI Package Entry Point
 * Central exports for all reusable components across SISO-PUBLIC monorepo
 */

// Core components that are used across all apps
export { Logo } from './components/Logo';
export { Hero } from './components/Hero';
export { Footer } from './components/Footer';
export { Sidebar } from './components/Sidebar';
export { ChatBot } from './components/ChatBot';

// Component category exports for tree-shaking
export * from './components/ui';
export * from './components/auth';
export * from './components/dashboard';
export * from './components/layout';
export * from './components/common';
export * from './components/landing';
export * from './components/chat';
export * from './components/onboarding';
export * from './components/profile';
export * from './components/features';
export * from './components/blocks';
export * from './components/notion-editor';

// Utility exports
export { cn } from './utils/cn';

// Re-export important types for consumers
export type { ComponentProps } from 'react';