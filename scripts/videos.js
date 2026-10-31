(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = document.querySelectorAll("video");
  const manualPlayback = reduceMotion
    || window.matchMedia("(max-width: 720px), (pointer: coarse)").matches
    || navigator.connection?.saveData;

  // On phones, keep the poster until the visitor chooses to play a video.
  // This also preserves the native pause, seeking, and fullscreen controls.
  if (manualPlayback) {
    videos.forEach((video) => {
      video.removeAttribute("autoplay");
      video.pause();
      video.controls = true;
      video.addEventListener("play", () => {
        videos.forEach((other) => {
          if (other !== video && !other.paused) other.pause();
        });
      });
    });

    if ("IntersectionObserver" in window) {
      const pauseWhenHidden = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) entry.target.pause();
        });
      });
      videos.forEach((video) => pauseWhenHidden.observe(video));
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) videos.forEach((video) => video.pause());
    });
    return;
  }

  // Warm nearby videos without downloading every video on page load.
  const prepareVideo = (video) => {
    if (video.preload === "none") {
      video.preload = "metadata";
      video.load();
    }
  };

  if ("IntersectionObserver" in window) {
    const preloadWhenNear = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        prepareVideo(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "400px 0px", threshold: 0 });
    videos.forEach((video) => preloadWhenNear.observe(video));
  } else {
    videos.forEach(prepareVideo);
  }

  if ("IntersectionObserver" in window) {
    const visibleVideos = new Set();
    const playWhenVisible = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          visibleVideos.add(video);
          prepareVideo(video);
          if (!document.hidden) video.play().catch(() => {});
        } else {
          visibleVideos.delete(video);
          video.pause();
        }
      });
    }, { threshold: 0.1 });
    videos.forEach((video) => playWhenVisible.observe(video));

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        videos.forEach((video) => video.pause());
      } else {
        visibleVideos.forEach((video) => video.play().catch(() => {}));
      }
    });
  }
})();
