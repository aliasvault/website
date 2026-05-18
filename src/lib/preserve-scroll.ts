/** Restore scroll after copy-link updates the URL hash (avoids fragment jump). */
export function preserveScrollPosition(scrollY: number) {
  requestAnimationFrame(() => {
    window.scrollTo(0, scrollY);
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  });
}
