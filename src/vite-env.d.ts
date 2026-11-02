/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional URL that accepts quote requests as JSON. Leave unset for demo mode. */
  readonly VITE_QUOTE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
