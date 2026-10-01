import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'


export default defineConfig(({ mode }) => {
  const { API_PROXY_TARGET } = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    server: API_PROXY_TARGET
      ? {
          proxy: {
            '/api': { target: API_PROXY_TARGET, changeOrigin: true },
            '/uploads': { target: API_PROXY_TARGET, changeOrigin: true },
          },
        }
      : undefined,
  }
})