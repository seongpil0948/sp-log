import { useRef } from "react";

export function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): T {
  const lastCall = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return function throttled(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = delay - (now - lastCall.current);

    if (remaining <= 0) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      lastCall.current = now;
      callback.apply(this, args);
    } else if (!timeout.current) {
      timeout.current = setTimeout(() => {
        lastCall.current = Date.now();
        timeout.current = null;
        callback.apply(this, args);
      }, remaining);
    }
  } as T;
}

export default useThrottle