import { NextRequest, NextResponse } from 'next/server'
import { validatePassphrase, createSession, getSessionCookieConfig } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { passphrase } = await request.json()

    if (!validatePassphrase(passphrase)) {
      return NextResponse.json(
        { error: "I'm sorry, that's not the right passphrase" },
        { status: 401 }
      )
    }

    const sessionId = createSession()
    const cookieConfig = getSessionCookieConfig()

    const response = NextResponse.json({ success: true })
    response.cookies.set(cookieConfig.name, sessionId, {
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      path: cookieConfig.path,
      maxAge: cookieConfig.maxAge,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
