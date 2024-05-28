import { RequiredField, commonFromJson, commonToJson } from '@/app/_utils/common'

import { collection, collectionGroup } from 'firebase/firestore'

import type { CollectionReference, Firestore, QueryDocumentSnapshot, WithFieldValue } from 'firebase/firestore'

export type ECollection =
  | 'post'
  | 'user'
  | 'post_comment'
  | 'likePost'
  | 'dislikePost'
  | 'recentlyViewedPosts'
  | 'likeGuestbook'
  | 'guestbook'

export const ECollection: {[key in ECollection]: ECollection} = Object.freeze({
  post: 'post',
  user: 'user',
  post_comment: 'post_comment',
  likePost: 'likePost',
  dislikePost: 'dislikePost',
  recentlyViewedPosts: 'recentlyViewedPosts',
  guestbook: 'guestbook',
  likeGuestbook: 'likeGuestbook',
})
export interface ICollectionParam {
  readonly c: ECollection
  readonly postId?: string
  readonly uid?: string
}

export function getPCollectionStr(p: ICollectionParam) {
  let str: string
  switch (p.c) {
    case ECollection.user:
      str = p.c
      break
    case ECollection.likePost:
      if (!p.uid) throw new RequiredField('getPCollection', 'uid')
      str = `${ECollection.user}/${p.uid}/${ECollection.likePost}`
      break
    case ECollection.dislikePost:
      if (!p.uid) throw new RequiredField('getPCollection', 'uid')
      str = `${ECollection.user}/${p.uid}/${ECollection.dislikePost}`
      break

    case ECollection.likeGuestbook:
      if (!p.uid) throw new RequiredField('getPCollection', 'uid')
      str = `${ECollection.user}/${p.uid}/${ECollection.likePost}`
      break
    case ECollection.guestbook:
      if (!p.uid) throw new RequiredField('getPCollection', 'uid')
      str = `${ECollection.user}/${p.uid}/${ECollection.guestbook}`
      break
    case ECollection.recentlyViewedPosts:
      if (!p.uid) throw new RequiredField('getPCollection', 'uid')
      str = `${ECollection.user}/${p.uid}/${ECollection.recentlyViewedPosts}`
      break
    case ECollection.post:
      str = p.c
      break
    case ECollection.post_comment:
      if (!p.postId) throw new RequiredField('getPCollection', 'postId')
      str = `${ECollection.post}/${p.postId}/${ECollection.post_comment}`
      break
    default:
      throw Error(`IoCollection Enum Member ${p.c} is not Exist`)
  }
  return str
}

export function getPCollection<T>(store: Firestore, p: ICollectionParam): CollectionReference<T> {
  const str = getPCollectionStr(p)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return collection(store, str).withConverter(fireConverter<T>())
}

export function getPCollectionGroup(store: Firestore, c: ECollection) {
  let str: string
  switch (c) {
    case ECollection.post_comment:
      str = c
      break
    default:
      throw Error(`getPCollectionGroup not supported Enum Member ${c}`)
  }
  return collectionGroup(store, str)
}

export const fireConverter = <T>(toJson?: (d: T) => any, fromJson?: (d: any) => T) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  toFirestore: (data: WithFieldValue<T>) => (toJson ? toJson(data as T) : commonToJson(data)),
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    fromJson ? fromJson(snap.data()) : (commonFromJson(snap.data()) as T),
})
