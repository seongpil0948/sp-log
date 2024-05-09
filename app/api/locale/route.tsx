import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import SERVER_CONFIG from '../config'
import commonConfig from '@/config'

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams
  const newLocale = searchParams.get('locale')
  if (!newLocale) {
    return NextResponse.json(
      {
        error: 'Empty locale',
      },
      { status: 400 },
    )
  } else if (!commonConfig.i18n.isAvailableLocale(newLocale)) {
    return NextResponse.json(
      {
        error: 'Invalid locale',
      },
      { status: 400 },
    )
  }

  cookies().set({
    name: SERVER_CONFIG.cookie.keyLocale,
    value: newLocale,
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    secure: true,
  })
  return NextResponse.json({}, { status: 200 })
}
