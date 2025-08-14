import { $, createEl } from '../utils/dom.js';

/**
 * AR tooltips for RealityMix
 */
export class Tooltips {
  /**
   * Show a tooltip
   * @param {Element} target - Element to attach tooltip to
   * @param {Object} options - Tooltip configuration
   * @param {string} options.content - Tooltip content
   * @param {string} [options.position='top'] - Position (top, bottom, left, right)
   * @returns {Element} Tooltip element
   */
  static show(target, options = {}) {
    const { content, position = 'top' } = options;
    const tooltip = createEl('div', {
      class: `ar-overlay tooltip tooltip-${position}`,
      text: content,
      role: 'tooltip'
    });

    target.appendChild(tooltip);

    // Handle hover/tap
    const show = () => tooltip.style.display = 'block';
    const hide = () => tooltip.style.display = 'none';

    target.addEventListener('mouseenter', show);
    target.addEventListener('mouseleave', hide);
    target.addEventListener('click', () => {
      tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    });

    return tooltip;
  }

  /**
   * Hide a tooltip
   * @param {Element} tooltip - Tooltip element
   */
  static hide(tooltip) {
    if (tooltip) tooltip.remove();
  }
}
