type LogoProps = {
  className?: string
}

/** Wordmark + monogram. Rendered as inline SVG/text: crisp at any size, no image request. */
export function Logo({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8 shrink-0">
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9" fill="none" stroke="#d4b483" strokeOpacity="0.55" strokeWidth="1.5" />
        <path d="M20 8.5 L31.5 31 H27 L20 17 L13 31 H8.5 Z" fill="#d4b483" />
        <path d="M15 26 H25" stroke="#0b0b0c" strokeWidth="2" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-semibold tracking-[0.18em] text-bone">APEX</span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.42em] text-gold">DETAILING</span>
      </span>
    </span>
  )
}
