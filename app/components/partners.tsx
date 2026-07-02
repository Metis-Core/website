'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TOKEN = 'pk_QHZuGKbCR9ubtD3lrFtZvA'
const LD = (domain: string) => `https://img.logo.dev/${domain}?token=${TOKEN}`

const clients = [
  { name: 'Google', logo: LD('google.com') },
  { name: 'Microsoft', logo: LD('microsoft.com') },
  { name: 'IBM', logo: LD('ibm.com') },
  { name: 'TotalEnergies', logo: LD('totalenergies.com') },
  { name: 'Oracle', logo: LD('oracle.com') },
  { name: 'Salesforce', logo: LD('salesforce.com') },
  { name: 'SAP', logo: LD('sap.com') },
  { name: 'Snowflake', logo: LD('snowflake.com') },
  { name: 'Tableau', logo: LD('tableau.com') },
  { name: 'Databricks', logo: LD('databricks.com') },
  { name: 'MongoDB', logo: LD('mongodb.com') },
]

export default function Partners() {
  return (
    <section className="w-full bg-white pb-24">
      <div className="max-w-6xl mx-auto px-10 flex flex-col gap-12">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col gap-5 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-graphite-black leading-tight">
            Trusted by industry leaders,<span className="text-graphite-grey"> globally and locally.</span>
          </h2>
          <p className="text-sm text-graphite-grey leading-relaxed max-w-xl mx-auto">
            Organisations that rely on us to keep their data working.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, white 60%, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, white 60%, transparent)' }} />

          <div
            className="flex w-max"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {[...clients, ...clients].map(({ name, logo }, i) => (
              <div
                key={`${name}-${i}`}
                className="relative flex flex-col items-center justify-center gap-3 h-28 w-44 shrink-0 px-6 group cursor-default overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-[#4A90D9] group-hover:w-full transition-all duration-500" />
                <img src={logo} alt={name} className="h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
