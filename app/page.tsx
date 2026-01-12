import Link from 'next/link'
import './home.css'

export default function Home() {
  return (
    <main className="workshop">
      {/* Decorative grid overlay */}
      <div className="hex-grid" aria-hidden="true" />
      
      {/* Main Content Area */}
      <div className="workshop__content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__container">
            {/* Left decorative HUD elements */}
            <aside className="hero__hud hero__hud--left" aria-hidden="true">
              <div className="hud-readout">
                <div className="hud-readout__label">SYS.STATUS</div>
                <div className="hud-readout__value">ACTIVE</div>
                <div className="hud-readout__bar">
                  <div className="hud-readout__bar-fill" />
                </div>
              </div>
              <div className="hud-readout">
                <div className="hud-readout__label">NEURAL.NET</div>
                <div className="hud-readout__value">98.7%</div>
                <div className="hud-readout__bar">
                  <div className="hud-readout__bar-fill" style={{ width: '98.7%' }} />
                </div>
              </div>
              <div className="hud-social hud-social--left">
                <div className="hud-social__label">TECH.STACK</div>
                <div className="hud-social__links">
                  <a 
                    href="https://cursor.sh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hud-social__link"
                    aria-label="Cursor"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <path d="M12.58 12.58L19.97 10.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </a>
                  <a 
                    href="https://gemini.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hud-social__link"
                    aria-label="Google Gemini"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </a>
                  <a 
                    href="https://vercel.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hud-social__link"
                    aria-label="Vercel"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </aside>

            {/* Center - Main Title */}
            <div className="hero__main">
              <h1 className="hero__title">
                <span className="hero__title-line">Time to</span>
                <span className="hero__title-line hero__title-line--highlight">Build</span>
              </h1>

              <p className="hero__subtitle">
                curiosity starts beyond the vibes
              </p>
            </div>

            {/* Right decorative HUD elements */}
            <aside className="hero__hud hero__hud--right" aria-hidden="true">
              <div className="hud-social">
                <div className="hud-social__label">SOCIAL</div>
                <div className="hud-social__links">
                  <a 
                    href="https://x.com/mattsmiarowski" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hud-social__link"
                    aria-label="Visit my X profile"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/matthew-smiarowski/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hud-social__link"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Feature Panels */}
        <section className="panels">
          <div className="panels__container">
            <Link href="/thoughts" className="panel">
              <div className="panel__header">
                <span className="panel__number">01</span>
              </div>
              <div className="panel__icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8L24 12V40L12 36V8Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M36 8L24 12V40L36 36V8Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M24 12L12 8L12 36L24 40V12Z" fill="currentColor" opacity="0.15"/>
                  <path d="M24 12L36 8L36 36L24 40V12Z" fill="currentColor" opacity="0.15"/>
                  <line x1="12" y1="8" x2="12" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="36" y1="8" x2="36" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="18" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="18" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="26" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="26" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <h3 className="panel__title">Thoughts</h3>
              <p className="panel__description">
                Blog posts and interesting social media links
              </p>
              <div className="panel__footer">
                <span className="panel__action">Read More</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <Link href="/projects" className="panel panel--featured">
              <div className="panel__header">
                <span className="panel__number">02</span>
              </div>
              <div className="panel__icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6L6 16V32L24 42L42 32V16L24 6Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M24 22L14 28V38L24 42L34 38V28L24 22Z" fill="currentColor" opacity="0.2"/>
                  <path d="M6 16L24 26M24 26L42 16M24 26V42" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="panel__title">Projects</h3>
              <p className="panel__description">
                Experimental builds and side ventures pushing boundaries
              </p>
              <div className="panel__footer">
                <span className="panel__action">View Schematics</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <Link href="/interests" className="panel">
              <div className="panel__header">
                <span className="panel__number">03</span>
              </div>
              <div className="panel__icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="24" cy="24" r="2" fill="currentColor"/>
                  <path d="M24 6V10M24 38V42M6 24H10M38 24H42" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11.27 11.27L14.1 14.1M33.9 33.9L36.73 36.73M11.27 36.73L14.1 33.9M33.9 14.1L36.73 11.27" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                </svg>
              </div>
              <h3 className="panel__title">Interests</h3>
              <p className="panel__description">
                Passions and pursuits beyond the code
              </p>
              <div className="panel__footer">
                <span className="panel__action">Discover More</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-hud">
          <div className="footer-hud__inner">
            <div className="footer-hud__left">
              <span className="footer-hud__text">© 2026 Matt Smiarowski</span>
            </div>
            <div className="footer-hud__center">
              <span className="footer-hud__divider" />
              <span className="footer-hud__text">Powered by curiosity and caffeine</span>
              <span className="footer-hud__divider" />
            </div>
            <div className="footer-hud__right">
              <span className="footer-hud__text">v2026.1.0</span>
            </div>
          </div>
        </footer>
      </div>

    </main>
  )
}
