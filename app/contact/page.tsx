'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    // Opens mail client as fallback (no backend needed)
    const subject = encodeURIComponent(form.subject || 'IQ Platform Enquiry')
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:contact@iqplatform.app?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '11px 14px', fontSize: 14, borderRadius: 10,
    border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(17,24,39,0.8)',
    color: '#e2e8f0', outline: 'none', fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  }
  const labelBase: React.CSSProperties = {
    display: 'block', fontSize: 13, color: '#94a3b8', fontWeight: 500, marginBottom: 6,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 20px 80px' }}>

        <div style={{ marginBottom: 36 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: 20,
          }}>Get in touch</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 8 }}>Contact Us</h1>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7 }}>
            Have a question, feedback, or found a bug? We'd love to hear from you. Fill in the form below and we'll get back to you.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🐛', title: 'Bug Reports', body: 'Found an issue with the test or scoring?' },
            { icon: '💡', title: 'Suggestions', body: 'Have ideas for new features or questions?' },
            { icon: '🤝', title: 'Collaboration', body: 'Interested in partnering or contributing?' },
            { icon: '📢', title: 'General Enquiries', body: 'Anything else you\'d like to discuss.' },
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

        {submitted ? (
          <div style={{ padding: '40px', textAlign: 'center', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#6ee7b7', marginBottom: 8 }}>Message Prepared!</h2>
            <p style={{ fontSize: 14, color: '#475569' }}>
              Your mail client should have opened with the message pre-filled. If it didn't, please email us directly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{ marginTop: 20, background: 'transparent', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', borderRadius: 8, padding: '8px 20px', fontSize: 13, cursor: 'pointer' }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            padding: '28px', borderRadius: 16,
            background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.12)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>Full Name <span style={{ color: '#f87171' }}>*</span></label>
                <input
                  type="text" placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputBase}
                />
              </div>
              <div>
                <label style={labelBase}>Email Address <span style={{ color: '#f87171' }}>*</span></label>
                <input
                  type="email" placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputBase}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelBase}>Subject</label>
              <input
                type="text" placeholder="e.g. Bug report, Feature request"
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={inputBase}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelBase}>Message <span style={{ color: '#f87171' }}>*</span></label>
              <textarea
                placeholder="Describe your question or feedback in detail..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5}
                style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            {error && (
              <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p style={{ fontSize: 13, color: '#f87171', margin: 0 }}>{error}</p>
              </div>
            )}

            <button type="submit" style={{
              width: '100%', padding: '13px', border: 'none', borderRadius: 10, cursor: 'pointer',
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: 'white',
              fontSize: 15, fontWeight: 600, boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
            }}>
              Send Message →
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
