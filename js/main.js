const iconMenu = document.querySelector('.nav__icon');
const bodyMenu = document.querySelector('.nav__row');
const navList = document.querySelector('.navigation-list');
const nav = document.querySelector('.nav');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const slides = document.querySelectorAll('.slider__item');
const dots = document.querySelectorAll('.dot');
function onScrollNav() {
  return () => {
    if (!iconMenu.classList.contains('_active')) {
      nav.style.transition = 'all .2s ease-in-out';
      if (window.pageYOffset >= nav.clientHeight) {
        nav.style.backgroundColor = 'rgb(54, 52, 52)';
        nav.style.zIndex = '4';
      } else {
        nav.style.backgroundColor = 'transparent';
      }
    }
  };
}
window.addEventListener('scroll', onScrollNav());

const elements = document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    if (iconMenu.classList.contains('_active')) {
      document.documentElement.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      bodyMenu.classList.remove('_active');
      navList.classList.remove('_active');
    }
    e.preventDefault();
    const blockId = anchor.getAttribute('href').substring(1);
    document.getElementById(blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
});

if (iconMenu) {
  iconMenu.addEventListener('click', () => {
    document.documentElement.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    bodyMenu.classList.toggle('_active');
    navList.classList.toggle('_active');
  });
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  slides.forEach((slide) => (slide.style.display = 'none'));
  dots.forEach((dot) => dot.classList.remove('active'));
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].classList.add('active');
}
btnNext.addEventListener('click', () => {
  plusSlides(1);
});
btnPrev.addEventListener('click', () => {
  plusSlides(-1);
});
dots.forEach((dot) =>
  dot.addEventListener('click', (_, index) => {
    currentSlide(index + 1);
  }),
);
