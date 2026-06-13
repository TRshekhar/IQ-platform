// lib/mlScoring.ts — ML IQ scoring engine

export interface TestAnswer {
  questionIndex: number
  category: 'Numerical' | 'Verbal' | 'Pattern' | 'Logical' | 'Memory' | 'Spatial'
  correct: boolean
  timeSpent: number
  difficulty: number
  timedOut: boolean
}

export interface UserProfile {
  name: string
  age: number
  education: string
  occupation: string
}

export interface MLScoreResult {
  rawScore: number
  iqEstimate: number
  confidenceInterval: [number, number]
  categoryScores: Record<string, CategoryScore>
  percentile: number
  classification: string
  classificationColor: string
  mlFeatures: MLFeatures
  strengths: string[]
  weaknesses: string[]
}

export interface CategoryScore {
  correct: number; total: number; accuracy: number; avgTime: number; weightedScore: number; speedBonus: number
}

export interface MLFeatures {
  accuracyScore: number; speedScore: number; consistencyScore: number; difficultyWeightedScore: number
  categoryBalance: number; adaptiveScore: number; educationNorm: number; ageNorm: number
}

const EDUCATION_WEIGHT: Record<string, number> = {
  school: 0.88, diploma: 0.93, undergraduate: 1.0, postgraduate: 1.04, doctorate: 1.07, '': 1.0,
}

const WEIGHTS = { accuracy: 0.42, speed: 0.12, consistency: 0.10, difficulty: 0.22, categoryBalance: 0.08, adaptive: 0.06 }

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)) }

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1; x = Math.abs(x)
  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911
  const t = 1/(1+p*x)
  const y = 1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x)
  return sign*y
}

function normalCDF(x: number, mean: number, sd: number) {
  return 0.5*(1+erf((x-mean)/(sd*Math.sqrt(2))))
}

function calcConsistency(answers: TestAnswer[]): number {
  if (answers.length < 3) return 0.8
  const byCategory: Record<string, boolean[]> = {}
  answers.forEach(a => { if (!byCategory[a.category]) byCategory[a.category]=[]; byCategory[a.category].push(a.correct) })
  let totalVariance=0,categories=0
  for (const cat in byCategory) {
    const r=byCategory[cat]; if (r.length<2) continue
    const mean=r.filter(Boolean).length/r.length
    const variance=r.reduce((s,x)=>s+Math.pow((x?1:0)-mean,2),0)/r.length
    totalVariance+=variance; categories++
  }
  return clamp(1-(categories?totalVariance/categories:0.25)*1.5,0.3,1.0)
}

function calcSpeed(answers: TestAnswer[]): number {
  const correct=answers.filter(a=>a.correct&&!a.timedOut)
  if (!correct.length) return 0.3
  const avg=correct.reduce((s,a)=>s+a.timeSpent,0)/correct.length
  if (avg<6) return 1.0; if (avg<10) return 0.9; if (avg<15) return 0.8
  if (avg<20) return 0.7; if (avg<25) return 0.55; return 0.4
}

function calcDifficultyWeighted(answers: TestAnswer[]): number {
  if (!answers.length) return 0
  const total=answers.reduce((s,a)=>s+a.difficulty,0)
  const earned=answers.filter(a=>a.correct).reduce((s,a)=>s+a.difficulty,0)
  return total>0?earned/total:0
}

function calcBalance(catScores: Record<string, CategoryScore>): number {
  const accs=Object.values(catScores).map(c=>c.accuracy)
  if (!accs.length) return 0.5
  const mean=accs.reduce((a,b)=>a+b,0)/accs.length
  const variance=accs.reduce((s,a)=>s+Math.pow(a-mean,2),0)/accs.length
  return clamp(1-variance*2,0.3,1.0)
}

export function calculateMLScore(answers: TestAnswer[], profile: UserProfile): MLScoreResult {
  const categories=['Numerical','Verbal','Pattern','Logical','Memory','Spatial']
  const categoryScores: Record<string,CategoryScore>={}
  categories.forEach(cat=>{
    const ca=answers.filter(a=>a.category===cat)
    if (!ca.length) return
    const correct=ca.filter(a=>a.correct).length,total=ca.length
    const accuracy=correct/total, avgTime=Math.round(ca.reduce((s,a)=>s+a.timeSpent,0)/total)
    const speedBonus=Math.max(0,(20-avgTime)/20)*0.1
    categoryScores[cat]={correct,total,accuracy,avgTime,weightedScore:accuracy+speedBonus,speedBonus}
  })

  const accuracyScore=answers.length?answers.filter(a=>a.correct).length/answers.length:0
  const speedScore=calcSpeed(answers)
  const consistencyScore=calcConsistency(answers)
  const difficultyWeightedScore=calcDifficultyWeighted(answers)
  const categoryBalance=calcBalance(categoryScores)
  const timedOut=answers.filter(a=>a.timedOut).length
  const adaptiveScore=clamp(1-(timedOut/Math.max(answers.length,1))*1.5,0,1)
  const educationNorm=EDUCATION_WEIGHT[profile.education]??1.0
  const ageNorm=profile.age>=16&&profile.age<=35?1.0:profile.age<16?0.92:profile.age<=50?0.97:0.94

  const rawLinear=
    WEIGHTS.accuracy*accuracyScore+WEIGHTS.speed*speedScore+WEIGHTS.consistency*consistencyScore+
    WEIGHTS.difficulty*difficultyWeightedScore+WEIGHTS.categoryBalance*categoryBalance+WEIGHTS.adaptive*adaptiveScore
  const rawScore=clamp(rawLinear,0,1)

  const zScore=(rawScore-0.5)*4.2*educationNorm*ageNorm
  const iqEstimate=Math.round(clamp(100+zScore*15,70,145))
  const ciMargin=Math.round(8+(1-consistencyScore)*6)
  const confidenceInterval:[number,number]=[clamp(iqEstimate-ciMargin,55,160),clamp(iqEstimate+ciMargin,55,160)]
  const percentile=Math.round(normalCDF(iqEstimate,100,15)*100)

  const {classification,classificationColor}=getClassification(iqEstimate)

  const sorted=Object.entries(categoryScores).filter(([,s])=>s.total>0).sort(([,a],[,b])=>b.accuracy-a.accuracy)
  const strengths=sorted.slice(0,2).map(([cat])=>cat)
  const weaknesses=sorted.slice(-2).reverse().filter(([,s])=>s.accuracy<0.7).map(([cat])=>cat)

  return {
    rawScore:Math.round(rawScore*100),iqEstimate,confidenceInterval,categoryScores,
    percentile,classification,classificationColor,
    mlFeatures:{accuracyScore,speedScore,consistencyScore,difficultyWeightedScore,categoryBalance,adaptiveScore,educationNorm,ageNorm},
    strengths,weaknesses
  }
}

function getClassification(iq:number):{classification:string;classificationColor:string}{
  if(iq>=130) return {classification:'Very Superior',classificationColor:'#818cf8'}
  if(iq>=120) return {classification:'Superior',classificationColor:'#6ee7b7'}
  if(iq>=110) return {classification:'High Average',classificationColor:'#67e8f9'}
  if(iq>=90)  return {classification:'Average',classificationColor:'#fbbf24'}
  if(iq>=80)  return {classification:'Low Average',classificationColor:'#fb923c'}
  return {classification:'Borderline',classificationColor:'#f87171'}
}
