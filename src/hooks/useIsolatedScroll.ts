import { useEffect, useRef } from "react";

/**
 * Hook to isolate mouse wheel scrolling to a specific container.
 * - Stops propagation so Lenis smooth scroll on window does not scroll.
 * - Prevents default at boundaries (top/bottom) so the browser does NOT chain scroll to the main webpage.
 * Result: ONLY the inner container scrolls when mouse is inside; the main page never scrolls simultaneously.
 */
export function useIsolatedScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Stop bubbling so window / Lenis doesn't capture the wheel event
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isUp = e.deltaY < 0;
      const isDown = e.deltaY > 0;

      const canScrollUp = scrollTop > 0;
      const canScrollDown = Math.ceil(scrollTop + clientHeight) < scrollHeight;

      // If cannot scroll further in this direction, prevent browser scroll chaining
      if ((isUp && !canScrollUp) || (isDown && !canScrollDown)) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return ref;
}

/**
 * Hook to lock body and Lenis scroll when a modal / popup is open.
 */
export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.setAttribute("data-lenis-prevent", "true");

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.removeAttribute("data-lenis-prevent");
    };
  }, [isLocked]);
}
