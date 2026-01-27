'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import '../globals.css'
import './thoughts.css'
import { useGodMode } from '../context/GodModeContext'
import ContentFormModal from '../components/ContentFormModal'
import SocialPostFormModal from '../components/SocialPostFormModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { WrittenContentDB, SocialMediaPostDB } from '@/lib/supabase'

// ============================================
// HELPER COMPONENTS
// ============================================

function DateTag({ date }: { date: Date | string }) {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const formatted = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  
  return (
    <span className="date-tag">
      <span className="date-tag__icon">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M5 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="date-tag__text">{formatted}</span>
    </span>
  )
}

interface WrittenContentCardProps {
  content: WrittenContentDB
  isGodMode: boolean
  onEdit: (content: WrittenContentDB) => void
  onDelete: (content: WrittenContentDB) => void
}

function WrittenContentCard({ content, isGodMode, onEdit, onDelete }: WrittenContentCardProps) {
  return (
    <article className="content-card content-card--written">
      {/* God Mode Actions */}
      {isGodMode && (
        <div className="content-card__actions">
          <button 
            className="content-card__action-btn content-card__action-btn--edit"
            onClick={() => onEdit(content)}
            aria-label="Edit content"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="content-card__action-btn content-card__action-btn--delete"
            onClick={() => onDelete(content)}
            aria-label="Delete content"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      <div className="content-card__image-wrapper">
        {content.image_url ? (
          <Image
            src={content.image_url}
            alt={content.title}
            fill
            className="content-card__image"
          />
        ) : (
          <div className="content-card__image-placeholder">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 32L16 24L24 30L32 22L42 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      
      <div className="content-card__body">
        <DateTag date={content.date_added} />
        
        <h3 className="content-card__title">{content.title}</h3>
        
        <p className="content-card__summary">{content.summary}</p>
        
        <a
          href={content.link}
          target="_blank"
          rel="noopener noreferrer"
          className="content-card__link"
        >
          <span>Read Full Post</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  )
}

interface SocialMediaPostCardProps {
  post: SocialMediaPostDB
  isGodMode: boolean
  onEdit: (post: SocialMediaPostDB) => void
  onDelete: (post: SocialMediaPostDB) => void
}

function SocialMediaPostCard({ post, isGodMode, onEdit, onDelete }: SocialMediaPostCardProps) {
  return (
    <article className="content-card content-card--social">
      {/* God Mode Actions */}
      {isGodMode && (
        <div className="content-card__actions content-card__actions--social">
          <button 
            className="content-card__action-btn content-card__action-btn--edit-amber"
            onClick={() => onEdit(post)}
            aria-label="Edit post"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="content-card__action-btn content-card__action-btn--delete"
            onClick={() => onDelete(post)}
            aria-label="Delete post"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      <div className="content-card__header">
        <DateTag date={post.date_added} />
        <div className="content-card__social-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="content-card__body">
        <p className="content-card__thoughts">{post.thoughts}</p>
        
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="content-card__link content-card__link--social"
        >
          <span>View Original Post</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3V13H13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 3H13V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 3L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  )
}

function EmptyState({ type }: { type: 'written' | 'social' }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        {type === 'written' ? (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8L24 12V40L12 36V8Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M36 8L24 12V40L36 36V8Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M24 12L12 8L12 36L24 40V12Z" fill="currentColor" opacity="0.15"/>
          </svg>
        ) : (
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M24 16V24L30 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <p className="empty-state__text">
        {type === 'written' 
          ? 'Written content coming soon...'
          : 'Social media posts coming soon...'}
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-state__spinner" />
      <p className="loading-state__text">Loading content...</p>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Thoughts() {
  const { isGodMode } = useGodMode()
  
  // Written content state
  const [writtenContent, setWrittenContent] = useState<WrittenContentDB[]>([])
  const [isLoadingWritten, setIsLoadingWritten] = useState(true)
  const [errorWritten, setErrorWritten] = useState<string | null>(null)
  
  // Social posts state
  const [socialPosts, setSocialPosts] = useState<SocialMediaPostDB[]>([])
  const [isLoadingSocial, setIsLoadingSocial] = useState(true)
  const [errorSocial, setErrorSocial] = useState<string | null>(null)
  
  // Written content modal states
  const [showAddContentModal, setShowAddContentModal] = useState(false)
  const [editContent, setEditContent] = useState<WrittenContentDB | null>(null)
  const [deleteContent, setDeleteContent] = useState<WrittenContentDB | null>(null)
  
  // Social post modal states
  const [showAddSocialModal, setShowAddSocialModal] = useState(false)
  const [editSocialPost, setEditSocialPost] = useState<SocialMediaPostDB | null>(null)
  const [deleteSocialPost, setDeleteSocialPost] = useState<SocialMediaPostDB | null>(null)

  // Fetch written content from API
  const fetchWrittenContent = async () => {
    try {
      const response = await fetch('/api/content')
      if (!response.ok) {
        throw new Error('Failed to fetch content')
      }
      const data = await response.json()
      // Sort by date_added descending (most recent first), then by created_at as tiebreaker
      const sorted = [...data].sort((a, b) => {
        const dateA = new Date(a.date_added).getTime()
        const dateB = new Date(b.date_added).getTime()
        if (dateB !== dateA) {
          return dateB - dateA // Descending order (newest first)
        }
        // If date_added is the same, use created_at as tiebreaker
        const createdA = new Date(a.created_at).getTime()
        const createdB = new Date(b.created_at).getTime()
        return createdB - createdA // Descending order (newest first)
      })
      setWrittenContent(sorted)
      setErrorWritten(null)
    } catch (err) {
      console.error('Error fetching content:', err)
      setErrorWritten('Failed to load content')
    } finally {
      setIsLoadingWritten(false)
    }
  }

  // Fetch social posts from API
  const fetchSocialPosts = async () => {
    try {
      const response = await fetch('/api/social-posts')
      if (!response.ok) {
        throw new Error('Failed to fetch social posts')
      }
      const data = await response.json()
      // Sort by date_added descending (most recent first), then by created_at as tiebreaker
      const sorted = [...data].sort((a, b) => {
        const dateA = new Date(a.date_added).getTime()
        const dateB = new Date(b.date_added).getTime()
        if (dateB !== dateA) {
          return dateB - dateA // Descending order (newest first)
        }
        // If date_added is the same, use created_at as tiebreaker
        const createdA = new Date(a.created_at).getTime()
        const createdB = new Date(b.created_at).getTime()
        return createdB - createdA // Descending order (newest first)
      })
      setSocialPosts(sorted)
      setErrorSocial(null)
    } catch (err) {
      console.error('Error fetching social posts:', err)
      setErrorSocial('Failed to load social posts')
    } finally {
      setIsLoadingSocial(false)
    }
  }

  useEffect(() => {
    fetchWrittenContent()
    fetchSocialPosts()
  }, [])

  // Written content handlers
  const handleEditContent = (content: WrittenContentDB) => {
    setEditContent(content)
  }

  const handleDeleteContent = (content: WrittenContentDB) => {
    setDeleteContent(content)
  }

  const confirmDeleteContent = async (): Promise<boolean> => {
    if (!deleteContent) return false

    try {
      const response = await fetch('/api/content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteContent.id }),
        credentials: 'include',
      })

      if (!response.ok) {
        if (response.status === 401) {
          return false // Session expired
        }
        throw new Error('Failed to delete')
      }

      await fetchWrittenContent()
      return true
    } catch (err) {
      console.error('Delete error:', err)
      throw err
    }
  }

  // Social post handlers
  const handleEditSocialPost = (post: SocialMediaPostDB) => {
    setEditSocialPost(post)
  }

  const handleDeleteSocialPost = (post: SocialMediaPostDB) => {
    setDeleteSocialPost(post)
  }

  const confirmDeleteSocialPost = async (): Promise<boolean> => {
    if (!deleteSocialPost) return false

    try {
      const response = await fetch('/api/social-posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteSocialPost.id }),
        credentials: 'include',
      })

      if (!response.ok) {
        if (response.status === 401) {
          return false // Session expired
        }
        throw new Error('Failed to delete')
      }

      await fetchSocialPosts()
      return true
    } catch (err) {
      console.error('Delete error:', err)
      throw err
    }
  }

  return (
    <main className="thoughts-page">
      <div className="container">
        {/* Page Header */}
        <header className="thoughts-header">
          <div className="thoughts-header__badge">
            <span className="thoughts-header__badge-dot" />
            <span>Thought Stream</span>
          </div>
          <h1 className="thoughts-header__title">Thoughts</h1>
          <p className="thoughts-header__description">
            Blog posts, ideas, and interesting links from around the web
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="thoughts-grid">
          {/* Left Column - Written Content */}
          <section className="thoughts-column thoughts-column--written">
            <div className="column-header">
              <div className="column-header__icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="column-header__title">Written Content</h2>
              <span className="column-header__count">{writtenContent.length}</span>
            </div>

            {/* God Mode: Add Content Button */}
            {isGodMode && (
              <button 
                className="add-content-btn"
                onClick={() => setShowAddContentModal(true)}
              >
                <span className="add-content-btn__icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>Add Content</span>
              </button>
            )}
            
            <div className="content-list">
              {isLoadingWritten ? (
                <LoadingState />
              ) : errorWritten ? (
                <div className="error-state">
                  <p>{errorWritten}</p>
                  <button onClick={fetchWrittenContent}>Retry</button>
                </div>
              ) : writtenContent.length > 0 ? (
                writtenContent.map((content) => (
                  <WrittenContentCard 
                    key={content.id} 
                    content={content}
                    isGodMode={isGodMode}
                    onEdit={handleEditContent}
                    onDelete={handleDeleteContent}
                  />
                ))
              ) : (
                <EmptyState type="written" />
              )}
            </div>
          </section>

          {/* Right Column - Social Media Posts */}
          <section className="thoughts-column thoughts-column--social">
            <div className="column-header column-header--amber">
              <div className="column-header__icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="column-header__title">Social Feed</h2>
              <span className="column-header__count">{socialPosts.length}</span>
            </div>

            {/* God Mode: Add Social Post Button */}
            {isGodMode && (
              <button 
                className="add-content-btn add-content-btn--amber"
                onClick={() => setShowAddSocialModal(true)}
              >
                <span className="add-content-btn__icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span>Add Post</span>
              </button>
            )}
            
            <div className="content-list">
              {isLoadingSocial ? (
                <LoadingState />
              ) : errorSocial ? (
                <div className="error-state">
                  <p>{errorSocial}</p>
                  <button onClick={fetchSocialPosts}>Retry</button>
                </div>
              ) : socialPosts.length > 0 ? (
                socialPosts.map((post) => (
                  <SocialMediaPostCard 
                    key={post.id} 
                    post={post}
                    isGodMode={isGodMode}
                    onEdit={handleEditSocialPost}
                    onDelete={handleDeleteSocialPost}
                  />
                ))
              ) : (
                <EmptyState type="social" />
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Written Content Modals */}
      <ContentFormModal
        isOpen={showAddContentModal || !!editContent}
        onClose={() => {
          setShowAddContentModal(false)
          setEditContent(null)
        }}
        onSuccess={fetchWrittenContent}
        editContent={editContent}
      />

      <DeleteConfirmModal
        isOpen={!!deleteContent}
        onClose={() => setDeleteContent(null)}
        onConfirm={confirmDeleteContent}
        title={deleteContent?.title || ''}
      />

      {/* Social Post Modals */}
      <SocialPostFormModal
        isOpen={showAddSocialModal || !!editSocialPost}
        onClose={() => {
          setShowAddSocialModal(false)
          setEditSocialPost(null)
        }}
        onSuccess={fetchSocialPosts}
        editPost={editSocialPost}
      />

      <DeleteConfirmModal
        isOpen={!!deleteSocialPost}
        onClose={() => setDeleteSocialPost(null)}
        onConfirm={confirmDeleteSocialPost}
        title={`Social post from ${deleteSocialPost ? new Date(deleteSocialPost.date_added).toLocaleDateString() : ''}`}
      />
    </main>
  )
}
