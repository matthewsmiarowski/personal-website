import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Matt Smiarowski - Personal Website',
  description: 'Personal website showcasing my work, projects, and interests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
