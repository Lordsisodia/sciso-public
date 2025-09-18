/**
 * Shared UI Package Entry Point - Minimal Stub Version
 * Central exports for all reusable components across SISO-PUBLIC monorepo
 */
import React from 'react';

// Minimal stub components for now
export const Logo: React.FC = () => React.createElement('div', null, 'SISO Logo');
export const Hero: React.FC = () => React.createElement('div', null, 'Hero Section');
export const Footer: React.FC = () => React.createElement('footer', null, '© 2024 SISO Agency');
export const Sidebar: React.FC = () => React.createElement('aside', null, 'Sidebar'); 
export const ChatBot: React.FC = () => React.createElement('div', null, 'Chat Bot');

// Utility exports
export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Re-export important types for consumers
export type { ComponentProps } from 'react';