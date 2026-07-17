import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
// so built asset URLs resolve under https://<user>.github.io/<repo-name>/
  base: '/Productivity-dashboard/'

})