/* ============================================
   ASIF AHMED — Premium Author Website
   Main JavaScript
   ============================================ */

'use strict';

/* ---------- THEME SYSTEM ---------- */
const ThemeManager = {
  key: 'asif-theme',

  init() {
    const saved = localStorage.getItem(this.key);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || system;
    this.apply(theme, false);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(this.key)) {
        this.apply(e.matches ? 'dark' : 'light', true);
      }
    });
  },

  apply(theme, animate = true) {
    if (animate) {
      document.documentElement.style.transition = 'none';
      requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-theme', theme);
        requestAnimationFrame(() => {
          document.documentElement.style.transition = '';
        });
      });
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    this.updateToggle(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.key, next);
    this.apply(next, true);
  },

  updateToggle(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414zM1 11h3v2H1zm19 0h3v2h-3zM4.929 20.485l-1.414-1.414 2.121-2.121 1.414 1.414zM18.364 7.05l-1.414-1.414 2.121-2.121 1.414 1.414z"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }
};

/* ---------- LOADING SCREEN ---------- */
const Loader = {
  init() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        screen.classList.add('hidden');
        document.body.classList.add('page-transition');
      }, 1800);
    });
  }
};

/* ---------- NAVIGATION ---------- */
const Nav = {
  init() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navbar) {
      window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on outside click
      document.addEventListener('click', e => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });

      // Close on nav link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Active link highlighting
    this.setActiveLink();
  },

  setActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
      }
    });
  }
};

/* ---------- SCROLL PROGRESS ---------- */
const ScrollProgress = {
  init() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }
};

/* ---------- BACK TO TOP ---------- */
const BackToTop = {
  init() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

/* ---------- HERO SLIDESHOW ---------- */
const HeroSlideshow = {
  slides: [],
  dots: [],
  current: 0,
  timer: null,
  interval: 5000,

  init() {
    this.slides = document.querySelectorAll('.hero-bg-slide');
    this.dots = document.querySelectorAll('.hero-dot');
    if (!this.slides.length) return;

    this.slides[0].classList.add('active');
    if (this.dots[0]) this.dots[0].classList.add('active');

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    this.start();
  },

  goTo(index) {
    this.slides[this.current].classList.remove('active');
    if (this.dots[this.current]) this.dots[this.current].classList.remove('active');
    this.current = index;
    this.slides[this.current].classList.add('active');
    if (this.dots[this.current]) this.dots[this.current].classList.add('active');
  },

  next() {
    this.goTo((this.current + 1) % this.slides.length);
  },

  start() {
    this.timer = setInterval(() => this.next(), this.interval);
  }
};

/* ---------- SCROLL REVEAL ---------- */
const ScrollReveal = {
  init() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }
};

/* ---------- SMOOTH SCROLL ---------- */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
};

/* ---------- COUNTER ANIMATION ---------- */
const Counters = {
  init() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  },

  animate(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 1600;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + (el.getAttribute('data-suffix') || '');
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
};

/* ---------- NEWSLETTER FORM ---------- */
const Newsletter = {
  init() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button[type="submit"]');
        if (!input || !input.value) return;

        btn.textContent = 'সাবস্ক্রাইব হয়েছে ✓';
        btn.disabled = true;
        btn.style.background = '#22c55e';
        input.value = '';

        setTimeout(() => {
          btn.textContent = 'সাবস্ক্রাইব করুন';
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      });
    });
  }
};

/* ---------- CONTACT FORM ---------- */
const ContactForm = {
  init() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'পাঠানো হয়েছে ✓';
      btn.disabled = true;
      btn.style.background = '#22c55e';

      setTimeout(() => {
        btn.textContent = 'বার্তা পাঠান';
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
};

/* ---------- BOOK CARD HOVER PARALLAX ---------- */
const BookParallax = {
  init() {
    document.querySelectorAll('.book-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s var(--ease-smooth)';
      });
    });
  }
};

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Loader.init();
  Nav.init();
  ScrollProgress.init();
  BackToTop.init();
  HeroSlideshow.init();
  ScrollReveal.init();
  SmoothScroll.init();
  Counters.init();
  Newsletter.init();
  ContactForm.init();
  BookParallax.init();
});

// Expose theme toggle globally
window.toggleTheme = () => ThemeManager.toggle();