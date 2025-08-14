import * as THREE from 'three';
import { Modal } from '../../ui/modal.js';

/**
 * Initialize A-Frame AR scene
 * @param {Object} options - Scene options
 * @returns {Promise<Element>} A-Frame scene element
 */
export async function initScene(options = {}) {
  const { trackingMethod = 'best', sourceType = 'webcam', debug = false } = options;

  try {
    // Feature detection for WebXR
    if (!navigator.xr) {
      throw new Error('WebXR not supported');
    }

    // Create A-Frame scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', `sourceType: ${sourceType}; trackingMethod: ${trackingMethod}; debugUIEnabled: ${debug}`);
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('renderer', 'antialias: true; alpha: true');

    // Add camera
    const camera = document.createElement('a-camera');
    camera.setAttribute('gps-camera', '');
    camera.setAttribute('look-controls', 'enabled: false');
    scene.appendChild(camera);

    // AR.js configuration
    scene.setAttribute('arjs', {
      cameraParametersUrl: '/data/camera_para.dat',
      detectionMode: 'mono',
      patternRatio: 0.5
    });

    // Append scene to DOM
    const arRoot = document.querySelector('#ar-root');
    if (!arRoot) throw new Error('No #ar-root element found');
    arRoot.appendChild(scene);

    // Wait for scene to load
    await new Promise((resolve, reject) => {
      scene.addEventListener('loaded', resolve);
      scene.addEventListener('error', () => reject(new Error('Scene failed to load')));
      setTimeout(() => reject(new Error('Scene load timeout')), 10000);
    });

    console.log('AR Scene initialized.');
    return scene;
  } catch (err) {
    console.error('Scene initialization failed:', err);
    Modal.show({
      title: 'Error',
      content: 'Failed to initialize AR scene. Ensure your device supports WebXR.',
      buttonText: 'Retry',
      onClose: () => window.location.reload()
    });
    throw err;
  }
}
