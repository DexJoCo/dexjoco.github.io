(() => {
  "use strict";

  document.querySelectorAll("[data-citation]").forEach((citation) => {
    const copyBibtexButton = citation.querySelector("[data-copy-bibtex]");
    const bibtexCode = citation.querySelector("[data-bibtex]");

    if (copyBibtexButton && bibtexCode) {
      copyBibtexButton.addEventListener("click", async () => {
        const originalLabel = copyBibtexButton.textContent;

        try {
          await navigator.clipboard.writeText(bibtexCode.textContent.trim());
          copyBibtexButton.textContent = "Copied";
        } catch (error) {
          copyBibtexButton.textContent = "Failed";
        }

        window.setTimeout(() => {
          copyBibtexButton.textContent = originalLabel;
        }, 1600);
      });
    }
  });
})();
