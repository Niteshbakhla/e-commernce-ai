import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#1E3A8A', // Deep blue for primary actions
          600: '#1E40AF',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      }
    }
  },
  plugins: [react(), tailwindcss()],
})
