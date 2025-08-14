/**
 * Initialize marker tracking using built-in AR.js preset markers only
 * Model loading now references preloaded assets via 'gltf-model' attribute
 * 
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

    // Instead of loading via GLTFLoader, reference preloaded asset by ID
    // modelPath here should be an asset ID, e.g., 'chairModel' corresponds to <a-asset-item id="chairModel" ...>
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
    });
    markerEntity.addEventListener('markerLost', () => {
      console.log(`Marker '${marker}' lost`);
    });

    return markerEntity;
  } catch (err) {
    console.error(`Marker tracking failed for '${marker}':`, err);
    throw err;
  }
}
