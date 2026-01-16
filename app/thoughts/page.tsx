import Link from 'next/link'
import Image from 'next/image'
import '../globals.css'
import './thoughts.css'

// ============================================
// TYPE DEFINITIONS
// ============================================

interface WrittenContent {
  id: string
  title: string
  summary: string
  link: string
  image: string
  dateAdded: Date
}

interface SocialMediaPost {
  id: string
  link: string
  thoughts: string
  dateAdded: Date
}

// ============================================
// CONTENT DATA
// Content is manually added here and sorted by dateAdded (newest first)
// ============================================

const writtenContent: WrittenContent[] = [
  // Add written content here in the following format:
  // {
  //   id: 'unique-id',
  //   title: 'Post Title',
  //   summary: 'A short summary of the post...',
  //   link: 'https://your-platform.com/post-link',
  //   image: '/path-to-image.jpg',
  //   dateAdded: new Date('2026-01-15'),
  // },
]

const socialMediaPosts: SocialMediaPost[] = [
  // Add social media posts here in the following format:
  // {
  //   id: 'unique-id',
  //   link: 'https://x.com/username/status/123456',
  //   thoughts: 'My thoughts on this post...',
  //   dateAdded: new Date('2026-01-15'),
  // },
]

// Sort content by dateAdded (newest first)
const sortedWrittenContent = [...writtenContent].sort(
  (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
)

const sortedSocialMediaPosts = [...socialMediaPosts].sort(
  (a, b) => b.dateAdded.getTime() - a.dateAdded.getTime()
)

// ============================================
// HELPER COMPONENTS
// ============================================

function DateTag({ date }: { date: Date }) {
  const formatted = date.toLocaleDateString('en-US', {
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

function WrittenContentCard({ content }: { content: WrittenContent }) {
  return (
    <article className="content-card content-card--written">
      <div className="content-card__image-wrapper">
        {content.image ? (
          <Image
            src={content.image}
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
        <DateTag date={content.dateAdded} />
        
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

function SocialMediaPostCard({ post }: { post: SocialMediaPost }) {
  return (
    <article className="content-card content-card--social">
      <div className="content-card__header">
        <DateTag date={post.dateAdded} />
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

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Thoughts() {
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
              <span className="column-header__count">{sortedWrittenContent.length}</span>
            </div>
            
            <div className="content-list">
              {sortedWrittenContent.length > 0 ? (
                sortedWrittenContent.map((content) => (
                  <WrittenContentCard key={content.id} content={content} />
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
              <span className="column-header__count">{sortedSocialMediaPosts.length}</span>
            </div>
            
            <div className="content-list">
              {sortedSocialMediaPosts.length > 0 ? (
                sortedSocialMediaPosts.map((post) => (
                  <SocialMediaPostCard key={post.id} post={post} />
                ))
              ) : (
                <EmptyState type="social" />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
