import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'IQ Platform — Free ML-Powered Cognitive Assessment',
  description: 'Take a free adaptive IQ test powered by machine learning. Questions calibrate to your age, education and occupation across 6 cognitive domains.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3610011123978858" crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased">
        <div className="relative z-10">
          {children}
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
