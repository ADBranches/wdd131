import { safeLoadModel } from '../../ar/core/loader.js';

/**
 * Initialize marker tracking
 * @param {Element} scene - A-Frame scene
 * @param {Object} options - Marker options
 * @returns {Promise<Element>} Marker entity
 */
export default async function initMarkerTracking(scene, options = {}) {
  const { marker = 'hiro', modelPath, modelOptions = {} } = options;

  try {
    // Create marker entity
    const markerEntity = document.createElement('a-marker');
    markerEntity.setAttribute('type', 'pattern');
    markerEntity.setAttribute('preset', marker);
    markerEntity.setAttribute('markerhandler', '');

    // Load model
    const model = await safeLoadModel(modelPath, modelOptions);
    if (!model) {
      throw new Error(`Failed to load model: ${modelPath}`);
    }
    markerEntity.appendChild(model);

    // Append marker to scene
    scene.appendChild(markerEntity);

    // Register marker events
    markerEntity.addEventListener('markerFound', () => {
      console.log(`Marker ${marker} found`);
    });
    markerEntity.addEventListener('markerLost', () => {
      console.log(`Marker ${marker} lost`);
    });

    return markerEntity;
  } catch (err) {
    console.error(`Marker tracking failed for ${marker}:`, err);
    throw err;
  }
}
