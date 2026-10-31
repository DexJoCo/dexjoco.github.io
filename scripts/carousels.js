(() => {
  "use strict";

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    if (!viewport || !prevButton || !nextButton) return;

    const cards = viewport.querySelectorAll("[data-carousel-item]");
    const firstCard = cards[0];
    if (!firstCard) return;

    const status = carousel.querySelector("[data-carousel-status]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const getStep = () => {
      const gap = parseFloat(window.getComputedStyle(firstCard.parentElement).columnGap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };
    const scroll = (direction) => {
      viewport.scrollBy({
        left: direction * getStep(),
        behavior: reduceMotion.matches ? "instant" : "smooth"
      });
    };

    const updateButtons = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      prevButton.disabled = viewport.scrollLeft <= 4;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 4;
      if (status) {
        const index = maxScroll > 0 && nextButton.disabled
          ? cards.length
          : Math.min(cards.length, Math.max(1, Math.round(viewport.scrollLeft / getStep()) + 1));
        const label = `${index} / ${cards.length}`;
        if (status.textContent !== label) status.textContent = label;
      }
    };

    prevButton.addEventListener("click", () => {
      scroll(-1);
    });

    nextButton.addEventListener("click", () => {
      scroll(1);
    });

    viewport.addEventListener("keydown", (event) => {
      // Leave native video controls and other child controls to the browser.
      if (event.target !== viewport) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      scroll(event.key === "ArrowLeft" ? -1 : 1);
    });

    viewport.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
})();
