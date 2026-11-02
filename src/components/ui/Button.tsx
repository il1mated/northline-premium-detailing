import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-300 ease-(--ease-luxe) disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_40px_-12px_rgb(212_180_131/0.55)]',
  outline: 'border border-bone/25 text-bone hover:border-gold hover:text-gold backdrop-blur-sm',
  ghost: 'text-bone hover:text-gold',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-13 px-7 text-[0.95rem]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

function buttonClasses({ variant = 'primary', size = 'md', className = '' }: Omit<CommonProps, 'children'>) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`
}

/** Link styled as a button. Use for navigation (anchors, tel:, mailto:). */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </a>
  )
}

/** Real <button>. Use for actions (submitting forms, toggles). */
export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  )
}
