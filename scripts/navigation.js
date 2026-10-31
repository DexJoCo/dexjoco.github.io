(() => {
  "use strict";

  document.querySelectorAll("[data-navigation]").forEach((navigation) => {
    const navToggle = navigation.querySelector("[data-nav-toggle]");
    const siteNav = navigation.querySelector("[data-nav-menu]");

    if (navToggle && siteNav) {
      const closeNav = () => {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        siteNav.classList.remove("is-open");
      };

      navToggle.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
        siteNav.classList.toggle("is-open", !isOpen);
      });

      siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNav);
      });

      document.addEventListener("click", (event) => {
        if (!navigation.contains(event.target)) closeNav();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
          closeNav();
          navToggle.focus();
        }
      });

      window.matchMedia("(max-width: 720px)").addEventListener("change", closeNav);
    }
  });
})();
