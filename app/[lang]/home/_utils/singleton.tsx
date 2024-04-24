/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MotionValue } from "framer-motion";

export type SingletonHomeData = number | undefined;

export class SingletonHome {
  private static instance: SingletonHome;
  private data: SingletonHomeData;

  private constructor() {
    console.info("SingletonHome constructor init");
    // this.data = {};
  }

  public static getInstance(): SingletonHome {
    if (!this.instance) {
      this.instance = new SingletonHome();
    }
    return this.instance;
  }

  public getData() {
    return this.data;
  }

  public setData(data: SingletonHomeData): void {
    this.data = data;
  }
}

export default SingletonHome;
