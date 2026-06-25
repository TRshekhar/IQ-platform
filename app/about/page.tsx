import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — IQ Platform',
  description: 'Learn about IQ Platform — a free ML-powered cognitive assessment tool built to make IQ testing adaptive, fair, and transparent.',
}

export default function AboutUs() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>

        <div style={{ marginBottom: 40 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: 20,
          }}>About</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginTop: 16, marginBottom: 12 }}>
            About IQ Platform
          </h1>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7 }}>
            A free, adaptive cognitive assessment tool built to make IQ testing smarter, fairer, and more transparent.
          </p>
        </div>

        {/* Mission card */}
        <div style={{
          padding: '28px', borderRadius: 16, marginBottom: 24,
          background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(99,102,241,0.05))',
          border: '1px solid rgba(99,102,241,0.2)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🧠</div>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#c7d2fe', marginBottom: 10 }}>Our Mission</h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.8 }}>
            Most online IQ tests ask the same fixed set of questions to everyone, regardless of age, background, or education.
            We built IQ Platform to change that. Our goal is to provide a truly adaptive, machine-learning-powered assessment
            that calibrates to each individual — making the results more meaningful, and the experience more fair.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>

          {[
            {
              icon: '⚡',
              title: 'Adaptive by Design',
              body: 'Questions are selected based on your age, education level, and occupation. A Computer Science undergraduate and a high school student will receive a completely different test — one calibrated to actually challenge them appropriately.',
            },
            {
              icon: '🤖',
              title: 'Machine Learning Scoring',
              body: 'Your IQ estimate is not just a percentage of correct answers. Our engine uses a 7-feature weighted regression model — factoring in accuracy, speed, consistency, difficulty weighting, domain balance, and demographic norms — to produce a more reliable estimate.',
            },
            {
              icon: '🔒',
              title: 'Privacy First',
              body: 'We believe your cognitive data is deeply personal. That\'s why every test result, session history, and profile detail is stored exclusively in your browser\'s localStorage. Nothing is ever sent to a server. No account required.',
            },
            {
              icon: '📊',
              title: '6 Cognitive Domains',
              body: 'We test across Numerical Reasoning, Verbal Ability, Pattern Recognition, Logical Deduction, Working Memory, and Spatial Intelligence — giving you a comprehensive picture of your cognitive profile, not just a single number.',
            },
            {
              icon: '🔄',
              title: 'Anti-Repetition Engine',
              body: 'With 147+ questions in the bank and a session-aware rotation tracker, we actively serve unseen questions first. Retaking the test multiple times will always feel fresh.',
            },
          ].map(f => (
            <div key={f.title} style={{
              padding: '20px 24px', borderRadius: 14,
              background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)',
              display: 'flex', gap: 16,
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#c7d2fe', marginBottom: 6 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75 }}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ padding: '24px 28px', borderRadius: 16, background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, color: '#c7d2fe', marginBottom: 14 }}>Built With</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Custom ML Engine', 'Vercel'].map(t => (
              <span key={t} style={{
                fontSize: 12, padding: '5px 12px', borderRadius: 20, fontWeight: 500,
                background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Disclaimer note */}
        <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
          <p style={{ fontSize: 13, color: '#92400e', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: '#fbbf24' }}>Note:</strong> IQ Platform is intended for educational and entertainment purposes only.
            It is not a clinically validated psychometric instrument and should not be used for diagnostic,
            academic placement, or professional assessment purposes. See our <a href="/disclaimer" style={{ color: '#fbbf24' }}>Disclaimer</a> for full details.
          </p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link href="/">
            <button style={{
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: 'white',
              border: 'none', borderRadius: 12, padding: '12px 32px',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
            }}>
              Take the test →
            </button>
          </Link>
        </div>

      </main>
    </div>
  )
}
