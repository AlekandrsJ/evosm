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

// Close mobile menu when a link is clicked
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
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
});

// ====== Smooth scroll for anchor links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ====== Scroll-triggered animations ======
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    '.service-card, .project-card, .testimonial-card, .stat, .about__image-wrap, .about__content, .contact__info, .contact__form-wrap'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 60}ms`;
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// Add animate-in class style
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

animateOnScroll();

// ====== Contact Form Handler ======
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sent!';
  btn.style.background = '#2a6b3a';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 2000);
});
