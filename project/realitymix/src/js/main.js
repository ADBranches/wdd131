import { initARTool } from '../pages/ar-tool/index.js';
import { ARTracker } from './performance.js';  // If you use ARTracker
import '@ar-js-org/ar.js/aframe/build/aframe-ar-nft.js'; // or your chosen AR.js build

(async () => {
  try {
    console.log('Loading AR Tool...');

    const { scene, marker, controls } = await initARTool();

    if (!scene || !marker || !controls) {
      throw new Error('Invalid AR initialization');
    }

    console.log('AR Tool initialized:', { scene, marker, controls });

    if (ARTracker?.logPerformance) {
      ARTracker.logPerformance();
    }
  } catch (err) {
    console.error('Initialization failed:', err);
    // Optional: show modal or retry UI here
  }
})();
