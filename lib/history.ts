// lib/history.ts — Per-user session history with name-keyed segregation

import { MLScoreResult, UserProfile } from './mlScoring'

const STORAGE_KEY = 'iq_platform_history_v2'
const MAX_SESSIONS = 100

export interface TestSession {
  id: string
  timestamp: number
  profile: UserProfile
  userKey: string            // normalised lowercase name — for per-user grouping
  iqEstimate: number
  percentile: number
  classification: string
  classificationColor: string
  rawScore: number
  confidenceInterval: [number, number]
  categoryScores: Record<string, { correct: number; total: number; accuracy: number; avgTime: number }>
  strengths: string[]
  weaknesses: string[]
  totalQuestions: number
  correctAnswers: number
  avgTimePerQuestion: number
  mlFeatures: MLScoreResult['mlFeatures']
  difficultyRange: { min: number; max: number; target: number }
}

/** Normalise name for grouping: trim, lowercase, collapse spaces */
export function normaliseUserKey(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function saveSession(
  profile: UserProfile,
  result: MLScoreResult,
  totalQuestions: number,
  correctAnswers: number,
  avgTimePerQuestion: number,
  difficultyRange: { min: number; max: number; target: number }
): TestSession {
  const session: TestSession = {
    id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    profile,
    userKey: normaliseUserKey(profile.name),
    iqEstimate: result.iqEstimate,
    percentile: result.percentile,
    classification: result.classification,
    classificationColor: result.classificationColor,
    rawScore: result.rawScore,
    confidenceInterval: result.confidenceInterval,
    categoryScores: result.categoryScores,
    strengths: result.strengths,
    weaknesses: result.weaknesses,
    totalQuestions,
    correctAnswers,
    avgTimePerQuestion,
    mlFeatures: result.mlFeatures,
    difficultyRange,
  }

  const existing = getAllSessions()
  const updated = [session, ...existing].slice(0, MAX_SESSIONS)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    const trimmed = [session, ...existing].slice(0, 30)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  }
  return session
}

export function getAllSessions(): TestSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as TestSession[]
  } catch {
    return []
  }
}

/** Sessions filtered to a specific user (case-insensitive name match) */
export function getSessionsForUser(name: string): TestSession[] {
  const key = normaliseUserKey(name)
  return getAllSessions().filter(s => s.userKey === key)
}

/** All distinct users who have sessions */
export function getDistinctUsers(): { key: string; displayName: string; count: number; lastSession: number }[] {
  const sessions = getAllSessions()
  const map: Record<string, { displayName: string; count: number; lastSession: number }> = {}
  sessions.forEach(s => {
    if (!map[s.userKey]) {
      map[s.userKey] = { displayName: s.profile.name, count: 0, lastSession: 0 }
    }
    map[s.userKey].count++
    if (s.timestamp > map[s.userKey].lastSession) {
      map[s.userKey].lastSession = s.timestamp
      map[s.userKey].displayName = s.profile.name  // keep most recent casing
    }
  })
  return Object.entries(map)
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.lastSession - a.lastSession)
}

export function deleteSession(id: string): void {
  const sessions = getAllSessions().filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function clearSessionsForUser(userKey: string): void {
  const sessions = getAllSessions().filter(s => s.userKey !== userKey)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
}

export function clearAllSessions(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export interface UserStats {
  totalSessions: number
  avgIQ: number
  highestIQ: number
  lowestIQ: number
  trend: number   // positive = improving
  avgCategoryAccuracy: Record<string, number>
}

export function getStatsForSessions(sessions: TestSession[]): UserStats | null {
  if (sessions.length === 0) return null

  const iqScores = sessions.map(s => s.iqEstimate)
  const avgIQ = Math.round(iqScores.reduce((a, b) => a + b, 0) / iqScores.length)
  const highestIQ = Math.max(...iqScores)
  const lowestIQ = Math.min(...iqScores)

  const recent = sessions.slice(0, 5).map(s => s.iqEstimate)
  const trend = recent.length >= 2 ? recent[0] - recent[recent.length - 1] : 0

  const catAccuracy: Record<string, number[]> = {}
  sessions.forEach(s => {
    Object.entries(s.categoryScores).forEach(([cat, score]) => {
      if (!catAccuracy[cat]) catAccuracy[cat] = []
      catAccuracy[cat].push(score.accuracy)
    })
  })
  const avgCategoryAccuracy: Record<string, number> = {}
  Object.entries(catAccuracy).forEach(([cat, vals]) => {
    avgCategoryAccuracy[cat] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100)
  })

  return { totalSessions: sessions.length, avgIQ, highestIQ, lowestIQ, trend, avgCategoryAccuracy }
}
