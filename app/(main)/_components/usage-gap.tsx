'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const CELLS = 100;
const USED = 28;
const COVERED = 96;

export default function UsageGap() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setInstant(true);
      setLit(CELLS);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLit(CELLS);
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className="w-full">
      <div
        className="grid grid-cols-10 gap-1.5 sm:gap-2 mx-auto w-fit"
        role="img"
        aria-label="Of 100 people, 96 are covered by 4G, 28 actually use the internet, and 4 have no coverage."
      >
        {Array.from({ length: CELLS }, (_, i) => {
          const used = i < USED;
          const covered = i < COVERED;
          const show = i < lit;
          return (
            <span
              key={i}
              className="size-3 sm:size-4 lg:size-5 rounded-[2px] transition-all duration-500"
              style={{
                opacity: show ? 1 : 0.12,
                transform: show ? 'scale(1)' : 'scale(0.6)',
                transitionDelay: instant ? '0ms' : `${Math.min(i * 8, 800)}ms`,
                backgroundColor: used
                  ? 'var(--accent-blue)'
                  : covered
                    ? 'color-mix(in srgb, var(--accent-blue) 28%, transparent)'
                    : 'transparent',
                border: used
                  ? 'none'
                  : `1px solid color-mix(in srgb, var(--accent-blue) ${covered ? 55 : 22}%, transparent)`,
              }}
            />
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-[var(--muted)] tracking-wide">
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-[2px] bg-[var(--accent-blue)]" />
          28 using the internet
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-[2px]"
            style={{ background: 'color-mix(in srgb, var(--accent-blue) 28%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-blue) 55%, transparent)' }}
          />
          68 covered, unused
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-[2px] border border-[var(--accent-blue)]/20" />
          4 with no coverage
        </li>
      </ul>
    </div>
  );
}
