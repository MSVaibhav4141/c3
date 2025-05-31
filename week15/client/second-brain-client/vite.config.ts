import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['react-masonry-css'], // or the package you're using
  },
  plugins: [react(), tailwindcss()],
   server: {
    host: true, // make server accessible externally (needed for Docker)
    watch: {
      usePolling: true,  // enable polling to detect file changes inside Docker mounts
      interval: 100      // poll every 100ms (adjust if you want)
    }
  }
})
