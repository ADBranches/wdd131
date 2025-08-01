// AR Filter Simulation
document.getElementById('apply-filter').addEventListener('click', () => {
    const upload = document.getElementById('upload');
    const preview = document.getElementById('ar-filter-preview');
    
    if (upload.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `
          <img src="${e.target.result}" 
               style="filter: hue-rotate(90deg) contrast(120%)" 
               alt="AR Filter Preview">
        `;
        localStorage.setItem('lastARImage', e.target.result); // Save to localStorage
      };
      reader.readAsDataURL(upload.files[0]);
    }
  });
  
  // Load last used image
  if (localStorage.getItem('lastARImage')) {
    document.getElementById('ar-filter-preview').innerHTML = `
      <img src="${localStorage.getItem('lastARImage')}" 
           style="filter: hue-rotate(90deg)" 
           alt="Last AR Preview">
    `;
  }