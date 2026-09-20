'use client';

import { motion } from 'motion/react';

const silos = [
  { label: 'Finance.xls', rotate: -11, x: '-34%', y: '-28%', delay: 0 },
  { label: 'Grants.xlsx', rotate: 8, x: '28%', y: '-32%', delay: 0.08 },
  { label: 'Procurement', rotate: -5, x: '-22%', y: '24%', delay: 0.16 },
  { label: 'Paper files', rotate: 12, x: '32%', y: '20%', delay: 0.24 },
];

export default function ExcelTrap() {
  return (
    <div
      className="relative mx-auto w-full max-w-md h-[240px] sm:h-[280px]"
      style={{ perspective: 1000 }}
      role="img"
      aria-label="Four disconnected files — Finance, Grants, Procurement, and paper — floating apart with no shared connection."
    >
      <svg className="absolute inset-0 w-full h-full opacity-25" aria-hidden>
        <line x1="32%" y1="32%" x2="68%" y2="30%" stroke="currentColor" strokeDasharray="4 6" className="text-[var(--accent-blue)]" />
        <line x1="32%" y1="32%" x2="38%" y2="68%" stroke="currentColor" strokeDasharray="4 6" className="text-[var(--accent-blue)]" />
        <line x1="68%" y1="30%" x2="70%" y2="66%" stroke="currentColor" strokeDasharray="4 6" className="text-[var(--accent-blue)]" />
        <line x1="38%" y1="68%" x2="70%" y2="66%" stroke="currentColor" strokeDasharray="4 6" className="text-[var(--accent-blue)]" />
      </svg>
      {silos.map((silo) => (
        <motion.div
          key={silo.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: silo.delay, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[44%] sm:w-[40%] rounded-lg border border-white/12 bg-[var(--graphite-black)] px-3 py-3 shadow-[var(--shadow-lg)]"
          style={{
            left: `calc(50% + ${silo.x})`,
            top: `calc(50% + ${silo.y})`,
            transform: `translate(-50%, -50%) rotate(${silo.rotate}deg)`,
          }}
        >
          <div className="mb-2 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[var(--accent-blue)]" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-white/90 truncate">{silo.label}</p>
          <div className="mt-2 space-y-1">
            <div className="h-1 w-full rounded-full bg-white/10" />
            <div className="h-1 w-4/5 rounded-full bg-white/10" />
            <div className="h-1 w-2/3 rounded-full bg-white/10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
