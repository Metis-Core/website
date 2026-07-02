'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const fade = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
})

const metrics = [
    { label: 'Clients Served', value: '200+', sub: '+18 this quarter' },
    { label: 'Data Accuracy', value: '98%', sub: '↑ 0.3% vs last year' },
    { label: 'Reports Generated', value: '50K+', sub: 'This month' },
    { label: 'Years of Experience', value: '15+', sub: 'Since 2009' },
]

const blobs = [
    {
        size: 580,
        color: '#2a5f9e',
        opacity: 0.55,
        blur: 90,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        top: '-12%', left: '-8%',
        animate: { x: [0, 55, 20, 0], y: [0, 35, 55, 0], rotate: [0, 18, -8, 0] },
        dur: 13,
    },
    {
        size: 500,
        color: '#1a4a80',
        opacity: 0.45,
        blur: 80,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        top: '52%', left: '56%',
        animate: { x: [0, -45, 12, 0], y: [0, 22, -35, 0], rotate: [0, -14, 8, 0] },
        dur: 17,
    },
    {
        size: 440,
        color: '#4A90D9',
        opacity: 0.25,
        blur: 100,
        borderRadius: '50% 50% 35% 65% / 45% 60% 40% 55%',
        top: '-14%', left: '68%',
        animate: { x: [0, 25, -22, 0], y: [0, 45, 18, 0], rotate: [0, 12, -6, 0] },
        dur: 21,
    },
    {
        size: 360,
        color: '#6e6e6e',
        opacity: 0.18,
        blur: 70,
        borderRadius: '40% 60% 60% 40% / 55% 45% 55% 45%',
        top: '35%', left: '20%',
        animate: { x: [0, -20, 30, 0], y: [0, -25, 10, 0], rotate: [0, 8, -12, 0] },
        dur: 15,
    },
]

export default function Hero() {
    const reduced = useReducedMotion()

    return (
        <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-center">

            <div className="absolute inset-0 bg-graphite-black">
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
                    className="absolute inset-0 opacity-[0.028]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg,#9e9e9e 0,#9e9e9e 1px,transparent 0,transparent 48px),repeating-linear-gradient(90deg,#9e9e9e 0,#9e9e9e 1px,transparent 0,transparent 48px)',
                        backgroundSize: '48px 48px',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-10 py-24 flex flex-col items-center text-center gap-6">
                <motion.h1
                    {...fade(0.16, 28)}
                    className="text-6xl lg:text-[5.5rem] font-bold leading-[1.04] text-white"
                >
                    Reliable Data.
                    <br />
                    <span className="text-graphite-grey">Smarter Operations.</span>
                </motion.h1>

                <motion.p
                    {...fade(0.24, 20)}
                    className="text-base text-graphite-grey max-w-lg leading-relaxed"
                >
                    We transform complex data into clear, actionable insights — helping organisations
                    make confident decisions, streamline operations, and stay ahead.
                </motion.p>

                <motion.div {...fade(0.32, 16)} className="flex items-center gap-4 pt-2">
                    <Link
                        href="/consultation"
                        className="group flex items-center gap-2 px-7 py-3 bg-[#4A90D9] text-white text-sm font-medium tracking-wide hover:bg-[#3a7bc8] transition-colors duration-200"
                    >
                        Book a Consultation
                        <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </Link>
                    <Link
                        href="/contact"
                        className="px-7 py-3 border border-white/20 text-white/80 text-sm font-medium tracking-wide hover:border-white/50 hover:text-white transition-all duration-200"
                    >
                        Contact Us
                    </Link>
                </motion.div>

                <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                    {metrics.map(({ label, value, sub }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.42 + i * 0.09, ease }}
                            whileHover={{ y: -5, transition: { duration: 0.18 } }}
                            className="flex flex-col gap-2 p-5 text-left cursor-default"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(12px)',
                                willChange: 'transform',
                                rotate: `${i % 2 === 0 ? '-0.4' : '0.4'}deg`,
                            }}
                        >
                            <div className="w-5 h-px bg-[#4A90D9]/50 mb-1" />
                            <span className="text-[10px] text-graphite-grey tracking-[0.2em] uppercase">{label}</span>
                            <span className="text-4xl font-bold text-white leading-none">{value}</span>
                            <span className="text-[11px] text-[#4A90D9]">{sub}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    {...fade(0.88, 6)}
                    className="text-[10px] text-graphite-grey/50 tracking-[0.3em] uppercase mt-1"
                >
                    Trusted by enterprises across Africa & beyond
                </motion.p>

            </div>

            <motion.div
                {...fade(1.1, 0)}
                className="absolute bottom-8 flex flex-col items-center gap-2"
            >
                <span className="text-[9px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
                <motion.div
                    animate={reduced ? {} : { y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-8 bg-linear-to-b from-white/40 to-transparent"
                />
            </motion.div>

        </section>
    )
}
