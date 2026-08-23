/**
 * Research Journal Club — script.js
 * Mobile nav toggle, scroll shadow on sticky header, current-page highlighting.
 */

(function () {
  'use strict';

  /* Mobile Nav Toggle */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  var siteHeader = document.getElementById('siteHeader');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Lock / unlock body scroll on mobile
      document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
        document.body.classList.remove('menu-open');
      }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* Sticky Header Scroll Shadow */
  if (siteHeader) {
    var hasScrolled = false;
    window.addEventListener('scroll', function () {
      if (!hasScrolled && window.scrollY > 10) {
        siteHeader.classList.add('scrolled');
        hasScrolled = true;
      } else if (hasScrolled && window.scrollY <= 10) {
        siteHeader.classList.remove('scrolled');
        hasScrolled = false;
      }
    }, { passive: true });
  }

  /* Current Page Highlighting */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();
