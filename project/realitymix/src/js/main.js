import { initARTool } from '../pages/ar-tool/index.js';
import { ARTracker } from './performance.js';

(async () => {
  try {
    const { scene, marker, controls } = await initARTool();

    if (!scene || !marker || !controls) {
      throw new Error('Invalid AR initialization');
    }

    console.log('AR Tool initialized:', { scene, marker, controls });

    // Log performance if available
    if (ARTracker && typeof ARTracker.logPerformance === 'function') {
      ARTracker.logPerformance();
    }

  } catch (err) {
    console.error('Initialization failed:', err);
    // Optional: add UI fallback or user notification here
  }
})();
