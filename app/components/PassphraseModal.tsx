'use client'

import { useState, useEffect, useRef } from 'react'
import './modals.css'

interface PassphraseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (passphrase: string) => boolean
  title?: string
  submitLabel?: string
}

export default function PassphraseModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Enter Passphrase',
  submitLabel = 'Authenticate'
}: PassphraseModalProps) {
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setPassphrase('')
      setError('')
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = onSubmit(passphrase)
    if (success) {
      onClose()
    } else {
      setError("I'm sorry, that's not the right passphrase")
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setPassphrase('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={handleKeyDown}>
      <div 
        className={`modal-container ${isShaking ? 'modal-shake' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner decorations */}
        <div className="modal-corner modal-corner--tl" />
        <div className="modal-corner modal-corner--tr" />
        <div className="modal-corner modal-corner--bl" />
        <div className="modal-corner modal-corner--br" />
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="passphrase" className="form-label">
              <span className="form-label__indicator" />
              Passphrase
            </label>
            <input
              ref={inputRef}
              type="password"
              id="passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="form-input"
              placeholder="Enter authentication code..."
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="form-error">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn-modal btn-modal--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal btn-modal--primary">
              <span>{submitLabel}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
