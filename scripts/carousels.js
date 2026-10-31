(() => {
  "use strict";

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const viewport = carousel.querySelector("[data-carousel-viewport]");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    if (!viewport || !prevButton || !nextButton) return;

    const firstCard = viewport.querySelector("[data-carousel-item]");
    if (!firstCard) return;

    const getStep = () => firstCard.getBoundingClientRect().width + 16;

    const updateButtons = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      prevButton.disabled = viewport.scrollLeft <= 4;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 4;
    };

    prevButton.addEventListener("click", () => {
      viewport.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
      viewport.scrollBy({ left: getStep(), behavior: "smooth" });
    });

    viewport.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    updateButtons();
  });
})();
