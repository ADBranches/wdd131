/**
 * Query a single element
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to query
 * @returns {Element|null}
 */
export const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Query all elements
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element to query
 * @returns {Element[]}
 */
export const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

/**
 * Create an element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} [options={}] - Attributes, class, or text content
 * @returns {Element}
 */
export function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'class') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else el.setAttribute(key, value);
  });
  return el;
}

/**
 * Append multiple children to a parent
 * @param {Element} parent - Parent element
 * @param {...Element} children - Child elements to append
 */
export function appendChildren(parent, ...children) {
  children.forEach(child => parent.appendChild(child));
}

/**
 * Remove an element safely
 * @param {Element} el - Element to remove
 */
export function removeEl(el) {
  if (el && el.parentNode) el.remove();
}
