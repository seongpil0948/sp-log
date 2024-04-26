/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MotionValue } from "framer-motion";

export type SingletonHomeData = MotionValue<number>;

export class SingletonHome {
  private static instance: SingletonHome;
  private _data?: SingletonHomeData;

  private constructor() {
    console.info("SingletonHome constructor init");
  }

  public static getInstance(): SingletonHome {
    if (!this.instance) {
      this.instance = new SingletonHome();
    }
    return this.instance;
  }

  get data() {
    if (!this._data) throw new Error("data is not settled");
    return this._data;
  }

  public setData(data: SingletonHomeData): void {
    this._data = data;
  }
}

export default SingletonHome;
