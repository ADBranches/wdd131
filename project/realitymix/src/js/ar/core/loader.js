import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Load a GLB model as an A-Frame entity
 * @param {string} path - Relative path under /assets/models/
 * @param {Object} options - Model customization options
 * @param {number} options.scale - Uniform scale factor
 * @param {Object} options.position - {x, y, z} position
 * @param {Object} options.rotation - {x, y, z} rotation in degrees (optional)
 * @returns {Promise<Element>} A-Frame entity
 */
async function loadModel(path, options = {}) {
  const {
    scale = 1,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 } 
  } = options;

  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(`/assets/models/${path}`);

    if (!gltf.scene) {
      throw new Error(`Invalid GLB file: ${path}`);
    }

    const model = document.createElement('a-entity');
    
    // Attach the loaded 3D scene as the mesh object
    model.setObject3D('mesh', gltf.scene);
    
    // Set transform attributes for A-Frame
    model.setAttribute('scale', `${scale} ${scale} ${scale}`);
    model.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    model.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`);

    return model;
  } catch (err) {
    throw new Error(`Failed to load model ${path}: ${err.message}`);
  }
}

export async function safeLoadModel(path, options = {}) {
  try {
    return await loadModel(path, options);
  } catch (err) {
    console.error(err);
    return null;
  }
}
