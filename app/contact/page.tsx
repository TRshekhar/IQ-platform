'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

// ─── Replace this with your Web3Forms access key from web3forms.com ───────────
const WEB3FORMS_KEY = 'a5c4bb9e-667b-4b7c-99fe-26167567378d'
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || 'IQ Platform Enquiry',
          message: form.message.trim(),
          // Optional: redirect after submission (remove if not needed)
          // redirect: 'https://iq-platform-plum.vercel.app/contact',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setError('Network error. Please check your connection and try again.')
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '11px 14px', fontSize: 14, borderRadius: 10,
    border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(17,24,39,0.8)',
    color: '#e2e8f0', outline: 'none', fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box', transition: 'border-color 0.15s',
  }
  const labelBase: React.CSSProperties = {
    display: 'block', fontSize: 13, color: '#94a3b8', fontWeight: 500, marginBottom: 6,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: 20,
          }}>Get in touch</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 8 }}>
            Contact Us
          </h1>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7 }}>
            Have a question, feedback, or found a bug? Fill in the form and we'll get back to you directly.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🐛', title: 'Bug Reports', body: 'Found an issue with the test or scoring?' },
            { icon: '💡', title: 'Suggestions', body: 'Have ideas for new features or questions?' },
            { icon: '🤝', title: 'Collaboration', body: 'Interested in partnering or contributing?' },
            { icon: '📢', title: 'General Enquiries', body: "Anything else you'd like to discuss." },
          ].map(c => (
            <div key={c.title} style={{
              padding: '16px', borderRadius: 12,
              background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(99,102,241,0.08)',
            }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#c7d2fe', marginTop: 6, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: '#475569' }}>{c.body}</div>
            </div>
          ))}
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div style={{
            padding: '48px 40px', textAlign: 'center', borderRadius: 16,
            background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(16,185,129,0.25)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#6ee7b7', marginBottom: 8 }}>
              Message sent!
            </h2>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 24 }}>
              Your message has been delivered to our inbox. We'll get back to you at{' '}
              <span style={{ color: '#94a3b8' }}>{form.email || 'your email'}</span> as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              style={{
                background: 'transparent', border: '1px solid rgba(99,102,241,0.3)',
                color: '#818cf8', borderRadius: 8, padding: '9px 24px',
                fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '28px', borderRadius: 16,
              background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.12)',
            }}
          >
            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>
                  Full Name <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputBase}
                  disabled={status === 'sending'}
                />
              </div>
              <div>
                <label style={labelBase}>
                  Email Address <span style={{ color: '#f87171' }}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputBase}
                  disabled={status === 'sending'}
                />
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelBase}>Subject</label>
              <input
                type="text"
                placeholder="e.g. Bug report, Feature request, General question"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={inputBase}
                disabled={status === 'sending'}
              />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelBase}>
                Message <span style={{ color: '#f87171' }}>*</span>
              </label>
              <textarea
                placeholder="Describe your question or feedback in detail..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5}
                style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
                disabled={status === 'sending'}
              />
            </div>

            {/* Error message */}
            {(error || status === 'error') && (
              <div style={{
                marginBottom: 16, padding: '10px 14px', borderRadius: 8,
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <p style={{ fontSize: 13, color: '#f87171', margin: 0 }}>
                  {error || 'Something went wrong. Please try again.'}
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%', padding: '13px', border: 'none', borderRadius: 10,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                background: status === 'sending'
                  ? 'rgba(99,102,241,0.5)'
                  : 'linear-gradient(135deg, #4f46e5, #6366f1)',
                color: 'white', fontSize: 15, fontWeight: 600,
                boxShadow: status === 'sending' ? 'none' : '0 4px 20px rgba(99,102,241,0.3)',
                transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{
                    width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    display: 'inline-block', animation: 'spin 0.7s linear infinite',
                  }} />
                  Sending…
                </>
              ) : (
                'Send Message →'
              )}
            </button>

            {/* Spam note */}
            <p style={{ fontSize: 11, color: '#334155', textAlign: 'center', marginTop: 12 }}>
              Protected by Web3Forms. Your email will not be shared with third parties.
            </p>
          </form>
        )}
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
