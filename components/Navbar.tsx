'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',        label: 'Test' },
  { href: '/learn',   label: 'Learn' },
  { href: '/history', label: 'History' },
  { href: '/about',   label: 'About' },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <nav style={{
      borderBottom: '1px solid rgba(99,102,241,0.15)',
      background: 'rgba(10,15,30,0.9)',
      backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #4f46e5, #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'white',
          }}>Ψ</div>
          <span style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>IQ Platform</span>
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = path === link.href
            return (
              <Link key={link.href} href={link.href} className="no-underline">
                <span style={{
                  padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  color: active ? '#a5b4fc' : '#64748b',
                  background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                  transition: 'all 0.15s', cursor: 'pointer', display: 'inline-block',
                }}>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
