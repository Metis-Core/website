'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const services = [
  {
    title: 'Data Analytics',
    description: 'Turn raw data into clear performance metrics and operational dashboards your team actually uses, every day.',
  },
  {
    title: 'Business Intelligence',
    description: 'Unified reporting across all departments — one source of truth, maintained and updated in real time.',
  },
  {
    title: 'Data Engineering',
    description: 'Robust pipelines that collect, clean, and deliver reliable data precisely where it needs to go.',
  },
  {
    title: 'Strategic Consulting',
    description: 'We work alongside your team to define data strategy, measurable KPIs, and clear operational outcomes.',
  },
  {
    title: 'Custom Reporting',
    description: 'Tailored reports and visualisations built around the questions your leadership is already asking.',
  },
  {
    title: 'Data Governance',
    description: 'Policies, standards, and tooling to keep your data accurate, consistent, secure, and audit-ready.',
  },
]

export default function Services() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-10 py-24 flex flex-col gap-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-5 max-w-2xl"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-graphite-black leading-tight">
            Professional-calibre analytics,{' '}
            <span className="text-graphite-grey">built with precision.</span>
          </h2>
          <p className="text-sm text-graphite-grey leading-relaxed max-w-xl">
            An event-driven, modular analytics engagement built for organisations that need
            accurate data, faster decisions, and operations that scale.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
          {services.map(({ title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className="relative flex flex-col gap-3 py-8 border-t border-graphite-black/10 overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 left-0 h-px w-0 bg-[#4A90D9] group-hover:w-full transition-all duration-500" />
              <h3 className="text-base font-semibold text-graphite-black">{title}</h3>
              <p className="text-sm text-graphite-grey leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
