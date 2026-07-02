'use client'

import Image from 'next/image'
import Link from 'next/link'

const links = {
  Services: [
    { label: 'Data Analytics',       href: '/services/data-analytics'   },
    { label: 'Business Intelligence', href: '/services/bi'              },
    { label: 'Data Engineering',      href: '/services/data-engineering' },
    { label: 'Strategic Consulting',  href: '/services/consulting'       },
    { label: 'Custom Reporting',      href: '/services/reporting'        },
    { label: 'Data Governance',       href: '/services/governance'       },
  ],
  Company: [
    { label: 'Who We Are', href: '/about'    },
    { label: 'Careers',    href: '/careers'  },
    { label: 'Partners',   href: '/partners' },
    { label: 'News',       href: '/news'     },
  ],
  Connect: [
    { label: 'Consultation', href: '/consultation' },
    { label: 'Contact Us',   href: '/contact'      },
    { label: 'LinkedIn',     href: '#'             },
    { label: 'Twitter / X',  href: '#'             },
  ],
}

export default function Footer() {
  return (
    <footer className="w-full bg-graphite-black">

      <div className="w-full border-b border-white/6">
        <div className="mx-auto px-10 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Ready to make your data work?
            </h2>
            <p className="text-sm text-graphite-grey max-w-md leading-relaxed">
              Book a free consultation and we will map out exactly how we can help your organisation.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/consultation"
              className="px-7 py-3 bg-[#4A90D9] text-white text-sm font-medium tracking-wide hover:bg-[#3a7bc8] transition-colors duration-200 whitespace-nowrap"
            >
              Book a Consultation
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 border border-white/20 text-white/80 text-sm font-medium tracking-wide hover:border-white/50 hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto px-10 py-16 grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-16">

        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-4 w-fit">
            <Image
              src="/assets/PNG/LOGO WHITE.png"
              alt="Metis Analytica"
              width={300}
              height={250}
              className="object-contain scale-105"
            />
          </Link>
          <p className="text-xs text-graphite-grey leading-relaxed max-w-xs">
            Reliable data. Smarter operations. We help organisations turn
            complex data into decisions that move the business forward.
          </p>
          <div className="flex items-center gap-1 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A90D9] animate-pulse" />
            <span className="text-[10px] text-graphite-grey/60 tracking-widest uppercase ml-2">
              Trusted across Africa & beyond
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {Object.entries(links).map(([group, items]) => (
            <div key={group} className="flex flex-col gap-5">
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white">
                {group}
              </span>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs text-graphite-grey hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <div className="border-t border-white/6">
        <div className="mx-auto px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[10px] text-graphite-grey/40 tracking-wide">
            © {new Date().getFullYear()} Metis Analytica. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] text-graphite-grey/40 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
