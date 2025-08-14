import { $, createEl, appendChildren } from '../utils/dom.js';

/**
 * AR modal dialogs for RealityMix
 */
export class Modal {
  /**
   * Show a modal
   * @param {Object} options - Modal configuration
   * @param {string} options.title - Modal title
   * @param {string} options.content - Modal content
   * @param {string} [options.buttonText='Close'] - Button text
   * @param {Function} [options.onClose] - Close callback
   * @returns {Element} Modal element
   */
  static show(options = {}) {
    const { title, content, buttonText = 'Close', onClose } = options;

    const modal = createEl('div', { class: 'ar-overlay modal', role: 'dialog', 'aria-labelledby': 'modal-title' });
    const modalContent = createEl('div', { class: 'modal-content' });
    const titleEl = createEl('h2', { id: 'modal-title', text: title });
    const contentEl = createEl('p', { text: content });
    const closeBtn = createEl('button', { text: buttonText, 'aria-label': 'Close modal' });

    closeBtn.addEventListener('click', () => {
      Modal.hide(modal);
      if (onClose) onClose();
    });

    // Close on Escape key
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        Modal.hide(modal);
        if (onClose) onClose();
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);

    appendChildren(modalContent, titleEl, contentEl, closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Focus close button for accessibility
    closeBtn.focus();

    return modal;
  }

  /**
   * Hide a modal
   * @param {Element} modal - Modal element
   */
  static hide(modal) {
    if (modal) modal.remove();
  }
}
