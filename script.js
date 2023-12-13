
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });
});


const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentIndex = 0;
let itemsPerPage = 3; // Nombre d'éléments à afficher par vue par défaut
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;

function updateItemsPerPage() {
    if (window.innerWidth <= 370) {
        itemsPerPage = 1;
    } else if (window.innerWidth <= 800) {
        itemsPerPage = 2;
    } else {
        itemsPerPage = 3;
    }
}

function updateCarousel() {
            const translateX = -currentIndex * (100 / itemsPerPage);
            carousel.style.transform = `translateX(${translateX}%)`;
}

function handleDragStart(e) {
    isDragging = true;
    startPosition = e.clientX || e.touches[0].clientX;
    currentTranslate = currentIndex * (100 / itemsPerPage);
    carousel.style.transition = 'none';
  
    // Ajouter les écouteurs d'événements uniquement lorsqu'une action de glisser-déposer commence
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove);
  }

function handleDragMove(e) {
            if (!isDragging) return;
            const currentPosition = e.clientX || e.touches[0].clientX;
            const diffX = currentPosition - startPosition;
            const translateX = currentTranslate + (diffX / (carousel.clientWidth / itemsPerPage)) * 100;
            carousel.style.transform = `translateX(${translateX}%)`;
}

function handleDragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            currentTranslate = parseFloat(carousel.style.transform.replace('translateX(', '').replace('%)', ''));
            currentIndex = Math.round(-currentTranslate / (100 / itemsPerPage));
        
            // Retirer les écouteurs d'événements lorsque l'action de glisser-déposer se termine
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('touchmove', handleDragMove);
  

            if (currentIndex < 0) {
                currentIndex = carouselItems.length - itemsPerPage;
            } else if (currentIndex >= carouselItems.length - itemsPerPage) {
                currentIndex = 0;
            }

            carousel.style.transition = 'transform 0.5s ease-in-out';
            updateCarousel();
}

prevButton.addEventListener('click', () => {
            currentIndex = currentIndex === 0 ? carouselItems.length - itemsPerPage : currentIndex - 1;
            updateCarousel();
});

nextButton.addEventListener('click', () => {
            currentIndex = currentIndex === carouselItems.length - itemsPerPage ? 0 : currentIndex + 1;
            updateCarousel();
});

carousel.addEventListener('mousedown', handleDragStart);
carousel.addEventListener('touchstart', handleDragStart);

document.addEventListener('mousemove', handleDragMove);
document.addEventListener('touchmove', handleDragMove);

document.addEventListener('mouseup', handleDragEnd);
document.addEventListener('touchend', handleDragEnd);

window.addEventListener('resize', function () {
    updateItemsPerPage();
    updateCarousel();
});

updateItemsPerPage();
updateCarousel();




