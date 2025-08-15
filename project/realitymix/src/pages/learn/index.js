import { $, createEl } from '../../js/utils/dom.js';
import { Modal } from '../../js/ui/modal.js';
import { loadARModule } from '../../js/utils/loader.js';

/**
 * Learn page
 */
export async function initLearn() {
  const container = $('[data-ar-viewport]') || createEl('div', { class: 'container' });
  if (!$('[data-ar-viewport]')) document.body.appendChild(container);

  container.innerHTML = `
    <h1>Learn AR</h1>
    <p>Explore educational 3D models and AR experiences.</p>
    <button class="ar-demo-btn" aria-label="Try AR demo">Try AR Demo</button>
  `;

  const demoBtn = $('.ar-demo-btn', container);
  demoBtn.addEventListener('click', async () => {
    try {
      const { default: initMarkerTracking } = await loadARModule('marker-tracking');
      const scene = await import('../../js/ar/core/scene.js').then(m => m.initScene());
      await initMarkerTracking(scene, {
        modelPath: 'educational/sample.glb',
        modelOptions: { scale: 0.3 }
      });
      Modal.show({
        title: 'AR Demo',
        content: 'Point your camera at a Hiro marker to view the educational model.'
      });
    } catch (err) {
      Modal.show({
        title: 'Error',
        content: 'Failed to load AR demo. Try again later.'
      });
    }
  });

  return container;
}
