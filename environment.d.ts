declare namespace NodeJS {
  export interface ProcessEnv {
    // Public environment variables
    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    readonly NEXT_PUBLIC_FIREBASE_DATABASE_URL: string
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
    readonly NEXT_PUBLIC_FIREBASE_APP_ID: string
    readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string

    readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string
    readonly NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: string
    readonly NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string
  }
}
