import { useRef, useEffect } from 'react';

/**
 * Swipe left / right on an element, for moving between letters, words or
 * pictures. Works with a finger, a mouse drag and the arrow keys.
 *
 *   const ref = useSwipe({ onLeft: next, onRight: prev });
 *   <div ref={ref}> … </div>
 *
 * A swipe must be mostly sideways and longer than `min` pixels, so a tap on a
 * 3D block or a scroll up the page is never mistaken for one.
 */
export default function useSwipe({ onLeft, onRight, min = 45 }) {
  const ref = useRef(null);
  const cb = useRef({ onLeft, onRight });
  cb.current = { onLeft, onRight };

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let x0 = 0, y0 = 0, id = null;

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY;
    };

    const up = (e) => {
      if (id === null || e.pointerId !== id) return;
      id = null;
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      if (Math.abs(dx) < min || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      if (dx < 0) cb.current.onLeft && cb.current.onLeft();
      else cb.current.onRight && cb.current.onRight();
    };

    const key = (e) => {
      if (e.key === 'ArrowRight') cb.current.onLeft && cb.current.onLeft();
      else if (e.key === 'ArrowLeft') cb.current.onRight && cb.current.onRight();
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', () => { id = null; });
    window.addEventListener('keydown', key);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerup', up);
      window.removeEventListener('keydown', key);
    };
  }, [min]);

  return ref;
}
