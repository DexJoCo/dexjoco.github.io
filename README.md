# DexJoCo Homepage

Static project homepage for **DexJoCo: A Unified Benchmark and Toolkit for Task-Oriented Dexterous Manipulation on MuJoCo**.

## Structure

- `index.html` - static page content, semantic structure, and script declarations
- `style.css` - page styling
- `styles/mobile.css` - phone layout, typography, touch controls, and reduced-motion scrolling
- `scripts/videos.js` - nearby video preloading, visible playback, and reduced-motion handling
- `scripts/navigation.js` - mobile menu state and closing after navigation
- `scripts/carousels.js` - demo carousel scrolling and arrow availability
- `scripts/coming-soon.js` - temporary notice for links marked `data-coming-soon`
- `scripts/citation.js` - BibTeX clipboard action and result feedback
- `assets/` - images and demo videos used by the homepage

## Interaction modules

Each script initializes independently after the HTML is parsed (`defer`) and keeps
its state inside a private closure. There are no shared globals, script ordering
dependencies, runtime imports, or build requirements. Classic scripts preserve
direct `file://` preview as well as GitHub Pages hosting.

Use `data-*` attributes for behavior and CSS classes for presentation:

| Feature | Markup contract |
| --- | --- |
| Videos | Native `video` elements; preload and playback follow visibility and reduced-motion preferences |
| Navigation | `data-navigation` contains `data-nav-toggle` and `data-nav-menu` |
| Carousels | `data-carousel` contains `data-carousel-viewport`, `data-carousel-prev`, `data-carousel-next`, and cards marked `data-carousel-item`; optional `data-carousel-status` shows the current position |
| Coming soon | `data-coming-soon` links display the shared `data-coming-soon-toast` status element |
| Citations | `data-citation` contains a `data-copy-bibtex` button and `data-bibtex` code element |

Navigation, carousel, and citation state is scoped to each component, so additional
instances can be added independently. Missing component markup is skipped. Keep
content in HTML so it remains available without JavaScript; add new behavior in a
separate script and declare it with `defer` in `index.html`.

## Mobile behavior

At widths up to 720px, the DexJoCo2 gallery becomes a swipeable row with previous/
next buttons and a position indicator. The benchmark demo rows also support touch,
buttons, and arrow keys when their viewport is focused. Carousel steps use the
rendered card width and CSS gap, so spacing changes do not require script edits.

On small screens, devices with a coarse primary pointer, reduced-motion settings,
or data saver enabled, videos keep their posters and native controls until played.
Only one video plays at a time in this mode; leaving the viewport or hiding the page
pauses playback without automatically resuming. Desktop playback retains visibility-
based preloading and autoplay. The playback mode is selected when the page loads.

Keep the main article grid constrained with `minmax(0, 1fr)` and its children with
`min-width: 0`; long code blocks must scroll within their own container instead of
widening the entire page.

## Local Preview

This is a static site, so it can be previewed by opening `index.html` directly in a browser.

If you prefer serving it locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

This repository is intended to be published as a GitHub Pages site.
