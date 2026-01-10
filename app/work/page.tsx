import Link from 'next/link'
import '../globals.css'

export default function Work() {
  return (
    <main>
      <div className="container">
        <section style={{ padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Work</h1>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '3rem' }}>
            My professional experience and accomplishments
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Work Experience</h2>
              <p style={{ color: '#666' }}>Add your work experience here</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
