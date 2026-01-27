'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const STORAGE_KEY = 'godModeActive'

interface GodModeContextType {
  isGodMode: boolean
  isLoading: boolean
  enterGodMode: (passphrase: string) => Promise<boolean>
  exitGodMode: () => Promise<void>
}

const GodModeContext = createContext<GodModeContextType | undefined>(undefined)

export function GodModeProvider({ children }: { children: ReactNode }) {
  const [isGodMode, setIsGodMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status')
      const data = await response.json()
      setIsGodMode(data.authenticated)
      localStorage.setItem(STORAGE_KEY, data.authenticated.toString())
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setIsGodMode(false)
    } finally {
      setIsLoading(false)
    }
  }

  const enterGodMode = async (passphrase: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      })

      if (response.ok) {
        setIsGodMode(true)
        localStorage.setItem(STORAGE_KEY, 'true')
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const exitGodMode = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsGodMode(false)
      localStorage.setItem(STORAGE_KEY, 'false')
    }
  }

  return (
    <GodModeContext.Provider value={{ isGodMode, isLoading, enterGodMode, exitGodMode }}>
      {children}
    </GodModeContext.Provider>
  )
}

export function useGodMode() {
  const context = useContext(GodModeContext)
  if (context === undefined) {
    throw new Error('useGodMode must be used within a GodModeProvider')
  }
  return context
}
