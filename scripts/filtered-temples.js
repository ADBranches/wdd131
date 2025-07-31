// DOM Elements
const grid = document.querySelector('.grid');
const homeLink = document.querySelector('#home');
const oldLink = document.querySelector('#old');
const newLink = document.querySelector('#new');
const largeLink = document.querySelector('#large');
const smallLink = document.querySelector('#small');

// Temple Data Array
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/800x500/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/800x500/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/800x500/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/800x500/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Nairobi Kenya",
        location: "Nairobi, Kenya",
        dedicated: "2024, April, 21",
        area: 87000,
        imageUrl: "images/narirobi_kenya_temple.webp"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 107240,
        imageUrl: "images/tokyo_japan_temple.webp"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19500,
        imageUrl: "images/johannesburg_south_africa_temple.webp"
    }
];

// Displaying Temples func
function displayTemples(templesList) {
    grid.innerHTML = '';
    templesList.forEach(temple => {
        const card = document.createElement('figure');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <figcaption>${temple.templeName}</figcaption>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;
        
        grid.appendChild(card);
    });
}

// Filter Functions
function filterOldTemples() {
    const oldTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
    });
    displayTemples(oldTemples);
}

function filterNewTemples() {
    const newTemples = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year >= 2000;
    });
    displayTemples(newTemples);
}

function filterLargeTemples() {
    const largeTemples = temples.filter(temple => temple.area > 90000);
    displayTemples(largeTemples);
}

function filterSmallTemples() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    displayTemples(smallTemples);
}

// Event Listeners
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    displayTemples(temples);
});

oldLink.addEventListener('click', (e) => {
    e.preventDefault();
    filterOldTemples();
});

newLink.addEventListener('click', (e) => {
    e.preventDefault();
    filterNewTemples();
});

largeLink.addEventListener('click', (e) => {
    e.preventDefault();
    filterLargeTemples();
});

smallLink.addEventListener('click', (e) => {
    e.preventDefault();
    filterSmallTemples();
});

// Hamburger Menu Logic
document.getElementById('hamburger').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    const menuIcon = this.querySelector('.menu-icon');
    const closeIcon = this.querySelector('.close-icon');
    
    nav.classList.toggle('show');
    this.setAttribute('aria-expanded', nav.classList.contains('show'));

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

// Initializing
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
    
    displayTemples(temples);
});
