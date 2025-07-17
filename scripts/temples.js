document.getElementById('hamburger').addEventListener('click', () => {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('show');
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
