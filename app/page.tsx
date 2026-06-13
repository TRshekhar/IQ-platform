'use client'
import { TestProvider } from '@/lib/testContext'
import TestApp from '@/components/TestApp'

export default function Home() {
  return (
    <TestProvider>
      <TestApp />
    </TestProvider>
  )
}
