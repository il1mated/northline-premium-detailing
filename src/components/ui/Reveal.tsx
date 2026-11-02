import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
}

type RevealState = 'idle' | 'pending' | 'visible'

/**
 * Fades content up when it scrolls into view.
 * Content stays visible if JavaScript or IntersectionObserver is unavailable,
 * and the motion is disabled in CSS for users who prefer reduced motion.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [state, setState] = useState<RevealState>('idle')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    // Already on screen at load (e.g. after a refresh mid-page): show immediately.
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    setState('pending')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref} className={className} data-reveal={state === 'idle' ? undefined : state} style={style}>
      {children}
    </Tag>
  )
}
