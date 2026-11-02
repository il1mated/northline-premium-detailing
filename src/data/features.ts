import type { LucideIcon } from 'lucide-react'
import { Eye, FlaskConical, Hand } from 'lucide-react'

export type Pillar = {
  title: string
  body: string
  icon: LucideIcon
}

/**
 * "Why choose us" pillars. These describe the working approach, not
 * credentials or statistics. Add certifications, years in business or
 * insurance details only once the client has verified them.
 */
export const pillars: Pillar[] = [
  {
    title: 'Professional Care',
    body: 'Every vehicle is handled as if it were our own: protected interiors, careful handling and clear communication from drop-off to handover.',
    icon: Hand,
  },
  {
    title: 'Attention to Detail',
    body: 'Panels, badges, door jambs and wheel barrels all get the same focus. The small areas are what separate a wash from a detail.',
    icon: Eye,
  },
  {
    title: 'Premium Products',
    body: 'pH-balanced chemistry, quality microfiber and professional-grade polishes and coatings, matched to your paint and interior.',
    icon: FlaskConical,
  },
]

export const processSteps = [
  { title: 'Consult', body: 'Tell us about your vehicle and what you want from it.' },
  { title: 'Inspect', body: 'We assess paint and interior condition before recommending anything.' },
  { title: 'Perfect', body: 'The work is carried out methodically, panel by panel.' },
  { title: 'Protect', body: 'You leave with a finish that lasts and clear aftercare advice.' },
] as const
