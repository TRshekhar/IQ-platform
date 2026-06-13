'use client'
import { useTest } from '@/lib/testContext'
import Link from 'next/link'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

const CAT_COLORS: Record<string, string> = {
  Numerical: '#818cf8', Verbal: '#6ee7b7', Pattern: '#67e8f9',
  Logical: '#fbbf24', Memory: '#f472b6', Spatial: '#fb923c',
}

export default function ResultsScreen() {
  const { state, dispatch } = useTest()
  const { result, profile, difficultyRange } = state

  if (!result || !profile) return null

  const { iqEstimate, percentile, classification, classificationColor, categoryScores, confidenceInterval, mlFeatures, strengths, weaknesses, rawScore } = result

  const radarData = Object.entries(categoryScores).map(([name, s]) => ({
    subject: name, score: Math.round(s.accuracy * 100), fullMark: 100,
  }))

  const mlRows = [
    { label: 'Accuracy', val: Math.round(mlFeatures.accuracyScore * 100) },
    { label: 'Speed index', val: Math.round(mlFeatures.speedScore * 100) },
    { label: 'Consistency', val: Math.round(mlFeatures.consistencyScore * 100) },
    { label: 'Difficulty-weighted', val: Math.round(mlFeatures.difficultyWeightedScore * 100) },
    { label: 'Domain balance', val: Math.round(mlFeatures.categoryBalance * 100) },
    { label: 'Age norm', val: Math.round(mlFeatures.ageNorm * 100) },
    { label: 'Education norm', val: Math.round(mlFeatures.educationNorm * 100) },
  ]

  return (
    <div style={{ paddingBottom: 60 }}>

      {/* Score hero */}
      <div style={{ textAlign: 'center', padding: '32px 0 28px' }}>
        <div style={{
          width: 128, height: 128, margin: '0 auto 16px',
          borderRadius: '50%', padding: 4,
          background: `conic-gradient(${classificationColor} ${((iqEstimate - 70) / 75) * 360}deg, rgba(255,255,255,0.04) 0deg)`,
          boxShadow: `0 0 48px ${classificationColor}40`,
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: 38, fontWeight: 800, color: classificationColor, lineHeight: 1 }}>{iqEstimate}</span>
            <span style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>IQ SCORE</span>
          </div>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: classificationColor, marginBottom: 4 }}>{classification}</h2>
        <p style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>95% CI: {confidenceInterval[0]}–{confidenceInterval[1]}</p>
        {difficultyRange && (
          <p style={{ fontSize: 12, color: '#334155' }}>
            Difficulty tier {difficultyRange.min}–{difficultyRange.max} · {profile.education} · age {profile.age}
            {profile.occupation ? ` · ${profile.occupation}` : ''}
          </p>
        )}
        <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <span style={{ fontSize: 14, color: '#818cf8', fontWeight: 700 }}>Top {100 - percentile}%</span>
          <span style={{ fontSize: 13, color: '#475569' }}>of population</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Raw score', val: `${rawScore}%` },
          { label: 'Correct', val: `${state.answers.filter(a => a.correct).length}/${state.questions.length}` },
          { label: 'Avg time', val: `${Math.round(state.answers.reduce((s,a)=>s+a.timeSpent,0)/state.answers.length)}s` },
        ].map(s => (
          <div key={s.label} style={{ padding: '14px', borderRadius: 12, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#c7d2fe' }}>{s.val}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Radar */}
      {radarData.length >= 3 && (
        <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14, fontWeight: 600 }}>Cognitive domain radar</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.18} strokeWidth={2} />
              <Tooltip formatter={(v: number) => [`${v}%`, 'Accuracy']} contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Domain breakdown */}
      <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14, fontWeight: 600 }}>Performance by domain</div>
        {Object.entries(categoryScores).map(([cat, s]) => {
          const pct = Math.round(s.accuracy * 100)
          const col = CAT_COLORS[cat] ?? '#818cf8'
          return (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: col, display: 'inline-block' }} />
                  {cat}
                </span>
                <span style={{ fontSize: 12, color: '#475569' }}>{s.correct}/{s.total} · avg {s.avgTime}s</span>
              </div>
              <div style={{ height: 5, background: 'rgba(255,255,255,0.04)', borderRadius: 3 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: 3 }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ML features */}
      <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4, fontWeight: 600 }}>ML scoring breakdown</div>
        <p style={{ fontSize: 12, color: '#334155', marginBottom: 14 }}>Weighted regression inputs → IQ estimate</p>
        {mlRows.map(row => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 148, fontSize: 12, color: '#64748b' }}>{row.label}</span>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}>
              <div style={{ width: `${row.val}%`, height: '100%', background: 'linear-gradient(90deg, #4f46e5, #818cf8)', borderRadius: 2 }} />
            </div>
            <span style={{ width: 34, fontSize: 12, color: '#a5b4fc', textAlign: 'right', fontFamily: 'monospace' }}>{row.val}%</span>
          </div>
        ))}
      </div>

      {/* Strengths / weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: '16px', borderRadius: 14, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(110,231,183,0.15)' }}>
          <div style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 700, marginBottom: 10, letterSpacing: '0.05em' }}>STRENGTHS</div>
          {strengths.length ? strengths.map(s => (
            <div key={s} style={{ fontSize: 13, color: '#e2e8f0', marginBottom: 6, display: 'flex', gap: 6 }}>
              <span style={{ color: '#6ee7b7' }}>↑</span> {s}
            </div>
          )) : <span style={{ fontSize: 13, color: '#475569' }}>Balanced across all domains</span>}
        </div>
        <div style={{ padding: '16px', borderRadius: 14, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(251,146,60,0.15)' }}>
          <div style={{ fontSize: 12, color: '#fb923c', fontWeight: 700, marginBottom: 10, letterSpacing: '0.05em' }}>IMPROVE</div>
          {weaknesses.length ? weaknesses.map(s => (
            <div key={s} style={{ fontSize: 13, color: '#e2e8f0', marginBottom: 6, display: 'flex', gap: 6 }}>
              <span style={{ color: '#fb923c' }}>↓</span> {s}
            </div>
          )) : <span style={{ fontSize: 13, color: '#475569' }}>No notable weak areas</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => dispatch({ type: 'RESET' })}>
          Retake test
        </button>
        <Link href="/history" style={{ flex: 1 }}>
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>View history →</button>
        </Link>
      </div>
    </div>
  )
}
