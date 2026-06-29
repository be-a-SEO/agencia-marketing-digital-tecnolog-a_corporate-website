/* ==========================================
   VILANOVA AGENCY - FUNCIONALIDADES GLOBALES
   ========================================== */

// Actualizar el año en el footer
document.addEventListener('DOMContentLoaded', function () {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Gestión del tema claro/oscuro
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Función para aplicar el tema
  function applyTheme(theme) {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
    } else {
      htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
      themeToggle.setAttribute('aria-label',
        theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'
      );
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  // Detectar preferencia guardada (por defecto, tema oscuro)
  const savedTheme = localStorage.getItem('vilanova-theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Por defecto, tema oscuro
    applyTheme('dark');
  }

  // Cambiar tema al hacer clic
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('vilanova-theme', newTheme);
    });
  }

  // Menú hamburguesa móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const willOpen = !mainNav.classList.contains('open');
      mainNav.classList.toggle('open', willOpen);
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      menuToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  // Desplegable de Servicios en el nav
  document.querySelectorAll('.nav-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var parentLi = toggle.closest('li');
      var willOpen = !parentLi.classList.contains('open');

      document.querySelectorAll('header nav li.open').forEach(function (li) {
        li.classList.remove('open');
        var btn = li.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        parentLi.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('header nav li')) {
      document.querySelectorAll('header nav li.open').forEach(function (li) {
        li.classList.remove('open');
        var btn = li.querySelector('.nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Botón "Subir"
  var backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Volver arriba');
  backToTop.textContent = '↑';
  document.body.appendChild(backToTop);

  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  function initFloatingCta() {
    var heroCta = document.querySelector('.hero-floating-cta');
    if (!heroCta) return;

    var heroSection = heroCta.closest('section[class^="hero-"]') || document.querySelector('section[class^="hero-"]');
    var stopSections = document.querySelectorAll('[data-floating-cta-stop], footer');

    if (!heroSection) return;

    var isHeroVisible = true;
    var visibleStopZones = new Set();

    function setFloatingCtaVisibility() {
      var shouldShow = !isHeroVisible && visibleStopZones.size === 0;

      heroCta.classList.toggle('is-floating', shouldShow);
      heroCta.classList.toggle('is-visible', shouldShow);

      document.body.classList.toggle('floating-cta-active', shouldShow);

      if (isHeroVisible || shouldShow) {
        heroCta.removeAttribute('aria-hidden');
        heroCta.removeAttribute('tabindex');
      } else {
        heroCta.setAttribute('aria-hidden', 'true');
        heroCta.setAttribute('tabindex', '-1');
      }
    }

    if ('IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        isHeroVisible = entries[0].isIntersecting;
        setFloatingCtaVisibility();
      }, { threshold: 0.05 });

      heroObserver.observe(heroSection);

      var bottomObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visibleStopZones.add(entry.target);
          } else {
            visibleStopZones.delete(entry.target);
          }
        });

        setFloatingCtaVisibility();
      }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

      stopSections.forEach(function (stopSection) {
        bottomObserver.observe(stopSection);
      });
      setFloatingCtaVisibility();
      return;
    }

    function updateFloatingCtaFallback() {
      var heroRect = heroSection.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      isHeroVisible = heroRect.bottom > 0 && heroRect.top < viewportHeight;
      visibleStopZones.clear();

      stopSections.forEach(function (stopSection) {
        var stopRect = stopSection.getBoundingClientRect();
        if (stopRect.top < viewportHeight * 0.85 && stopRect.bottom > 0) {
          visibleStopZones.add(stopSection);
        }
      });

      setFloatingCtaVisibility();
    }

    window.addEventListener('scroll', updateFloatingCtaFallback, { passive: true });
    window.addEventListener('resize', updateFloatingCtaFallback);
    updateFloatingCtaFallback();
  }

  initFloatingCta();

  // Migas de pan: se fijan al hacer scroll
  function initBreadcrumb() {
    var breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    var hero = breadcrumb.closest('section');
    if (!hero) return;

    function update() {
      breadcrumb.classList.toggle('breadcrumb--sticky', hero.getBoundingClientRect().top < 0);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  initBreadcrumb();

  function initContactFormValidation() {
    var form = document.querySelector('#formulario-contacto form');
    if (!form) return;

    form.noValidate = true;

    var rules = {
      nombre: {
        message: 'Introduce un nombre válido.',
        isValid: function (value) {
          return /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ſ' -]{3,50}$/.test(value.trim());
        }
      },
      empresa: {
        message: 'Introduce una empresa válida.',
        isValid: function (value) {
          return /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ſ0-9 .&-]{2,20}$/.test(value.trim());
        }
      },
      email: {
        message: 'Introduce un email válido.',
        isValid: function (value) {
          var trimmedValue = value.trim();
          return trimmedValue.length <= 80 && /^[A-Za-z0-9._%+-]{3,64}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedValue);
        }
      },
      telefono: {
        message: 'Introduce un teléfono válido de 9 dígitos.',
        isValid: function (value) {
          return /^[0-9]{9}$/.test(value.trim());
        }
      },
      mensaje: {
        message: 'El mensaje debe tener al menos 10 caracteres.',
        isValid: function (value) {
          var trimmedValue = value.trim();
          return trimmedValue.length >= 10 && trimmedValue.length <= 500;
        }
      },
      privacidad: {
        message: 'Debes aceptar la política de privacidad para enviar el mensaje.',
        isValid: function (_, field) {
          return field.checked;
        }
      }
    };

    function setFieldState(field, message) {
      var errorElement = document.getElementById(field.name + '-error');
      if (!errorElement) return;

      if (message) {
        field.setAttribute('aria-invalid', 'true');
        errorElement.textContent = message;
      } else {
        field.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
      }
    }

    function validateField(field) {
      var rule = rules[field.name];
      if (!rule) return true;

      var isValid = rule.isValid(field.value, field);
      setFieldState(field, isValid ? '' : rule.message);
      return isValid;
    }

    Object.keys(rules).forEach(function (fieldName) {
      var field = form.elements[fieldName];
      if (!field) return;

      field.setAttribute('aria-invalid', 'false');
      field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', function () {
        validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      var firstInvalidField = null;

      Object.keys(rules).forEach(function (fieldName) {
        var field = form.elements[fieldName];
        if (!field) return;

        if (!validateField(field) && !firstInvalidField) {
          firstInvalidField = field;
        }
      });

      if (firstInvalidField) {
        event.preventDefault();
        firstInvalidField.focus();
      }
    });
  }

  initContactFormValidation();

  /* ---------- SLIDERS DE TARJETAS (CARRUSEL INFINITO) ---------- */
  function initSliders() {
    var sliders = document.querySelectorAll('.slider-section');

    sliders.forEach(function (slider) {
      var wrapper = slider.querySelector('.slider-wrapper');
      var track = slider.querySelector('.slider-track');
      var prevBtn = slider.querySelector('.slider-prev');
      var nextBtn = slider.querySelector('.slider-next');

      if (!wrapper || !track || !prevBtn || !nextBtn) return;

      var originals = Array.prototype.slice.call(track.querySelectorAll('.slider-slide'));
      if (originals.length < 2) return;

      var firstClone = originals[0].cloneNode(true);
      var lastClone = originals[originals.length - 1].cloneNode(true);
      firstClone.setAttribute('aria-hidden', 'true');
      firstClone.classList.add('slider-clone');
      lastClone.setAttribute('aria-hidden', 'true');
      lastClone.classList.add('slider-clone');

      track.appendChild(firstClone);
      track.insertBefore(lastClone, originals[0]);

      var slides = Array.prototype.slice.call(track.querySelectorAll('.slider-slide'));
      var total = originals.length;
      var currentIndex = 1;
      var isTransitioning = false;

      function getSlideWidth() {
        return slides[0].offsetWidth + parseFloat(getComputedStyle(track).gap || 0);
      }

      function goToIndex(index, animate) {
        var slideWidth = getSlideWidth();
        track.style.scrollBehavior = animate ? 'smooth' : 'auto';
        track.scrollLeft = index * slideWidth;
      }

      function handleInfiniteJump() {
        var slideWidth = getSlideWidth();
        if (track.scrollLeft >= (total + 1) * slideWidth - slideWidth / 2) {
          track.style.scrollBehavior = 'auto';
          currentIndex = 1;
          track.scrollLeft = slideWidth;
        } else if (track.scrollLeft <= slideWidth / 2) {
          track.style.scrollBehavior = 'auto';
          currentIndex = total;
          track.scrollLeft = total * slideWidth;
        }
      }

      function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        goToIndex(currentIndex, true);
      }

      function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        goToIndex(currentIndex, true);
      }

      nextBtn.addEventListener('click', moveNext);
      prevBtn.addEventListener('click', movePrev);

      track.addEventListener('scroll', function () {
        if (!isTransitioning) return;
        window.clearTimeout(track._sliderTimeout);
        track._sliderTimeout = window.setTimeout(function () {
          handleInfiniteJump();
          isTransitioning = false;
        }, 80);
      }, { passive: true });

      window.addEventListener('resize', function () {
        goToIndex(currentIndex, false);
      });

      goToIndex(1, false);
    });
  }

  initSliders();
});
