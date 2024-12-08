/* eslint-disable import/namespace */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Listen on all addresses
    port: process.env.PORT || 5173,
    strictPort: true
  },
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product-pages/index.html'),
        productList: resolve(__dirname, 'src/product-listing/index.html'),
      },
    },
  },
});