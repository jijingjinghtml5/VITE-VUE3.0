import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    proxy: {
      // 配置跨域
      '/api': {
        // target: 'https://m.cytsh.cn',
        // target: 'https://cy.zamplus.com:1443',
        target: 'http://172.16.25.52',
        // secure: false,
        // rewrite: (path) => path.replace('/api/', '/')
        changeOrigin: true
      },
      '/api-v2': {
        // target: 'https://m.cytsh.cn',
        // target: 'https://cy.zamplus.com:1443',
        target: 'http://172.16.25.52',
        // ws:true,
        changeOrigin: true
      }
    }
  }
})
