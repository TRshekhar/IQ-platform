// lib/questions.ts — Adaptive question bank with profile-aware selection

export type QuestionCategory = 'Numerical' | 'Verbal' | 'Pattern' | 'Logical' | 'Memory' | 'Spatial'

export interface Question {
  id: string
  category: QuestionCategory
  difficulty: 1 | 2 | 3 | 4 | 5
  minAge?: number      // minimum recommended age
  maxAge?: number      // maximum recommended age
  tags?: string[]      // 'stem', 'arts', 'language', 'general'
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  timeLimit: number
}

export interface UserProfile {
  name: string
  age: number
  education: string
  occupation: string
}

// Map education → base difficulty tier (1-5 scale)
export const EDU_DIFFICULTY: Record<string, number> = {
  school: 1.5,
  diploma: 2.2,
  undergraduate: 2.8,
  postgraduate: 3.5,
  doctorate: 4.2,
  '': 2.5,
}

// Determine if occupation is STEM-leaning
function isStem(occ: string): boolean {
  const stems = ['engineer', 'developer', 'programmer', 'coder', 'scientist', 'math', 'physics',
    'computer', 'data', 'analyst', 'architect', 'tech', 'software', 'hardware', 'cs', 'it', 'iot']
  const lower = occ.toLowerCase()
  return stems.some(k => lower.includes(k))
}

function isArts(occ: string): boolean {
  const arts = ['writer', 'artist', 'design', 'journal', 'literature', 'english', 'history',
    'social', 'psychology', 'philosophy', 'law', 'media', 'content', 'market']
  const lower = occ.toLowerCase()
  return arts.some(k => lower.includes(k))
}

// ─── FULL QUESTION BANK ───────────────────────────────────────────

export const QUESTION_BANK: Question[] = [

  // ══════════════════════════════════════════════════════
  //  NUMERICAL — difficulty 1 (young / school level)
  // ══════════════════════════════════════════════════════
  {
    id: 'n1', category: 'Numerical', difficulty: 1, minAge: 10, maxAge: 16, tags: ['general'],
    text: 'What is 15 × 4?',
    options: ['50', '60', '55', '65'],
    correctIndex: 1, timeLimit: 15,
    explanation: '15 × 4 = 60'
  },
  {
    id: 'n2', category: 'Numerical', difficulty: 1, minAge: 10, maxAge: 18, tags: ['general'],
    text: 'A pizza is cut into 8 equal slices. If you eat 3 slices, what fraction is left?',
    options: ['3/8', '5/8', '1/2', '2/3'],
    correctIndex: 1, timeLimit: 20,
    explanation: '8 - 3 = 5 slices remaining out of 8 → 5/8'
  },
  {
    id: 'n3', category: 'Numerical', difficulty: 1, minAge: 10, maxAge: 17, tags: ['general'],
    text: 'If a train travels 300 km in 2.5 hours, what is its average speed?',
    options: ['100 km/h', '110 km/h', '120 km/h', '130 km/h'],
    correctIndex: 2, timeLimit: 25,
    explanation: '300 ÷ 2.5 = 120 km/h'
  },
  {
    id: 'n4', category: 'Numerical', difficulty: 1, minAge: 12, maxAge: 18, tags: ['general'],
    text: 'What is 30% of 200?',
    options: ['40', '50', '60', '70'],
    correctIndex: 2, timeLimit: 15,
    explanation: '200 × 0.30 = 60'
  },

  // ══════════════════════════════════════════════════════
  //  NUMERICAL — difficulty 2 (diploma / early undergrad)
  // ══════════════════════════════════════════════════════
  {
    id: 'n5', category: 'Numerical', difficulty: 2, tags: ['general'],
    text: 'A shirt costs ₹800 after a 20% discount. What was the original price?',
    options: ['₹960', '₹980', '₹1000', '₹1050'],
    correctIndex: 2, timeLimit: 30,
    explanation: '₹800 = 80% of original → 800 / 0.8 = ₹1000'
  },
  {
    id: 'n6', category: 'Numerical', difficulty: 2, tags: ['general'],
    text: 'What is the next number in the series: 2, 6, 18, 54, ?',
    options: ['108', '162', '160', '216'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Each term is multiplied by 3. 54 × 3 = 162'
  },
  {
    id: 'n7', category: 'Numerical', difficulty: 2, tags: ['general'],
    text: 'If 5x + 3 = 28, what is x?',
    options: ['4', '5', '6', '7'],
    correctIndex: 1, timeLimit: 20,
    explanation: '5x = 25 → x = 5'
  },
  {
    id: 'n8', category: 'Numerical', difficulty: 2, tags: ['general'],
    text: 'The ratio of boys to girls in a class is 3:2. If there are 30 boys, how many total students?',
    options: ['40', '45', '50', '55'],
    correctIndex: 2, timeLimit: 25,
    explanation: '3 parts = 30 → 1 part = 10. Girls = 20. Total = 50'
  },

  // ══════════════════════════════════════════════════════
  //  NUMERICAL — difficulty 3 (undergrad / STEM)
  // ══════════════════════════════════════════════════════
  {
    id: 'n9', category: 'Numerical', difficulty: 3, tags: ['stem', 'general'],
    text: 'A tank fills in 12 h by pipe A and empties in 18 h by pipe B. How long to fill with both open?',
    options: ['24 h', '30 h', '36 h', '40 h'],
    correctIndex: 2, timeLimit: 35,
    explanation: 'Net fill rate = 1/12 - 1/18 = 1/36. Time = 36 h'
  },
  {
    id: 'n10', category: 'Numerical', difficulty: 3, tags: ['stem'],
    text: 'What is the compound interest on ₹5000 at 10% p.a. for 2 years?',
    options: ['₹1000', '₹1050', '₹1100', '₹1150'],
    correctIndex: 1, timeLimit: 35,
    explanation: 'CI = 5000 × (1.1² − 1) = 5000 × 0.21 = ₹1050'
  },
  {
    id: 'n11', category: 'Numerical', difficulty: 3, tags: ['stem'],
    text: 'If log₂(x) = 5, what is x?',
    options: ['10', '25', '32', '64'],
    correctIndex: 2, timeLimit: 25,
    explanation: '2⁵ = 32'
  },

  // ══════════════════════════════════════════════════════
  //  NUMERICAL — difficulty 4-5 (postgrad / doctorate)
  // ══════════════════════════════════════════════════════
  {
    id: 'n12', category: 'Numerical', difficulty: 4, tags: ['stem'],
    text: 'A geometric series has first term 3 and ratio 2. What is the sum of the first 6 terms?',
    options: ['180', '186', '189', '192'],
    correctIndex: 2, timeLimit: 40,
    explanation: 'S = 3(2⁶ − 1)/(2 − 1) = 3 × 63 = 189'
  },
  {
    id: 'n13', category: 'Numerical', difficulty: 5, tags: ['stem'],
    text: 'If f(x) = x³ − 3x, find the local minimum value.',
    options: ['−2', '0', '2', '−3'],
    correctIndex: 0, timeLimit: 45,
    explanation: "f'(x) = 3x² − 3 = 0 → x = ±1. f(1) = 1 − 3 = −2 (local min)"
  },

  // ══════════════════════════════════════════════════════
  //  PATTERN — difficulty 1-2
  // ══════════════════════════════════════════════════════
  {
    id: 'p1', category: 'Pattern', difficulty: 1, minAge: 10, maxAge: 17, tags: ['general'],
    text: 'Which number completes the pattern? 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '49', '42'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'Perfect squares: 6² = 36'
  },
  {
    id: 'p2', category: 'Pattern', difficulty: 1, minAge: 10, maxAge: 16, tags: ['general'],
    text: 'What comes next: 2, 4, 6, 8, ?',
    options: ['9', '10', '11', '12'],
    correctIndex: 1, timeLimit: 10,
    explanation: 'Even numbers increasing by 2. Next is 10.'
  },
  {
    id: 'p3', category: 'Pattern', difficulty: 2, tags: ['general'],
    text: 'Find the odd one out: 3, 5, 7, 9, 11',
    options: ['3', '5', '9', '11'],
    correctIndex: 2, timeLimit: 20,
    explanation: '9 = 3 × 3 is not prime; the others are prime numbers'
  },
  {
    id: 'p4', category: 'Pattern', difficulty: 2, tags: ['general'],
    text: 'What letter comes next: A, C, F, J, ?',
    options: ['N', 'O', 'P', 'M'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Gaps: +2, +3, +4, +5 → J + 5 = O'
  },
  {
    id: 'p5', category: 'Pattern', difficulty: 2, tags: ['general'],
    text: 'Complete: 2, 3, 5, 8, 13, 21, ?',
    options: ['29', '33', '34', '36'],
    correctIndex: 2, timeLimit: 20,
    explanation: 'Each term = sum of previous two: 13 + 21 = 34 (Fibonacci)'
  },

  // ── PATTERN difficulty 3-5 ──
  {
    id: 'p6', category: 'Pattern', difficulty: 3, tags: ['stem', 'general'],
    text: 'What is next? 1, 2, 4, 7, 11, 16, ?',
    options: ['20', '21', '22', '23'],
    correctIndex: 2, timeLimit: 25,
    explanation: 'Differences: +1, +2, +3, +4, +5, +6 → 16 + 6 = 22'
  },
  {
    id: 'p7', category: 'Pattern', difficulty: 3, tags: ['general'],
    text: 'Find the pattern: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '46'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42'
  },
  {
    id: 'p8', category: 'Pattern', difficulty: 4, tags: ['stem'],
    text: 'What replaces ? in: 4, 8, 24, 96, ?',
    options: ['288', '384', '480', '576'],
    correctIndex: 2, timeLimit: 30,
    explanation: 'Multiply by 2, 3, 4, 5: 96 × 5 = 480'
  },
  {
    id: 'p9', category: 'Pattern', difficulty: 5, tags: ['stem'],
    text: 'If the nth term of a sequence is n² + 2n − 1, what is the 8th term?',
    options: ['79', '81', '83', '85'],
    correctIndex: 0, timeLimit: 35,
    explanation: '8² + 2(8) − 1 = 64 + 16 − 1 = 79'
  },

  // ══════════════════════════════════════════════════════
  //  VERBAL — difficulty 1-2 (young / general)
  // ══════════════════════════════════════════════════════
  {
    id: 'v1', category: 'Verbal', difficulty: 1, minAge: 10, maxAge: 17, tags: ['language', 'general'],
    text: 'Which word does NOT belong? Apple, Mango, Carrot, Banana',
    options: ['Apple', 'Mango', 'Carrot', 'Banana'],
    correctIndex: 2, timeLimit: 15,
    explanation: 'Carrot is a vegetable; the others are fruits'
  },
  {
    id: 'v2', category: 'Verbal', difficulty: 1, minAge: 10, maxAge: 17, tags: ['language'],
    text: 'Rearrange DWOSR to form a common English word:',
    options: ['Words', 'Sword', 'Rowed', 'Rowds'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'DWOSR → SWORD'
  },
  {
    id: 'v3', category: 'Verbal', difficulty: 2, tags: ['language', 'general'],
    text: 'Choose the word most opposite to BENEVOLENT:',
    options: ['Generous', 'Malevolent', 'Indifferent', 'Peaceful'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'Benevolent = kind; Malevolent = wishing harm'
  },
  {
    id: 'v4', category: 'Verbal', difficulty: 2, tags: ['language', 'arts'],
    text: '"Pensive" is to "Thoughtful" as "Desolate" is to:',
    options: ['Crowded', 'Happy', 'Lonely', 'Cheerful'],
    correctIndex: 2, timeLimit: 20,
    explanation: 'Pensive ≈ Thoughtful; Desolate ≈ Lonely (synonym pairs)'
  },

  // ── VERBAL difficulty 3-5 ──
  {
    id: 'v5', category: 'Verbal', difficulty: 3, tags: ['arts', 'general'],
    text: 'Which pair mirrors PHYSICIAN : HOSPITAL?',
    options: ['Student : Book', 'Teacher : School', 'Chef : Food', 'Lawyer : Crime'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'A physician works at a hospital; a teacher works at a school'
  },
  {
    id: 'v6', category: 'Verbal', difficulty: 3, tags: ['language', 'arts'],
    text: 'Choose the word closest in meaning to EPHEMERAL:',
    options: ['Eternal', 'Transient', 'Solid', 'Ancient'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'Ephemeral = lasting a very short time = transient'
  },
  {
    id: 'v7', category: 'Verbal', difficulty: 4, tags: ['arts', 'language'],
    text: 'OBFUSCATE most nearly means:',
    options: ['Clarify', 'Confuse', 'Amplify', 'Observe'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'Obfuscate = to render unclear or unintelligible'
  },
  {
    id: 'v8', category: 'Verbal', difficulty: 4, tags: ['arts'],
    text: 'LOQUACIOUS is to TACITURN as PENURIOUS is to:',
    options: ['Miserly', 'Generous', 'Frugal', 'Verbose'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Loquacious/Taciturn are antonyms; Penurious (stingy) ↔ Generous'
  },
  {
    id: 'v9', category: 'Verbal', difficulty: 5, tags: ['arts', 'language'],
    text: 'Which word is most nearly OPPOSITE to PELLUCID?',
    options: ['Transparent', 'Turbid', 'Luminous', 'Serene'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Pellucid = translucently clear; Turbid = murky, opaque'
  },

  // ══════════════════════════════════════════════════════
  //  LOGICAL — difficulty 1-2
  // ══════════════════════════════════════════════════════
  {
    id: 'l1', category: 'Logical', difficulty: 1, minAge: 10, maxAge: 16, tags: ['general'],
    text: 'All cats are animals. Whiskers is a cat. Therefore:',
    options: ['Whiskers is an animal', 'All animals are cats', 'Whiskers is not an animal', 'Cannot determine'],
    correctIndex: 0, timeLimit: 15,
    explanation: 'Simple syllogism: Whiskers is a cat → Whiskers is an animal'
  },
  {
    id: 'l2', category: 'Logical', difficulty: 2, tags: ['general'],
    text: 'All roses are flowers. Some flowers are red. Therefore:',
    options: ['All roses are red', 'Some roses may be red', 'No roses are red', 'Roses cannot be red'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'We can only conclude some roses MIGHT be red — not certain'
  },
  {
    id: 'l3', category: 'Logical', difficulty: 2, tags: ['general'],
    text: 'In a race: A is 3rd. B is ahead of A. C is behind D who is behind A. Who is last?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 2, timeLimit: 30,
    explanation: 'Order: B, ?, A(3rd), D, C → C is last'
  },

  // ── LOGICAL difficulty 3-5 ──
  {
    id: 'l4', category: 'Logical', difficulty: 3, tags: ['general'],
    text: "A man says: \"Brothers and sisters I have none, but that man's father is my father's son.\" Who is in the portrait?",
    options: ['His son', 'His brother', 'Himself', 'His uncle'],
    correctIndex: 0, timeLimit: 35,
    explanation: "'My father's son' with no siblings = himself. Portrait's subject's father = him → his son"
  },
  {
    id: 'l5', category: 'Logical', difficulty: 3, tags: ['general'],
    text: 'If all Bloops are Razzles and all Razzles are Lazzles, then:',
    options: ['All Lazzles are Bloops', 'All Bloops are Lazzles', 'Some Lazzles are not Razzles', 'None of the above'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Transitive: Bloops → Razzles → Lazzles, so all Bloops are Lazzles'
  },
  {
    id: 'l6', category: 'Logical', difficulty: 3, tags: ['general'],
    text: 'Five friends sit in a row. A left of B. C right of D. E between A and C. Who is in the middle?',
    options: ['A', 'B', 'C', 'E'],
    correctIndex: 3, timeLimit: 35,
    explanation: 'Arrangement: D, A, E, C, B → E is middle (position 3)'
  },
  {
    id: 'l7', category: 'Logical', difficulty: 4, tags: ['stem'],
    text: 'P → Q is true and Q → R is true. If R is false, what can we conclude?',
    options: ['P is true', 'P is false', 'Q is true', 'Nothing'],
    correctIndex: 1, timeLimit: 30,
    explanation: 'Contrapositive: ¬R → ¬Q and ¬Q → ¬P. So R false → P false'
  },
  {
    id: 'l8', category: 'Logical', difficulty: 5, tags: ['stem'],
    text: 'There are 4 cards showing A, D, 4, 7. Which cards must you turn to verify: "If a card shows a vowel, the other side is even"?',
    options: ['A and 4', 'A and 7', 'D and 4', 'A, D and 4'],
    correctIndex: 1, timeLimit: 40,
    explanation: 'Turn A (check even) and 7 (check no vowel). Wason selection task.'
  },

  // ══════════════════════════════════════════════════════
  //  MEMORY — difficulty 1-4
  // ══════════════════════════════════════════════════════
  {
    id: 'm1', category: 'Memory', difficulty: 1, minAge: 10, maxAge: 16, tags: ['general'],
    text: 'Study: RED, BLUE, GREEN, YELLOW, PURPLE. Which colour was listed THIRD?',
    options: ['BLUE', 'GREEN', 'YELLOW', 'RED'],
    correctIndex: 1, timeLimit: 20,
    explanation: 'The sequence was RED(1), BLUE(2), GREEN(3), YELLOW(4), PURPLE(5)'
  },
  {
    id: 'm2', category: 'Memory', difficulty: 2, tags: ['general'],
    text: 'Study: 7, 3, 9, 1, 5. What is the middle number?',
    options: ['3', '7', '9', '1'],
    correctIndex: 2, timeLimit: 20,
    explanation: 'Sequence: 7, 3, 9, 1, 5. Middle (3rd) = 9'
  },
  {
    id: 'm3', category: 'Memory', difficulty: 2, tags: ['general'],
    text: 'Which word was NOT in this list? TIGER, MAPLE, RIVER, CLOUD, STONE',
    options: ['CLOUD', 'MAPLE', 'OCEAN', 'STONE'],
    correctIndex: 2, timeLimit: 25,
    explanation: 'OCEAN was not in the list'
  },
  {
    id: 'm4', category: 'Memory', difficulty: 3, tags: ['general'],
    text: 'If Monday is day 1, what day number is the 3rd Friday of a month starting on Wednesday?',
    options: ['17', '18', '19', '20'],
    correctIndex: 2, timeLimit: 35,
    explanation: 'Wed=day1. Fridays fall on 3rd, 10th, 17th → 3rd Friday = day 19'
  },
  {
    id: 'm5', category: 'Memory', difficulty: 4, tags: ['stem'],
    text: 'A room has 7 items: lamp, clock, chair, plant, book, mirror, rug. How many items have exactly 5 letters?',
    options: ['2', '3', '4', '5'],
    correctIndex: 1, timeLimit: 30,
    explanation: 'clock(5), chair(5), plant(5) → 3 items'
  },

  // ══════════════════════════════════════════════════════
  //  SPATIAL — difficulty 1-5
  // ══════════════════════════════════════════════════════
  {
    id: 's1', category: 'Spatial', difficulty: 1, minAge: 10, maxAge: 16, tags: ['general'],
    text: 'How many sides does a hexagon have?',
    options: ['5', '6', '7', '8'],
    correctIndex: 1, timeLimit: 10,
    explanation: 'Hexagon = 6 sides'
  },
  {
    id: 's2', category: 'Spatial', difficulty: 2, tags: ['general'],
    text: 'A cube has 6 faces. How many edges does it have?',
    options: ['8', '10', '12', '16'],
    correctIndex: 2, timeLimit: 20,
    explanation: 'A cube has exactly 12 edges'
  },
  {
    id: 's3', category: 'Spatial', difficulty: 2, tags: ['general'],
    text: 'A square piece of paper folded in half diagonally twice — how many triangular sections?',
    options: ['2', '4', '6', '8'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Each fold doubles the layers: 4 triangular sections'
  },
  {
    id: 's4', category: 'Spatial', difficulty: 3, tags: ['stem', 'general'],
    text: 'A clock shows 3:15. What is the angle between the hour and minute hands?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correctIndex: 1, timeLimit: 30,
    explanation: 'Minute at 90°, hour at 97.5° (3×30 + 15×0.5). Diff = 7.5°'
  },
  {
    id: 's5', category: 'Spatial', difficulty: 3, tags: ['stem'],
    text: 'How many squares of ALL sizes are in a 3×3 grid?',
    options: ['9', '12', '14', '16'],
    correctIndex: 2, timeLimit: 30,
    explanation: '9 (1×1) + 4 (2×2) + 1 (3×3) = 14'
  },
  {
    id: 's6', category: 'Spatial', difficulty: 4, tags: ['stem'],
    text: "A 3D shape has 8 vertices and 12 edges. How many faces? (Euler's formula: F+V−E=2)",
    options: ['4', '5', '6', '8'],
    correctIndex: 2, timeLimit: 30,
    explanation: 'F + 8 − 12 = 2 → F = 6'
  },
  {
    id: 's7', category: 'Spatial', difficulty: 5, tags: ['stem'],
    text: 'A regular tetrahedron has how many edges?',
    options: ['4', '6', '8', '12'],
    correctIndex: 1, timeLimit: 25,
    explanation: 'Tetrahedron: 4 faces, 4 vertices, 6 edges. V−E+F = 4−6+4 = 2 ✓'
  },
]

// ─── Profile-aware question selection ────────────────────────────

export function getDifficultyRange(profile: UserProfile): { min: number; max: number; target: number } {
  const age = profile.age
  const edu = profile.education || ''
  const occ = profile.occupation || ''

  let target = EDU_DIFFICULTY[edu] ?? 2.5

  // Age-based adjustment
  if (age <= 13) target = Math.min(target, 1.5)
  else if (age <= 16) target = Math.min(target, 2.2)
  else if (age <= 19) target = Math.min(target, 3.0)
  else if (age >= 30 && isStem(occ)) target = Math.max(target, 3.2)

  const min = Math.max(1, Math.floor(target - 1))
  const max = Math.min(5, Math.ceil(target + 1.5))
  return { min, max, target }
}

export function selectQuestions(profile: UserProfile, count = 20): Question[] {
  const { min, max } = getDifficultyRange(profile)
  const stemFocus = isStem(profile.occupation)
  const artsFocus = isArts(profile.occupation)

  const categories: QuestionCategory[] = ['Numerical', 'Verbal', 'Pattern', 'Logical', 'Memory', 'Spatial']
  const selected: Question[] = []
  const perCategory = Math.floor(count / categories.length)  // 3 per category for 20 Qs

  categories.forEach(cat => {
    // Filter by difficulty range and age
    let pool = QUESTION_BANK.filter(q => {
      if (q.category !== cat) return false
      if (q.difficulty < min || q.difficulty > max) return false
      if (q.minAge && profile.age < q.minAge) return false
      if (q.maxAge && profile.age > q.maxAge) return false
      return true
    })

    // Boost domain-relevant questions
    if (stemFocus) {
      const stemPool = pool.filter(q => q.tags?.includes('stem'))
      if (stemPool.length >= 1) pool = [...stemPool, ...pool].slice(0, pool.length)
    }
    if (artsFocus) {
      const artsPool = pool.filter(q => q.tags?.includes('arts') || q.tags?.includes('language'))
      if (artsPool.length >= 1) pool = [...artsPool, ...pool].slice(0, pool.length)
    }

    // Fallback: if not enough questions in range, relax constraints
    if (pool.length < perCategory) {
      pool = QUESTION_BANK.filter(q => q.category === cat)
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    selected.push(...shuffled.slice(0, perCategory))
  })

  // Fill remaining slots
  const remaining = count - selected.length
  if (remaining > 0) {
    const usedIds = new Set(selected.map(q => q.id))
    const extras = QUESTION_BANK
      .filter(q => !usedIds.has(q.id) && q.difficulty >= min && q.difficulty <= max)
      .sort(() => Math.random() - 0.5)
      .slice(0, remaining)
    selected.push(...extras)
  }

  return selected.sort(() => Math.random() - 0.5)
}
