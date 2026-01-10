import Link from 'next/link'
import '../globals.css'

export default function Interests() {
  return (
    <main>
      <div className="container">
        <section style={{ padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Interests</h1>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '3rem' }}>
            Things I&apos;m passionate about
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Interest Category</h2>
              <p style={{ color: '#666' }}>Add your interests here</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
