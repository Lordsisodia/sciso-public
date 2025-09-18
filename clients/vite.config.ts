import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          process.env.NODE_ENV === 'production' && ['transform-remove-console', { exclude: ['error', 'warn'] }]
        ].filter(Boolean)
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@siso-ui': resolve(__dirname, '../../packages/shared-ui/src'),
      '@siso-config': resolve(__dirname, '../../packages/shared-config/src'),
      '@siso-services': resolve(__dirname, '../../packages/shared-services/src'),
      '@siso-types': resolve(__dirname, '../../packages/shared-types/src')
    }
  },
  
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 800,
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'query': ['@tanstack/react-query'],
          'ui-core': ['lucide-react', 'clsx', 'tailwind-merge'],
          'shared-ui': ['@siso-public/shared-ui'],
          'shared-services': ['@siso-public/shared-services']
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    
    cssCodeSplit: true,
    cssMinify: true
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query', 'lucide-react'],
    exclude: ['@siso-public/shared-ui', '@siso-public/shared-services']
  },
  
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    target: 'esnext'
  },
  
  server: {
    port: 3000,
    open: true,
    host: true
  }
});