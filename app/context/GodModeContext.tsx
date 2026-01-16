'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const PASSPHRASE = 'i-love-you-3000'
const STORAGE_KEY = 'godModeActive'

interface GodModeContextType {
  isGodMode: boolean
  enterGodMode: (passphrase: string) => boolean
  exitGodMode: () => void
  validatePassphrase: (passphrase: string) => boolean
}

const GodModeContext = createContext<GodModeContextType | undefined>(undefined)

export function GodModeProvider({ children }: { children: ReactNode }) {
  const [isGodMode, setIsGodMode] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') {
      setIsGodMode(true)
    }
    setIsHydrated(true)
  }, [])

  // Persist state to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, isGodMode.toString())
    }
  }, [isGodMode, isHydrated])

  const validatePassphrase = (passphrase: string): boolean => {
    return passphrase === PASSPHRASE
  }

  const enterGodMode = (passphrase: string): boolean => {
    if (validatePassphrase(passphrase)) {
      setIsGodMode(true)
      return true
    }
    return false
  }

  const exitGodMode = () => {
    setIsGodMode(false)
  }

  return (
    <GodModeContext.Provider value={{ isGodMode, enterGodMode, exitGodMode, validatePassphrase }}>
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
