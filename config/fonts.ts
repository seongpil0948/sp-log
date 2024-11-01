import { Fira_Code as FontMono, Inter as FontSans, Nanum_Gothic, Nanum_Pen_Script, Roboto } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})
export const fontRoboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const fontNanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  adjustFontFallback: false,
})
export const fontNanumPenScript = Nanum_Pen_Script({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  adjustFontFallback: false,
})
