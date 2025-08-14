// import { initScene } from './ar/core/scene.js';
// import { safeLoadModel } from './ar/core/loader.js';

// // Lazy-load performance tracker only if needed
// const loadPerformanceTracker = async () => (await import('./performance.js')).ARTracker;

// // Initialize app
// (async () => {
//   try {
//     // Initialize AR scene with WebXR and AR.js configuration
//     const scene = await initScene({
//       trackingMethod: 'best',
//       sourceType: 'webcam',
//       detectionMode: 'mono_and_matrix',
//       debug: import.meta.env.DEV, // Enable debug in development
//       onReady: () => console.log('AR Scene initialized.')
//     });

//     // Load test model
//     const model = await safeLoadModel('test-chair.glb', {
//       scale: 0.5,
//       position: { x: 0, y: 0, z: -1 }
//     });
//     scene.appendChild(model);

//     // Initialize performance tracking in development mode
//     if (import.meta.env.DEV) {
//       const { ARTracker } = await loadPerformanceTracker();
//       const fps = await ARTracker.checkFPS();
//       console.log(`Initial FPS: ${fps.toFixed(2)}`);
//     }
//   } catch (err) {
//     console.error('Initialization failed:', err);
//     // Fallback UI (e.g., display error message)
//     document.getElementById('ar-root').innerHTML = `
//       <div style="color: red; text-align: center; padding: 20px;">
//         Failed to initialize AR. Please check your device or refresh.
//       </div>
//     `;
//   }
// })();

import { initARTool } from '../pages/ar-tool/index.js';
import { ARTracker } from './performance.js';

(async () => {
  try {
    const { scene, marker, controls } = await initARTool();
    if (!scene || !marker || !controls) {
      throw new Error('Invalid AR initialization');
    }
    console.log('AR Tool initialized:', { scene, marker, controls });
    ARTracker.logPerformance(); // Log FPS
  } catch (err) {
    console.error('Initialization failed:', err);
  }
})();