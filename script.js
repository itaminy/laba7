// Массив с URL изображений
const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
];

// Получаем элементы DOM
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const currentPageEl = document.getElementById('current-page');
const totalPagesEl = document.getElementById('total-pages');
const pageDots = document.querySelector('.page-dots');

// Переменные состояния
let currentSlide = 0;
let slidesPerView = 3;
const totalSlides = images.length;
let totalPages = Math.ceil(totalSlides / slidesPerView);

// Инициализация галереи
function initGallery() {
    updateSlidesPerView();
    createSlides();
    createPagerDots();
    updateGallery();
}

// Создание слайдов
function createSlides() {
    slider.innerHTML = '';
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${image}" alt="Изображение ${index + 1}">`;
        slider.appendChild(slide);
    });
}

// Создание точек пейджера
function createPagerDots() {
    pageDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToPage(i));
        pageDots.appendChild(dot);
    }
    totalPagesEl.textContent = totalPages;
}

// Обновление количества слайдов на экране
function updateSlidesPerView() {
    if (window.innerWidth <= 600) {
        slidesPerView = 1;
    } else if (window.innerWidth <= 900) {
        slidesPerView = 2;
    } else {
        slidesPerView = 3;
    }
    totalPages = Math.ceil(totalSlides / slidesPerView);
}

// Обновление галереи
function updateGallery() {
    const slideWidth = 100 / slidesPerView;
    const translateX = -currentSlide * slideWidth;
    slider.style.transform = `translateX(${translateX}%)`;

    currentPageEl.textContent = Math.floor(currentSlide / slidesPerView) + 1;
    updatePagerDots();
}

// Обновление активной точки пейджера
function updatePagerDots() {
    const dots = document.querySelectorAll('.dot');
    const currentPage = Math.floor(currentSlide / slidesPerView);

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}

// Переход к определенной странице
function goToPage(pageIndex) {
    currentSlide = pageIndex * slidesPerView;
    updateGallery();
}

// Переход к следующему слайду
function nextSlide() {
    if (currentSlide < totalSlides - slidesPerView) {
        currentSlide += slidesPerView;
    } else {
        currentSlide = 0;
    }
    updateGallery();
}

// Переход к предыдущему слайду
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide -= slidesPerView;
    } else {
        currentSlide = totalSlides - slidesPerView;
    }
    updateGallery();
}

// Обработчики событий
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    updateSlidesPerView();
    createPagerDots();
    // Корректируем currentSlide, если он выходит за пределы
    if (currentSlide > totalSlides - slidesPerView) {
        currentSlide = Math.max(0, totalSlides - slidesPerView);
    }
    updateGallery();
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initGallery);