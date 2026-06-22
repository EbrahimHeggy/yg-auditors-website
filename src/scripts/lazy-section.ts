/**
 * Defers a section's (heavy, GSAP-importing) init callback until the section
 * scrolls near the viewport, instead of loading/running it on initial page load.
 * Keeps below-the-fold sections off the critical path for first paint / LCP.
 */
export function lazyInitSection(selector: string, init: () => void, rootMargin = '600px 0px') {
  const el = document.querySelector(selector);
  if (!el) return;
  const io = new IntersectionObserver((entries, obs) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      obs.disconnect();
      init();
    }
  }, { rootMargin });
  io.observe(el);
}
