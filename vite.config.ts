import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages note:
 * - If deploying at `https://user.github.io/repo/`, set BASE_PATH="/repo/" in CI.
 * - If deploying at a custom domain (root), BASE_PATH should be "/".
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});

