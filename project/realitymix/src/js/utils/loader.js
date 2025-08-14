/**
 * Dynamically load AR feature modules
 * @param {string} name - Module name (e.g., 'marker-tracking')
 * @returns {Promise<Object|null>} Loaded module or null on failure
 */
export async function loadARModule(name) {
  try {
    const module = await import(`../ar/features/${name}.js`);
    console.log(`Loaded AR module: ${name}`);
    return module;
  } catch (err) {
    console.error(`Failed to load AR module "${name}":`, err);
    return null;
  }
}

/**
 * Check if a feature module is supported
 * @param {string} name - Module name
 * @returns {Promise<boolean>}
 */
export async function isFeatureSupported(name) {
  const module = await loadARModule(name);
  return !!(module && module.isSupported && (await module.isSupported()));
}
