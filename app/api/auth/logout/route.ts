import { NextResponse } from 'next/server'
import { getSessionFromCookies, destroySession, getSessionCookieConfig } from '@/lib/auth'

export async function POST() {
  try {
    const sessionId = await getSessionFromCookies()
    if (sessionId) {
      destroySession(sessionId)
    }

    const cookieConfig = getSessionCookieConfig()
    const response = NextResponse.json({ success: true })

    // Clear the cookie by setting maxAge to 0
    response.cookies.set(cookieConfig.name, '', {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      path: cookieConfig.path,
      maxAge: 0,
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
