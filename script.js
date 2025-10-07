// Массив с URL изображений
const images = [
    'images/1-image.jpg',
    'images/2-image.jpg',
    'images/3-image.jpg',
    'images/4-image.jpg',
    'images/5-image.jpg',
    'images/6-image.jpg',
    'images/7-image.jpg',
    'images/8-image.jpg',
    'images/9-image.jpg'
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
