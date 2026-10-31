(() => {
  "use strict";

  const comingSoonToast = document.querySelector("[data-coming-soon-toast]");
  let comingSoonTimer;

  document.querySelectorAll("[data-coming-soon]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (!comingSoonToast) return;

      comingSoonToast.hidden = false;
      comingSoonToast.classList.add("is-visible");
      window.clearTimeout(comingSoonTimer);
      comingSoonTimer = window.setTimeout(() => {
        comingSoonToast.classList.remove("is-visible");
        comingSoonToast.hidden = true;
      }, 1600);
    });
  });
})();
