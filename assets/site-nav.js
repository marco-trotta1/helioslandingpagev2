(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var dropdown = document.querySelector('.site-header__dropdown');
  var dropdownToggle = document.querySelector('.site-header__dropdown-toggle');
  var dropdownMenu = document.getElementById('resourcesMenu');
  var menuToggle = document.getElementById('navMenuToggle');
  var mobileMenu = document.getElementById('mobileMenu');

  if (!header || !dropdown || !dropdownToggle || !dropdownMenu || !menuToggle || !mobileMenu) return;

  function setDropdownOpen(open) {
    dropdown.classList.toggle('is-open', open);
    dropdownToggle.setAttribute('aria-expanded', String(open));
    dropdownMenu.hidden = !open;
  }

  function setMobileMenuOpen(open) {
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.documentElement.classList.toggle('menu-open', open);
    if (open) setDropdownOpen(false);
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var resourcePages = [
    'research.html',
    'irrigation-scheduling.html',
    'soil-moisture-forecasting.html',
    'how-helios-helps.html',
    'machine-learning.html'
  ];

  if (currentPage === 'index.html') {
    header.querySelector('.site-header__brand').setAttribute('aria-current', 'page');
  }

  header.querySelectorAll('[data-site-page]').forEach(function (link) {
    if (link.getAttribute('data-site-page') !== currentPage) return;
    link.classList.add('is-current');
    link.setAttribute('aria-current', 'page');
  });

  if (resourcePages.indexOf(currentPage) !== -1) {
    dropdownToggle.classList.add('is-current');
    dropdownToggle.setAttribute('aria-current', 'page');
  }

  header.querySelectorAll('[data-site-resource-page]').forEach(function (link) {
    if (link.getAttribute('data-site-resource-page') !== currentPage) return;
    link.classList.add('is-current');
    link.setAttribute('aria-current', 'page');
  });

  dropdownToggle.addEventListener('click', function () {
    setDropdownOpen(dropdownMenu.hidden);
  });

  menuToggle.addEventListener('click', function () {
    setMobileMenuOpen(mobileMenu.hidden);
  });

  header.querySelectorAll('.site-header__mobile-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMobileMenuOpen(false);
    });
  });

  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    var menuWasOpen = !mobileMenu.hidden;
    var dropdownWasOpen = !dropdownMenu.hidden;
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (dropdownWasOpen) dropdownToggle.focus();
    else if (menuWasOpen) menuToggle.focus();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setMobileMenuOpen(false);
  });

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 16);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();
