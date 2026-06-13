'use client'
import { useEffect, useRef } from 'react'
import { useTest } from '@/lib/testContext'

// Animated neural network canvas
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.offsetWidth, H = canvas.offsetHeight
    canvas.width = W; canvas.height = H

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', resize)

    // Nodes
    const NODE_COUNT = 38
    interface Node { x: number; y: number; vx: number; vy: number; r: number; pulse: number; pulseSpeed: number; color: string }
    const COLORS = ['#6366f1','#818cf8','#a5b4fc','#67e8f9','#6ee7b7']

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2 + Math.random() * 3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    // Signal particles along synapses
    interface Signal { fromIdx: number; toIdx: number; t: number; speed: number; color: string }
    const signals: Signal[] = []
    let frame = 0

    function spawnSignal() {
      const from = Math.floor(Math.random() * nodes.length)
      // find a neighbor
      let best = -1, bestDist = Infinity
      nodes.forEach((n, i) => {
        if (i === from) return
        const d = Math.hypot(n.x - nodes[from].x, n.y - nodes[from].y)
        if (d < 180 && d < bestDist) { bestDist = d; best = i }
      })
      if (best !== -1) {
        signals.push({ fromIdx: from, toIdx: best, t: 0, speed: 0.012 + Math.random() * 0.018, color: nodes[from].color })
      }
    }

    let animId: number
    function draw() {
      ctx.clearRect(0, 0, W, H)
      frame++

      // Spawn signal occasionally
      if (frame % 18 === 0 && signals.length < 20) spawnSignal()

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      })

      // Draw synapses (connections)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y
          const dist = Math.hypot(dx, dy)
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw signals travelling along synapses
      signals.forEach((sig, idx) => {
        sig.t += sig.speed
        if (sig.t >= 1) { signals.splice(idx, 1); return }
        const from = nodes[sig.fromIdx], to = nodes[sig.toIdx]
        const x = from.x + (to.x - from.x) * sig.t
        const y = from.y + (to.y - from.y) * sig.t
        // Glow trail
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8)
        grad.addColorStop(0, sig.color + 'dd')
        grad.addColorStop(1, sig.color + '00')
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach(n => {
        const pulse = 0.6 + 0.4 * Math.sin(n.pulse)
        // Outer glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5)
        glow.addColorStop(0, n.color + Math.round(pulse * 80).toString(16).padStart(2,'0'))
        glow.addColorStop(1, n.color + '00')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        // Core
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
        ctx.fillStyle = n.color
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }}
    />
  )
}

const DOMAINS = [
  { icon: '∑', label: 'Numerical', color: '#818cf8' },
  { icon: 'Aa', label: 'Verbal', color: '#6ee7b7' },
  { icon: '◈', label: 'Pattern', color: '#67e8f9' },
  { icon: '⊻', label: 'Logical', color: '#fbbf24' },
  { icon: '◉', label: 'Memory', color: '#f472b6' },
  { icon: '⬡', label: 'Spatial', color: '#fb923c' },
]

const IQ_SCALE = [
  { range: '130+', label: 'Very Superior', color: '#818cf8', pct: 2 },
  { range: '120–129', label: 'Superior', color: '#6ee7b7', pct: 7 },
  { range: '110–119', label: 'High Average', color: '#67e8f9', pct: 16 },
  { range: '90–109', label: 'Average', color: '#fbbf24', pct: 50 },
  { range: '80–89', label: 'Low Average', color: '#fb923c', pct: 16 },
  { range: '70–79', label: 'Borderline', color: '#f87171', pct: 7 },
]

export default function IntroScreen() {
  const { dispatch } = useTest()

  return (
    <div style={{ paddingBottom: 48 }}>

      {/* ── Neural hero ────────────────────────────────────── */}
      <div style={{
        position: 'relative', borderRadius: 24, overflow: 'hidden',
        height: 320, marginBottom: 32,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.18) 0%, rgba(10,15,30,0) 70%)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}>
        <NeuralCanvas />

        {/* Foreground content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px',
        }}>
          {/* Psi symbol with halo */}
          <div style={{
            position: 'relative', width: 68, height: 68, marginBottom: 20,
          }}>
            <div style={{
              position: 'absolute', inset: -12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',
              animation: 'pulse-slow 3s ease-in-out infinite',
            }} />
            <div style={{
              width: 68, height: 68, borderRadius: 18,
              background: 'linear-gradient(145deg, #312e81, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, color: 'white', fontWeight: 700,
              boxShadow: '0 0 32px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
              position: 'relative',
            }}>Ψ</div>
          </div>

          <h1 style={{
            fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10,
            background: 'linear-gradient(135deg, #e0e7ff 0%, #818cf8 50%, #c7d2fe 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}>
            Cognitive IQ<br />Platform
          </h1>

          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 340, lineHeight: 1.6, marginBottom: 6 }}>
            Machine-learning assessment calibrated to your age, education, and field.
          </p>
          <p style={{ color: '#4f5f7a', fontSize: 12 }}>20 adaptive questions · ~15 min · no account</p>
        </div>
      </div>

      {/* ── Domain pills ──────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
        {DOMAINS.map(d => (
          <div key={d.label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 20,
            border: `1px solid ${d.color}30`,
            background: `${d.color}12`,
          }}>
            <span style={{ fontSize: 14, color: d.color, fontFamily: 'monospace', fontWeight: 700 }}>{d.icon}</span>
            <span style={{ fontSize: 12, color: d.color, fontWeight: 500 }}>{d.label}</span>
          </div>
        ))}
      </div>

      {/* ── Feature cards ─────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          {
            title: 'Adaptive difficulty',
            body: 'Questions calibrated to your age, education level and occupation field in real time.',
            accent: '#818cf8',
            symbol: '⚡',
          },
          {
            title: 'ML decision engine',
            body: 'Weighted regression across 7 cognitive features maps raw performance to IQ.',
            accent: '#67e8f9',
            symbol: '🔬',
          },
          {
            title: 'Per-user history',
            body: 'Sessions stored locally by name. Different users keep separate trend charts.',
            accent: '#6ee7b7',
            symbol: '📊',
          },
          {
            title: 'Instant feedback',
            body: 'Correct answer + explanation shown after every question with timed circular countdown.',
            accent: '#fbbf24',
            symbol: '⏱',
          },
        ].map(f => (
          <div key={f.title} style={{
            padding: '18px 16px', borderRadius: 16,
            background: 'rgba(17,24,39,0.7)',
            border: `1px solid ${f.accent}20`,
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{f.symbol}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: f.accent, marginBottom: 5 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: '#4f5f7a', lineHeight: 1.55 }}>{f.body}</div>
          </div>
        ))}
      </div>

      {/* ── IQ scale ─────────────────────────────────────── */}
      <div style={{
        padding: '18px 20px', borderRadius: 16, marginBottom: 28,
        background: 'rgba(17,24,39,0.7)', border: '1px solid rgba(99,102,241,0.12)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#4f5f7a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
          IQ Classification Scale
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {IQ_SCALE.map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 54, fontSize: 11, color: '#334155', fontFamily: 'monospace' }}>{row.range}</span>
              <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.04)', borderRadius: 3 }}>
                <div style={{ width: `${row.pct * 1.8}%`, height: '100%', background: row.color, borderRadius: 3, minWidth: 6 }} />
              </div>
              <span style={{ width: 92, fontSize: 12, color: row.color, textAlign: 'right' }}>{row.label}</span>
              <span style={{ width: 30, fontSize: 11, color: '#2d3748', textAlign: 'right' }}>{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => dispatch({ type: 'SET_PHASE', phase: 'info' })}
        style={{
          width: '100%', padding: '15px', border: 'none', borderRadius: 14, cursor: 'pointer',
          background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
          color: 'white', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em',
          boxShadow: '0 4px 24px rgba(99,102,241,0.4)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
        onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 8px 32px rgba(99,102,241,0.5)' }}
        onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 4px 24px rgba(99,102,241,0.4)' }}
      >
        Begin cognitive assessment →
      </button>
    </div>
  )
}
