import {
  MotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from 'framer-motion'

export function useSmoothTransform<T>(
  value: MotionValue<T>,
  springOptions: SpringOptions,
  transformer: (value: T) => T,
) {
  return useSpring(useTransform(value, transformer), springOptions)
}
