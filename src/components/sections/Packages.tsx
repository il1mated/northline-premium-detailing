import { Check, Info } from 'lucide-react'
import { formatPrice, packages, type DetailPackage } from '../../data/packages'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type PackagesProps = {
  onRequest: (serviceValue: string) => void
}

export function Packages({ onRequest }: PackagesProps) {
  return (
    <section id="packages" aria-labelledby="packages-heading" className="relative overflow-hidden border-y border-line bg-ink-2 py-24 sm:py-32">
      {/* Soft champagne glow behind the featured card. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/6 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          id="packages-heading"
          eyebrow="Packages"
          align="center"
          title={
            <>
              Choose your level of <em className="text-gold">perfection</em>
            </>
          }
          intro="Three clear starting points. Every quote is confirmed after we understand your vehicle's size and condition."
        />

        <Reveal className="mx-auto mt-8 flex max-w-fit items-center gap-2.5 rounded-full border border-gold/30 bg-gold/8 px-4 py-2 text-xs text-gold-soft">
          <Info aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          Illustrative demo pricing. Not a live offer.
        </Reveal>

        <ul className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal as="li" key={pkg.id} delay={i * 100}>
              <PackageCard pkg={pkg} onRequest={onRequest} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function PackageCard({ pkg, onRequest }: { pkg: DetailPackage; onRequest: (value: string) => void }) {
  const featured = pkg.featured
  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-8 sm:p-10 ${
        featured
          ? 'border-gold/60 bg-linear-to-b from-ink-4 to-ink-3 shadow-[0_30px_80px_-30px_rgb(212_180_131/0.35)]'
          : 'border-line bg-ink-3'
      }`}
    >
      {featured && (
        <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[0.65rem] font-semibold tracking-[0.25em] whitespace-nowrap text-ink uppercase">
          Recommended
        </p>
      )}
      <h3 className="font-display text-3xl font-medium text-bone">{pkg.name}</h3>
      <p className="mt-3 min-h-12 text-sm leading-relaxed text-mist">{pkg.description}</p>

      <p className="mt-8 flex items-baseline gap-2 border-b border-line pb-8">
        <span className="text-xs tracking-[0.2em] text-dim uppercase">From</span>
        <span className="font-display text-5xl font-medium text-bone">{formatPrice(pkg.price)}</span>
        <span className="text-xs text-dim">demo</span>
      </p>

      <ul className="mt-8 space-y-3.5 text-sm">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-bone/85">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {feature}
          </li>
        ))}
      </ul>

      {/* mt-auto pins the button to the card bottom; pt-10 guarantees spacing in the tallest card. */}
      <div className="mt-auto pt-10">
        <ButtonLink
          href="#quote"
          variant={featured ? 'primary' : 'outline'}
          className="w-full"
          onClick={() => onRequest(`package-${pkg.id}`)}
        >
          Request {pkg.name}
        </ButtonLink>
      </div>
    </article>
  )
}
