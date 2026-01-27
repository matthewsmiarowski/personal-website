'use client'

import { useState } from 'react'
import './modals.css'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<boolean>
  title: string
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title
}: DeleteConfirmModalProps) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await onConfirm()
      if (success) {
        onClose()
      } else {
        setError('Session expired. Please re-authenticate via God Mode.')
      }
    } catch (err) {
      setError('Failed to delete content')
      console.error('Delete error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setError('')
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose} onKeyDown={handleKeyDown}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner decorations */}
        <div className="modal-corner modal-corner--tl" />
        <div className="modal-corner modal-corner--tr" />
        <div className="modal-corner modal-corner--bl" />
        <div className="modal-corner modal-corner--br" />

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__icon" style={{ color: 'var(--jarvis-red)' }}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="modal-title">Delete Content</h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="confirm-content">
            <div className="confirm-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="confirm-message">
              Are you sure you want to delete<br />
              <strong>&ldquo;{title}&rdquo;</strong>?
              <br /><br />
              This action cannot be undone.
            </p>
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
            <button type="button" className="btn-modal btn-modal--secondary" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-modal btn-modal--danger ${isLoading ? 'btn-loading' : ''}`}
              disabled={isLoading}
            >
              <span>Delete</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4m2 0v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
