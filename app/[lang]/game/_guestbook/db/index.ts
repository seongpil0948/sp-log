import { Firestore } from 'firebase/firestore'
import { TGuestBookDB } from '../types'
import { GuestBookFireStore } from './firebase'

export const GUEST_DB: TGuestBookDB<Firestore> = GuestBookFireStore
