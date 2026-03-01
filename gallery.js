// ====== Mobile Navigation Toggle ======
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const iconMenu = navToggle.querySelector('.icon-menu');
const iconClose = navToggle.querySelector('.icon-close');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('active');
  iconMenu.style.display = isOpen ? 'none' : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    iconMenu.style.display = 'block';
    iconClose.style.display = 'none';
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

// ====== Navbar scroll effect ======
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ====== Category Filter ======
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('filter-btn--active'));
    btn.classList.add('filter-btn--active');

    const filter = btn.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.classList.remove('hidden');
        // Re-trigger animation
        item.classList.remove('animate-in');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('animate-in');
          });
        });
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ====== Lightbox ======
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function getVisibleItems() {
  return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  const visible = getVisibleItems();
  if (index < 0 || index >= visible.length) return;
  currentIndex = index;

  const item = visible[index];
  const img = item.querySelector('img');
  const title = item.querySelector('.gallery-item__title');

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = title ? title.textContent : '';

  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  const visible = getVisibleItems();
  currentIndex = (currentIndex + direction + visible.length) % visible.length;
  openLightbox(currentIndex);
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const visible = getVisibleItems();
    const idx = visible.indexOf(item);
    if (idx !== -1) openLightbox(idx);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ====== Scroll-triggered animations ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

galleryItems.forEach((item, index) => {
  item.style.transitionDelay = `${(index % 4) * 80}ms`;
  observer.observe(item);
});
