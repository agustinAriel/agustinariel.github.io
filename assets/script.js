// Carrusel de banners de veterinarias
document.addEventListener('DOMContentLoaded', function() {
  const banners = document.querySelectorAll('.benefit-banner.visual');
  const prevBtn = document.getElementById('benefitPrev');
  const nextBtn = document.getElementById('benefitNext');
  const indicators = document.getElementById('benefitIndicators');
  let current = 0;

  function showBanner(idx) {
    banners.forEach((b, i) => {
      b.classList.toggle('active', i === idx);
    });
    // Actualizar indicadores
    if (indicators) {
      const dots = indicators.querySelectorAll('.indicator-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
    }
  }

  function createIndicators() {
    if (!indicators) return;
    indicators.innerHTML = '';
    banners.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'indicator-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Banner ${i+1}`);
      dot.setAttribute('tabindex', '0');
      dot.addEventListener('click', () => {
        current = i;
        showBanner(current);
      });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          current = i;
          showBanner(current);
        }
      });
      indicators.appendChild(dot);
    });
  }

  function nextBanner() {
    current = (current + 1) % banners.length;
    showBanner(current);
  }
  function prevBanner() {
    current = (current - 1 + banners.length) % banners.length;
    showBanner(current);
  }

  let autoplayInterval;
  function startAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      nextBanner();
    }, 4000);
  }
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  if (banners.length) {
    createIndicators();
    showBanner(current);
    nextBtn.addEventListener('click', () => {
      nextBanner();
      startAutoplay();
    });
    prevBtn.addEventListener('click', () => {
      prevBanner();
      startAutoplay();
    });
    if (indicators) {
      indicators.addEventListener('click', startAutoplay);
    }
    startAutoplay();
  }
  // Detener autoplay al salir de la página
  window.addEventListener('blur', stopAutoplay);
  window.addEventListener('focus', startAutoplay);
});
// Navegación responsive
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll suave a secciones
const navAnchors = document.querySelectorAll('.nav-links a, .hero-cta a');
navAnchors.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Animaciones al hacer scroll
const sections = document.querySelectorAll('.section');
const showOnScroll = () => {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', showOnScroll);
window.addEventListener('DOMContentLoaded', showOnScroll);

// Carrusel de galería Sobre mí (autoplay, sin flechas)
(function() {
  const gallery = document.querySelector('.about-gallery-carousel');
  if (!gallery) return;
  const images = gallery.querySelectorAll('.about-gallery-img');
  let current = 0;
  function showImg(idx) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }
  function nextImg() {
    current = (current + 1) % images.length;
    showImg(current);
  }
  showImg(current);
  setInterval(nextImg, 3000);
})();
