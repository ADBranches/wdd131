import { $, createEl } from '../../js/utils/dom.js';
import { Modal } from '../../js/ui/modal.js';

/**
 * Community page
 */
export async function initCommunity() {
  const container = $('[data-ar-viewport]') || createEl('div', { class: 'container' });
  if (!$('[data-ar-viewport]')) document.body.appendChild(container);

  // Render static content
  container.innerHTML = `
    <h1>Community Hub</h1>
    <p>Join the discussion and share your AR creations!</p>
    <button class="ar-showcase-btn" aria-label="View AR showcase">AR Showcase</button>
  `;

  const showcaseBtn = $('.ar-showcase-btn', container);
  showcaseBtn.addEventListener('click', () => {
    Modal.show({
      title: 'AR Showcase',
      content: 'Coming soon: Share and view community AR models!',
      buttonText: 'Got it'
    });
  });

  return container;
}
