import { useEffect, useId, useRef, useState } from 'react'
import { photoSrcSet, photoUrl, type Photo } from '../../data/images'

type PhotoImageProps = {
  photo: Photo
  /** Use "" for purely decorative images. */
  alt: string
  /** Responsive sizes hint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string
  /** Load immediately with high priority (use for the hero only). */
  priority?: boolean
  className?: string
  imgClassName?: string
}

/**
 * Responsive photo with an art-directed fallback.
 *
 * A dark gradient backdrop with a champagne "light sweep" is always rendered
 * underneath. The photo fades in on top once loaded; if it fails to load, the
 * broken image is hidden and the backdrop remains, so the layout never shows
 * a broken-image icon.
 */
export function PhotoImage({ photo, alt, sizes, priority = false, className = '', imgClassName = '' }: PhotoImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  // Unique, selector-safe id so multiple instances don't share one SVG gradient.
  const gradientId = `sweep-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  // Handles images that finished loading (e.g. from cache) before React attached listeners.
  useEffect(() => {
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
  }, [])

  return (
    <div className={`relative overflow-hidden bg-ink-3 ${className}`}>
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_20%,rgb(212_180_131/0.16),transparent_60%),linear-gradient(160deg,#1d1d21_0%,#0b0b0c_70%)]" />
        <svg className="absolute inset-x-0 bottom-[22%] h-1/2 w-full opacity-60" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1">
              <stop offset="0" stopColor="#d4b483" stopOpacity="0" />
              <stop offset="0.55" stopColor="#d4b483" stopOpacity="0.7" />
              <stop offset="1" stopColor="#d4b483" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 80 C 90 78, 140 30, 230 26 S 360 42, 400 60" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.2" />
          <path d="M0 92 C 110 90, 170 52, 250 50 S 370 64, 400 76" fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.6" />
        </svg>
      </div>

      {status !== 'error' && (
        <img
          ref={imgRef}
          src={photoUrl(photo, 1080)}
          srcSet={photoSrcSet(photo)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-(--ease-luxe) ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  )
}
