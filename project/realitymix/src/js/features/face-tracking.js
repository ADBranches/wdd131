import { $ } from '../../utils/dom.js';
import { Storage } from '../../utils/storage.js';
import { safeLoadModel } from '../core/loader.js';

/**
 * Face tracking module for RealityMix
 */
export class FaceTracker {
  /**
   * Check if face tracking is supported
   * @returns {Promise<boolean>}
   */
  static async isSupported() {
    // Note: AR.js does not natively support face tracking; this assumes a future WebXR face-tracking API
    return !!navigator.xr && 'requestSession' in navigator.xr && false; // Placeholder for WebXR face-tracking
  }

  /**
   * Initialize face tracking
   * @param {Element} scene - A-Frame scene element
   * @param {Object} options - Configuration
   * @param {string} [options.modelPath] - Path to GLB model (e.g., face accessory)
   * @param {Object} [options.modelOptions] - Model loading options
   * @returns {Promise<Element>} Face entity
   */
  static async init(scene, options = {}) {
    if (!await FaceTracker.isSupported()) {
      console.warn('Face tracking not supported; falling back to marker tracking.');
      return import('./marker-tracking.js').then(module => module.default(scene, options));
    }

    const { modelPath, modelOptions = { scale: 0.1, position: { x: 0, y: 0, z: -0.5 } } } = options;

    // Create face-tracking entity (placeholder for WebXR face-tracking API)
    const faceEl = document.createElement('a-entity');
    faceEl.setAttribute('position', '0 0 -0.5');
    faceEl.setAttribute('rotation', '0 0 0');

    // Load model if provided
    if (modelPath) {
      const model = await safeLoadModel(modelPath, modelOptions);
      faceEl.appendChild(model);
    }

    // Save face config
    Storage.set('lastFaceConfig', { modelPath, modelOptions });

    // Add to scene
    scene.appendChild(faceEl);

    // Placeholder for face-tracking events
    faceEl.addEventListener('faceDetected', () => {
      console.log('Face detected');
      Storage.set('faceStatus', 'detected');
    });

    return faceEl;
  }

  /**
   * Remove face tracking
   * @param {Element} faceEl - Face entity to remove
   */
  static remove(faceEl) {
    if (faceEl) {
      faceEl.remove();
      Storage.remove('faceStatus');
    }
  }
}

// Lazy-load on demand
export default async function initFaceTracking(scene, options) {
  return FaceTracker.init(scene, options);
}
