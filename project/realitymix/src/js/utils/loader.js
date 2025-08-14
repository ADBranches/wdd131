/**
 * Load AR module dynamically
 * @param {string} moduleName - Module name
 * @returns {Promise<Object>} Module
 */
export async function loadARModule(moduleName) {
  try {
    const module = await import(`../ar/features/${moduleName}.js`);
    if (!module.default) {
      throw new Error(`No default export in ${moduleName}.js`);
    }
    return module;
  } catch (err) {
    console.error(`Failed to load AR module "${moduleName}": ${err.message}`);
    throw new Error(`Unknown variable dynamic import: ../ar/features/${moduleName}.js`);
  }
}
