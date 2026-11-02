/**
 * Photography registry.
 *
 * These are free-to-use stock photos served from the Unsplash CDN
 * (https://unsplash.com/license). They are REPRESENTATIVE IMAGERY ONLY: they
 * are not Apex Detailing customer work. Swap in the client's own photography
 * before launch by changing the `id` values (or replacing `photoUrl` with
 * paths to local files in /public).
 */

export type Photo = {
  /** Unsplash photo id, e.g. "1503376780353-7e6692767b70". */
  id: string
  /** Optional focal point passed to object-position, e.g. "center 60%". */
  position?: string
}

const WIDTHS = [480, 768, 1080, 1440, 1920] as const

export function photoUrl(photo: Photo, width: number, quality = 70): string {
  return `https://images.unsplash.com/photo-${photo.id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function photoSrcSet(photo: Photo, maxWidth = 1920): string {
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${photoUrl(photo, w)} ${w}w`)
    .join(', ')
}

export const photos = {
  hero: { id: '1503376780353-7e6692767b70', position: 'center 60%' },

  paintCorrection: { id: '1607860108855-64acf2078ed9' },
  ceramicCoating: { id: '1601362840469-51e4d8d58785' },
  interiorDetailing: { id: '1503736334956-4c8f8e92946d' },
  exteriorDetailing: { id: '1520340356584-f9917d1eea6f' },

  whyUs: { id: '1492144534655-ae79c964c9d7' },

  gallery1: { id: '1617814076367-b759c7d7e738' },
  gallery2: { id: '1544636331-e26879cd4d9b' },
  gallery3: { id: '1552519507-da3b142c6e3d' },
  gallery4: { id: '1494976388531-d1058494cdd8' },
  gallery5: { id: '1583121274602-3e2820c69888' },
} satisfies Record<string, Photo>
