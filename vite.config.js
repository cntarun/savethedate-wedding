import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Served from https://cntarun.github.io/savethedate-wedding/ on GitHub Pages,
// so the production build uses that sub-path as its base. Local dev stays "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/savethedate-wedding/' : '/',
  plugins: [react(), tailwindcss()],
}))
