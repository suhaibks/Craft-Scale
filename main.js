/**
 * Craft&Scale - Client Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------
  // 1. Dynamic Footer Year
  // -----------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // -----------------------------------------------------------
  // 2. Mobile Drawer Navigation Toggle
  // -----------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu && menuIcon) {
    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    // Toggle menu click
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        closeMenu();
      } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking any nav link
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close when clicking outside of navbar
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------------------------
  // 3. EmailJS Form Dispatcher
  // -----------------------------------------------------------
  // Replace these with your active EmailJS credentials when ready:
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && submitBtn && formFeedback) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formFeedback.className = 'hidden';

      // Fallback demo mode if keys are not configured yet
      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        setTimeout(() => {
          formFeedback.textContent = 'Demo Mode: Form submitted! To receive real emails, configure your EmailJS keys in main.js.';
          formFeedback.className = 'rounded-md p-3 text-xs font-medium bg-emerald-50 text-emerald-700 block';
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Request';
        }, 800);
        return;
      }

      // Production Live Email Dispatch
      emailjs
        .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(() => {
          formFeedback.textContent = 'Thank you! Your request has been received. We will call or message you shortly.';
          formFeedback.className = 'rounded-md p-3 text-xs font-medium bg-emerald-50 text-emerald-700 block';
          contactForm.reset();
        })
        .catch(() => {
          formFeedback.textContent = 'Something went wrong. Please connect directly via WhatsApp or Phone.';
          formFeedback.className = 'rounded-md p-3 text-xs font-medium bg-red-50 text-red-700 block';
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Request';
        });
    });
  }
});
