/* ============================================
   SARORA AGRI SCIENCE — JAVASCRIPT
   ============================================ */

// ---------- Navbar scroll behaviour ----------
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ---------- Hamburger / Mobile Nav ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close on nav-link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// ---------- Floating Particles (Hero) ----------
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const emojis = ['🌾', '🍃', '🌿', '✨', '🌱', '🍀', '🌻', '🌸'];
  const count  = 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('particle');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const startLeft = Math.random() * 100;          // % across width
    const duration  = 8 + Math.random() * 14;       // 8–22 s
    const delay     = Math.random() * 16;            // stagger up to 16 s
    const size      = 0.7 + Math.random() * 0.9;    // 0.7–1.6 rem

    el.style.cssText = `
      left: ${startLeft}%;
      bottom: 0;
      font-size: ${size}rem;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(el);
  }
})();


// ---------- Scroll Reveal ----------
(function initReveal() {
  // Add .reveal class to target elements
  const targets = [
    '.stat-card',
    '.product-card',
    '.crop-tile',
    '.why-card',
    '.partner-logo',
    '.contact-info-card',
    '.contact-form-card',
    '.about-text',
    '.about-stats',
    '.section-title',
    '.section-subtitle',
    '.section-label'
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay for grid children
      el.style.transitionDelay = `${(i % 6) * 80}ms`;
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();


// ---------- Contact Form ----------
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn   = document.getElementById('submit-btn');

function highlightError(el) { el.style.borderColor = '#e53935'; }
function removeHighlight(el) { el.style.borderColor = ''; }

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput    = document.getElementById('name');
    const phoneInput   = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const cropInput    = document.getElementById('crop');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      highlightError(nameInput);
      isValid = false;
    } else {
      removeHighlight(nameInput);
    }

    // Validate Phone
    const cleanPhone = phoneInput.value.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      highlightError(phoneInput);
      isValid = false;
    } else {
      removeHighlight(phoneInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      highlightError(messageInput);
      isValid = false;
    } else {
      removeHighlight(messageInput);
    }

    if (isValid) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Opening Email... ⏳';

      // Build email body from form fields
      const subject = encodeURIComponent('Enquiry from Sarora Agri Science Website');
      const body = encodeURIComponent(
        `Name: ${nameInput.value.trim()}\n` +
        `Phone: ${phoneInput.value.trim()}\n` +
        `Crop / Requirement: ${cropInput.value.trim() || 'Not specified'}\n` +
        `\nMessage:\n${messageInput.value.trim()}\n\n` +
        `---\nSent from Sarora Agri Science website contact form.`
      );

      // Open the user's default email client addressed to the recipient
      window.location.href = `mailto:anujkumarbansal@gmail.com?subject=${subject}&body=${body}`;

      // Show success banner and reset form after a short delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message 🌿';
        formSuccess.style.display = 'block';
        contactForm.reset();

        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1000);
    }
  });
}


// ---------- Smooth scroll for all anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---------- Crop tile micro-animation on hover ----------
document.querySelectorAll('.crop-tile').forEach(tile => {
  tile.addEventListener('mouseenter', function () {
    this.querySelector('span').style.animation = 'bounce 0.4s ease';
  });
  tile.addEventListener('mouseleave', function () {
    this.querySelector('span').style.animation = '';
  });
});

// Add bounce keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.3); }
    70%  { transform: scale(0.9); }
    100% { transform: scale(1.15); }
  }
`;
document.head.appendChild(style);


// ---------- Stats counter animation ----------
function animateCount(el, target, isText) {
  if (isText) { el.textContent = target; return; }
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(step);
}

const statValues = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.trim();
      if (raw === '22+') animateCount(el, 22, false);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statValues.forEach(el => statsObserver.observe(el));


// ---------- Navbar active-link underline sync ----------
const navLinkStyle = document.createElement('style');
navLinkStyle.textContent = `
  .nav-link.active { color: var(--gold) !important; }
  #navbar.scrolled .nav-link.active { color: var(--green-dark) !important; }
  #navbar.scrolled .nav-link.active::after { width: 100%; }
`;
document.head.appendChild(navLinkStyle);


console.log('%c🌿 Sarora Agri Science', 'font-size:18px;color:#1B5E20;font-weight:bold;');
console.log('%cPowered by USA Technology — Nurturing India\'s Fields', 'color:#5D4037;');
