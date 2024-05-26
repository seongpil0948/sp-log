'use server'
import type * as admin from 'firebase-admin'

import {commonFromJson, commonToJson} from '../../common'

export const fireConverterAdm = <T>(toJson?: (d: T) => any, fromJson?: (d: any) => T) => ({
  toFirestore: (data: admin.firestore.WithFieldValue<T>) => (toJson ? toJson(data as T) : commonToJson(data)),
  fromFirestore: (snap: admin.firestore.QueryDocumentSnapshot) =>
    fromJson ? fromJson(snap.data()) : (commonFromJson(snap.data()) as T),
})

export async function batchInQueryServer<T extends admin.firestore.DocumentData>(
  ids: string[] | number[],
  c: admin.firestore.CollectionReference<any> | admin.firestore.Query<admin.firestore.DocumentData>,
  field: string,
) {
  if (!ids?.length) return []

  const batches: Promise<admin.firestore.QuerySnapshot<T>>[] = []
  while (ids.length) {
    // caution will removed of ids elements
    const batch = ids.splice(0, 10) // batch size 10
    // add the batch request to to a queue

    batches.push(c.where(field, 'in', [...batch]).get() as any)
  }
  return Promise.all(batches)
}

export async function dataFromSnapServer<T>(snap: admin.firestore.QuerySnapshot<T | null>) {
  const result: T[] = []

  snap.docs.forEach(d => {
    const data = d.data()
    if (data) {
      result.push(data)
    }
  })
  return Promise.resolve(result)
}
