import 'server-only'
import * as admin from 'firebase-admin'

const SVC_ACCOUNT_KEY = Object.freeze({
  type: 'service_account',
  project_id: 'sp-log-20ee4',
  private_key_id: '0c2dd557b861f82d946627cc0d8aab927e2be27a',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCy7g8HMDO/W/CH\nP3AKUzRx3gw1oW7rQlCeJ1gBKTqQAglWMV478SCZaBdUvvRd1wWzOfP3iNFnvDBA\nVxcAcnK7gOCBh/ucvaMtynH6bCwHCVmnIRyX8Orbe+FVM3nfe7BpHfLoU871W3OJ\n6T47XmyRvK6GHGBFbh6j225IOOUU7Mfu06+r4qz1T0KUdL/qXfFl2d3XfwqLQS5O\nV2qKSbIvGcFuYFid2B2tmXhJvR1YaH44NgaCsS6F2jLR9b9eduZmOKy9Zvcz3WmK\n18Q3d8WkCR9NaLyjfGVcCJkJv20gDDDr85ITDj1xCllAekbS1jLJ8Ceprs1Wuy5u\nCc5qItdnAgMBAAECggEAPkxIizYrLjsymcRqnA2wOt0W3y1f0yV5sDb+mxjhvPYY\njhwONUyVDxSA2w7JQkr1Pxu0Z8EJN9b77crkxVETxVjv0emon0AfqnfMC2bSRXjp\n8BjFPdmxy81r/SA5FKiaGV9GDcHwUtkOdzvwYPdVUcCh+yuyETpwDJj/4sF8cTYR\nlcaQdW9jzm0pJsn1dxgFbwgXmFksXXGqIkVa+BFcv2bz1c64BNk3BiUy/suulcBe\nsWJy7cjOUU/rqFPEH6EoW+Srn0FGtaLIGGL5QVi2uc1tjz2tC2SczBt0Qve+0kjH\nOtk7gYFbLbjQTarXixXVC7w2IVcE/3pERZAKZYyxAQKBgQDx+Hm8kMufLANE31T0\nCcbKEpZ3K2h/nIdU7P+jmhAqE0u+RZIo73mkuwuDc64vYsLWBnrFLO/4t0NL2/6J\n1rGXAPwHyH2f1kCTt5VbtrrdItHqMF6dSzaYA0uvLzKrmoglGkq6jO0tJzsDRcNk\nzU/rHRwVeaQ4ycTxVfYcz7eewQKBgQC9TeHKCyNWEAMMZ756ZD4RMGv2c+TEKoBp\nWI2A0yQMiBiPtIX1ew+aUhKIQbXVX5czoSAcx7jzon7K3XgoXaOyj78EXZ8diBgj\nLgiFZmVDTqj/+MPjEC6NxT9STMLm+I/mK+bV1TFHaE3GrqKhPh8KEGViQMR6lXOs\nGU66zruoJwKBgFePBWZBsx0nDQvIEPK58vA+Z6o5z/eVibcmh58I6d5/2wHAJRKh\nDZCZiqIHozlMcJqH/7cH+tIyZqy1r9brFJpC5fBfEW5cVkPdw7NLXTUWG4W1+RbM\nF7ZMQv/igWBta+SZLf9xbYXQU19syDbawJegkgAHY3CVOqnl5EgqthRBAoGAVPZt\njmbtVyUcmSa+4OO4z7Ix4o0lcb25oI50BAu/tDgo/eaB8SloWVTYqHsFh1y92hhI\n92HUatTVn2tDEKrmW7AUhXsXfQOmAbQZcvYAIPNe+nPGR1Tt8AdFYkS9fTi2LRIr\nKnHjCi+QKMoch83/1F6DglObW4FURzuckE9U/iUCgYBl5C62C8bbnvz8yKeR2g7T\nlWeM+a7JFUGZ7dyUTdoHF3H6O9JqWYDkAvLxhSLHuCnd9Rm498ga+iK+QOqVpXfZ\nrdXQ6JWRpfN5S1cHZMvOvepJbnD78Qa4u/AML5N7/KEIgCEkhdtX/UAzki6jx1Ea\nZ0frWbHqNMFQ3lPaRxbibw==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-9hceh@sp-log-20ee4.iam.gserviceaccount.com',
  client_id: '100245049776677534507',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9hceh%40sp-log-20ee4.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
})

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: SVC_ACCOUNT_KEY.project_id,
      clientEmail: SVC_ACCOUNT_KEY.client_email,
      privateKey: SVC_ACCOUNT_KEY.private_key,
    }),
    // databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  })
}

export default admin
