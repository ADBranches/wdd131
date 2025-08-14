import { safeLoadModel } from '../../ar/core/loader.js';

/**
 * Initialize marker tracking using built-in AR.js preset markers only
 * @param {Element} scene - A-Frame scene
 * @param {Object} options - Marker options
 * @returns {Promise<Element>} Marker entity
 */
export default async function initMarkerTracking(scene, options = {}) {
  const { marker = 'hiro', modelPath, modelOptions = {} } = options;

  try {
    // Create marker entity using preset marker only; no 'type' attribute needed
    const markerEntity = document.createElement('a-marker');
    markerEntity.setAttribute('preset', marker); // e.g. 'hiro', 'kanji', 'barcode'

    // Remove 'type="pattern"' to avoid conflict with preset
    // Remove 'markerhandler' unless you have a specific A-Frame component defined

    // Load model asynchronously
    const model = await safeLoadModel(modelPath, modelOptions);
    if (!model) {
      throw new Error(`Failed to load model: ${modelPath}`);
    }
    markerEntity.appendChild(model);

    // Append marker to the A-Frame scene
    scene.appendChild(markerEntity);

    // Register simple event listeners for built-in marker visibility
    markerEntity.addEventListener('markerFound', () => {
      console.log(`Marker '${marker}' found`);
      // You can add more logic here to handle marker found event
    });
    markerEntity.addEventListener('markerLost', () => {
      console.log(`Marker '${marker}' lost`);
      // Add logic here as needed
    });

    return markerEntity;
  } catch (err) {
    console.error(`Marker tracking failed for '${marker}':`, err);
    throw err;
  }
}
