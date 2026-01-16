'use client'

import { ReactNode } from 'react'
import { GodModeProvider } from '../context/GodModeContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <GodModeProvider>
      {children}
    </GodModeProvider>
  )
}
