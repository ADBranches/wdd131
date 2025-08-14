/**
 * Performance monitoring for RealityMix AR
 */
export class ARTracker {
  /**
   * Measure approximate FPS
   * @returns {Promise<number>} Frames per second
   */
  static async checkFPS() {
    return new Promise((resolve) => {
      let frameCount = 0;
      let startTime = performance.now();
      
      const tick = () => {
        frameCount++;
        if (frameCount >= 10) {
          const elapsed = performance.now() - startTime;
          resolve((frameCount / elapsed) * 1000);
          return;
        }
        requestAnimationFrame(tick);
      };
      
      requestAnimationFrame(tick);
    });
  }

  /**
   * Monitor memory usage (if supported)
   * @returns {Object|null} Memory stats or null
   */
  static getMemoryUsage() {
    if (performance.memory) {
      return {
        usedJSHeapSize: (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
        totalJSHeapSize: (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
        jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2) + ' MB'
      };
    }
    return null;
  }

  /**
   * Log performance metrics (dev only)
   */
  static async logPerformance() {
    if (!import.meta.env.DEV) return;
    
    const fps = await ARTracker.checkFPS();
    const memory = ARTracker.getMemoryUsage();
    console.group('AR Performance Metrics');
    console.log(`FPS: ${fps.toFixed(2)}`);
    if (memory) console.log('Memory:', memory);
    console.groupEnd();
  }
}
