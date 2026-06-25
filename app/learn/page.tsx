import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'IQ Learning Hub — IQ Platform',
  description: 'Explore beginner-friendly guides on IQ, how tests work, intelligence types, score interpretation, and cognitive psychology.',
}

const articles = [
  {
    href: '/learn/what-is-iq',
    title: 'What is IQ?',
    description: 'A clear introduction to IQ, what it measures, and why it is often misunderstood.',
  },
  {
    href: '/learn/how-iq-tests-work',
    title: 'How IQ Tests Work',
    description: 'See how adaptive testing, timing, and scoring influence the results you receive.',
  },
  {
    href: '/learn/types-of-intelligence',
    title: 'Types of Intelligence',
    description: 'Learn about verbal, spatial, logical, and other cognitive abilities that influence performance.',
  },
  {
    href: '/learn/iq-score-interpretation-guide',
    title: 'IQ Score Interpretation Guide',
    description: 'Understand what different score ranges can suggest and where caution is important.',
  },
  {
    href: '/learn/fluid-vs-crystallized-intelligence',
    title: 'Fluid vs Crystallized Intelligence',
    description: 'Compare two core forms of intelligence and how they change over time.',
  },
  {
    href: '/learn/cognitive-psychology-articles',
    title: 'Cognitive Psychology Articles',
    description: 'A curated set of concept guides that connect IQ to memory, reasoning, and attention.',
  },
]

export default function LearnHubPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 920, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6366f1',
            background: 'rgba(99,102,241,0.1)',
            padding: '4px 12px',
            borderRadius: 20,
          }}>Learning hub</span>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 12 }}>
            Learn more about intelligence and cognition
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, maxWidth: 760 }}>
            These guides are designed to give visitors useful background information alongside the IQ assessment tool.
            They are written to be educational, approachable, and relevant to anyone curious about human cognition.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 14 }}>
          {articles.map((article) => (
            <Link key={article.href} href={article.href} style={{
              textDecoration: 'none',
              padding: '20px 22px',
              borderRadius: 16,
              background: 'rgba(17,24,39,0.8)',
              border: '1px solid rgba(99,102,241,0.12)',
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#c7d2fe', marginBottom: 6 }}>{article.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{article.description}</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
