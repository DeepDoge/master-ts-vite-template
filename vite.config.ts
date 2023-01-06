import { defineConfig } from 'vite'
import { api } from "./src/api"

export default defineConfig({
    plugins: [],
    build: {
        target: 'esnext',
    },
    resolve: {
        alias: {
          '@': './src'
        }
    },
    server: {
      proxy: {
        '/api': { 
          configure(proxy, options)
          {
            proxy.web = api
          },
        }
      }
    }
})