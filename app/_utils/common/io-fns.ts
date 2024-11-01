// function enumFromStrs<T extends { [key: any]: string }>(
//   s: string[],
//   obj: T
// ): T[] {
//   s.map((str) => {
//     Object.keys(obj).forEach((k) => {
//       if (obj[k] === str) {
//         return k;
//       }
//     });
//   });
//   Object.keys(obj).map((k) => s.includes(obj[k]));
// }
export function splitArray<T>(array: T[], n: number): T[][] {
  const result: T[][] = []
  const len = array.length
  const chunkSize = Math.ceil(len / n)

  for (let i = 0; i < len; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }

  return result
}

export const uniqueArr = <T extends string | number>(arr: T[]): T[] => Array.from(new Set(arr))
export function uniqueFilter<T>(arr: T[]): T[] {
  // used when There are many Duplicate values
  return arr.filter((x, idx) => arr.indexOf(x) === idx)
}
export function range(start: number, end: number) {
  return Array.from(Array(end - start).keys()).map(x => x + 1)
}
export function choice<T>(choices: T[]): T {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

export function valueByDotsKey<T extends { [k: string]: any }>(obj: T, key: string) {
  let result = {} as T
  key.split('.').forEach(k => {
    result = result === null ? obj[k] : result[k]
  })
  return result
}

export const getCopyWith = <T extends {}>(defaultObj: () => T): ((props?: Partial<T>) => T) => {
  return (props?: Partial<T>) => {
    return Object.assign<T, Partial<T>>(defaultObj(), props ?? {}) as T
  }
}

export const debounceFunction = <Func extends (args: any) => void>(callback: Func, delay: number) => {
  // let timer: NodeJS.Timeout;
  let timer: ReturnType<typeof setTimeout>
  return (args: any) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer)
    // delay가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(args), delay)
  }
}

const twoSetDifferece = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  const difference = new Set<T>()
  a.forEach(element => {
    if (!b.has(element)) {
      difference.add(element)
    }
  })
  return difference
}

const twoSetIntersection = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  const intersection = new Set<T>()
  a.forEach(element => {
    if (b.has(element)) {
      intersection.add(element)
    }
  })
  return intersection
}

export const SetUtils = {
  diff: twoSetDifferece,
  inter: twoSetIntersection,
}

export const paramToQuery = (url: string, params: Record<string, string | undefined | number>) => {
  const requestUrl = new URL(url, window.location.origin)
  for (const [key, value] of Object.entries(params)) {
    if (!value) continue
    else if (typeof value === 'number') requestUrl.searchParams.set(key, value.toString())
    else requestUrl.searchParams.set(key, value)
  }
  return requestUrl
}
