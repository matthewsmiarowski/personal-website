'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useGodMode } from '../context/GodModeContext'
import PassphraseModal from './PassphraseModal'

export default function Navigation() {
  const { isGodMode, enterGodMode, exitGodMode } = useGodMode()
  const [showPassphraseModal, setShowPassphraseModal] = useState(false)

  const handleGodModeClick = () => {
    if (isGodMode) {
      exitGodMode()
    } else {
      setShowPassphraseModal(true)
    }
  }

  const handlePassphraseSubmit = (passphrase: string): boolean => {
    return enterGodMode(passphrase)
  }

  return (
    <>
      <header className="nav-hud">
        <div className="nav-hud__inner">
          {/* Logo / Identity */}
          <Link href="/" className="identity">
            <div className="identity__icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 12L28 16V24L20 28L12 24V16L20 12Z" fill="currentColor" opacity="0.3"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div className="identity__text">
              <span className="identity__name">Matt Smiarowski</span>
              <span className="identity__status">
                <span className={`status-dot ${isGodMode ? 'status-dot--amber' : ''}`} />
                {isGodMode ? 'God Mode Active' : 'System Online'}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link href="/thoughts" className="nav-link">
              <span className="nav-link__index">01</span>
              <span className="nav-link__text">Thoughts</span>
            </Link>
            <Link href="/projects" className="nav-link">
              <span className="nav-link__index">02</span>
              <span className="nav-link__text">Projects</span>
            </Link>
            
            {/* God Mode Toggle */}
            <button 
              className={`god-mode-toggle ${isGodMode ? 'god-mode-toggle--active' : ''}`}
              onClick={handleGodModeClick}
              aria-label={isGodMode ? 'Exit God Mode' : 'Enter God Mode'}
            >
              <span className="god-mode-toggle__icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="god-mode-toggle__text">
                {isGodMode ? 'Exit God Mode' : 'God Mode'}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Passphrase Modal */}
      <PassphraseModal
        isOpen={showPassphraseModal}
        onClose={() => setShowPassphraseModal(false)}
        onSubmit={handlePassphraseSubmit}
        title="Enter God Mode"
        submitLabel="Activate"
      />
    </>
  )
}
