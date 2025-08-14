import * as THREE from 'three';
import { Modal } from '../../ui/modal.js';

/**
 * Initialize A-Frame AR scene with dynamic assets preloading
 * @param {Object} options - Scene options
 * @param {string} options.trackingMethod - AR.js tracking method, e.g., 'best', 'barcode', 'color', etc.
 * @param {string} options.sourceType - Source type for AR.js ('webcam', 'video', 'image')
 * @param {boolean} options.debug - Enable AR.js debug UI
 * @param {boolean} options.useGpsCamera - Whether to add gps-camera component
 * @param {Array<Object>} options.models - Array of models to preload of shape { id: string, src: string }
 * @returns {Promise<Element>} A-Frame scene element
 */
export async function initScene(options = {}) {
  const {
    trackingMethod = 'best',
    sourceType = 'webcam',
    debug = false,
    useGpsCamera = false,
    models = [],  // New: accepts list of models { id, src }
  } = options;

  try {
    if (!navigator.xr) {
      console.warn('WebXR not supported; proceeding with AR.js fallback');
      // Don't throw to allow fallback
    }

    // Create A-Frame scene element
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'antialias: true; alpha: true');

    // Configure AR.js attribute string
    const arjsConfig = `sourceType: ${sourceType}; trackingMethod: ${trackingMethod}; debugUIEnabled: ${debug}; patternRatio: 0.5; cameraParametersUrl: /data/camera_para.dat; detectionMode: mono`;
    scene.setAttribute('arjs', arjsConfig);

    // Dynamically create <a-assets> and preload models
    if (models.length > 0) {
      const assets = document.createElement('a-assets');
      for (const model of models) {
        const assetItem = document.createElement('a-asset-item');
        assetItem.setAttribute('id', model.id);
        assetItem.setAttribute('src', model.src);
        assets.appendChild(assetItem);
      }
      scene.appendChild(assets);
    }

    // Add camera with optional gps-camera component
    const camera = document.createElement('a-camera');
    if (useGpsCamera) {
      camera.setAttribute('gps-camera', '');
    }
    camera.setAttribute('look-controls', 'enabled: false');
    scene.appendChild(camera);

    // Append scene to #ar-root container in DOM
    const arRoot = document.querySelector('#ar-root');
    if (!arRoot) throw new Error('No #ar-root element found in DOM');
    arRoot.appendChild(scene);

    // Await scene to finish loading with timeout and error handling
    await new Promise((resolve, reject) => {
      scene.addEventListener('loaded', resolve, { once: true });
      scene.addEventListener('error', () => reject(new Error('Scene failed to load')), { once: true });
      setTimeout(() => reject(new Error('Scene load timeout')), 20000);
    });

    console.log('AR Scene initialized successfully.');
    return scene;

  } catch (err) {
    console.error('Scene initialization failed:', err);
    Modal.show({
      title: 'Error',
      content: 'Failed to initialize AR scene. Ensure your device supports WebXR or AR.js.',
      buttonText: 'Retry',
      onClose: () => window.location.reload()
    });
    throw err;
  }
}
