'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <header className="w-full bg-white px-12">
            <div className="px-12 h-24 flex items-center justify-between border-b border-graphite-grey/50">
                <Link href="/" >
                    <div className="flex items-center gap-6">
                        <Image
                            src="/assets/PNG/LOGO ICON DARK GREY.png"
                            alt="Metis Analytica"
                            width={50}
                            height={50}
                            className="object-contain scale-150"
                        />
                        <span className="text-2xl font-medium text-graphite-black hover:text-graphite-black transition-colors duration-200 tracking-wide"><b className='text-3xl'>Metis</b> Analytica</span>
                    </div>
                </Link>

                <nav className="flex items-center gap-8">
                    <Link
                        href="/consultation"
                        className="text-sm font-medium text-graphite-black hover:text-graphite-black transition-colors duration-200 tracking-wide"
                    >
                        Consultation
                    </Link>
                    <Link
                        href="/consultation"
                        className="text-sm font-medium text-graphite-black hover:text-graphite-black transition-colors duration-200 tracking-wide"
                    >
                        Services
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-graphite-black hover:text-graphite-black transition-colors duration-200 tracking-wide"
                    >
                        Who We Are
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium px-4 py-1.5 bg-graphite-black text-white hover:bg-graphite-black transition-colors duration-200 tracking-wide"
                    >
                        Contact Us
                    </Link>
                </nav>
            </div>
        </header>
    )
}
