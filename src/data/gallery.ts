import { photos, type Photo } from './images'

export type GalleryItem = {
  photo: Photo
  /** Kept deliberately general: these are stock photos, not client results. */
  alt: string
  caption: string
  /** Layout hint for the editorial grid on large screens. */
  layout: 'wide' | 'full' | 'tall' | 'standard'
}

export const gallery: GalleryItem[] = [
  { photo: photos.gallery1, alt: 'Stock photograph of a dark performance car', caption: 'Depth & reflection', layout: 'wide' },
  { photo: photos.gallery2, alt: 'Stock photograph of a sports car', caption: 'Clean lines', layout: 'tall' },
  { photo: photos.gallery3, alt: 'Stock photograph of a luxury vehicle', caption: 'Gloss under light', layout: 'standard' },
  { photo: photos.gallery4, alt: 'Stock photograph of a classic muscle car', caption: 'Heritage finish', layout: 'standard' },
  { photo: photos.gallery5, alt: 'Stock photograph of a high-performance coupe', caption: 'Showroom presence', layout: 'full' },
]
