import Link from 'next/link'
import Navbar from '@/components/Navbar'

type Section = {
  title: string
  body: string
}

type RelatedLink = {
  href: string
  label: string
  description?: string
}

type ContentPageProps = {
  eyebrow: string
  title: string
  intro: string
  sections: Section[]
  relatedLinks?: RelatedLink[]
  cta?: {
    label: string
    href: string
  }
  children?: React.ReactNode
}

export default function ContentPage({
  eyebrow,
  title,
  intro,
  sections,
  relatedLinks,
  cta,
  children,
}: ContentPageProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 36 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#6366f1',
            background: 'rgba(99,102,241,0.1)',
            padding: '4px 12px',
            borderRadius: 20,
          }}>{eyebrow}</span>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 12 }}>
            {title}
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.8, maxWidth: 720 }}>
            {intro}
          </p>
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          {sections.map((section) => (
            <section key={section.title} style={{
              padding: '24px 24px 22px',
              borderRadius: 16,
              background: 'rgba(17,24,39,0.8)',
              border: '1px solid rgba(99,102,241,0.12)',
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#c7d2fe', marginBottom: 8 }}>{section.title}</h2>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8, margin: 0 }}>{section.body}</p>
            </section>
          ))}
        </div>

        {children}

        {relatedLinks && relatedLinks.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#c7d2fe', marginBottom: 12 }}>Related reading</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{
                  padding: '14px 16px',
                  borderRadius: 12,
                  background: 'rgba(17,24,39,0.7)',
                  border: '1px solid rgba(99,102,241,0.1)',
                  textDecoration: 'none',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{link.label}</div>
                  {link.description && <div style={{ fontSize: 13, color: '#64748b' }}>{link.description}</div>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {cta && (
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href={cta.href}>
              <button style={{
                background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '12px 32px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
              }}>
                {cta.label} →
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
