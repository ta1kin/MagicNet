import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
            @use "@/assets/scss/components/_vars.scss" as *;
            @use "@/assets/scss/components/_mixins.scss" as *;
          `
			}
		}
	},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Components': fileURLToPath(new URL('./src/components', import.meta.url)),
    }
  },
  server: {
    port: 4173,
    strictPort: true,
    host: true,
    origin: "http://localhost:4173",
  }
})
