import { packages } from '../data/packages'
import { services } from '../data/services'

export type QuoteFields = {
  name: string
  email: string
  vehicle: string
  service: string
  notes: string
}

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>

export const emptyQuote: QuoteFields = { name: '', email: '', vehicle: '', service: '', notes: '' }

/** Options for the "requested service" select, grouped for clarity. */
export const serviceOptions = {
  services: services.map((s) => ({ value: s.id, label: s.title })),
  packages: packages.map((p) => ({ value: `package-${p.id}`, label: `${p.name} package` })),
  other: [{ value: 'not-sure', label: 'Not sure yet — advise me' }],
}

const allServiceValues = new Set(
  [...serviceOptions.services, ...serviceOptions.packages, ...serviceOptions.other].map((o) => o.value),
)

// Intentionally simple: catches typos without rejecting unusual but valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: keyof QuoteFields, value: string): string | undefined {
  const v = value.trim()
  switch (field) {
    case 'name':
      if (!v) return 'Please enter your name.'
      if (v.length < 2) return 'Name must be at least 2 characters.'
      if (v.length > 80) return 'Name must be 80 characters or fewer.'
      return undefined
    case 'email':
      if (!v) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(v)) return 'Please enter a valid email, like name@example.com.'
      return undefined
    case 'vehicle':
      if (!v) return 'Please tell us the year, make and model.'
      if (v.length < 3) return 'Please add a little more detail, e.g. "2021 Porsche Macan".'
      if (v.length > 100) return 'Vehicle must be 100 characters or fewer.'
      return undefined
    case 'service':
      if (!v) return 'Please choose a service.'
      if (!allServiceValues.has(v)) return 'Please choose a service from the list.'
      return undefined
    case 'notes':
      if (v.length > 1000) return 'Notes must be 1000 characters or fewer.'
      return undefined
  }
}

export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {}
  for (const key of Object.keys(fields) as (keyof QuoteFields)[]) {
    const message = validateField(key, fields[key])
    if (message) errors[key] = message
  }
  return errors
}

export type SubmitResult =
  /** Sent to a real endpoint, which accepted it. */
  | { status: 'sent' }
  /** No endpoint configured: nothing left the browser. */
  | { status: 'demo' }
  | { status: 'error'; message: string }

/**
 * The quote endpoint is configured at build time via VITE_QUOTE_ENDPOINT
 * (for example a Formspree, Basin or custom API URL that accepts JSON).
 * When it is not set, the site runs in honest demo mode.
 */
const ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT?.trim()

export const isDemoMode = !ENDPOINT

export async function submitQuote(fields: QuoteFields): Promise<SubmitResult> {
  if (!ENDPOINT) return { status: 'demo' }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: fields.name.trim(),
        email: fields.email.trim(),
        vehicle: fields.vehicle.trim(),
        service: fields.service,
        notes: fields.notes.trim(),
      }),
      signal: controller.signal,
    })
    if (!response.ok) {
      return { status: 'error', message: `The server responded with an error (${response.status}).` }
    }
    return { status: 'sent' }
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === 'AbortError'
    return {
      status: 'error',
      message: timedOut ? 'The request timed out.' : 'We could not reach the server. Check your connection.',
    }
  } finally {
    window.clearTimeout(timeout)
  }
}
