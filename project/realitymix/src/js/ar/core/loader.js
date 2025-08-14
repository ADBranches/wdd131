/**
 * Create an A-Frame entity referencing a preloaded GLB model by asset ID
 * @param {string} assetId - The id attribute of the <a-asset-item> (without '#')
 * @param {Object} options - Model customization options
 * @param {number} options.scale - Uniform scale factor
 * @param {Object} options.position - {x, y, z} position
 * @param {Object} options.rotation - {x, y, z} rotation in degrees (optional)
 * @returns {Element} A-Frame entity referencing preloaded asset
 */
function loadModel(assetId, options = {}) {
  const {
    scale = 1,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
  } = options;

  // Create entity referencing the preloaded model by id
  const model = document.createElement('a-entity');

  model.setAttribute('gltf-model', `#${assetId}`);
  model.setAttribute('scale', `${scale} ${scale} ${scale}`);
  model.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
  model.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`);

  return model;
}


/**
 * Wrap loadModel to simulate async for API compatibility
 * @param {string} assetId
 * @param {Object} options
 * @returns {Promise<Element>}
 */
export async function safeLoadModel(assetId, options = {}) {
  try {
    const model = loadModel(assetId, options);
    return model;
  } catch (err) {
    console.error(err);
    return null;
  }
}
