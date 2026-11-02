import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { QuoteForm, type ServiceRequest } from './QuoteForm'

const nextSteps = [
  'Your request is reviewed by a detailer, not a bot.',
  'You receive an itemized estimate based on your vehicle.',
  'Pick a date that suits you. No obligation, no pressure.',
]

export function QuoteSection({ request }: { request: ServiceRequest | null }) {
  return (
    <section id="quote" aria-labelledby="quote-heading" className="relative overflow-hidden border-t border-line bg-ink-2 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-gold/7 blur-3xl"
      />
      <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="quote-heading"
            eyebrow="Free Quote"
            title={
              <>
                Let&apos;s talk about <em className="text-gold">your vehicle</em>
              </>
            }
            intro="Share a few details and you'll get a tailored recommendation and price. No obligation."
          />

          <Reveal>
            <ol className="mt-10 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs font-medium text-gold">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-mist">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12 space-y-4 border-t border-line pt-8 text-sm">
              <p className="text-xs tracking-[0.25em] text-bone uppercase">Prefer to talk?</p>
              <a href={site.phone.href} className="flex items-center gap-3 text-bone transition-colors hover:text-gold">
                <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-bone transition-colors hover:text-gold">
                <Mail aria-hidden="true" className="h-4 w-4 text-gold" />
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-mist">
                <MapPin aria-hidden="true" className="h-4 w-4 text-gold" />
                Serving {site.serviceArea}
              </p>
              <p className="text-xs text-dim">Placeholder contact details for this concept.</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-ink-3 p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] sm:p-10">
            <QuoteForm request={request} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
