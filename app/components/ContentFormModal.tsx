'use client'

import { useState, useEffect, useRef, DragEvent } from 'react'
import Image from 'next/image'
import './modals.css'
import { WrittenContentDB } from '@/lib/supabase'

interface ContentFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  editContent?: WrittenContentDB | null
}

export default function ContentFormModal({
  isOpen,
  onClose,
  onSuccess,
  editContent
}: ContentFormModalProps) {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [link, setLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [dateAdded, setDateAdded] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditMode = !!editContent

  // Reset form when modal opens/closes or editContent changes
  useEffect(() => {
    if (isOpen) {
      if (editContent) {
        setTitle(editContent.title)
        setSummary(editContent.summary)
        setLink(editContent.link)
        setImageUrl(editContent.image_url)
        setDateAdded(editContent.date_added.split('T')[0])
      } else {
        setTitle('')
        setSummary('')
        setLink('')
        setImageUrl('')
        setDateAdded(new Date().toISOString().split('T')[0])
      }
      setPassphrase('')
      setError('')
    }
  }, [isOpen, editContent])

  const handleImageUpload = async (file: File) => {
    // Ask for passphrase first if not already entered
    const uploadPassphrase = passphrase || prompt('Enter passphrase to upload image:')
    if (!uploadPassphrase) return

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('passphrase', uploadPassphrase)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to upload image')
        return
      }

      setImageUrl(data.url)
      if (!passphrase) setPassphrase(uploadPassphrase)
    } catch (err) {
      setError('Failed to upload image')
      console.error('Upload error:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const removeImage = () => {
    setImageUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const url = '/api/content'
      const method = isEditMode ? 'PUT' : 'POST'
      const body = isEditMode
        ? {
            passphrase,
            id: editContent.id,
            content: {
              title,
              summary,
              link,
              image_url: imageUrl,
              date_added: dateAdded,
            },
          }
        : {
            passphrase,
            content: {
              title,
              summary,
              link,
              image_url: imageUrl,
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
        setError(data.error || 'Failed to save content')
        return
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to save content')
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
        className="modal-container modal-container--large"
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
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="modal-title">
            {isEditMode ? 'Edit Content' : 'Add New Content'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              <span className="form-label__indicator" />
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Enter content title..."
              required
            />
          </div>

          {/* Summary */}
          <div className="form-group">
            <label htmlFor="summary" className="form-label">
              <span className="form-label__indicator" />
              Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="form-textarea"
              placeholder="Brief summary of the content..."
              required
            />
          </div>

          {/* Link */}
          <div className="form-group">
            <label htmlFor="link" className="form-label">
              <span className="form-label__indicator" />
              Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-input"
              placeholder="https://..."
              required
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="dateAdded" className="form-label">
              <span className="form-label__indicator" />
              Date Added
            </label>
            <input
              type="date"
              id="dateAdded"
              value={dateAdded}
              onChange={(e) => setDateAdded(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">
              <span className="form-label__indicator" />
              Image
            </label>
            
            {imageUrl ? (
              <div className="image-preview">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <button 
                  type="button"
                  className="image-preview__remove"
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div 
                className={`file-upload ${isDragOver ? 'file-upload--drag-over' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <div className="file-upload__icon">
                  {isUploading ? (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="50 15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16V8m0 0l3 3m-3-3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 16.7V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <div className="file-upload__text">
                  {isUploading ? 'Uploading...' : 'Drop image here or click to upload'}
                </div>
                <div className="file-upload__hint">
                  JPEG, PNG, GIF, WebP • Max 5MB
                </div>
              </div>
            )}
          </div>

          {/* Passphrase */}
          <div className="form-group">
            <label htmlFor="passphrase" className="form-label">
              <span className="form-label__indicator" />
              Passphrase to Save
            </label>
            <input
              type="password"
              id="passphrase"
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
              className={`btn-modal btn-modal--primary ${isLoading ? 'btn-loading' : ''}`}
              disabled={isLoading}
            >
              <span>{isEditMode ? 'Save Changes' : 'Add Content'}</span>
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
