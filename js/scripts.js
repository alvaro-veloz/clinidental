/* =========================================================
   scripts.js — Funciones principales del sitio web
   ========================================================= */

// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initSmoothScroll();
  initBackToTop();
  initGallery();
  initFAQ();
  initFormValidation();
  initThemeToggle();
  initLightbox();
  initDoctorCarousel();
});

/* =========================================================
   NAVBAR — Menú Responsive
   ========================================================= */
function initMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.classList.toggle("active");
    });
  }
}

/* =========================================================
   SCROLL SUAVE — Navegación fluida
   ========================================================= */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* =========================================================
   BOTÓN "VOLVER ARRIBA"
   ========================================================= */
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (btn) {
    window.addEventListener("scroll", () => {
      btn.classList.toggle("visible", window.scrollY > 300);
    });
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/* =========================================================
   GALERÍA DE IMÁGENES
   ========================================================= */
function initGallery() {
  const images = document.querySelectorAll(".gallery img");
  const modal = document.querySelector(".gallery-modal");
  const modalImg = document.querySelector(".gallery-modal img");
  const closeBtn = document.querySelector(".gallery-modal .close");

  if (images.length && modal && modalImg && closeBtn) {
    images.forEach((img) => {
      img.addEventListener("click", () => {
        modal.classList.add("open");
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
}

/* =========================================================
   FAQ — Preguntas frecuentes (acordeón)
   ========================================================= */
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });
}

/* =========================================================
   VALIDACIÓN DE FORMULARIOS
   ========================================================= */
function initFormValidation() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      let valid = true;
      const inputs = form.querySelectorAll("input[required], textarea[required]");
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.classList.add("error");
          valid = false;
        } else {
          input.classList.remove("error");
        }
        // Validación de email básica
        if (input.type === "email") {
          const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
          if (!regex.test(input.value.trim())) {
            input.classList.add("error");
            valid = false;
          }
        }
      });
      if (!valid) {
        e.preventDefault();
        alert("Por favor completa correctamente todos los campos requeridos.");
      }
    });
  });
}

/* =========================================================
   MODO OSCURO / CLARO
   ========================================================= */
function initThemeToggle() {
  const toggleBtn = document.querySelector(".theme-toggle");
  const body = document.body;
  if (toggleBtn) {
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-theme");
    }
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      localStorage.setItem(
        "theme",
        body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }
}

/* =========================================================
   LIGHTBOX PARA GALERÍA-GRID
   ========================================================= */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const galleryGridImgs = document.querySelectorAll(".gallery-grid img");

  if (lightbox && lightboxImg && closeBtn && galleryGridImgs.length) {
    galleryGridImgs.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
      });
    });
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }
}

/* =========================================================
   CARRUSEL DOCTOR
   ========================================================= */
function initDoctorCarousel() {
  const doctorSlides = document.querySelectorAll(".doctor-carousel .slide");
  const prevBtn = document.querySelector(".doctor-carousel .prev");
  const nextBtn = document.querySelector(".doctor-carousel .next");

  let currentSlide = 0;

  function showSlide(index) {
    doctorSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % doctorSlides.length;
    showSlide(currentSlide);
  }

  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + doctorSlides.length) % doctorSlides.length;
    showSlide(currentSlide);
  }

  if (doctorSlides.length) {
    showSlide(currentSlide);
    // Auto cambio cada 5s
    setInterval(nextSlide, 5000);
    // Botones manuales
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlideFunc);
  }
}

/* =========================================================
   EXPANSIÓN DE IMÁGENES EN SERVICIOS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.service-image').forEach(imageBox => {
    imageBox.addEventListener('click', () => {
      imageBox.classList.toggle('expanded');
    });
  });
});