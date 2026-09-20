'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { brand } from '@/lib/brand';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = (delay = 0) => ({
  initial: false as const,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const blobs = [
  {
    size: 'min(72vw, 580px)',
    color: brand.accentBlueDark,
    opacity: 0.55,
    blur: 90,
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    top: '-12%', left: '-18%',
    animate: { x: [0, 55, 20, 0], y: [0, 35, 55, 0], rotate: [0, 18, -8, 0] },
    dur: 13,
  },
  {
    size: 'min(64vw, 500px)',
    color: '#1a4a80',
    opacity: 0.45,
    blur: 80,
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    top: '52%', left: '48%',
    animate: { x: [0, -45, 12, 0], y: [0, 22, -35, 0], rotate: [0, -14, 8, 0] },
    dur: 17,
  },
  {
    size: 'min(56vw, 440px)',
    color: brand.accentBlue,
    opacity: 0.25,
    blur: 100,
    borderRadius: '50% 50% 35% 65% / 45% 60% 40% 55%',
    top: '-14%', left: '62%',
    animate: { x: [0, 25, -22, 0], y: [0, 45, 18, 0], rotate: [0, 12, -6, 0] },
    dur: 21,
  },
];

export default function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section data-nav-hero className="relative w-full">
      <div className="absolute inset-0 overflow-hidden bg-[var(--graphite-black)]">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              backgroundColor: b.color,
              opacity: b.opacity,
              borderRadius: b.borderRadius,
              filter: `blur(${b.blur}px)`,
              willChange: 'transform',
            }}
            animate={reduced ? {} : b.animate}
            transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              `repeating-linear-gradient(0deg,${brand.accentBlue} 0,${brand.accentBlue} 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,${brand.accentBlue} 0,${brand.accentBlue} 1px,transparent 0,transparent 48px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 pt-[calc(var(--nav-offset)+1.5rem)] pb-12 sm:pb-16 lg:pb-20 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 min-h-[100dvh]">
        <motion.h1
          {...fade(0.16)}
          className="text-[1.75rem] sm:text-5xl lg:text-[4.75rem] font-bold leading-[1.08] text-white text-balance"
        >
          Coverage is not
          <br />
          <span className="text-[var(--accent-blue)]">a data system.</span>
        </motion.h1>

        <motion.p
          {...fade(0.24)}
          className="text-sm sm:text-base text-[var(--graphite-grey)] max-w-xl leading-relaxed px-1"
        >
          Uganda&apos;s 4G reaches almost everyone. Most organizations still run on Excel,
          paper folders, and departmental silos. That analog default is the work Metis is built for.
        </motion.p>

        <motion.div {...fade(0.32)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto max-w-md sm:max-w-none">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center gap-2 min-h-11 px-7 py-3 bg-[var(--accent-blue)] text-white text-sm font-medium tracking-wide hover:bg-[#3a7bc8] transition-colors duration-200 rounded-md"
          >
            Book a Consultation
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-11 px-7 py-3 border border-white/20 text-white/80 text-sm font-medium tracking-wide hover:border-white/50 hover:text-white transition-all duration-200 rounded-md"
          >
            Contact Us
          </Link>
        </motion.div>

        <motion.div
          {...fade(0.42)}
          className="mt-4 w-full max-w-lg grid grid-cols-2 gap-6 text-left sm:text-center"
        >
          <div>
            <p className="text-3xl sm:text-5xl font-bold text-white tabular-nums leading-none">96%</p>
            <p className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[var(--graphite-grey)]">
              4G coverage
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-5xl font-bold text-[var(--accent-blue)] tabular-nums leading-none">28%</p>
            <p className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[var(--graphite-grey)]">
              actually online
            </p>
          </div>
        </motion.div>
        <motion.p
          {...fade(0.5)}
          className="text-[11px] sm:text-xs text-[var(--graphite-grey)] max-w-md leading-relaxed"
        >
          Coverage is not usage. That gap is where Ugandan institutions stall — in Excel, folders, and silos.
        </motion.p>
      </div>
    </section>
  );
}
