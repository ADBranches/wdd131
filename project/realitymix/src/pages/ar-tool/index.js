import { initScene } from '../../js/ar/core/scene.js';
import { loadARModule } from '../../js/utils/loader.js';
import { ARControls } from '../../js/ui/ar-controls.js';
import { Modal } from '../../js/ui/modal.js';

/**
 * AR Tool page
 * @returns {Promise<{scene: Element, marker: Element, controls: Object}>} AR components
 */
export async function initARTool() {
  try {
    // Check device compatibility
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Webcam access not supported on this device');
    }

    // Initialize scene with retry mechanism
    const scene = await initScene({
      trackingMethod: 'best',
      sourceType: 'webcam',
      debug: import.meta.env.DEV,
      useGpsCamera: false
    });

    if (!scene) {
      throw new Error('Scene initialization returned null');
    }

    // Initialize marker tracking
    const module = await loadARModule('marker-tracking');
    if (!module?.default) {
      throw new Error('Failed to load marker-tracking module');
    }
    const { default: initMarkerTracking } = module;

    const markerOptions = {
      marker: 'hiro',
      modelPath: 'furniture/chair.glb',
      modelOptions: { scale: '0.5 0.5 0.5' } // A-Frame expects string
    };

    const marker = await initMarkerTracking(scene, markerOptions);
    if (!marker) {
      throw new Error('Failed to initialize marker or model');
    }

    // Initialize controls with enhanced options
    const controls = ARControls.init(document.getElementById('ar-root'), {
      onReset: async () => {
        try {
          marker.remove();
          const newMarker = await initMarkerTracking(scene, markerOptions);
          if (!newMarker) throw new Error('Failed to reset marker');
          return newMarker;
        } catch (err) {
          console.error('Reset failed:', err);
          Modal.show({
            title: 'Reset Error',
            content: 'Failed to reset AR scene. Please try again.',
            buttonText: 'Retry',
            onClose: () => window.location.reload()
          });
        }
      },
      onToggleModel: (visible) => {
        marker.setAttribute('visible', visible); // Use A-Frame attribute for reliability
        ARControls.update(controls, { modelVisible: visible });
      }
    });

    // Show welcome modal with accessibility
    Modal.show({
      title: 'Welcome to RealityMix AR',
      content: 'Point your camera at a Hiro marker to view the 3D model. Ensure good lighting and a stable surface.',
      buttonText: 'Start AR',
      role: 'dialog',
      ariaLabel: 'Welcome to AR Tool',
      onClose: () => console.log('Welcome modal closed')
    });

    // Log success
    console.log('AR Tool initialized successfully');
    return { scene, marker, controls };
  } catch (err) {
    console.error('AR Tool failed:', err);
    Modal.show({
      title: 'Initialization Error',
      content: `Failed to initialize AR: ${err.message}. Ensure your device supports WebXR and webcam access.`,
      buttonText: 'Retry',
      role: 'alertdialog',
      ariaLabel: 'AR Initialization Error',
      onClose: () => window.location.reload()
    });
    throw err;
  }
}