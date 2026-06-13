'use client'
import { useTest } from '@/lib/testContext'
import IntroScreen from './IntroScreen'
import InfoScreen from './InfoScreen'
import TestScreen from './TestScreen'
import ResultsScreen from './ResultsScreen'
import Navbar from './Navbar'

export default function TestApp() {
  const { state } = useTest()

  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e' }}>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {state.phase === 'intro' && <IntroScreen />}
        {state.phase === 'info' && <InfoScreen />}
        {state.phase === 'test' && <TestScreen />}
        {state.phase === 'results' && <ResultsScreen />}
      </main>
    </div>
  )
}
