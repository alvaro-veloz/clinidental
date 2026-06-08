/* =========================================
   main.js - Funciones globales Clinidental
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------
     1. NAV TOGGLE (mobile menu)
     ------------------------------ */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !expanded);

      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------
     2. FOOTER YEAR (auto update)
     ------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------
     3. SCROLL SUAVE (para anclas internas)
     ------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href");
      const targetEl = document.querySelector(targetID);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  /* ------------------------------
     4. LAZY LOADING (imágenes)
     ------------------------------ */
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imgObserver.observe(img));
  }
});

/* ------------------------------
   5. LIGHTBOX (solo en services)
   ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".treatment-card");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  if (cards.length > 0 && lightbox && lightboxImg) {
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const imgSrc = card.getAttribute("data-img");
        lightboxImg.src = imgSrc;
        lightbox.style.display = "flex";
      });
    });

    // Cerrar al hacer click en X
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
      });
    }

    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
});

/* ------------------------------
   6. TESTIMONIALS CAROUSEL (solo en home)
   ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (testimonials.length > 0 && dotsContainer && prevBtn && nextBtn) {
    let current = 0;
    let autoPlayInterval;

    // Crear dots
    testimonials.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);

      dot.addEventListener("click", () => {
        goToSlide(i);
      });
    });

    const dots = dotsContainer.querySelectorAll("button");

    function goToSlide(index) {
      testimonials[current].classList.remove("active");
      dots[current].classList.remove("active");

      current = (index + testimonials.length) % testimonials.length;

      testimonials[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function nextSlide() {
      goToSlide(current + 1);
    }

    function prevSlide() {
      goToSlide(current - 1);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Auto play
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    startAutoPlay();

    const carousel = document.querySelector(".testimonials-carousel");
    if (carousel) {
      carousel.addEventListener("mouseenter", stopAutoPlay);
      carousel.addEventListener("mouseleave", startAutoPlay);
    }
  }
});

/* ------------------------------
   7. MODALES (Privacy & Terms)
   ------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  const privacyModal = document.getElementById("privacy-modal");
  const termsModal = document.getElementById("terms-modal");
  const openPrivacy = document.getElementById("open-privacy");
  const openTerms = document.getElementById("open-terms");
  const closes = document.querySelectorAll(".modal .close");

  if (openPrivacy && privacyModal) {
    openPrivacy.addEventListener("click", (e) => {
      e.preventDefault();
      privacyModal.style.display = "block";
    });
  }

  if (openTerms && termsModal) {
    openTerms.addEventListener("click", (e) => {
      e.preventDefault();
      termsModal.style.display = "block";
    });
  }

  if (closes.length > 0) {
    closes.forEach(c => {
      c.addEventListener("click", () => {
        if (privacyModal) privacyModal.style.display = "none";
        if (termsModal) termsModal.style.display = "none";
      });
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === privacyModal) privacyModal.style.display = "none";
    if (e.target === termsModal) termsModal.style.display = "none";
  });
});
