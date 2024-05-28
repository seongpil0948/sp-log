import {splitLocaleAndPath, getLocaleRequest} from '@/app/_utils/server/locale'

import {NextResponse} from 'next/server'

import commonConfig from './config'

import type {NextRequest} from 'next/server'


export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    // '/((?!api/*|_next/static|_next/image|icon/*|favicon.ico|image/*|sw|worker|peach-service-worker|workbox|__nextjs_original-stack-frame).*)',
    // `/dsi/api/:path*`,
    // `/acf/api/:path*`,
    // "/((?!api|_next/static|favicon.ico).*)",
    // "/code/:path*",
    // "/signin",
    '/docs/:path*',
    '/artifacts/:path*',
    '/home',
    '/about',
    '/game/:path*',
    '/project/:path*',
    '/',
  ],
}
const IGNORE_PATHS = [
  'icon/',
  'sitemap.xml',
  'robots.txt',
  'favicon.ico',
  'svg',
  'manifest',
  'sw.js',
  'worker.js',
  'peach-service-worker.js',
  'workbox',
  'png',
  'jpg',
]

export async function middleware(request: NextRequest) {
  const nextP = request.nextUrl.pathname
  if (IGNORE_PATHS.some(p => nextP.includes(p))) {
    return NextResponse.next()
  }
  console.log(nextP)

  let {locale, path: onlyPath} = await splitLocaleAndPath(nextP)

  if (onlyPath === '/' || onlyPath === '') {
    onlyPath = commonConfig.system.landingPath
  }

  if (onlyPath.includes('/api')) {
    locale = undefined
  } else if (!locale) {
    locale = getLocaleRequest(request)
  }
  // console.log({ onlyPath, locale, nextP })

  const join = (p: string, l?: string) => {
    if (!l) return new URL(p, request.url)
    return new URL(`/${l}${p.startsWith('/') ? '' : '/'}${p}`, request.url)
  }

  const nextUrl = join(onlyPath, locale)
  if (nextUrl.pathname === nextP) {
    return NextResponse.next()
  }
  // console.log(`go redirect from ${nextP} to ${nextUrl.pathname}`)
  return NextResponse.redirect(nextUrl, {status: 301})
}
