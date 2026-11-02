/**
 * Business details for the site.
 *
 * Everything here is a PLACEHOLDER for a fictional business. Before going
 * live for a real client, replace these values with their verified details.
 */
export const site = {
  name: 'Apex Detailing',
  tagline: 'Your Vehicle. Perfected.',

  // 555-01XX numbers are reserved for fictional use in North America.
  phone: {
    display: '(555) 555-0142',
    href: 'tel:+15555550142',
  },
  // example.com is a reserved domain, so this can never reach a real inbox.
  email: 'hello@example.com',
  serviceArea: '[Your City], [State] & surrounding areas',
  hours: 'By appointment, Mon–Sat (placeholder)',

  agency: {
    name: 'NORTHLINE',
  },
} as const

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
] as const
