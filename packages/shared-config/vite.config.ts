import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedConfig',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@tanstack/react-query'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tanstack/react-query': 'ReactQuery'
        }
      }
    }
  }
})
