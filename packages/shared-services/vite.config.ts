import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedServices',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['@tanstack/react-query'],
      output: {
        globals: {
          '@tanstack/react-query': 'ReactQuery'
        }
      }
    }
  }
})
