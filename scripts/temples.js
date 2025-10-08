document.addEventListener('DOMContentLoaded', function() {
    // Array de templos reales
    const temples = [
        { templeName: "Salt Lake Temple", location: "Salt Lake City, Utah, United States", dedicated: "1893, April, 6", area: 253000, imageUrl: "images/temple1.png" },
        { templeName: "Laie Hawaii Temple", location: "Laie, Hawaii, United States", dedicated: "1919, November, 27", area: 11250, imageUrl: "images/temple2.jpg" },
        { templeName: "Cardston Alberta Temple", location: "Cardston, Alberta, Canada", dedicated: "1923, August, 26", area: 25600, imageUrl: "images/temple3.jpg" },
        { templeName: "Rome Italy Temple", location: "Rome, Italy", dedicated: "2019, March, 10", area: 65000, imageUrl: "images/temple4.jpg" },
        { templeName: "Manila Philippines Temple", location: "Manila, Philippines", dedicated: "1984, July, 25", area: 15950, imageUrl: "images/temple5.jpg" },
        { templeName: "Tokyo Japan Temple", location: "Tokyo, Japan", dedicated: "1980, October, 27", area: 52667, imageUrl: "images/temple6.jpg" },
        { templeName: "Mexico City Mexico Temple", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
        { templeName: "Aba Nigeria Temple", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
        { templeName: "Payson Utah Temple", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
        { templeName: "Yigo Guam Temple", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
        { templeName: "Washington D.C. Temple", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
        { templeName: "Lima Perú Temple", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" }
    ];

    const container = document.getElementById('templeCards');

    function displayTemples(templesArray) {
        container.innerHTML = '';
        templesArray.forEach(t => {
            const card = document.createElement('figure');
            card.innerHTML = `
                <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
                <figcaption>
                    <strong>${t.templeName}</strong><br>
                    Location: ${t.location}<br>
                    Dedicated: ${t.dedicated}<br>
                    Area: ${t.area.toLocaleString()} sq ft
                </figcaption>
            `;
            container.appendChild(card);
        });
    }

    // Mostrar todos los templos al cargar
    displayTemples(temples);

    // Filtrado de templos
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const filter = link.textContent; // usar el texto del enlace
            let filtered = temples;

            switch(filter) {
                case 'Old':
                    filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
                    break;
                case 'New':
                    filtered = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
                    break;
                case 'Large':
                    filtered = temples.filter(t => t.area > 90000);
                    break;
                case 'Small':
                    filtered = temples.filter(t => t.area < 10000);
                    break;
                case 'Home':
                default:
                    filtered = temples;
                    break;
            }
            displayTemples(filtered);
        });
    });

    // Manejo de menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    function toggleNav() {
        const isOpen = nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.textContent = isOpen ? '✕' : '☰';
    }

    hamburger.addEventListener('click', toggleNav);

    document.addEventListener('click', e => {
        if(!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('open')){
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded','false');
            hamburger.textContent = '☰';
        }
    });

    nav.addEventListener('click', e => {
        if(e.target.tagName.toLowerCase()==='a' && nav.classList.contains('open')){
            nav.classList.remove('open');
            hamburger.setAttribute('aria-expanded','false');
            hamburger.textContent = '☰';
        }
    });

    // Footer dinámico
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified || new Date().toLocaleString();
});
