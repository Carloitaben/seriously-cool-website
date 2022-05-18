export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_API_TOKEN: string
      SANITY_PREVIEW_SECRET: string
    }
  }
}
