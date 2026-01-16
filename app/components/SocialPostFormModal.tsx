'use client'

import { useState, useEffect } from 'react'
import './modals.css'
import { SocialMediaPostDB } from '@/lib/supabase'

interface SocialPostFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  editPost?: SocialMediaPostDB | null
}

export default function SocialPostFormModal({
  isOpen,
  onClose,
  onSuccess,
  editPost
}: SocialPostFormModalProps) {
  const [link, setLink] = useState('')
  const [thoughts, setThoughts] = useState('')
  const [dateAdded, setDateAdded] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isEditMode = !!editPost

  // Reset form when modal opens/closes or editPost changes
  useEffect(() => {
    if (isOpen) {
      if (editPost) {
        setLink(editPost.link)
        setThoughts(editPost.thoughts)
        setDateAdded(editPost.date_added.split('T')[0])
      } else {
        setLink('')
        setThoughts('')
        setDateAdded(new Date().toISOString().split('T')[0])
      }
      setPassphrase('')
      setError('')
    }
  }, [isOpen, editPost])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const url = '/api/social-posts'
      const method = isEditMode ? 'PUT' : 'POST'
      const body = isEditMode
        ? {
            passphrase,
            id: editPost.id,
            post: {
              link,
              thoughts,
              date_added: dateAdded,
            },
          }
        : {
            passphrase,
            post: {
              link,
              thoughts,
              date_added: dateAdded,
            },
          }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save post')
        return
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to save post')
      console.error('Submit error:', err)
    } finally {
      setIsLoading(false)
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
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner decorations - amber themed */}
        <div className="modal-corner modal-corner--tl modal-corner--amber" />
        <div className="modal-corner modal-corner--tr modal-corner--amber" />
        <div className="modal-corner modal-corner--bl modal-corner--amber" />
        <div className="modal-corner modal-corner--br modal-corner--amber" />
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header__icon modal-header__icon--amber">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="modal-title">
            {isEditMode ? 'Edit Social Post' : 'Add Social Post'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Link */}
          <div className="form-group">
            <label htmlFor="social-link" className="form-label form-label--amber">
              <span className="form-label__indicator form-label__indicator--amber" />
              Post Link
            </label>
            <input
              type="url"
              id="social-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-input"
              placeholder="https://x.com/username/status/..."
              required
            />
          </div>

          {/* Thoughts */}
          <div className="form-group">
            <label htmlFor="thoughts" className="form-label form-label--amber">
              <span className="form-label__indicator form-label__indicator--amber" />
              Your Thoughts
            </label>
            <textarea
              id="thoughts"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              className="form-textarea"
              placeholder="What do you think about this post..."
              required
              rows={4}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="social-date" className="form-label form-label--amber">
              <span className="form-label__indicator form-label__indicator--amber" />
              Date Added
            </label>
            <input
              type="date"
              id="social-date"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Passphrase */}
          <div className="form-group">
            <label htmlFor="social-passphrase" className="form-label form-label--amber">
              <span className="form-label__indicator form-label__indicator--amber" />
              Passphrase to Save
            </label>
            <input
              type="password"
              id="social-passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="form-input"
              placeholder="Enter passphrase to save..."
              required
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
            <button 
              type="submit" 
              className={`btn-modal btn-modal--amber ${isLoading ? 'btn-loading' : ''}`}
              disabled={isLoading}
            >
              <span>{isEditMode ? 'Save Changes' : 'Add Post'}</span>
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
