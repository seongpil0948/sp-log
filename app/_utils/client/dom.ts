'use client'

export const findScrollContainer = (element: HTMLElement) => {
  if (!element) {
    return undefined
  }

  let parent = element.parentElement
  while (parent) {
    const {overflow} = window.getComputedStyle(parent)
    if (overflow.split(' ').every(o => o === 'auto' || o === 'scroll')) {
      return parent
    }
    parent = parent.parentElement
  }

  return document.documentElement
}
