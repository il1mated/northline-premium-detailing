import { pillars, processSteps } from '../../data/features'
import { photos } from '../../data/images'
import { Container } from '../ui/Container'
import { PhotoImage } from '../ui/PhotoImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-heading" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="why-heading"
              eyebrow="Why Choose Us"
              title={
                <>
                  Patience is the <em className="text-gold">premium ingredient</em>
                </>
              }
              intro="Great detailing can't be rushed. We take the time to understand your vehicle, choose the right approach, and finish every job properly."
            />
            <Reveal className="mt-10 hidden lg:block">
              <PhotoImage photo={photos.whyUs} alt="" sizes="40vw" className="aspect-4/5 rounded-2xl border border-line" />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <ul className="divide-y divide-line border-y border-line">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <Reveal as="li" key={pillar.title} delay={i * 100} className="flex gap-6 py-10 sm:gap-8">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-medium text-bone">{pillar.title}</h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-mist">{pillar.body}</p>
                    </div>
                  </Reveal>
                )
              })}
            </ul>

            <Reveal className="mt-14">
              <h3 className="text-xs font-medium tracking-[0.3em] text-gold uppercase">How it works</h3>
              <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {processSteps.map((step, i) => (
                  <li key={step.title} className="bg-ink-3 p-6">
                    <p className="font-display text-sm text-gold" aria-hidden="true">
                      Step 0{i + 1}
                    </p>
                    <p className="mt-2 font-display text-2xl text-bone">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{step.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
