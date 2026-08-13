/* ==========================================================================
   Kaffin Ahmad Mukhtasor — E-Portfolio PPL Terbimbing
   Shared interactivity: nav, mobile menu, scroll fx, parallax,
   lightbox gallery, back-to-top, skill bars, filters, forms,
   and the culture (budaya daerah) slider.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Fixed nav shrink + shadow ---------------- */
  var nav = document.querySelector(".site-nav");
  function onScrollNav() {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  document.addEventListener("DOMContentLoaded", onScrollNav);
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------------- Mobile hamburger menu ---------------- */
  var hamburger = document.querySelector(".hamburger");
  var mobilePanel = document.querySelector(".mobile-panel");

  function closeMenu() {
    if (!hamburger || !mobilePanel) return;
    hamburger.setAttribute("aria-expanded", "false");
    mobilePanel.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function openMenu() {
    if (!hamburger || !mobilePanel) return;
    hamburger.setAttribute("aria-expanded", "true");
    mobilePanel.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  if (hamburger && mobilePanel) {
    hamburger.addEventListener("click", function () {
      var isOpen = hamburger.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    mobilePanel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var url = new URL(link.href, window.location.href);
      var samePage = url.pathname.replace(/\/index\.html$/, "/") ===
        window.location.pathname.replace(/\/index\.html$/, "/");
      if (!samePage || !url.hash) return;
      var target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---------------- Scroll-triggered fade-ins ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------- Skill bars fill on view ---------------- */
  var bars = document.querySelectorAll(".skillbar");
  if ("IntersectionObserver" in window && bars.length) {
    var barIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            barIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(function (b) { barIO.observe(b); });
  } else {
    bars.forEach(function (b) { b.classList.add("is-visible"); });
  }

  /* ---------------- Parallax depth layers ---------------- */
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  var ticking = false;
  function updateParallax() {
    var y = window.scrollY;
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
      el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0)";
    });
    ticking = false;
  }
  if (!prefersReducedMotion && parallaxEls.length) {
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }

  /* ---------------- Back to top button ---------------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      function () {
        toTop.classList.toggle("is-shown", window.scrollY > 480);
      },
      { passive: true }
    );
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Lightbox gallery ---------------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  var lightbox = document.querySelector(".lightbox");
  if (galleryItems.length && lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCap = lightbox.querySelector(".lightbox-cap");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");
    var currentIndex = 0;
    var lastFocused = null;

    function showAt(index) {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[currentIndex];
      var fullSrc = item.getAttribute("data-full") || item.querySelector("img").src;
      var caption = item.getAttribute("data-caption") || "";
      lbImg.src = fullSrc;
      lbImg.alt = caption || "Foto galeri diperbesar";
      lbCap.textContent = caption;
    }
    function openLightbox(index) {
      lastFocused = document.activeElement;
      showAt(index);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function () { openLightbox(index); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", function () { showAt(currentIndex + 1); });
    prevBtn.addEventListener("click", function () { showAt(currentIndex - 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showAt(currentIndex + 1);
      if (e.key === "ArrowLeft") showAt(currentIndex - 1);
    });
  }

  /* ---------------- Filter pills (blog / gallery) ---------------- */
  var filterRow = document.querySelector(".filter-row");
  if (filterRow) {
    var pills = filterRow.querySelectorAll(".filter-pill");
    var filterable = document.querySelectorAll("[data-category]");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.classList.remove("is-active"); p.setAttribute("aria-pressed", "false"); });
        pill.classList.add("is-active");
        pill.setAttribute("aria-pressed", "true");
        var filter = pill.getAttribute("data-filter");
        filterable.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------------- Contact form (front-end only demo) ---------------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var success = document.querySelector(".form-success");
      if (form.checkValidity()) {
        form.reset();
        if (success) {
          success.classList.add("is-shown");
          success.setAttribute("role", "status");
          success.focus && success.focus();
        }
      } else {
        form.reportValidity();
      }
    });
  }

  /* ---------------- Culture / budaya slider (auto + manual) ---------------- */
  document.querySelectorAll(".culture-wrapper").forEach(function (wrapper) {
    var slider = wrapper.querySelector(".culture-slider");
    var prevSliderBtn = wrapper.querySelector(".prev-btn");
    var nextSliderBtn = wrapper.querySelector(".next-btn");
    if (!slider) return;

    function cardStep() {
      var card = slider.querySelector(".culture-card");
      if (!card) return 300;
      var style = window.getComputedStyle(slider);
      var gap = parseFloat(style.columnGap || style.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    if (nextSliderBtn) {
      nextSliderBtn.addEventListener("click", function () {
        slider.scrollBy({ left: cardStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    }
    if (prevSliderBtn) {
      prevSliderBtn.addEventListener("click", function () {
        slider.scrollBy({ left: -cardStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    }

    // Respect reduced-motion preference: no autoplay, manual controls only.
    if (prefersReducedMotion) return;

    var paused = false;
    ["mouseenter", "focusin", "touchstart"].forEach(function (evt) {
      slider.addEventListener(evt, function () { paused = true; }, { passive: true });
    });
    ["mouseleave", "focusout"].forEach(function (evt) {
      slider.addEventListener(evt, function () { paused = false; });
    });

    setInterval(function () {
      if (paused) return;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: cardStep(), behavior: "smooth" });
      }
    }, 5000);
  });

  /* ---------------- Active year in footer ---------------- */
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();