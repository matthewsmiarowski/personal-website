import Link from 'next/link'
import '../globals.css'

export default function Thoughts() {
  return (
    <main>
      <div className="container">
        <section style={{ padding: '4rem 0' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Thoughts</h1>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '3rem' }}>
            Blog posts and interesting links to social media content
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Blog Posts</h2>
              <p style={{ color: '#666' }}>Your blog posts will appear here</p>
            </div>
            
            <div style={{ padding: '2rem', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <h2 style={{ marginBottom: '0.5rem' }}>Interesting Links</h2>
              <p style={{ color: '#666' }}>Links to social media posts and other content I find interesting</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}