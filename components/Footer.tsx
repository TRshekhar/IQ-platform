'use client'
import Link from 'next/link'

const LINKS = [
  { href: '/about',          label: 'About Us' },
  { href: '/learn',          label: 'Learning Hub' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms',          label: 'Terms & Conditions' },
  { href: '/disclaimer',     label: 'Disclaimer' },
  { href: '/contact',        label: 'Contact Us' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(99,102,241,0.1)',
      background: 'rgba(10,15,30,0.95)',
      marginTop: 64,
      padding: '32px 16px 24px',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #4f46e5, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: 'white',
          }}>Ψ</div>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#94a3b8' }}>IQ Platform</span>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 4px', marginBottom: 20 }}>
          {LINKS.map((l, i) => (
            <span key={l.href} style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={l.href} style={{
                fontSize: 13, color: '#475569', textDecoration: 'none',
                padding: '4px 10px', borderRadius: 6,
                transition: 'color 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#a5b4fc')}
              onMouseOut={e => (e.currentTarget.style.color = '#475569')}
              >
                {l.label}
              </Link>
              {i < LINKS.length - 1 && (
                <span style={{ color: 'rgba(99,102,241,0.2)', fontSize: 12 }}>·</span>
              )}
            </span>
          ))}
        </nav>

        {/* Legal note */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#1e2a3a', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} IQ Platform. This test is for educational and entertainment purposes only.
          It is not a clinically validated psychometric assessment.
        </p>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#172033', marginTop: 6 }}>
          No personal data is transmitted to any server. All session data is stored locally in your browser.
        </p>
      </div>
    </footer>
  )
}
