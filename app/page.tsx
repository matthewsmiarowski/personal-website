import Link from 'next/link'
import HudClock from './components/HudClock'
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
              <div className="hud-readout">
                <div className="hud-readout__label">BUILD.VER</div>
                <div className="hud-readout__value">2026.1</div>
              </div>
            </aside>

            {/* Center - Main Title */}
            <div className="hero__main">
              <div className="hero__greeting">
                <span className="hero__greeting-line" />
                <span className="hero__greeting-text">Welcome, User</span>
                <span className="hero__greeting-line" />
              </div>
              
              <h1 className="hero__title">
                <span className="hero__title-line">Building the</span>
                <span className="hero__title-line hero__title-line--highlight">Future</span>
              </h1>

              <p className="hero__subtitle">
                Engineer • Builder • Innovator
              </p>

              <div className="hero__cta">
                <Link href="/projects" className="btn-holo">
                  <span>Explore Projects</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/work" className="btn-holo amber">
                  <span>View Experience</span>
                </Link>
              </div>
            </div>

            {/* Right decorative HUD elements */}
            <aside className="hero__hud hero__hud--right" aria-hidden="true">
              <div className="hud-clock">
                <div className="hud-clock__label">LOCAL.TIME</div>
                <HudClock />
              </div>
              <div className="hud-coords">
                <div className="hud-coords__label">COORDINATES</div>
                <div className="hud-coords__value">41.8781° N</div>
                <div className="hud-coords__value">87.6298° W</div>
              </div>
            </aside>
          </div>
        </section>

        {/* Feature Panels */}
        <section className="panels">
          <div className="panels__container">
            <Link href="/work" className="panel">
              <div className="panel__header">
                <span className="panel__number">01</span>
                <span className="panel__status">
                  <span className="status-dot" />
                  Active
                </span>
              </div>
              <div className="panel__icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 18H42" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.5"/>
                  <circle cx="18" cy="14" r="2" fill="currentColor" opacity="0.5"/>
                  <path d="M14 26L18 30L26 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="panel__title">Work Experience</h3>
              <p className="panel__description">
                Professional journey through technology and innovation
              </p>
              <div className="panel__footer">
                <span className="panel__action">Access Records</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <Link href="/projects" className="panel panel--featured">
              <div className="panel__header">
                <span className="panel__number">02</span>
                <span className="panel__status panel__status--highlight">
                  <span className="status-dot status-dot--amber" />
                  Featured
                </span>
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
                <span className="panel__status">
                  <span className="status-dot" />
                  Active
                </span>
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
