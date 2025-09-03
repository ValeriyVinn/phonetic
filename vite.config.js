import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   open: "/phonetic/", // This will automatically open http://localhost:5173/phonetic/
  // },
  plugins: [react()],
  base: "/",
});
