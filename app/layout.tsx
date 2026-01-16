import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  title: 'Matt Smiarowski - Personal Website',
  description: 'Personal website showcasing my thoughts and projects',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#00d4ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for browsers that don't pick up metadata */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Ambient light effects in corners */}
        <div className="ambient-lights" aria-hidden="true">
          <div className="ambient-light ambient-light--cyan" />
          <div className="ambient-light ambient-light--amber" />
        </div>
        
        {/* Scan line reveal mask - covers content until scan line passes */}
        <div className="scan-reveal-mask" aria-hidden="true" />
        
        {/* Global Navigation */}
        <Navigation />
        
        {/* Main content */}
        {children}
      </body>
    </html>
  )
}
