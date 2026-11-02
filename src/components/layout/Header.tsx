import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../../data/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock page scroll, focus the first link, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!menuOpen) return
    const toggle = toggleRef.current
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onResize = () => desktop.matches && setMenuOpen(false)

    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
      toggle?.focus()
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'border-b border-line bg-ink/90 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <a href="#top" className="rounded-md" aria-label={`${site.name}, back to top`} onClick={closeMenu}>
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-2 text-sm tracking-wide text-bone/80 transition-colors hover:text-bone after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ButtonLink href={site.phone.href} variant="outline" className="max-sm:hidden" aria-label={`Call ${site.name} at ${site.phone.display}`}>
            <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
            <span>{site.phone.display}</span>
          </ButtonLink>
          <ButtonLink href="#quote" className="max-lg:hidden">
            Free Quote
          </ButtonLink>

          <a
            href={site.phone.href}
            aria-label={`Call ${site.name} at ${site.phone.display}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-gold sm:hidden"
          >
            <Phone aria-hidden="true" className="h-4.5 w-4.5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-ink lg:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between gap-10 py-10">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-baseline gap-4 border-b border-line py-4 font-display text-3xl text-bone"
                    >
                      <span className="font-sans text-xs tracking-widest text-gold">0{i + 1}</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-3">
              <ButtonLink href="#quote" size="lg" className="w-full" onClick={closeMenu}>
                Get a Free Quote
              </ButtonLink>
              <ButtonLink href={site.phone.href} variant="outline" size="lg" className="w-full">
                <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
                {site.phone.display}
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
