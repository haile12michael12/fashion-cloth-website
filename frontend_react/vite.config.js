import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Fashion Cloth Website',
        short_name: 'FashionCloth',
        description: 'Discover the latest fashion trends and clothing collections',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'public/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: 'public/logo192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'public/logo512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@popperjs/core': '@popperjs/core/dist/esm/index.js'
    }
  },
  optimizeDeps: {
    include: ['@popperjs/core'],
    exclude: ['bootstrap']
  },
  build: {
    rollupOptions: {
      external: ['@popperjs/core'],
      output: {
        globals: {
          '@popperjs/core': 'Popper'
        }
      }
    }
  }
})