import type {Firestore} from 'firebase/firestore'

import type {TGuestBookDB} from '../types'

import {GuestBookFireStore} from './firebase'

export const GUEST_DB: TGuestBookDB<Firestore> = GuestBookFireStore
