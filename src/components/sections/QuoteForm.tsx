import { ArrowRight, CircleAlert, CircleCheck, Info, LoaderCircle } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import {
  emptyQuote,
  isDemoMode,
  serviceOptions,
  submitQuote,
  validateField,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from '../../lib/quote'
import { Button } from '../ui/Button'
import { SelectField, TextAreaField, TextField } from '../ui/FormField'

type Status = 'idle' | 'submitting' | 'sent' | 'demo' | 'error'

export type ServiceRequest = { value: string; nonce: number }

type QuoteFormProps = {
  /** Set when a "Request…" link elsewhere on the page preselects a service. */
  request: ServiceRequest | null
}

const FIELD_ORDER: (keyof QuoteFields)[] = ['name', 'email', 'vehicle', 'service', 'notes']

export function QuoteForm({ request }: QuoteFormProps) {
  const [fields, setFields] = useState<QuoteFields>(emptyQuote)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Apply a preselected service when a new request arrives (React's "adjust state on prop change" pattern).
  const [lastRequest, setLastRequest] = useState<ServiceRequest | null>(null)
  if (request && request !== lastRequest) {
    setLastRequest(request)
    setFields((f) => ({ ...f, service: request.value }))
    setErrors((e) => ({ ...e, service: undefined }))
    if (status === 'sent' || status === 'demo') setStatus('idle')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof QuoteFields
    const value = e.target.value
    setFields((f) => ({ ...f, [name]: value }))
    // Once a field has been visited, re-validate as the user types so errors clear promptly.
    if (touched[name]) setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }))
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof QuoteFields
    // Don't flag a field as missing just because someone tabbed past it; "required" errors appear on submit.
    if (!e.target.value.trim()) return
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((errs) => ({ ...errs, [name]: validateField(name, e.target.value) }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return

    const nextErrors = validateQuote(fields)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, vehicle: true, service: true, notes: true })

    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Bots fill hidden fields; quietly drop the submission instead of sending it.
    if (honeypot) return

    setStatus('submitting')
    setSubmitError('')
    const result = await submitQuote(fields)
    setStatus(result.status)
    if (result.status === 'error') setSubmitError(result.message)
    // Move focus to the result so keyboard and screen-reader users hear the outcome.
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const resetForm = () => {
    setFields(emptyQuote)
    setErrors({})
    setTouched({})
    setStatus('idle')
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  const editRequest = () => {
    setStatus('idle')
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  if (status === 'sent' || status === 'demo') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="focus:outline-none">
        {status === 'sent' ? (
          <ResultPanel
            tone="success"
            title="Request sent"
            body={`Thank you, ${fields.name.trim().split(' ')[0]}. Your request was delivered successfully. A reply will come to ${fields.email.trim()}.`}
          />
        ) : (
          <ResultPanel
            tone="info"
            title="Demo mode: your request was not sent"
            body="Your details passed validation, but this site is a portfolio concept with no connected business, so nothing left your browser. This is what would have been submitted:"
          >
            <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-xl border border-line bg-ink/50 p-5 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="text-dim">Name</dt>
              <dd className="break-words text-bone">{fields.name.trim()}</dd>
              <dt className="text-dim">Email</dt>
              <dd className="break-words text-bone">{fields.email.trim()}</dd>
              <dt className="text-dim">Vehicle</dt>
              <dd className="break-words text-bone">{fields.vehicle.trim()}</dd>
              <dt className="text-dim">Service</dt>
              <dd className="text-bone">{labelForService(fields.service)}</dd>
              {fields.notes.trim() && (
                <>
                  <dt className="text-dim">Notes</dt>
                  <dd className="break-words whitespace-pre-line text-bone">{fields.notes.trim()}</dd>
                </>
              )}
            </dl>
          </ResultPanel>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {status === 'demo' && (
            <Button variant="outline" onClick={editRequest}>
              Edit request
            </Button>
          )}
          <Button variant={status === 'demo' ? 'ghost' : 'outline'} onClick={resetForm}>
            Start a new request
          </Button>
        </div>
      </div>
    )
  }

  const showError = (key: keyof QuoteFields) => (touched[key] ? errors[key] : undefined)
  const submitting = status === 'submitting'

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby={isDemoMode ? 'demo-notice' : undefined}>
      {isDemoMode && (
        <p id="demo-notice" className="mb-8 flex gap-3 rounded-xl border border-gold/30 bg-gold/8 p-4 text-sm leading-relaxed text-gold-soft">
          <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong className="font-semibold">Demo form.</strong> This concept is not connected to a business. Your
            details are checked in your browser but never sent anywhere.
          </span>
        </p>
      )}

      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        <TextField
          id="quote-name"
          name="name"
          label="Full name"
          autoComplete="name"
          placeholder="Jordan Smith"
          value={fields.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('name')}
          required
        />
        <TextField
          id="quote-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('email')}
          required
        />
        <TextField
          id="quote-vehicle"
          name="vehicle"
          label="Vehicle"
          autoComplete="off"
          placeholder="Year, make and model"
          hint="For example: 2022 BMW M4"
          value={fields.vehicle}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('vehicle')}
          required
        />
        <SelectField
          id="quote-service"
          name="service"
          label="Requested service"
          value={fields.service}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('service')}
          required
        >
          <option value="" disabled>
            Select a service
          </option>
          <optgroup label="Services">
            {serviceOptions.services.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Packages">
            {serviceOptions.packages.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
          {serviceOptions.other.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>
        <div className="sm:col-span-2">
          <TextAreaField
            id="quote-notes"
            name="notes"
            label="Anything we should know?"
            optional
            placeholder="Paint condition, goals, preferred dates…"
            value={fields.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError('notes')}
            rows={4}
          />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-company">Company</label>
        <input id="quote-company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div ref={status === 'error' ? resultRef : undefined} tabIndex={-1} role="alert" className="focus:outline-none">
        {status === 'error' && (
          <p className="mt-8 flex gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm leading-relaxed text-danger">
            <CircleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong className="font-semibold">Your request was not sent.</strong> {submitError} Please try again, or
              call us instead.
            </span>
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-dim">All fields are required unless marked optional.</p>
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              {isDemoMode ? 'Check my request' : 'Request my free quote'}
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function labelForService(value: string) {
  const all = [...serviceOptions.services, ...serviceOptions.packages, ...serviceOptions.other]
  return all.find((o) => o.value === value)?.label ?? value
}

type ResultPanelProps = {
  tone: 'success' | 'info'
  title: string
  body: string
  children?: ReactNode
}

function ResultPanel({ tone, title, body, children }: ResultPanelProps) {
  const Icon = tone === 'success' ? CircleCheck : Info
  return (
    <div>
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border ${
          tone === 'success' ? 'border-success/40 text-success' : 'border-gold/40 text-gold'
        }`}
      >
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-medium text-bone">{title}</h3>
      <p className="mt-3 leading-relaxed text-mist">{body}</p>
      {children}
    </div>
  )
}
