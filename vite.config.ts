import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/CitizenPortal/', // 👈 ADD THIS LINE

    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    publicDir: 'public',
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api/ai/chat': {
          target: env.VITE_API_AI_PROXY_TARGET || 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
          rewrite: () => '/chat',
        },
        '/api': {
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:5165',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 4173,
    },
    build: {
      outDir: 'dist',
    },
  };
});
