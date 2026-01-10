import Link from 'next/link'
import './home.css'

export default function Home() {
  return (
    <main className="home-page">
      <div className="container">
        <header className="header">
          <nav className="nav">
            <Link href="/" className="logo">Matt Smiarowski</Link>
            <div className="nav-links">
              <Link href="/work">Work</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/interests">Interests</Link>
            </div>
          </nav>
        </header>

        <section className="hero">
          <h1 className="hero-title">Welcome</h1>
          <p className="hero-subtitle">
            This is my personal website where I share my work, projects, and interests.
          </p>
        </section>

        <section className="quick-links">
          <Link href="/work" className="card">
            <h2>Work</h2>
            <p>Explore my professional experience and accomplishments</p>
          </Link>
          <Link href="/projects" className="card">
            <h2>Projects</h2>
            <p>Check out some of my recent projects and side work</p>
          </Link>
          <Link href="/interests" className="card">
            <h2>Interests</h2>
            <p>Learn about what I&apos;m passionate about</p>
          </Link>
        </section>
      </div>
    </main>
  )
}
