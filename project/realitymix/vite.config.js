import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ar: [
            'src/js/ar/core/scene.js',
            'src/js/ar/core/loader.js',
            'src/js/ar/features/marker-tracking.js',
            'src/js/ar/features/face-tracking.js'
          ],
          three: ['three', 'aframe', 'ar.js'],
          ui: [
            'src/js/ui/ar-controls.js',
            'src/js/ui/modal.js',
            'src/js/ui/tooltips.js'
          ],
          utils: [
            'src/js/utils/dom.js',
            'src/js/utils/storage.js',
            'src/js/utils/loader.js'
          ]
        },
        chunkSizeWarningLimit: 1000
      }
    },
    minify: 'esbuild',
    assetsInclude: ['**/*.glb', '**/*.gltf']
  },
  optimizeDeps: {
    include: ['three', 'aframe', 'ar.js', 'src/js/ar/features/marker-tracking.js'],
    exclude: []
  },
  server: {
    open: true,
    port: 5173,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  root: '.',
  publicDir: 'public'
});
