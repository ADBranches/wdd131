import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Load a GLB model
 * @param {string} path - Path to GLB
 * @param {Object} options - Model options
 * @returns {Promise<Element>} A-Frame entity
 */
async function loadModel(path, options = {}) {
  const { scale = 1, position = { x: 0, y: 0, z: 0 } } = options;
  
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(`/assets/models/${path}`);
    
    // Validate GLB content
    if (!gltf.scene) {
      throw new Error(`Invalid GLB file: ${path}`);
    }

    const model = document.createElement('a-entity');
    model.setObject3D('mesh', gltf.scene);
    model.setAttribute('scale', `${scale} ${scale} ${scale}`);
    model.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    
    return model;
  } catch (err) {
    throw new Error(`Failed to load model ${path}: ${err.message}`);
  }
}

/**
 * Safe model loading with error handling
 * @param {string} path - Path to GLB
 * @param {Object} options - Model options
 * @returns {Promise<Element>} A-Frame entity
 */
export async function safeLoadModel(path, options = {}) {
  try {
    return await loadModel(path, options);
  } catch (err) {
    console.error(err);
    return null; // Return null to prevent appendChild errors
  }
}
