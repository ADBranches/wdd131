import { $ } from '../../utils/dom.js';
import { Storage } from '../../utils/storage.js';
import { safeLoadModel } from '../core/loader.js';

/**
 * Marker tracking module for RealityMix
 */
export class MarkerTracker {
  /**
   * Check if marker tracking is supported
   * @returns {Promise<boolean>}
   */
  static async isSupported() {
    return !!navigator.xr && typeof AFRAME !== 'undefined' && AFRAME.components['arjs-marker'];
  }

  /**
   * Initialize marker tracking
   * @param {Element} scene - A-Frame scene element
   * @param {Object} options - Configuration
   * @param {string} [options.marker='hiro'] - Marker pattern
   * @param {string} [options.modelPath] - Path to GLB model
   * @param {Object} [options.modelOptions] - Model loading options
   * @returns {Promise<Element>} Marker entity
   */
  static async init(scene, options = {}) {
    if (!await MarkerTracker.isSupported()) {
      throw new Error('Marker tracking not supported');
    }

    const { marker = 'hiro', modelPath, modelOptions = { scale: 0.5 } } = options;

    // Create marker entity
    const markerEl = document.createElement('a-marker');
    markerEl.setAttribute('preset', marker);
    markerEl.setAttribute('type', 'pattern');
    markerEl.setAttribute('smooth', 'true');

    // Load model if provided
    if (modelPath) {
      const model = await safeLoadModel(modelPath, modelOptions);
      markerEl.appendChild(model);
    }

    // Save marker config
    Storage.set('lastMarker', { marker, modelPath, modelOptions });

    // Add to scene
    scene.appendChild(markerEl);

    // Event listener for marker detection
    markerEl.addEventListener('markerFound', () => {
      console.log(`Marker "${marker}" detected`);
      Storage.set('markerStatus', 'found');
    });
    markerEl.addEventListener('markerLost', () => {
      console.log(`Marker "${marker}" lost`);
      Storage.set('markerStatus', 'lost');
    });

    return markerEl;
  }

  /**
   * Remove marker tracking
   * @param {Element} markerEl - Marker entity to remove
   */
  static remove(markerEl) {
    if (markerEl) {
      markerEl.remove();
      Storage.remove('markerStatus');
    }
  }
}

// Lazy-load on demand
export default async function initMarkerTracking(scene, options) {
  return MarkerTracker.init(scene, options);
}
