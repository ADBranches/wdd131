import { $, createEl, appendChildren } from '../utils/dom.js';
import { Storage } from '../utils/storage.js';

/**
 * AR controls for RealityMix
 */
export class ARControls {
  /**
   * Initialize AR controls
   * @param {Element} container - Parent container (e.g., [data-ar-viewport])
   * @param {Object} options - Configuration
   * @param {Function} [options.onReset] - Callback for reset button
   * @param {Function} [options.onToggleModel] - Callback for model toggle
   * @returns {Element} Controls container
   */
  static init(container, options = {}) {
    const controls = createEl('div', { class: 'ar-overlay' });

    // Reset button
    const resetBtn = createEl('button', {
      text: 'Reset Scene',
      'aria-label': 'Reset AR scene',
      class: 'ar-control reset-btn'
    });
    resetBtn.addEventListener('click', () => {
      if (options.onReset) options.onReset();
      Storage.set('sceneReset', Date.now());
    });

    // Toggle model button
    const toggleBtn = createEl('button', {
      text: 'Toggle Model',
      'aria-label': 'Toggle 3D model visibility',
      class: 'ar-control toggle-btn'
    });
    toggleBtn.addEventListener('click', () => {
      const current = Storage.get('modelVisible', true);
      Storage.set('modelVisible', !current);
      if (options.onToggleModel) options.onToggleModel(!current);
    });

    appendChildren(controls, resetBtn, toggleBtn);
    container.appendChild(controls);

    return controls;
  }

  /**
   * Update control state
   * @param {Element} controls - Controls container
   * @param {Object} state - New state
   */
  static update(controls, state) {
    const toggleBtn = $('.toggle-btn', controls);
    if (state.modelVisible !== undefined) {
      toggleBtn.textContent = state.modelVisible ? 'Hide Model' : 'Show Model';
      toggleBtn.setAttribute('aria-label', state.modelVisible ? 'Hide 3D model' : 'Show 3D model');
    }
  }

  /**
   * Remove controls
   * @param {Element} controls - Controls container
   */
  static remove(controls) {
    if (controls) controls.remove();
  }
}
