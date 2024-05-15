import {ICommonDate, ICommonId, IUserId} from '@/types'
import type {AvailDb, CrudBatchDB} from '@/types'
export interface TGuestBook {
  id: string
  uid: string
  nameAlias: string
  message: string
  createdAt: Date
  updatedAt: Date
}

export type TGuestBookDB<DB extends AvailDb> = CrudBatchDB<DB, TGuestBook> & {
  favorite(db: DB, p: PUIds): Promise<void>
  isFavorite(db: DB, p: PUIds): Promise<boolean>
}
interface PUIds {
  uid: string
  postId: string
}
