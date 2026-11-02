import { Info } from 'lucide-react'
import { gallery, type GalleryItem } from '../../data/gallery'
import { Container } from '../ui/Container'
import { PhotoImage } from '../ui/PhotoImage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

// Editorial grid placement on large screens; everything stacks naturally on mobile.
const layoutClasses: Record<GalleryItem['layout'], string> = {
  wide: 'sm:col-span-2 lg:col-span-4 aspect-4/3 sm:aspect-16/9 lg:aspect-auto',
  full: 'sm:col-span-2 lg:col-span-6 aspect-4/3 sm:aspect-16/9 lg:aspect-auto',
  tall: 'sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-4/3 sm:aspect-16/9 lg:aspect-auto',
  standard: 'lg:col-span-2 aspect-4/3 sm:aspect-square lg:aspect-auto',
}

const sizesFor: Record<GalleryItem['layout'], string> = {
  wide: '(min-width: 1024px) 66vw, 100vw',
  full: '100vw',
  tall: '(min-width: 1024px) 33vw, 100vw',
  standard: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="border-y border-line bg-ink-2 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="gallery-heading"
            eyebrow="Featured Gallery"
            title={
              <>
                The finish we <em className="text-gold">work toward</em>
              </>
            }
          />
          <Reveal className="max-w-md lg:pb-2">
            <p className="flex gap-3 rounded-xl border border-line bg-ink/60 p-4 text-sm leading-relaxed text-mist">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                Representative stock photography, not customer results. Real before-and-after work will be shown here
                once available.
              </span>
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-6 xl:auto-rows-[20rem]">
          {gallery.map((item, i) => (
            <Reveal as="li" key={item.photo.id} delay={(i % 3) * 90} className={layoutClasses[item.layout]}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-line">
                <PhotoImage
                  photo={item.photo}
                  alt={item.alt}
                  sizes={sizesFor[item.layout]}
                  className="h-full"
                  imgClassName="transition-transform duration-1000 ease-(--ease-luxe) group-hover:scale-[1.04]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <span className="font-display text-xl text-bone">{item.caption}</span>
                  <span className="rounded-full border border-bone/20 bg-ink/60 px-2.5 py-1 text-[0.65rem] tracking-[0.2em] text-bone/80 uppercase backdrop-blur-sm">
                    Stock image
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
