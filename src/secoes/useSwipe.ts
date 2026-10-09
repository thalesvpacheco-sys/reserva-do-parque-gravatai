import { useRef, type PointerEvent } from "react";

/* arrastar com o dedo/mouse: chama fn(-1|1) */
export function useSwipe(fn: (dir: number) => void, lim = 50) {
  const x0 = useRef<number | null>(null);
  return {
    onPointerDown: (e: PointerEvent) => {
      if ((e.target as Element).closest("button,a,input")) return;
      x0.current = e.clientX;
    },
    onPointerUp: (e: PointerEvent) => {
      if (x0.current === null) return;
      const dx = e.clientX - x0.current;
      x0.current = null;
      if (Math.abs(dx) > lim) fn(dx < 0 ? 1 : -1);
    },
    onPointerCancel: () => {
      x0.current = null;
    },
  };
}
