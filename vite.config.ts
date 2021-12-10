import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
   
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/views/components')},
      { find: '@axios', replacement: resolve(__dirname, 'src/http/index.ts') },
      { find: '@js', replacement: resolve(__dirname, 'src/js') }
    ]
  }
})
