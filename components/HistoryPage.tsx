'use client'
import { useState, useEffect } from 'react'
import { getAllSessions, getSessionsForUser, getDistinctUsers, deleteSession, clearSessionsForUser, clearAllSessions, getStatsForSessions, TestSession } from '@/lib/history'
import Navbar from './Navbar'
import Link from 'next/link'
import { clearSeenQuestions } from '@/lib/questions'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { format } from 'date-fns'

const CAT_COLORS: Record<string, string> = {
  Numerical: '#818cf8', Verbal: '#6ee7b7', Pattern: '#67e8f9',
  Logical: '#fbbf24', Memory: '#f472b6', Spatial: '#fb923c',
}

export default function HistoryPage() {
  const [allSessions, setAllSessions] = useState<TestSession[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null) // userKey
  const [loaded, setLoaded] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmClear, setConfirmClear] = useState<'user' | 'all' | null>(null)

  useEffect(() => {
    setAllSessions(getAllSessions())
    setLoaded(true)
  }, [])

  function refresh() { setAllSessions(getAllSessions()) }

  const distinctUsers = getDistinctUsers()

  // Sessions shown depend on selected user filter
  const visibleSessions = selectedUser
    ? allSessions.filter(s => s.userKey === selectedUser)
    : allSessions

  const stats = getStatsForSessions(visibleSessions)

  const chartData = [...visibleSessions].reverse().map(s => ({
    date: format(new Date(s.timestamp), 'MMM d'),
    iq: s.iqEstimate,
    name: s.profile.name,
  }))

  function handleDeleteSession(id: string) {
    deleteSession(id); refresh()
  }

  function handleClearUser() {
    if (!selectedUser) return
    clearSessionsForUser(selectedUser); setSelectedUser(null); refresh(); setConfirmClear(null)
  }

  function handleClearAll() {
    clearAllSessions(); setSelectedUser(null); refresh(); setConfirmClear(null)
  }

  if (!loaded) return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <div style={{ textAlign: 'center', paddingTop: 80, color: '#475569' }}>Loading…</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e' }}>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>Session history</h1>
            <p style={{ fontSize: 13, color: '#475569' }}>
              {allSessions.length} total session{allSessions.length !== 1 ? 's' : ''} across {distinctUsers.length} user{distinctUsers.length !== 1 ? 's' : ''} — stored in your browser
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {confirmClear ? (
              <>
                <button style={{ fontSize: 12, padding: '6px 12px', background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', borderRadius: 8, cursor: 'pointer' }}
                  onClick={confirmClear === 'user' ? handleClearUser : handleClearAll}>
                  Confirm
                </button>
                <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => setConfirmClear(null)}>Cancel</button>
              </>
            ) : (
              <>
                {selectedUser && (
                  <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px', color: '#f87171', borderColor: 'rgba(239,68,68,0.3)' }}
                    onClick={() => setConfirmClear('user')}>
                    Clear {distinctUsers.find(u => u.key === selectedUser)?.displayName}'s history
                  </button>
                )}
                {allSessions.length > 0 && (
                  <>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px', color: '#818cf8', borderColor: 'rgba(99,102,241,0.3)' }} onClick={() => { clearSeenQuestions(); alert('Question rotation reset! Next test will feel fresh.') }} title="Reset so all questions can appear again">
                      Reset rotation
                    </button>
                    <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => setConfirmClear('all')}>
                      Clear all
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {allSessions.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', borderRadius: 16, background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.1)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: '#64748b', marginBottom: 8 }}>No sessions yet</h2>
            <p style={{ fontSize: 14, color: '#334155', marginBottom: 20 }}>Complete your first IQ test to see results and trends here.</p>
            <Link href="/"><button className="btn-primary">Take test →</button></Link>
          </div>
        ) : (
          <>
            {/* ── User selector tabs ───────────────────────── */}
            {distinctUsers.length > 1 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Filter by user
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setSelectedUser(null)}
                    style={{
                      padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      border: `1px solid ${!selectedUser ? '#6366f1' : 'rgba(99,102,241,0.2)'}`,
                      background: !selectedUser ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: !selectedUser ? '#a5b4fc' : '#475569',
                      transition: 'all 0.15s',
                    }}
                  >
                    All users ({allSessions.length})
                  </button>
                  {distinctUsers.map(u => (
                    <button
                      key={u.key}
                      onClick={() => setSelectedUser(u.key)}
                      style={{
                        padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                        border: `1px solid ${selectedUser === u.key ? '#6366f1' : 'rgba(99,102,241,0.2)'}`,
                        background: selectedUser === u.key ? 'rgba(99,102,241,0.15)' : 'transparent',
                        color: selectedUser === u.key ? '#a5b4fc' : '#64748b',
                        transition: 'all 0.15s',
                      }}
                    >
                      {u.displayName} ({u.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Stats for visible sessions ──────────────── */}
            {stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
                {[
                  { label: 'Sessions', val: stats.totalSessions },
                  { label: 'Average IQ', val: stats.avgIQ },
                  { label: 'Best IQ', val: stats.highestIQ },
                  {
                    label: 'Trend', val: stats.trend > 0 ? `+${stats.trend}` : stats.trend === 0 ? '—' : `${stats.trend}`,
                    color: stats.trend > 0 ? '#6ee7b7' : stats.trend < 0 ? '#f87171' : '#64748b'
                  },
                ].map(s => (
                  <div key={s.label} style={{ padding: '13px', borderRadius: 12, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: (s as {color?: string}).color ?? '#c7d2fe' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── IQ trend chart ──────────────────────────── */}
            {chartData.length >= 2 && (
              <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14, fontWeight: 600 }}>
                  IQ trend — {selectedUser ? distinctUsers.find(u => u.key === selectedUser)?.displayName : 'all users'}
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={['auto', 'auto']} tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                    <Tooltip
                      contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number, _: string, props: {payload?: {name?: string}}) => [`IQ ${v}`, props.payload?.name ?? '']}
                    />
                    <Line type="monotone" dataKey="iq" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* ── Domain averages ─────────────────────────── */}
            {stats && Object.keys(stats.avgCategoryAccuracy).length > 0 && (
              <div style={{ padding: '18px 20px', borderRadius: 16, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)', marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14, fontWeight: 600 }}>Lifetime domain averages</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
                  {Object.entries(stats.avgCategoryAccuracy).map(([cat, pct]) => {
                    const col = CAT_COLORS[cat] ?? '#818cf8'
                    return (
                      <div key={cat}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: col, display: 'inline-block' }} />
                            {cat}
                          </span>
                          <span style={{ fontSize: 12, color: col, fontFamily: 'monospace' }}>{pct}%</span>
                        </div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: col, borderRadius: 2 }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Session list ─────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {visibleSessions.map(session => (
                <div key={session.id} style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(99,102,241,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 26, fontWeight: 700, color: session.classificationColor, lineHeight: 1 }}>{session.iqEstimate}</span>
                        <div>
                          <span style={{ fontSize: 13, color: session.classificationColor, fontWeight: 500 }}>{session.classification}</span>
                          {!selectedUser && distinctUsers.length > 1 && (
                            <span style={{ fontSize: 11, color: '#475569', marginLeft: 8, padding: '1px 8px', borderRadius: 10, background: 'rgba(99,102,241,0.1)' }}>
                              {session.profile.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: '#475569' }}>
                        {format(new Date(session.timestamp), 'dd MMM yyyy, HH:mm')} · {session.correctAnswers}/{session.totalQuestions} correct · {session.percentile}th percentile
                      </div>
                      <div style={{ fontSize: 11, color: '#334155', marginTop: 3 }}>
                        Difficulty tier: {session.difficultyRange
                          ? `${session.difficultyRange.min}–${session.difficultyRange.max} (target ${session.difficultyRange.target.toFixed(1)})`
                          : '—'
                        } · {session.profile.education || '?'} · age {session.profile.age}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button className="btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}
                        onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}>
                        {expandedId === session.id ? 'Less' : 'Details'}
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        style={{ background: 'transparent', border: 'none', color: '#334155', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '2px 6px' }}
                        title="Delete this session"
                      >×</button>
                    </div>
                  </div>

                  {expandedId === session.id && (
                    <div style={{ marginTop: 14, borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: 14 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                        {Object.entries(session.categoryScores).map(([cat, s]) => {
                          const col = CAT_COLORS[cat] ?? '#818cf8'
                          return (
                            <div key={cat} style={{ padding: '8px 10px', borderRadius: 8, background: `${col}0c`, border: `1px solid ${col}20` }}>
                              <div style={{ fontSize: 11, color: col, fontWeight: 600, marginBottom: 2 }}>{cat}</div>
                              <div style={{ fontSize: 13, color: '#c7d2fe' }}>{s.correct}/{s.total}</div>
                              <div style={{ fontSize: 11, color: '#475569' }}>{Math.round(s.accuracy * 100)}% · {s.avgTime}s avg</div>
                            </div>
                          )
                        })}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {session.strengths.map(s => (
                          <span key={s} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(110,231,183,0.1)', color: '#6ee7b7', border: '1px solid rgba(110,231,183,0.2)' }}>
                            ↑ {s}
                          </span>
                        ))}
                        {session.weaknesses.map(s => (
                          <span key={s} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(251,146,60,0.1)', color: '#fb923c', border: '1px solid rgba(251,146,60,0.2)' }}>
                            ↓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
