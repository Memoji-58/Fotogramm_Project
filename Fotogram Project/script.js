let images = [
  { src: './assets/img/alaska-lake-mountains.jpg', title: 'Alaska' },
  { src: './assets/img/city-rain-night.jpg', title: 'City-Rain' },
  { src: './assets/img/dark-clouds-sky.png', title: 'Dark Clouds' },
  { src: './assets/img/bluebird-on-branch.jpg', title: 'Bluebird' },
  { src: './assets/img/earth-from-space.jpg', title: 'Earth Space' },
  { src: './assets/img/mountain-reflection-lake.jpg', title: 'Mountain Lake' },
  { src: './assets/img/duck-water-splash.jpg', title: 'Duck Water' },
  { src: './assets/img/man-standing-on-rock.jpg', title: 'Night Rock' },
  { src: './assets/img/small-bird-on-rock.jpg', title: 'Small Bird' },
  { src: './assets/img/snow-leopard-rock.jpg', title: 'Snow Leopard' },
  { src: './assets/img/snowy-mountain-range.jpg', title: 'Snowy Mountain' },
  { src: './assets/img/winter-tree-snow.jpg', title: 'Winter Tree' }
];

let currentIndex = 0;

// Galerie-Vorschaubilder rendern bzw es nimmt die Bilder aus dem Array und fügt sie der Galerie
//  hinzu und erstellt die Buttons für die Bilder und die onclick Funktion um das Overlay zu öffnen
// noch mal vereinfacht (für mich)
// 1. Zuweisen mit getElementById('gallery-container') und in vriable (container) speichern 
// 2. Container leeren mit innerHTML = '' und dann die Schleife über das Array mit for-Schleife und der Länge des Arrays (images.length) und dem Index i bestimmen
// 3. In der Schleife den Container mit innerHTML += '...' füllen und die Inhalte der Bilder aus dem Array (images[i].src und images[i].title) einfügen
// 4. Die onclick Funktion openOverlay(i) aufrufen und den Index i übergeben, damit das richtige Bild im Overlay angezeigt wird.
function renderGallery() {
    let container = document.getElementById('gallery-container');
    container.innerHTML = '';

    for (let i = 0; i < images.length; i++) {
        container.innerHTML += `
            <article class="img-box">
                <button type="button" class="img-btn" onclick="openOverlay(${i})" aria-label="Bild ${images[i].title} öffnen">
                    <img src="${images[i].src}" alt="${images[i].title}">
                </button>
            </article>
        `;
    }
}

// Overlay öffnen und Inhalte tauschen
function openOverlay(index) {
    currentIndex = index;

    // Nur die Inhalte der Elemente aktualisieren
    document.getElementById('overlay-title').innerText = images[currentIndex].title;
    document.getElementById('overlay-img').src = images[currentIndex].src;
    document.getElementById('overlay-img').alt = images[currentIndex].title;
    document.getElementById('overlay-counter').innerText = `Bild ${currentIndex + 1} von ${images.length}`;

    // Overlay sichtbar machen
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');

    // Tastatur-Fokus setzen
    setTimeout(() => {
        let closeBtn = document.getElementById('close-btn');
        if (closeBtn) closeBtn.focus();
    }, 50);
}

// Overlay ausblenden
function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}

// Zum nächsten Bild schalten
function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    openOverlay(currentIndex);
}

// Zum vorherigen Bild schalten
function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    openOverlay(currentIndex);
}

// Klick auf den abgedunkelten Hintergrund schließt das Overlay
function closeOverlayOnBackground(event) {
    if (event.target.id === 'overlay') {
        closeOverlay();
    }
}

// Tastatursteuerung für Esc & Pfeiltasten
window.addEventListener('keydown', function(event) {
    let overlay = document.getElementById('overlay');
    if (overlay && !overlay.classList.contains('d-none')) {
        if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'ArrowLeft') {
            prevImage();
        } else if (event.key === 'Escape') {
            closeOverlay();
        }
    }
});

// Galerie beim Laden initialisieren
renderGallery();