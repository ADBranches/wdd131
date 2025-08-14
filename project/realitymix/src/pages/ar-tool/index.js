import { initScene } from '../../js/ar/core/scene.js';
import { loadARModule } from '../../js/utils/loader.js';
import { ARControls } from '../../js/ui/ar-controls.js';
import { Modal } from '../../js/ui/modal.js';

/**
 * AR Tool page
 */
export async function initARTool() {
  try {
    // Initialize scene
    const scene = await initScene({
      trackingMethod: 'best',
      sourceType: 'webcam',
      debug: import.meta.env.DEV
    });

    // Initialize marker tracking
    const module = await loadARModule('marker-tracking');
    if (!module || !module.default) {
      throw new Error('Failed to load marker-tracking module');
    }
    const { default: initMarkerTracking } = module;
    const marker = await initMarkerTracking(scene, {
      marker: 'hiro',
      modelPath: 'furniture/chair.glb', // Use validated model
      modelOptions: { scale: 0.5 }
    });

    if (!marker) {
      throw new Error('Failed to load marker or model');
    }

    // Initialize controls
    const controls = ARControls.init(document.getElementById('ar-root'), {
      onReset: () => {
        marker.remove();
        initMarkerTracking(scene, {
          marker: 'hiro',
          modelPath: 'furniture/chair.glb',
          modelOptions: { scale: 0.5 }
        });
      },
      onToggleModel: (visible) => {
        marker.style.visibility = visible ? 'visible' : 'hidden';
        ARControls.update(controls, { modelVisible: visible });
      }
    });

    // Show welcome modal
    Modal.show({
      title: 'Welcome to RealityMix AR',
      content: 'Point your camera at a Hiro marker to see the 3D model.',
      onClose: () => console.log('Welcome modal closed')
    });

    return { scene, marker, controls };
  } catch (err) {
    console.error('AR Tool failed:', err);
    Modal.show({
      title: 'Error',
      content: 'Failed to initialize AR. Ensure your device supports WebXR.',
      buttonText: 'Retry',
      onClose: () => window.location.reload()
    });
    throw err;
  }
}
