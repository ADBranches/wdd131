document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

document.getElementById('hamburger').addEventListener('click', function() {
  const nav = document.querySelector('nav ul');
  const hamburgerIcon = this.querySelector('.menu-icon');
  const closeIcon = this.querySelector('.close-icon');
  nav.classList.toggle('show');
  hamburgerIcon.hidden = nav.classList.contains('show');
  closeIcon.hidden = !nav.classList.contains('show');
});


