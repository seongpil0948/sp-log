import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

export const getClientCredentials = () => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
})

export const getFBClient = () => {
  const clientCredentials = getClientCredentials()
  console.info('===> getFB clientCredentials : ', clientCredentials)
  const apps = getApps()
  if (apps.length <= 0) {
    const app = initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
      // Enable analytics. https://firebase.google.com/docs/analytics/get-started
      const analytics = getAnalytics(app)
      console.log('====> hihi', analytics)
      logEvent(analytics, 'loaded_sp_log_app')
    }
    return app
  }
  return apps[0]
}

export const getFBClientStore = () => {
  const client = getFBClient()
  console.log(client)
  const firestore = getFirestore(client)
  console.log(firestore)
  return firestore
}
