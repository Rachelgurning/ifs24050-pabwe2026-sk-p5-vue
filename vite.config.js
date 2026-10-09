
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue(), tailwindcss()],

    server: {
      port: Number(env.APP_PORT) || 3000,
    },

    define: {
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL),
    },

    build: {
      sourcemap: false,
      cssCodeSplit: true,
    },

    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.js',

      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/ifs24050-papwe2026-sk-p5-vue/**',
      ],

      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov', 'html'],
        thresholds: {
          lines: 100,
          functions: 100,
          branches: 100,
          statements: 100,
        },
      },
    },
  };
});
