interface ImportMetaEnv {
  readonly VITE_SITE_URL: string
  readonly VITE_MAIN_APP_URL: string
  readonly VITE_API_URL: string
  readonly VITE_COOKIE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
