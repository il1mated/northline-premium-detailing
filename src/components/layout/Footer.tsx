import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { services } from '../../data/services'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const linkClass = 'text-mist transition-colors hover:text-gold'
// Computed once at load rather than on every render.
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <a href="#top" className="inline-block rounded-md" aria-label={`${site.name}, back to top`}>
            <Logo />
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
            Paint correction, ceramic coating, interior and exterior detailing, delivered with patience and precision.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="text-xs font-medium tracking-[0.25em] text-bone uppercase">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#quote" className={linkClass}>
                Free Quote
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-medium tracking-[0.25em] text-bone uppercase">Services</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className={linkClass}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-4">
          <h3 className="text-xs font-medium tracking-[0.25em] text-bone uppercase">Contact</h3>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <a href={site.phone.href} className={`flex items-center gap-3 ${linkClass}`}>
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`} className={`flex items-center gap-3 ${linkClass}`}>
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
              {site.email}
            </a>
            <p className="flex items-start gap-3 text-mist">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <span className="sr-only">Service area: </span>
                {site.serviceArea}
              </span>
            </p>
            <p className="flex items-start gap-3 text-mist">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.hours}
            </p>
          </address>
          <p className="mt-5 text-xs text-dim">Contact details above are placeholders for this concept.</p>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.name}. A portfolio concept by {site.agency.name}. {site.name} is a fictional business.
          </p>
          <p>
            Photography:{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline decoration-dim/50 underline-offset-4 hover:text-gold">
              Unsplash
            </a>{' '}
            (representative imagery)
          </p>
        </Container>
      </div>
    </footer>
  )
}
