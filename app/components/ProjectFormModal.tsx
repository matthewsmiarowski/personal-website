'use client'

import { useState, useEffect, useRef, DragEvent } from 'react'
import Image from 'next/image'
import './modals.css'
import { ProjectDB } from '@/lib/supabase'

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  editProject?: ProjectDB | null
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
  editProject
}: ProjectFormModalProps) {
  const [name, setName] = useState('')
  const [motivation, setMotivation] = useState('')
  const [link, setLink] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [dateAdded, setDateAdded] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditMode = !!editProject

  // Reset form when modal opens/closes or editProject changes
  useEffect(() => {
    if (isOpen) {
      if (editProject) {
        setName(editProject.name)
        setMotivation(editProject.motivation)
        setLink(editProject.link)
        setImageUrl(editProject.image_url)
        setDateAdded(editProject.date_added.split('T')[0])
      } else {
        setName('')
        setMotivation('')
        setLink('')
        setImageUrl('')
        setDateAdded(new Date().toISOString().split('T')[0])
      }
      setError('')
    }
  }, [isOpen, editProject])

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const data = await response.json()

      if (response.status === 401) {
        setError('Session expired. Please re-authenticate via Jarvis Mode.')
        return
      }

      if (!response.ok) {
        setError(data.error || 'Failed to upload image')
        return
      }

      setImageUrl(data.url)
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
      const url = '/api/projects'
      const method = isEditMode ? 'PUT' : 'POST'
      const body = isEditMode
        ? {
            id: editProject.id,
            project: {
              name,
              motivation,
              link,
              image_url: imageUrl,
              date_added: dateAdded,
            },
          }
        : {
            project: {
              name,
              motivation,
              link,
              image_url: imageUrl,
              date_added: dateAdded,
            },
          }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.status === 401) {
        setError('Session expired. Please re-authenticate via Jarvis Mode.')
        return
      }

      if (!response.ok) {
        setError(data.error || 'Failed to save project')
        return
      }

      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to save project')
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
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="modal-title">
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="project-name" className="form-label">
              <span className="form-label__indicator" />
              Project Name
            </label>
            <input
              type="text"
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Enter project name..."
              required
            />
          </div>

          {/* Motivation */}
          <div className="form-group">
            <label htmlFor="motivation" className="form-label">
              <span className="form-label__indicator" />
              Motivation
            </label>
            <textarea
              id="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="form-textarea"
              placeholder="Why did you build this? (1-3 sentences)"
              required
              rows={3}
            />
          </div>

          {/* Link */}
          <div className="form-group">
            <label htmlFor="project-link" className="form-label">
              <span className="form-label__indicator" />
              Link
            </label>
            <input
              type="url"
              id="project-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="form-input"
              placeholder="https://..."
              required
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="project-date" className="form-label">
              <span className="form-label__indicator" />
              Date Added
            </label>
            <input
              type="date"
              id="project-date"
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
              Screenshot / Image
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
              <span>{isEditMode ? 'Save Changes' : 'Add Project'}</span>
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
