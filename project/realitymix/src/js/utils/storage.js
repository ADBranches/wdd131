/**
 * LocalStorage wrapper for RealityMix
 */
export const Storage = {
    /**
     * Set a value in localStorage
     * @param {string} key - Storage key
     * @param {any} value - Value to store (JSON-serializable)
     */
    set(key, value) {
      try {
        localStorage.setItem(`realitymix_${key}`, JSON.stringify(value));
      } catch (err) {
        console.warn(`Failed to set storage key "${key}":`, err);
      }
    },
  
    /**
     * Get a value from localStorage
     * @param {string} key - Storage key
     * @param {any} [defaultValue=null] - Fallback value
     * @returns {any}
     */
    get(key, defaultValue = null) {
      try {
        const value = localStorage.getItem(`realitymix_${key}`);
        return value ? JSON.parse(value) : defaultValue;
      } catch (err) {
        console.warn(`Failed to get storage key "${key}":`, err);
        return defaultValue;
      }
    },
  
    /**
     * Remove a key from localStorage
     * @param {string} key - Storage key
     */
    remove(key) {
      localStorage.removeItem(`realitymix_${key}`);
    },
  
    /**
     * Clear all RealityMix storage keys
     */
    clear() {
      Object.keys(localStorage)
        .filter(key => key.startsWith('realitymix_'))
        .forEach(key => localStorage.removeItem(key));
    }
  };
  