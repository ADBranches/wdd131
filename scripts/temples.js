document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

document.getElementById('hamburger').addEventListener('click', function() {
  const nav = document.querySelector('nav ul');
  const menuIcon = this.querySelector('.menu-icon');
  const closeIcon = this.querySelector('.close-icon');
  
  // Toggle nav visibility
  nav.classList.toggle('show');
  
  // Toggle icons
  if (nav.classList.contains('show')) {
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    closeIcon.removeAttribute('hidden'); // Ensure hidden attribute is removed
  } else {
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    closeIcon.setAttribute('hidden', ''); // Add hidden attribute back
  }
});

// document.getElementById('hamburger').addEventListener('click', function() {
//   const nav = document.querySelector('nav ul');
//   const hamburgerIcon = this.querySelector('.menu-icon');
//   const closeIcon = this.querySelector('.close-icon');
//   nav.classList.toggle('show');
//   hamburgerIcon.hidden = nav.classList.contains('show');
//   closeIcon.hidden = !nav.classList.contains('show');
// });


