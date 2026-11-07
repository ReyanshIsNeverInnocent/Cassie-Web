import { useEffect, useRef } from 'react';

/**
 * Soft cursor ring — a small translucent circle that spring-follows
 * the pointer and gently expands when hovering interactive elements.
 * No dots, no trail — just a quiet, elegant accompaniment.
 */
const BASE_SIZE  = 22;   // px diameter at rest
const HOVER_SIZE = 32;   // px diameter over buttons/links
const LERP       = 0.10; // spring factor — lower = smoother / laggier

export default function CursorTrail() {
  const ringRef  = useRef<HTMLDivElement>(null);
  const pos      = useRef({ x: -300, y: -300 });
  const cursor   = useRef({ x: -300, y: -300 });
  const hovering = useRef(false);
  const rafId    = useRef<number>(0);

  useEffect(() => {
    const scheduleTick = () => {
      if (!rafId.current) rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
      scheduleTick();
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      hovering.current = !!el.closest(
        'button, a, [role="button"], select, label, input, textarea',
      );
      scheduleTick();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    const tick = () => {
      pos.current.x += (cursor.current.x - pos.current.x) * LERP;
      pos.current.y += (cursor.current.y - pos.current.y) * LERP;

      const ring = ringRef.current;
      if (ring) {
        const s = hovering.current ? HOVER_SIZE : BASE_SIZE;
        ring.style.width     = `${s}px`;
        ring.style.height    = `${s}px`;
        ring.style.transform =
          `translate(${pos.current.x - s / 2}px, ${pos.current.y - s / 2}px)`;
      }

      if (
        Math.abs(cursor.current.x - pos.current.x) > 0.1 ||
        Math.abs(cursor.current.y - pos.current.y) > 0.1
      ) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        pos.current.x = cursor.current.x;
        pos.current.y = cursor.current.y;
        rafId.current = 0;
      }
    };

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      style={{
        position:     'fixed',
        top:          0,
        left:         0,
        width:        `${BASE_SIZE}px`,
        height:       `${BASE_SIZE}px`,
        borderRadius: '50%',
        border:       '1.5px solid hsl(var(--primary) / 0.45)',
        background:   'hsl(var(--primary) / 0.05)',
        pointerEvents:'none',
        zIndex:        9999,
        willChange:   'transform, width, height',
        transform:    'translate(-300px, -300px)',
        transition:   'width 180ms ease, height 180ms ease',
      }}
    />
  );
}
