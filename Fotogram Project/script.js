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


function openOverlay(index) {
    currentIndex = index;

    document.getElementById('overlay-title').innerText = images[currentIndex].title;
    document.getElementById('overlay-img').src = images[currentIndex].src;
    document.getElementById('overlay-img').alt = images[currentIndex].title;
    document.getElementById('overlay-counter').innerText = `Bild ${currentIndex + 1} von ${images.length}`;

  
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');

    
    
    setTimeout(() => {
        let closeBtn = document.getElementById('close-btn');
        if (closeBtn) closeBtn.focus();
    }, 50);
}


function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.add('d-none');
}


function changeImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    openOverlay(currentIndex);
}

function closeOverlayOnBackground(event) {
    if (event.target.id === 'overlay') {
        closeOverlay();
    }
}


window.addEventListener('keydown', function(event) {
    let overlay = document.getElementById('overlay');
    if (overlay && !overlay.classList.contains('d-none')) {
        if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'Escape') {
            closeOverlay();
        }
    }
});


renderGallery();