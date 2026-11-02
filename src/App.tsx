import { useCallback, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { Packages } from './components/sections/Packages'
import type { ServiceRequest } from './components/sections/QuoteForm'
import { QuoteSection } from './components/sections/QuoteSection'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'
import { WhyUs } from './components/sections/WhyUs'

export default function App() {
  // "Request…" links in Services and Packages preselect the matching option in the quote form.
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const requestService = useCallback((value: string) => setRequest({ value, nonce: Date.now() }), [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Services onRequest={requestService} />
        <Gallery />
        <WhyUs />
        <Packages onRequest={requestService} />
        <Testimonials />
        <QuoteSection request={request} />
      </main>
      <Footer />
    </>
  )
}
