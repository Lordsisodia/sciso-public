import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable React optimization
      babel: {
        plugins: [
          // Remove console.log in production
          process.env.NODE_ENV === 'production' && ['transform-remove-console', { exclude: ['error', 'warn'] }]
        ].filter(Boolean)
      }
    })
  ],
  
  build: {
    // Enable source maps for debugging
    sourcemap: process.env.NODE_ENV !== 'production',
    
    // Optimize chunk size limit
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Aggressive manual chunking for optimal bundle splitting
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Router and navigation
          'router': ['react-router-dom'],
          
          // Data fetching and state management  
          'query': ['@tanstack/react-query'],
          
          // UI component library
          'ui-core': ['lucide-react', 'clsx', 'tailwind-merge'],
          
          // Shared workspace packages
          'shared-ui': ['@siso-public/shared-ui'],
          'shared-services': ['@siso-public/shared-services'],
          'shared-config': ['@siso-public/shared-config'],
          'shared-types': ['@siso-public/shared-types'],
          
          // Chart libraries (for partners app)
          'charts': ['recharts'],
        },
        
        // Optimize chunk names for caching
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('shared-')) {
            return 'shared/[name]-[hash].js';
          }
          if (chunkInfo.name.includes('vendor')) {
            return 'vendor/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        },
        
        // Optimize asset names
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      
      // External dependencies for library builds
      external: (id) => {
        // Keep React external for component libraries
        if (id.includes('@siso-public/shared-ui') && 
            (id.includes('react') || id.includes('react-dom'))) {
          return true;
        }
        return false;
      }
    },
    
    // Target modern browsers for smaller bundles
    target: 'esnext',
    
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'clsx',
      'tailwind-merge'
    ],
    exclude: [
      // Exclude workspace packages from pre-bundling
      '@siso-public/shared-ui',
      '@siso-public/shared-services', 
      '@siso-public/shared-config',
      '@siso-public/shared-types'
    ]
  },
  
  // Enable modern features
  esbuild: {
    // Drop console in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    
    // Enable top-level await
    target: 'esnext',
    
    // Optimize for modern browsers
    format: 'esm'
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@siso-ui': resolve(__dirname, 'packages/shared-ui/src'),
      '@siso-config': resolve(__dirname, 'packages/shared-config/src'),
      '@siso-services': resolve(__dirname, 'packages/shared-services/src'),
      '@siso-types': resolve(__dirname, 'packages/shared-types/src')
    }
  },
  
  // Server configuration for development
  server: {
    port: 3002,
    host: true,
    open: false,
    
    // Enable compression
    middlewareMode: false,
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    host: true,
    open: false
  }
});