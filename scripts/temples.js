document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

document.getElementById('hamburger').addEventListener('click', function() {
  const nav = document.querySelector('nav ul');
  const menuIcon = this.querySelector('.menu-icon');
  const closeIcon = this.querySelector('.close-icon');
  
  // Toggling nav visibility
  nav.classList.toggle('show');
  this.setAttribute('aria-expanded', nav.classList.contains('show'));

  // Toggling icons
  if (nav.classList.contains('show')) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    closeIcon.removeAttribute('hidden');
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    closeIcon.setAttribute('hidden', '');
  }
});


