'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTest } from '@/lib/testContext'
import { calculateMLScore } from '@/lib/mlScoring'
import { saveSession } from '@/lib/history'
import { TestAnswer } from '@/lib/mlScoring'

const CATEGORY_COLORS: Record<string, string> = {
  Numerical: '#818cf8', Verbal: '#6ee7b7', Pattern: '#67e8f9',
  Logical: '#fbbf24', Memory: '#f472b6', Spatial: '#fb923c',
}

export default function TestScreen() {
  const { state, dispatch } = useTest()
  const { questions, currentIndex, profile, difficultyRange } = state

  const q = questions[currentIndex]
  const total = questions.length
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(q?.timeLimit ?? 30)
  const [qStart, setQStart] = useState(Date.now())

  useEffect(() => {
    setSelected(null); setRevealed(false)
    setTimeLeft(q?.timeLimit ?? 30); setQStart(Date.now())
  }, [currentIndex, q?.timeLimit])

  const advance = useCallback((chosenIndex: number | null, timedOut: boolean) => {
    if (!q || !profile) return
    const timeSpent = Math.min(Math.round((Date.now() - qStart) / 1000), q.timeLimit)
    const answer: TestAnswer = {
      questionIndex: currentIndex,
      category: q.category,
      correct: chosenIndex === q.correctIndex,
      timeSpent,
      difficulty: q.difficulty,
      timedOut,
    }
    dispatch({ type: 'SUBMIT_ANSWER', answer })

    const isLast = currentIndex === total - 1
    if (isLast) {
      const allAnswers = [...state.answers, answer]
      const result = calculateMLScore(allAnswers, profile)
      const totalCorrect = allAnswers.filter(a => a.correct).length
      const avgTime = Math.round(allAnswers.reduce((s, a) => s + a.timeSpent, 0) / allAnswers.length)
      const dr = difficultyRange ?? { min: 1, max: 5, target: 2.5 }
      const session = saveSession(profile, result, total, totalCorrect, avgTime, dr)
      dispatch({ type: 'SET_RESULT', result, sessionId: session.id })
    } else {
      dispatch({ type: 'NEXT_QUESTION' })
    }
  }, [q, currentIndex, state.answers, total, profile, qStart, dispatch, difficultyRange])

  useEffect(() => {
    if (revealed) return
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); advance(null, true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [revealed, advance])

  function handleSelect(i: number) {
    if (revealed) return
    setSelected(i); setRevealed(true)
    setTimeout(() => advance(i, false), 1300)
  }

  if (!q) return null

  const progress = (currentIndex / total) * 100
  const catColor = CATEGORY_COLORS[q.category] ?? '#818cf8'
  const urgency = timeLeft <= 8
  const circumference = 2 * Math.PI * 18
  const dashOffset = circumference * (1 - timeLeft / q.timeLimit)

  return (
    <div style={{ paddingBottom: 32 }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#475569' }}>Q {currentIndex + 1} of {total}</span>
          <span style={{ fontSize: 12, color: '#334155' }}>
            Difficulty tier: <span style={{ color: catColor }}>{'●'.repeat(q.difficulty)}{'○'.repeat(5 - q.difficulty)}</span>
          </span>
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, #4f46e5, ${catColor})`, borderRadius: 2, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{ padding: '22px', borderRadius: 16, background: 'rgba(17,24,39,0.85)', border: `1px solid ${catColor}25`, marginBottom: 14, backdropFilter: 'blur(8px)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
            background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}30`,
          }}>{q.category}</span>

          <svg width="46" height="46" viewBox="0 0 46 46" style={{ filter: urgency ? 'drop-shadow(0 0 6px #ef4444)' : `drop-shadow(0 0 6px ${catColor}60)` }}>
            <circle cx="23" cy="23" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
            <circle cx="23" cy="23" r="18" fill="none"
              stroke={urgency ? '#ef4444' : catColor}
              strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={dashOffset}
              strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: '23px 23px', transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
            <text x="23" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill={urgency ? '#f87171' : '#a5b4fc'}>
              {timeLeft}
            </text>
          </svg>
        </div>

        <p style={{ fontSize: 16, color: '#e2e8f0', lineHeight: 1.7, marginBottom: 20 }}>{q.text}</p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = 'rgba(17,24,39,0.6)', border = 'rgba(99,102,241,0.15)', color = '#cbd5e1'
            if (revealed) {
              if (i === q.correctIndex) { bg = 'rgba(16,185,129,0.1)'; border = '#10b981'; color = '#6ee7b7' }
              else if (i === selected) { bg = 'rgba(239,68,68,0.1)'; border = '#ef4444'; color = '#fca5a5' }
            } else if (i === selected) {
              bg = 'rgba(99,102,241,0.15)'; border = '#6366f1'; color = '#a5b4fc'
            }
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => handleSelect(i)}
                style={{
                  width: '100%', textAlign: 'left', padding: '13px 16px', borderRadius: 12,
                  border: `1px solid ${border}`, background: bg, color, fontSize: 14,
                  cursor: revealed ? 'default' : 'pointer', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: revealed && i === q.correctIndex ? 'rgba(16,185,129,0.2)' : revealed && i === selected ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                  color: revealed && i === q.correctIndex ? '#6ee7b7' : revealed && i === selected ? '#fca5a5' : '#818cf8',
                }}>
                  {revealed && i === q.correctIndex ? '✓' : revealed && i === selected && i !== q.correctIndex ? '✗' : ['A','B','C','D'][i]}
                </span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p style={{ fontSize: 13, color: '#818cf8', margin: 0, lineHeight: 1.6 }}>💡 {q.explanation}</p>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10 }}>
        {[
          { label: 'Answered', val: currentIndex },
          { label: 'Remaining', val: total - currentIndex },
          { label: 'Domain', val: q.category },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, padding: '10px', borderRadius: 10, background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#c7d2fe' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
