import { ArrowUpRight, Check } from 'lucide-react'
import { services, type Service } from '../../data/services'
import { Container } from '../ui/Container'
import { PhotoImage } from '../ui/PhotoImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

type ServicesProps = {
  onRequest: (serviceValue: string) => void
}

export function Services({ onRequest }: ServicesProps) {
  return (
    <section id="services" aria-labelledby="services-heading" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title={
              <>
                Craftsmanship for <em className="text-gold">every surface</em>
              </>
            }
          />
          <Reveal className="max-w-md lg:pb-2">
            <p className="leading-relaxed text-mist">
              Four core disciplines, each tailored to your vehicle&apos;s condition and how you drive it. Not sure what
              you need? Ask for a recommendation in your quote request.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 90} className="h-full">
              <ServiceCard service={service} index={i} onRequest={onRequest} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

type ServiceCardProps = {
  service: Service
  index: number
  onRequest: (serviceValue: string) => void
}

function ServiceCard({ service, index, onRequest }: ServiceCardProps) {
  const Icon = service.icon
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-3 transition-colors duration-500 hover:border-gold/40">
      <div className="relative">
        <PhotoImage
          photo={service.photo}
          alt=""
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-4/3"
          imgClassName="transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink-3 via-ink-3/10 to-transparent" />
        <span className="absolute top-4 left-4 font-display text-lg text-bone/90">0{index + 1}</span>
        <span className="absolute -bottom-5 left-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="font-display text-2xl font-medium text-bone">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">{service.summary}</p>
        <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm text-bone/85">
          {service.includes.map((item) => (
            <li key={item} className="flex gap-3">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href="#quote"
          onClick={() => onRequest(service.id)}
          className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-gold transition-colors hover:text-gold-soft"
        >
          Request a quote<span className="sr-only"> for {service.title}</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  )
}
