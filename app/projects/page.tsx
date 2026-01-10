import Link from 'next/link'
import '../globals.css'

export default function Projects() {
  return (
    <main>
      <div className="container">
        <header style={{ padding: '2rem 0', borderBottom: '1px solid #e5e5e5' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 600 }}>Matt Smiarowski</Link>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/work">Work</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/interests">Interests</Link>
            </div>
          </nav>
        </header>

        <section style={{ padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Projects</h1>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '3rem' }}>
            Some of my recent projects and side work
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Project Title</h2>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Project description goes here</p>
              <a href="#" style={{ color: '#667eea', fontWeight: 500 }}>View Project →</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
