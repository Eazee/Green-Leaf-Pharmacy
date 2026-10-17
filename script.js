// ===== Theme toggle =====
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("gl-theme");
  if (stored) root.setAttribute("data-theme", stored);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");

  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("gl-theme", next);
  });
})();

// ===== Mobile menu =====
(function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const links = navMenu.querySelectorAll("a");

  function closeMenu() {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    const isOpen = hamburger.classList.toggle("open");
    navMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
})();

// ===== FAQ toggle =====
(function () {
  const items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      // close all others
      items.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq-answer").style.maxHeight = null;
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();

// ===== Reveal on scroll =====
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { io.observe(el); });
})();

// ===== Book form =====
(function () {
  const form = document.getElementById("bookForm");
  const confirm = document.getElementById("bookConfirm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    confirm.hidden = false;
    form.reset();
  });
})();
