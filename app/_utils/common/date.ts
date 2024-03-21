import { Timestamp } from "firebase/firestore";
import dayjs from 'dayjs'
import { TIME_FORMATS } from "@/types";

export const newDate = () => dayjs().toDate();

export const getDateFormat = (f: TIME_FORMATS) => {
  switch (f) {
    case TIME_FORMATS.DAY:
      return "yyyy-MM-dd";
    case TIME_FORMATS.MIN:
      return "yyyy-MM-dd HH:mm";
  }
};
export function dateToTimeStamp(d: Date | undefined): Timestamp {
  if (!(d instanceof Date)) {
    d = loadDate(d);
  }
  if (!d) {
    d = dayjs().toDate()
  }
  if (typeof d!["getTime"] === "function") {
    return Timestamp.fromDate(d!);
  }
  return Timestamp.now();
}
export function loadDate(
  d: Date | { [x: string]: number } | string | undefined
): Date {
  if (!d) return new Date();
  else if (d instanceof Date) return d;
  else if (d instanceof Timestamp) return d.toDate();
  else if (typeof d === "string") return dayjs(d).toDate()
  else if (typeof d === "number") return Timestamp.fromMillis(d).toDate();
  else if (d.seconds && d.nanoseconds)
    return new Timestamp(d.seconds, d.nanoseconds).toDate();
  else if (d.seconds && d.constructor.name === "ut")
    return new Timestamp(d.seconds + 60 * 60 * 15, d.nanoseconds).toDate();
  else return new Date();
}
