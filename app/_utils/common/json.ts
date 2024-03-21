import { Timestamp } from "firebase/firestore";
import { dateToTimeStamp, loadDate } from ".";

export function commonToJson(c: any, onDate?: (d: Date) => any) {
  const dateKeys: string[] = [];
  Object.entries(c).forEach(([k, v]) => {
    if (Object.prototype.toString.call(v) === "[object Date]") {
      dateKeys.push(k);
    }
  });
  const j = JSON.parse(JSON.stringify(c));
  dateKeys.forEach((dk) => {
    j[dk] = onDate ? onDate(c[dk]) : dateToTimeStamp(c[dk]);
  });
  return j;
}

export function commonFromJson(data: { [k: string]: any }) {
  Object.keys(data).forEach((k) => {
    if (data[k] instanceof Timestamp) {
      data[k] = loadDate(data[k]);
    }
  });
  return data;
}
