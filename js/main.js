/* ============================================================
   main.js — Scripts globales Clinidental
   Un único DOMContentLoaded, sin JS inline en ningún HTML
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ── 1. AÑO AUTOMÁTICO ──────────────────────────────────── */

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ── 2. HEADER — sombra al hacer scroll ─────────────────── */

  const header = document.querySelector('.site-header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // ejecutar al cargar por si ya hay scroll
  }


  /* ── 3. NAV TOGGLE (menú móvil) ─────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {

    // Abrir / cerrar al hacer clic en hamburguesa
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('show', !isOpen);
    });

    // Cerrar al hacer clic en cualquier link del nav
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Cerrar al hacer clic fuera del nav
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) closeNav();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    function closeNav() {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('show');
    }
  }


  /* ── 4. SCROLL SUAVE (anclas internas) ──────────────────── */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // ignorar href="#" puro
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ── 5. SCROLL REVEAL ────────────────────────────────────── */
  // Anima elementos con clase .reveal al entrar en el viewport

  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // solo animar una vez
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

  } else {
    // Fallback: mostrar todo sin animación
    revealEls.forEach(el => el.classList.add('visible'));
  }


  /* ── 6. CAROUSEL DE TESTIMONIOS ─────────────────────────── */

  const slides        = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn       = document.querySelector('.carousel-btn.prev');
  const nextBtn       = document.querySelector('.carousel-btn.next');
  const carouselWrap  = document.querySelector('.testimonials-carousel');

  if (slides.length > 0 && dotsContainer && prevBtn && nextBtn) {
    let current = 0;
    let timer   = null;

    // Crear dots dinámicamente con aria-label
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
      dot.setAttribute('type', 'button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

    // Autoplay
    function startTimer() {
      timer = setInterval(() => goTo(current + 1), 5500);
    }
    function stopTimer()  { clearInterval(timer); }
    function resetTimer() { stopTimer(); startTimer(); }

    startTimer();

    // Pausar con mouse
    if (carouselWrap) {
      carouselWrap.addEventListener('mouseenter', stopTimer);
      carouselWrap.addEventListener('mouseleave', startTimer);
    }

    // Pausar / reanudar con touch (móvil)
    let touchStartX = 0;
    slides[0].closest('.testimonials-carousel')?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopTimer();
    }, { passive: true });

    slides[0].closest('.testimonials-carousel')?.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
      startTimer();
    }, { passive: true });
  }


  /* ── 7. CAROUSEL DE SERVICIOS (services.html) ───────────── */

  const track   = document.querySelector('.carousel-track');
  const srvPrev = document.querySelector('.destacados .carousel-btn.prev');
  const srvNext = document.querySelector('.destacados .carousel-btn.next');

  if (track && srvPrev && srvNext) {
    let srvIndex = 0;
    const total  = track.children.length;

    function moveTo(index) {
      srvIndex = (index + total) % total;
      track.style.transform = `translateX(-${srvIndex * 100}%)`;
    }

    srvNext.addEventListener('click', () => moveTo(srvIndex + 1));
    srvPrev.addEventListener('click', () => moveTo(srvIndex - 1));

    // Swipe táctil en móvil
    let srvTouchX = 0;
    track.addEventListener('touchstart', (e) => {
      srvTouchX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = srvTouchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) moveTo(diff > 0 ? srvIndex + 1 : srvIndex - 1);
    }, { passive: true });
  }


  /* ── 8. TABS (services.html) ────────────────────────────── */

  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-content');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        // Desactivar todos
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(p => p.classList.remove('active'));

        // Activar el seleccionado
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const panel = document.getElementById(`panel-${target}`);
        if (panel) panel.classList.add('active');
      });
    });
  }


  /* ── 9. ACCORDION FAQ ───────────────────────────────────── */

  const accordionHeaders = document.querySelectorAll('.accordion-header');

  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(btn => {
      btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('active');

        // Cerrar todos los items abiertos
        accordionHeaders.forEach(other => {
          if (other !== btn && other.classList.contains('active')) {
            other.classList.remove('active');
            other.setAttribute('aria-expanded', 'false');
            const otherBody = other.nextElementSibling;
            if (otherBody) otherBody.classList.remove('open');
          }
        });

        // Abrir o cerrar el actual
        btn.classList.toggle('active', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));

        const body = btn.nextElementSibling;
        if (body) body.classList.toggle('open', !isOpen);
      });
    });
  }


  /* ── 10. BUSCADOR FAQ ───────────────────────────────────── */

  const faqSearch = document.getElementById('faq-search');

  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const term = faqSearch.value.toLowerCase().trim();
      const items = document.querySelectorAll('.accordion-item');

      items.forEach(item => {
        const question = item.querySelector('.accordion-header')?.textContent.toLowerCase() ?? '';
        const answer   = item.querySelector('.accordion-body')?.textContent.toLowerCase() ?? '';
        // Busca en la pregunta Y en la respuesta
        const match = !term || question.includes(term) || answer.includes(term);
        item.style.display = match ? '' : 'none';
      });

      // Mostrar / ocultar categorías si todos sus items están ocultos
      document.querySelectorAll('.accordion-category').forEach(cat => {
        let next = cat.nextElementSibling;
        let hasVisible = false;
        while (next && !next.classList.contains('accordion-category')) {
          if (next.classList.contains('accordion-item') && next.style.display !== 'none') {
            hasVisible = true;
          }
          next = next.nextElementSibling;
        }
        cat.style.display = hasVisible ? '' : 'none';
      });
    });
  }


  /* ── 11. LIGHTBOX ───────────────────────────────────────── */

  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn    = document.querySelector('.lightbox-close'); // selector correcto

  if (lightbox && lightboxImg) {

    // Abrir al hacer clic en una treatment-card
    document.querySelectorAll('.treatment-card').forEach(card => {
      card.addEventListener('click', () => {
        const src = card.getAttribute('data-img');
        if (!src) return;
        lightboxImg.src = src;
        lightboxImg.alt = card.querySelector('h3')?.textContent ?? 'Imagen ampliada';
        openLightbox();
      });
    });

    // Cerrar con el botón X
    closeBtn?.addEventListener('click', closeLightbox);

    // Cerrar al hacer clic en el fondo
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });

    function openLightbox() {
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // evitar scroll del fondo
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    }
  }


  /* ── 12. MODALES (Privacidad y Términos) ────────────────── */

  const privacyModal = document.getElementById('privacy-modal');
  const termsModal   = document.getElementById('terms-modal');
  const openPrivacy  = document.getElementById('open-privacy');
  const openTerms    = document.getElementById('open-terms');

  // Abrir modales
  openPrivacy?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(privacyModal);
  });

  openTerms?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(termsModal);
  });

  // Cerrar con botón X — válido para todos los modales de la página
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(privacyModal);
      closeModal(termsModal);
    });
  });

  // Cerrar al hacer clic en el fondo
  [privacyModal, termsModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(privacyModal);
      closeModal(termsModal);
    }
  });

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }


}); // fin DOMContentLoaded