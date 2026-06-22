import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'IQ Platform — Cognitive Assessment',
  description: 'ML-powered IQ test with multi-domain cognitive assessment and session history.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative z-10">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
