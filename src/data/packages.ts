/**
 * Packages and prices.
 *
 * PRICES ARE ILLUSTRATIVE DEMO VALUES for this portfolio concept. They are
 * not a real offer. The UI labels them as such.
 */
export type PackageId = 'essential' | 'signature' | 'apex-ceramic'

export type DetailPackage = {
  id: PackageId
  name: string
  price: number
  description: string
  features: string[]
  featured?: boolean
}

export const packages: DetailPackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: 189,
    description: 'A meticulous maintenance detail to keep a well-kept vehicle looking its best.',
    features: [
      'Two-bucket hand wash & dry',
      'Wheel faces & tires cleaned and dressed',
      'Interior vacuum & wipe-down',
      'Streak-free glass, inside and out',
      'Spray sealant for short-term gloss',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 449,
    description: 'A complete inside-and-out refresh with a single-stage polish to lift gloss.',
    featured: true,
    features: [
      'Everything in Essential',
      'Iron & clay bar decontamination',
      'Single-stage machine polish',
      'Paint sealant for longer-lasting protection',
      'Carpet & upholstery shampoo',
      'Leather cleaned & conditioned',
    ],
  },
  {
    id: 'apex-ceramic',
    name: 'Apex Ceramic',
    price: 1290,
    description: 'Paint correction and a ceramic coating for the deepest gloss and lasting protection.',
    features: [
      'Everything in Signature',
      'Multi-stage paint correction',
      'Professional-grade ceramic coating',
      'Wheel faces & glass coated',
      'Aftercare kit & maintenance guide',
    ],
  },
]

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
