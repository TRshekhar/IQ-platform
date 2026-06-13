'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Question } from './questions'
import { MLScoreResult, UserProfile } from './mlScoring'
import { TestAnswer } from './mlScoring'

export interface TestState {
  phase: 'intro' | 'info' | 'test' | 'results'
  profile: UserProfile | null
  questions: Question[]
  currentIndex: number
  answers: TestAnswer[]
  result: MLScoreResult | null
  sessionId: string | null
  startedAt: number | null
  difficultyRange: { min: number; max: number; target: number } | null
}

type Action =
  | { type: 'SET_PHASE'; phase: TestState['phase'] }
  | { type: 'SET_PROFILE'; profile: UserProfile }
  | { type: 'LOAD_QUESTIONS'; questions: Question[]; difficultyRange: { min: number; max: number; target: number } }
  | { type: 'SUBMIT_ANSWER'; answer: TestAnswer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SET_RESULT'; result: MLScoreResult; sessionId: string }
  | { type: 'RESET' }

const initialState: TestState = {
  phase: 'intro', profile: null, questions: [], currentIndex: 0,
  answers: [], result: null, sessionId: null, startedAt: null, difficultyRange: null,
}

function reducer(state: TestState, action: Action): TestState {
  switch (action.type) {
    case 'SET_PHASE': return { ...state, phase: action.phase }
    case 'SET_PROFILE': return { ...state, profile: action.profile }
    case 'LOAD_QUESTIONS': return { ...state, questions: action.questions, answers: [], currentIndex: 0, startedAt: Date.now(), difficultyRange: action.difficultyRange }
    case 'SUBMIT_ANSWER': return { ...state, answers: [...state.answers, action.answer] }
    case 'NEXT_QUESTION': return { ...state, currentIndex: state.currentIndex + 1 }
    case 'SET_RESULT': return { ...state, result: action.result, sessionId: action.sessionId, phase: 'results' }
    case 'RESET': return { ...initialState }
    default: return state
  }
}

const TestContext = createContext<{ state: TestState; dispatch: React.Dispatch<Action> } | null>(null)

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <TestContext.Provider value={{ state, dispatch }}>{children}</TestContext.Provider>
}

export function useTest() {
  const ctx = useContext(TestContext)
  if (!ctx) throw new Error('useTest must be inside TestProvider')
  return ctx
}
