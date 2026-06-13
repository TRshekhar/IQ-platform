'use client'
import { useState } from 'react'
import { useTest } from '@/lib/testContext'
import { selectQuestions, getDifficultyRange } from '@/lib/questions'
import { UserProfile } from '@/lib/mlScoring'

export default function InfoScreen() {
  const { dispatch } = useTest()
  const [form, setForm] = useState({ name: '', age: '', education: '', occupation: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    const age = parseInt(form.age)
    if (!form.age || isNaN(age) || age < 10 || age > 85) e.age = 'Enter a valid age (10–85)'
    if (!form.education) e.education = 'Select your education level'
    return e
  }

  function handleStart() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    const profile: UserProfile = {
      name: form.name.trim(),
      age: parseInt(form.age),
      education: form.education,
      occupation: form.occupation.trim(),
    }

    const difficultyRange = getDifficultyRange(profile)
    const questions = selectQuestions(profile, 20)
    dispatch({ type: 'SET_PROFILE', profile })
    dispatch({ type: 'LOAD_QUESTIONS', questions, difficultyRange })
    dispatch({ type: 'SET_PHASE', phase: 'test' })
  }

  // Preview difficulty tier for UX feedback
  const previewDiff = (() => {
    const age = parseInt(form.age)
    const edu = form.education
    if (!edu && !age) return null
    const profile: UserProfile = { name: form.name, age: isNaN(age) ? 20 : age, education: edu, occupation: form.occupation }
    const { target } = getDifficultyRange(profile)
    if (target < 2) return { label: 'Foundational', color: '#6ee7b7', desc: 'Clear, accessible questions' }
    if (target < 3) return { label: 'Intermediate', color: '#67e8f9', desc: 'Mixed difficulty, moderate complexity' }
    if (target < 4) return { label: 'Advanced', color: '#818cf8', desc: 'Challenging questions requiring deeper reasoning' }
    return { label: 'Expert', color: '#f472b6', desc: 'Highly analytical, graduate-level difficulty' }
  })()

  function Field({ id, label, placeholder, type = 'text', required = false }: { id: keyof typeof form; label: string; placeholder: string; type?: string; required?: boolean }) {
    return (
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>
          {label} {required && <span style={{ color: '#f87171' }}>*</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={form[id]}
          onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrors(er => ({ ...er, [id]: '' })) }}
          style={{ borderColor: errors[id] ? 'rgba(239,68,68,0.5)' : undefined }}
        />
        {errors[id] && <p style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors[id]}</p>}
      </div>
    )
  }

  return (
    <div style={{ paddingBottom: 48 }}>
      <button className="btn-ghost" style={{ marginBottom: 20, fontSize: 13, padding: '6px 12px' }}
        onClick={() => dispatch({ type: 'SET_PHASE', phase: 'intro' })}>← Back</button>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>Your profile</h2>
      <p style={{ fontSize: 14, color: '#475569', marginBottom: 24, lineHeight: 1.6 }}>
        Profile data adapts question difficulty to your age, education, and occupation. Everything stays in your browser.
      </p>

      <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <Field id="name" label="Full name" placeholder="Your name" required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>
              Age <span style={{ color: '#f87171' }}>*</span>
            </label>
            <input
              type="number" placeholder="e.g. 22"
              value={form.age}
              onChange={e => { setForm(f => ({ ...f, age: e.target.value })); setErrors(er => ({ ...er, age: '' })) }}
              style={{ borderColor: errors.age ? 'rgba(239,68,68,0.5)' : undefined }}
            />
            {errors.age && <p style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.age}</p>}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>
              Education <span style={{ color: '#f87171' }}>*</span>
            </label>
            <select
              value={form.education}
              onChange={e => { setForm(f => ({ ...f, education: e.target.value })); setErrors(er => ({ ...er, education: '' })) }}
              style={{ borderColor: errors.education ? 'rgba(239,68,68,0.5)' : undefined }}
            >
              <option value="">Select level</option>
              <option value="school">High school</option>
              <option value="diploma">Diploma / Polytechnic</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="doctorate">Doctorate</option>
            </select>
            {errors.education && <p style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.education}</p>}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>
            Occupation / field <span style={{ fontSize: 11, color: '#334155' }}>(optional — used to tune domain weighting)</span>
          </label>
          <input
            type="text" placeholder="e.g. Computer Science student, Software Engineer, Teacher"
            value={form.occupation}
            onChange={e => setForm(f => ({ ...f, occupation: e.target.value }))}
          />
        </div>

        {/* Live difficulty preview */}
        {previewDiff && (
          <div style={{
            marginTop: 18, padding: '12px 14px', borderRadius: 10,
            background: `${previewDiff.color}0f`, border: `1px solid ${previewDiff.color}25`,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 18 }}>⚡</span>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: previewDiff.color }}>{previewDiff.label} tier — </span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{previewDiff.desc}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 10, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}>
          <p style={{ fontSize: 12, color: '#6366f1', margin: 0, lineHeight: 1.5 }}>
            🔒 Stored only in your browser's localStorage under your name. Different names = separate histories.
          </p>
        </div>
      </div>

      <button
        className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20, padding: '14px', fontSize: 15 }}
        onClick={handleStart}
      >
        Start adaptive test →
      </button>

      <p style={{ textAlign: 'center', fontSize: 12, color: '#334155', marginTop: 12 }}>
        Questions adapt to your profile · 20 questions · instant ML results
      </p>
    </div>
  )
}
