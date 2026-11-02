import { MessageSquareQuote } from 'lucide-react'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Deliberately contains NO testimonials. Reviews must come from real,
 * verifiable customers (e.g. embedded Google reviews) once the client has them.
 */
export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="reviews-heading"
          eyebrow="Client Reviews"
          align="center"
          title={
            <>
              In our <em className="text-gold">clients&apos;</em> words
            </>
          }
        />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="relative rounded-2xl border border-dashed border-gold/35 bg-ink-3/60 p-8 text-center sm:p-14">
            <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-ink px-3 py-1 text-[0.65rem] font-medium tracking-[0.25em] whitespace-nowrap text-gold uppercase">
              Placeholder section
            </p>
            <MessageSquareQuote aria-hidden="true" className="mx-auto h-10 w-10 text-gold/80" />
            <p className="mx-auto mt-6 max-w-xl font-display text-2xl leading-snug text-bone sm:text-3xl">
              Verified customer reviews will appear here.
            </p>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-mist">
              This is a portfolio concept, so we have not invented testimonials. At launch, this space shows genuine
              reviews from the business&apos;s Google or Yelp profile.
            </p>

            {/* Skeleton cards hint at the final layout without inventing content. */}
            <ul aria-hidden="true" className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {[0, 1, 2].map((n) => (
                <li key={n} className="rounded-xl border border-line bg-ink/60 p-5">
                  <div className="h-2 w-16 rounded-full bg-gold/30" />
                  <div className="mt-4 space-y-2">
                    <div className="h-2 rounded-full bg-bone/10" />
                    <div className="h-2 rounded-full bg-bone/10" />
                    <div className="h-2 w-2/3 rounded-full bg-bone/10" />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-7 w-7 rounded-full bg-bone/10" />
                    <div className="h-2 w-20 rounded-full bg-bone/10" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
