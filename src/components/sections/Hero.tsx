import { ArrowRight, ChevronDown } from 'lucide-react'
import { photos } from '../../data/images'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { PhotoImage } from '../ui/PhotoImage'

const assurances = ['Free, no-obligation quotes', 'Transparent, itemized pricing', 'Hand-finished, panel by panel']

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="grain relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Decorative background photo, so it has empty alt text. */}
      <PhotoImage
        photo={photos.hero}
        alt=""
        sizes="100vw"
        priority
        className="absolute! inset-0 -z-20"
        imgClassName="animate-slow-zoom"
      />
      {/* Scrims keep text readable over any photo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/75 to-ink/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-transparent to-ink/60" />

      <Container className="flex flex-1 flex-col justify-center pt-32 pb-16 sm:pt-36 lg:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up">Paint correction · Ceramic coating · Detailing</p>

          <h1
            id="hero-heading"
            className="mt-7 animate-fade-up font-display text-[3.4rem] leading-[0.95] font-medium tracking-tight text-bone [animation-delay:120ms] sm:text-7xl lg:text-[6.5rem]"
          >
            Your Vehicle.
            <br />
            <em className="font-medium text-gold">Perfected.</em>
          </h1>

          <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-bone/80 [animation-delay:240ms] sm:text-lg">
            Meticulous detailing and lasting paint protection for drivers who notice the difference. Every surface
            inspected, corrected and finished by hand.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:gap-4">
            <ButtonLink href="#quote" size="lg">
              Get a Free Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#services" variant="outline" size="lg">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="border-t border-line/70 bg-ink/40 backdrop-blur-sm">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-col gap-2.5 text-sm text-bone/75 sm:flex-row sm:gap-8">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#services"
            className="hidden items-center gap-2 text-xs tracking-[0.25em] text-mist uppercase transition-colors hover:text-gold md:inline-flex"
          >
            Scroll
            <ChevronDown aria-hidden="true" className="h-4 w-4 motion-safe:animate-bounce" />
          </a>
        </Container>
      </div>
    </section>
  )
}
