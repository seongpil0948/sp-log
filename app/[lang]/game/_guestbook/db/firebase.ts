import {ECollection, batchInQuery, dataFromSnap, getPCollection} from '@/app/_utils/client/firebase'
import {commonFromJson, commonToJson} from '@/app/_utils/common'
import type {PaginateParam} from '@/types'

import {startAfter, doc, getDocs, limit, orderBy, query, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import type {
  Firestore,
  QueryConstraint,
  DocumentData,
  DocumentSnapshot,
  FirestoreDataConverter,
} from 'firebase/firestore'

import type {TGuestBook, TGuestBookDB} from '../types'

export const GuestBookFireStore: TGuestBookDB<Firestore> = {
  batchCreate: function (db: Firestore, args: TGuestBook[]): Promise<void> {
    throw new Error('Function not implemented.')
  },
  create: async function (db: Firestore, post: TGuestBook): Promise<void> {
    const c = getPCollection(db, {
      c: 'guestbook',
      uid: post.uid,
    }).withConverter(guestBookFireConverter)
    return setDoc(doc(c, post.id), post)
  },
  get: async function (db: Firestore, id: string, uid: string) {
    const c = getPCollection(db, {c: 'guestbook', uid}).withConverter(guestBookFireConverter)
    return getDoc(doc(c, id)).then(snap => snap.data() ?? undefined)
  },
  list: async function (db: Firestore, d: PaginateParam<TGuestBook>, uid: string) {
    console.info('===> get guestbook list : ', d)
    const c = getPCollection(db, {c: 'guestbook', uid}).withConverter(guestBookFireConverter)
    const constraints: QueryConstraint[] = []
    const pageSize = d.pageSize ?? 10
    if (d.orderBy) {
      constraints.push(orderBy(d.orderBy))
    }
    if (pageSize) {
      constraints.push(limit(pageSize))
    }
    if (d.lastData) {
      constraints.push(startAfter(d.lastData))
    }
    const q = query(c, ...constraints)
    const docSnapshots = await getDocs(q)
    const docs = docSnapshots.docs
    const lastDoc = docs[docs.length - 1]
    const data = docSnapshots.docs.map(doc => doc.data()).filter(x => x) as TGuestBook[]
    let noMore = false
    if (docs.length < pageSize || (lastDoc && data.some(d => d.id === lastDoc.id))) {
      noMore = true
    }
    return {data, noMore, lastDoc}
  },
  listByIds: async function (db: Firestore, ids: string[], uid: string) {
    const snapshots = await batchInQuery<TGuestBook>(
      ids,
      getPCollection(db, {c: ECollection.guestbook, uid}).withConverter(guestBookFireConverter),
      'id',
    )
    const posts = snapshots.flatMap(dataFromSnap<TGuestBook>)
    return posts
  },
  update: function (db: Firestore, arg: TGuestBook): Promise<void> {
    throw new Error('Function not implemented.')
  },
  delete: function (db: Firestore, id: string, uid: string): Promise<void> {
    const c = getPCollection(db, {c: 'guestbook', uid})
    return deleteDoc(doc(c, id))
  },
  favorite: async function (db, p) {
    const {uid, postId} = p
    const c = getPCollection(db, {c: 'guestbook', uid})
    const docRef = doc(c, postId)
    const snap = await getDoc(docRef)
    if (snap.exists()) deleteDoc(docRef)
    return setDoc(docRef, {postId})
  },
  isFavorite: async function (db, p) {
    const {uid, postId} = p
    const c = getPCollection(db, {c: 'likeGuestbook', uid})
    const snap = await getDoc(doc(c, postId))
    return snap.exists()
  },
}

export const guestBookFireConverter: FirestoreDataConverter<TGuestBook | null> = {
  toFirestore: (l: TGuestBook) => {
    return commonToJson(l)
  },
  fromFirestore: (snapshot: DocumentSnapshot<DocumentData>, options: any): TGuestBook | null => {
    const data = snapshot.data(options)
    const result = data ? commonFromJson(data) : null
    return isGuestBook(result) ? result : null
  },
}

export const isGuestBook = (arg: any): arg is TGuestBook => {
  return arg.id && arg.uid && arg.message && arg.createdAt && arg.updatedAt
}
