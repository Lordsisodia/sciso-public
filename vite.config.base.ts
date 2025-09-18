import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Base Vite configuration for monorepo
export const createBaseConfig = (appName: string) => {
  return defineConfig(({ mode }) => ({
    plugins: [react()],
    
    resolve: {
      alias: {
        // App-specific aliases
        "@": path.resolve(__dirname, `./apps/${appName}/src`),
        
        // Shared package aliases
        "@shared/ui": path.resolve(__dirname, "./packages/shared-ui/src"),
        "@shared/config": path.resolve(__dirname, "./packages/shared-config/src"),
        "@shared/services": path.resolve(__dirname, "./packages/shared-services/src"),
        "@shared/types": path.resolve(__dirname, "./packages/shared-types/src"),
      }
    },
    
    build: {
      target: 'esnext',
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      modulePreload: {
        polyfill: true
      },
      reportCompressedSize: true,
      sourcemap: mode === 'development',
      
      rollupOptions: {
        output: {
          // Aggressive manual chunking for 30-40% bundle reduction
          manualChunks: {
            // Core vendor bundles
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            
            // Shared component chunks (474 identical components → shared chunks)
            'shared-ui-core': ['@shared/ui/components/ui'],
            'shared-ui-layout': ['@shared/ui/components/layout'],
            'shared-ui-features': ['@shared/ui/components/features'],
            'shared-ui-blocks': ['@shared/ui/components/blocks'],
            
            // Radix UI components (heavy vendor dependency)
            'vendor-radix-core': [
              '@radix-ui/react-slot',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
            ],
            'vendor-radix-forms': [
              '@radix-ui/react-label',
              '@radix-ui/react-select',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-radio-group',
            ],
            'vendor-radix-navigation': [
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-tabs',
              '@radix-ui/react-accordion',
            ],
            'vendor-radix-overlay': [
              '@radix-ui/react-popover',
              '@radix-ui/react-tooltip',
              '@radix-ui/react-hover-card',
            ],
            
            // Auth & API services
            'shared-auth': [
              '@shared/services/auth',
              '@supabase/auth-helpers-react',
              '@supabase/auth-ui-react',
            ],
            'shared-api': [
              '@shared/services/api',
              '@supabase/supabase-js',
            ],
            
            // Shared utilities and hooks
            'shared-utils': [
              '@shared/ui/utils',
              '@shared/ui/hooks',
              '@shared/config',
            ],
            
            // Animation and UI enhancement
            'vendor-animation': [
              'framer-motion',
              'canvas-confetti',
            ],
            
            // Utility libraries
            'vendor-utils': [
              'clsx',
              'tailwind-merge',
              'date-fns',
              'uuid',
            ],
            
            // Form handling
            'vendor-forms': [
              'react-hook-form',
              '@hookform/resolvers',
              'zod',
            ],
            
            // Data management
            'vendor-data': [
              '@tanstack/react-query',
              'jotai',
            ],
            
            // Charts and visualization
            'vendor-charts': [
              'recharts',
              'reaviz',
            ],
            
            // Icons
            'vendor-icons': [
              'lucide-react',
              '@heroicons/react',
              '@tabler/icons-react',
            ],
            
            // Development and AI tools
            'vendor-ai': [
              '@anthropic-ai/sdk',
              'openai',
              'groq-sdk',
            ],
            
            // Blockchain and crypto (if used)
            'vendor-crypto': [
              '@solana/web3.js',
              'moralis',
            ],
          },
          
          // Optimized asset naming
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            
            const extType = assetInfo.name.split('.').pop() || '';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              return `assets/img/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(extType)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      
      // Performance optimizations
      chunkSizeWarningLimit: 1000, // 1MB chunks warning
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-slot',
        '@radix-ui/react-dropdown-menu',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        '@shared/ui/components/ui',
        '@shared/config',
      ],
      exclude: [
        'moralis', // Heavy dependency
        '@tauri-apps/api', // Desktop-specific
      ]
    },
    
    // Server configuration
    server: {
      host: "::",
      port: appName === 'clients' ? 3000 : 3001,
      open: false,
      strictPort: false,
    },
    
    // Preview configuration
    preview: {
      port: appName === 'clients' ? 4000 : 4001,
      strictPort: false,
    },
    
    // Development optimizations
    esbuild: {
      target: 'esnext',
      platform: 'browser',
    },
    
    // CSS configuration
    css: {
      devSourcemap: mode === 'development',
      modules: {
        localsConvention: 'camelCase',
      }
    },
  }));
};

// Shared configuration object for reuse
export const sharedViteConfig = {
  resolve: {
    alias: {
      '@shared/ui': path.resolve(__dirname, './packages/shared-ui/src'),
      '@shared/config': path.resolve(__dirname, './packages/shared-config/src'),
      '@shared/services': path.resolve(__dirname, './packages/shared-services/src'),
      '@shared/types': path.resolve(__dirname, './packages/shared-types/src'),
    }
  },
  plugins: [react()],
};