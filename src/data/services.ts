import type { LucideIcon } from 'lucide-react'
import { Armchair, Droplets, ScanSearch, ShieldCheck } from 'lucide-react'
import { photos, type Photo } from './images'

export type Service = {
  id: ServiceId
  title: string
  summary: string
  includes: string[]
  icon: LucideIcon
  photo: Photo
}

export type ServiceId = 'paint-correction' | 'ceramic-coating' | 'interior' | 'exterior'

export const services: Service[] = [
  {
    id: 'paint-correction',
    title: 'Paint Correction',
    summary:
      'Machine polishing that reduces swirl marks, light scratches and oxidation to bring back depth and clarity.',
    includes: ['Paint inspection under dedicated lighting', 'Single or multi-stage polishing', 'Panel wipe and finish check'],
    icon: ScanSearch,
    photo: photos.paintCorrection,
  },
  {
    id: 'ceramic-coating',
    title: 'Ceramic Coating',
    summary:
      'A durable, hydrophobic layer that adds gloss, makes washing easier and helps shield paint from the elements.',
    includes: ['Full decontamination and prep', 'Coating applied panel by panel', 'Curing and aftercare guidance'],
    icon: ShieldCheck,
    photo: photos.ceramicCoating,
  },
  {
    id: 'interior',
    title: 'Interior Detailing',
    summary:
      'A thorough reset of the cabin, from carpets and seats to vents and trim, for a space that looks and feels new.',
    includes: ['Deep vacuum and steam cleaning', 'Leather cleaning and conditioning', 'Glass, trim and vents detailed'],
    icon: Armchair,
    photo: photos.interiorDetailing,
  },
  {
    id: 'exterior',
    title: 'Exterior Detailing',
    summary:
      'A careful hand wash and decontamination, then protection that leaves every surface clean, slick and glossy.',
    includes: ['Two-bucket hand wash', 'Iron and tar decontamination', 'Wheels, tires and glass finished'],
    icon: Droplets,
    photo: photos.exteriorDetailing,
  },
]
