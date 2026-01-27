import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

const SESSION_COOKIE_NAME = 'god_session'
const SESSION_SECRET = process.env.GOD_PASSPHRASE || ''

// Session expiration time in seconds (7 days)
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export function validatePassphrase(passphrase: string): boolean {
  return passphrase === SESSION_SECRET
}

/**
 * Sign a message using HMAC-SHA256 with the session secret
 */
function signToken(payload: string): string {
  return createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex')
}

/**
 * Verify that a signature matches the expected signature for a payload
 * Uses timing-safe comparison to prevent timing attacks
 */
function verifySignature(payload: string, signature: string): boolean {
  const expectedSignature = signToken(payload)
  
  // Ensure both strings are the same length before comparison
  if (signature.length !== expectedSignature.length) {
    return false
  }
  
  try {
    return timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    )
  } catch {
    return false
  }
}

/**
 * Create a signed session token
 * Format: {timestamp}:{nonce}:{signature}
 */
export function createSession(): string {
  const timestamp = Date.now()
  const nonce = crypto.randomUUID()
  const payload = `${timestamp}:${nonce}`
  const signature = signToken(payload)
  
  return `${payload}:${signature}`
}

/**
 * Destroy session - no-op for stateless cookie-based auth
 * Cookie clearing is handled by setting maxAge to 0
 */
export function destroySession(_sessionId: string): void {
  // No-op for stateless sessions - cookie clearing handled separately
}

/**
 * Validate a session token
 * Checks:
 * 1. Token format is correct (timestamp:nonce:signature)
 * 2. Signature is valid (cryptographically verified)
 * 3. Session has not expired (timestamp within maxAge)
 */
export function isValidSession(sessionToken: string | undefined): boolean {
  if (!sessionToken) return false
  
  // Parse token: timestamp:nonce:signature
  const parts = sessionToken.split(':')
  if (parts.length !== 3) return false
  
  const [timestampStr, nonce, signature] = parts
  
  // Validate timestamp is a number
  const timestamp = parseInt(timestampStr, 10)
  if (isNaN(timestamp)) return false
  
  // Validate nonce format (should be a UUID)
  if (!nonce || nonce.length === 0) return false
  
  // Verify signature
  const payload = `${timestampStr}:${nonce}`
  if (!verifySignature(payload, signature)) {
    return false
  }
  
  // Check session expiration (defense-in-depth alongside cookie maxAge)
  const now = Date.now()
  const sessionAgeMs = now - timestamp
  const maxAgeMs = SESSION_MAX_AGE_SECONDS * 1000
  
  if (sessionAgeMs > maxAgeMs) {
    return false
  }
  
  return true
}

export function getSessionCookieConfig() {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  }
}

export async function getSessionFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE_NAME)?.value
}

export async function isAuthenticated(): Promise<boolean> {
  const sessionToken = await getSessionFromCookies()
  return isValidSession(sessionToken)
}
