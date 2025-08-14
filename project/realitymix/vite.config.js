// import { defineConfig } from 'vite';
// import legacy from '@vitejs/plugin-legacy';

// export default defineConfig({
//   plugins: [
//     legacy()
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           ar: ['src/js/ar'],
//           three: ['three', 'aframe']
//         }
//       }
//     }
//   }
// });

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'], // Support modern browsers
      modernPolyfills: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core AR dependencies
          ar: [
            'src/js/ar/core/scene.js',
            'src/js/ar/core/loader.js',
            'src/js/ar/features/marker-tracking.js',
            'src/js/ar/features/face-tracking.js'
          ],
          // Three.js and A-Frame
          three: ['three', 'aframe', 'ar.js'],
          // UI components
          ui: [
            'src/js/ui/ar-controls.js',
            'src/js/ui/modal.js',
            'src/js/ui/tooltips.js'
          ],
          // Utilities
          utils: [
            'src/js/utils/dom.js',
            'src/js/utils/storage.js',
            'src/js/utils/loader.js'
          ]
        },
        // Optimize chunk sizes
        chunkSizeWarningLimit: 1000 // Warn if chunks exceed 1MB
      }
    },
    // Minify output
    minify: 'esbuild',
    // Include .glb and .gltf as assets
    assetsInclude: ['**/*.glb', '**/*.gltf']
  },
  optimizeDeps: {
    include: ['three', 'aframe', 'ar.js'], // Pre-bundle heavy dependencies
    exclude: ['src/js/ar/features/*'] // Allow dynamic imports for features
  }
});
