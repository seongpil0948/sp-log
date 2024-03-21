import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


import type admin from "@/config/firebase/nodeApp";
import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export interface ICommonDate {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ICommonId {
  readonly id: string;
}
export interface IUserId {
  readonly userId: string;
}

export type OtherDB = {
  host: string;
  user: string;
  password: string;
};

export enum TIME_FORMATS {
  DAY,
  MIN,
}

export interface PaginateParam<T> {
  readonly pageSize?: number;
  readonly lastData?: QueryDocumentSnapshot<T | null, DocumentData>;
  readonly orderBy?: keyof T;
}

export type AdminFirestore = ReturnType<typeof admin.firestore>;
export type AvailDb = Firestore | OtherDB | AdminFirestore;

export interface ICrudDB<DB extends AvailDb, T> {
  create(db: DB, arg: T): Promise<void>;
  get(db: DB, id: string): Promise<T | undefined>;
  list(
    db: DB,
    d: PaginateParam<T>
  ): Promise<{
    data: T[];
    noMore: boolean;
    lastDoc?: QueryDocumentSnapshot<T | null, DocumentData>;
  }>;
  listByIds(db: DB, ids: string[]): Promise<T[]>;
  update(db: DB, arg: T): Promise<void>;
  delete(db: DB, id: string): Promise<void>;
}

export interface CrudBatchDB<DB extends AvailDb, T> extends ICrudDB<DB, T> {
  batchCreate(db: DB, args: T[]): Promise<void>;
}
