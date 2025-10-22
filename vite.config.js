import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    environment: 'jsdom', // zorgt dat document/window/localStorage bestaan
    setupFiles: ['./src/setupTests.js'], // laad de jest-dom matchers
  },
})
