import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  base: './dist',
  publicDir: './dist/assets',
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#003566',
          'heading-color': '#202020',
        },
        javascriptEnabled: true,
      },
    },
  },
})
