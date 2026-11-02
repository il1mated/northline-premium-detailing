import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { CircleAlert } from 'lucide-react'

const controlBase =
  'mt-2 block w-full rounded-xl border bg-ink-4/60 px-4 py-3.5 text-base text-bone placeholder:text-dim transition-colors duration-200 focus:bg-ink-4 focus:outline-none focus-visible:outline-none'

const controlState = (invalid: boolean) =>
  invalid
    ? 'border-danger/70 focus:border-danger focus:ring-2 focus:ring-danger/30'
    : 'border-line hover:border-bone/25 focus:border-gold focus:ring-2 focus:ring-gold/25'

type FieldShellProps = {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
}

/** Label, control slot, hint and error message wired together for assistive tech. */
function FieldShell({ id, label, error, hint, optional, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-bone">
        {label}
        {optional && <span className="text-xs font-normal text-dim">Optional</span>}
      </label>
      {children}
      {/* Fixed-height message line: errors appearing never shift the layout (or the submit button). */}
      <div className="mt-2 min-h-5">
        {error ? (
          <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm leading-5 text-danger">
            <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="text-xs leading-5 text-dim">
              {hint}
            </p>
          )
        )}
      </div>
    </div>
  )
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

type BaseProps = { id: string; label: string; error?: string; hint?: string; optional?: boolean }

export function TextField({ id, label, error, hint, optional, ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlBase} ${controlState(Boolean(error))}`}
        {...rest}
      />
    </FieldShell>
  )
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  children,
  ...rest
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={`${controlBase} ${controlState(Boolean(error))} appearance-none pr-11`}
          {...rest}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 mt-1 h-4 w-4 -translate-y-1/2 text-gold"
        >
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
    </FieldShell>
  )
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  optional,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={`${controlBase} ${controlState(Boolean(error))} min-h-28 resize-y`}
        {...rest}
      />
    </FieldShell>
  )
}
