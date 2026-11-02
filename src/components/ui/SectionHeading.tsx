import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Consistent section header. `id` is applied to the <h2> so the parent
 * <section> can reference it with aria-labelledby.
 */
export function SectionHeading({ id, eyebrow, title, intro, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 id={id} className="mt-5 font-display text-4xl leading-[1.05] font-medium text-bone sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">{intro}</p>}
    </Reveal>
  )
}
