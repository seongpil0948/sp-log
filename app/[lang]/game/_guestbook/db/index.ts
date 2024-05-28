import {GuestBookFireStore} from './firebase'

import type {TGuestBookDB} from '../types'
import type {Firestore} from 'firebase/firestore'



export const GUEST_DB: TGuestBookDB<Firestore> = GuestBookFireStore
