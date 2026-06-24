(function () {
  "use strict";

  // ===== HAMBURGER MENU (MOBILE) =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", isOpen);
    navOverlay.classList.toggle("open", isOpen);
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  hamburger.addEventListener("click", () => toggleMenu());

  navOverlay.addEventListener("click", () => toggleMenu(false));

  // Close menu when a nav link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      toggleMenu(false);
    }
  });

  // ===== REVEAL ON SCROLL =====
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // ===== HEADER BLUR ON SCROLL =====
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");
  const lightboxOverlay = lightbox.querySelector(".lightbox-overlay");
  const lightboxPrev = lightbox.querySelector(".lightbox-prev");
  const lightboxNext = lightbox.querySelector(".lightbox-next");
  const lightboxCounter = lightbox.querySelector(".lightbox-counter");
  const workFigures = document.querySelectorAll(".work-grid figure");

  let currentIndex = 0;

  function openLightbox(index) {
    if (!workFigures.length) return;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    const figure = workFigures[currentIndex];
    const src = figure.getAttribute("data-src");
    const caption = figure.getAttribute("data-caption") || figure.querySelector("figcaption")?.textContent || "Obra realizada";
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = (currentIndex + 1) + " / " + workFigures.length;
  }

  function goPrev() {
    if (workFigures.length === 0) return;
    currentIndex = (currentIndex - 1 + workFigures.length) % workFigures.length;
    updateLightbox();
  }

  function goNext() {
    if (workFigures.length === 0) return;
    currentIndex = (currentIndex + 1) % workFigures.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  workFigures.forEach((figure, i) => {
    figure.addEventListener("click", () => openLightbox(i));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", goPrev);
  lightboxNext.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinkAnchors = document.querySelectorAll(".nav-links a");

  function updateActiveLink() {
    let current = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinkAnchors.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href").replace("#", "");
      if (href === current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
})();
