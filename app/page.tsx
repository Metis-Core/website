'use client'

import Header from './components/header'
import Hero from './components/hero'
import Services from './components/services'
import Partners from './components/partners'
import Footer from './components/footer'

export default function Home() {
  return (
    <div className="w-screen">
      <Header />
      <Hero />
      <Services />
      <Partners />
      <Footer />
    </div>
  );
}
