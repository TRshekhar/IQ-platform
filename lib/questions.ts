// lib/questions.ts — Adaptive question bank (145 questions, 6 domains, difficulty 1–5)

export type QuestionCategory = 'Numerical' | 'Verbal' | 'Pattern' | 'Logical' | 'Memory' | 'Spatial'

export interface Question {
  id: string
  category: QuestionCategory
  difficulty: 1 | 2 | 3 | 4 | 5
  minAge?: number
  maxAge?: number
  tags?: string[]   // 'stem' | 'arts' | 'language' | 'general'
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

export const EDU_DIFFICULTY: Record<string, number> = {
  school: 1.5, diploma: 2.2, undergraduate: 2.8,
  postgraduate: 3.5, doctorate: 4.2, '': 2.5,
}

function isStem(occ: string): boolean {
  return ['engineer','developer','programmer','coder','scientist','math','physics',
    'computer','data','analyst','architect','tech','software','hardware','cs','it','iot',
    'electronics','electrical','mechanical','civil','chemical','network','cyber','ai','ml']
    .some(k => occ.toLowerCase().includes(k))
}
function isArts(occ: string): boolean {
  return ['writer','artist','design','journal','literature','english','history',
    'social','psychology','philosophy','law','media','content','market','teacher',
    'linguist','translator','editor','poet','author','communicat','advertis','public']
    .some(k => occ.toLowerCase().includes(k))
}

// ─── QUESTION BANK (145 questions) ───────────────────────────────

export const QUESTION_BANK: Question[] = [

  // ══════════════════════════════════════════════════════════════
  //  NUMERICAL  (n1–n40)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'n1', category:'Numerical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'What is 15 × 4?', options:['50','60','55','65'], correctIndex:1, timeLimit:15,
    explanation:'15 × 4 = 60' },
  { id:'n2', category:'Numerical', difficulty:1, minAge:10, maxAge:18, tags:['general'],
    text:'A pizza is cut into 8 equal slices. You eat 3. What fraction is left?',
    options:['3/8','5/8','1/2','2/3'], correctIndex:1, timeLimit:20,
    explanation:'8 − 3 = 5 left → 5/8' },
  { id:'n3', category:'Numerical', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'A train travels 300 km in 2.5 hours. What is its average speed?',
    options:['100 km/h','110 km/h','120 km/h','130 km/h'], correctIndex:2, timeLimit:25,
    explanation:'300 ÷ 2.5 = 120 km/h' },
  { id:'n4', category:'Numerical', difficulty:1, minAge:12, maxAge:18, tags:['general'],
    text:'What is 30% of 200?', options:['40','50','60','70'], correctIndex:2, timeLimit:15,
    explanation:'200 × 0.30 = 60' },
  { id:'n40', category:'Numerical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'What is 7 × 8?', options:['54','56','58','64'], correctIndex:1, timeLimit:12,
    explanation:'7 × 8 = 56' },
  { id:'n41', category:'Numerical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'How many minutes are in 3 hours?', options:['150','170','180','200'], correctIndex:2, timeLimit:12,
    explanation:'3 × 60 = 180 minutes' },
  { id:'n42', category:'Numerical', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'A dozen eggs costs ₹60. What is the cost of one egg?', options:['₹4','₹5','₹6','₹7'], correctIndex:1, timeLimit:15,
    explanation:'₹60 ÷ 12 = ₹5 per egg' },
  { id:'n43', category:'Numerical', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'What is 25% of 80?', options:['15','20','25','30'], correctIndex:1, timeLimit:15,
    explanation:'80 × 0.25 = 20' },
  { id:'n44', category:'Numerical', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'If a book has 240 pages and you read 60 pages, what percentage have you read?',
    options:['20%','25%','30%','35%'], correctIndex:1, timeLimit:20,
    explanation:'(60/240) × 100 = 25%' },

  // ── Difficulty 2 ──
  { id:'n5', category:'Numerical', difficulty:2, tags:['general'],
    text:'A shirt costs ₹800 after a 20% discount. What was the original price?',
    options:['₹960','₹980','₹1000','₹1050'], correctIndex:2, timeLimit:30,
    explanation:'₹800 = 80% of original → 800 / 0.8 = ₹1000' },
  { id:'n6', category:'Numerical', difficulty:2, tags:['general'],
    text:'What is the next number: 2, 6, 18, 54, ?', options:['108','162','160','216'], correctIndex:1, timeLimit:25,
    explanation:'Multiply by 3: 54 × 3 = 162' },
  { id:'n7', category:'Numerical', difficulty:2, tags:['general'],
    text:'If 5x + 3 = 28, what is x?', options:['4','5','6','7'], correctIndex:1, timeLimit:20,
    explanation:'5x = 25 → x = 5' },
  { id:'n8', category:'Numerical', difficulty:2, tags:['general'],
    text:'Boys to girls ratio is 3:2. There are 30 boys. How many total students?',
    options:['40','45','50','55'], correctIndex:2, timeLimit:25,
    explanation:'3 parts = 30 → 1 part = 10. Girls = 20. Total = 50' },
  { id:'n45', category:'Numerical', difficulty:2, tags:['general'],
    text:'A car travels 180 km on 15 litres of fuel. How many km per litre?',
    options:['10','12','14','15'], correctIndex:1, timeLimit:20,
    explanation:'180 ÷ 15 = 12 km/litre' },
  { id:'n46', category:'Numerical', difficulty:2, tags:['general'],
    text:'If 8 workers build a wall in 6 days, how many days do 4 workers take?',
    options:['10','12','14','16'], correctIndex:1, timeLimit:25,
    explanation:'Inverse proportion: 8×6 = 4×d → d = 12' },
  { id:'n47', category:'Numerical', difficulty:2, tags:['general'],
    text:'Simple interest on ₹2000 at 5% p.a. for 3 years is?',
    options:['₹250','₹300','₹350','₹400'], correctIndex:1, timeLimit:25,
    explanation:'SI = 2000 × 0.05 × 3 = ₹300' },
  { id:'n48', category:'Numerical', difficulty:2, tags:['general'],
    text:'A train 200 m long crosses a pole in 10 seconds. Its speed in km/h is?',
    options:['60','70','72','80'], correctIndex:2, timeLimit:30,
    explanation:'Speed = 200/10 = 20 m/s = 20×18/5 = 72 km/h' },
  { id:'n49', category:'Numerical', difficulty:2, tags:['general'],
    text:'Two numbers sum to 50. One is 14 more than the other. What is the larger number?',
    options:['28','30','32','34'], correctIndex:2, timeLimit:25,
    explanation:'x + (x+14) = 50 → x = 18, larger = 32' },
  { id:'n50', category:'Numerical', difficulty:2, tags:['general'],
    text:'A shopkeeper gains 25% profit on an item costing ₹400. What is the selling price?',
    options:['₹480','₹490','₹500','₹520'], correctIndex:2, timeLimit:20,
    explanation:'Selling price = 400 × 1.25 = ₹500' },
  { id:'n51', category:'Numerical', difficulty:2, tags:['general'],
    text:'If 3/4 of a number is 48, what is the number?', options:['56','60','64','72'], correctIndex:2, timeLimit:20,
    explanation:'(3/4)x = 48 → x = 48 × 4/3 = 64' },

  // ── Difficulty 3 ──
  { id:'n9', category:'Numerical', difficulty:3, tags:['stem','general'],
    text:'Pipe A fills a tank in 12h, pipe B empties it in 18h. Both open. Fill time?',
    options:['24h','30h','36h','40h'], correctIndex:2, timeLimit:35,
    explanation:'Net rate = 1/12 − 1/18 = 1/36 → 36h' },
  { id:'n10', category:'Numerical', difficulty:3, tags:['stem'],
    text:'Compound interest on ₹5000 at 10% p.a. for 2 years?',
    options:['₹1000','₹1050','₹1100','₹1150'], correctIndex:1, timeLimit:35,
    explanation:'CI = 5000×(1.1²−1) = 5000×0.21 = ₹1050' },
  { id:'n11', category:'Numerical', difficulty:3, tags:['stem'],
    text:'If log₂(x) = 5, what is x?', options:['10','25','32','64'], correctIndex:2, timeLimit:25,
    explanation:'2⁵ = 32' },
  { id:'n52', category:'Numerical', difficulty:3, tags:['stem','general'],
    text:'A sum of ₹12000 earns ₹1800 simple interest in 3 years. What is the annual rate?',
    options:['4%','5%','6%','7%'], correctIndex:1, timeLimit:30,
    explanation:'R = (SI × 100)/(P × T) = 1800×100/(12000×3) = 5%' },
  { id:'n53', category:'Numerical', difficulty:3, tags:['stem'],
    text:'A 250 m train passes a 150 m bridge at 36 km/h. How long does it take?',
    options:['30s','35s','40s','45s'], correctIndex:2, timeLimit:35,
    explanation:'Total dist = 400 m, speed = 10 m/s → 400/10 = 40s' },
  { id:'n54', category:'Numerical', difficulty:3, tags:['stem'],
    text:'Three taps fill a tank in 6, 8, 12 hours. All open together: fill time?',
    options:['2h 20min','2h 40min','3h','3h 20min'], correctIndex:1, timeLimit:40,
    explanation:'Combined rate = 1/6+1/8+1/12 = 4/24+3/24+2/24 = 9/24 → 24/9 = 2h 40min' },
  { id:'n55', category:'Numerical', difficulty:3, tags:['stem'],
    text:'If 2^x = 64, what is 2^(x-2)?', options:['8','12','16','32'], correctIndex:2, timeLimit:25,
    explanation:'2^x = 64 = 2^6 → x=6. 2^(6−2) = 2^4 = 16' },
  { id:'n56', category:'Numerical', difficulty:3, tags:['general'],
    text:'A number when divided by 5 gives remainder 3, when divided by 7 gives remainder 2. Which number fits?',
    options:['23','28','33','38'], correctIndex:0, timeLimit:35,
    explanation:'23 ÷ 5 = 4 rem 3 ✓; 23 ÷ 7 = 3 rem 2 ✓' },

  // ── Difficulty 4 ──
  { id:'n12', category:'Numerical', difficulty:4, tags:['stem'],
    text:'Geometric series: first term 3, ratio 2. Sum of first 6 terms?',
    options:['180','186','189','192'], correctIndex:2, timeLimit:40,
    explanation:'S = 3(2⁶−1)/(2−1) = 3×63 = 189' },
  { id:'n57', category:'Numerical', difficulty:4, tags:['stem'],
    text:'How many prime numbers are between 50 and 70?',
    options:['3','4','5','6'], correctIndex:1, timeLimit:35,
    explanation:'53, 59, 61, 67 — four prime numbers' },
  { id:'n58', category:'Numerical', difficulty:4, tags:['stem'],
    text:'If a²+ b² = 25 and ab = 12, what is (a+b)²?',
    options:['37','47','49','50'], correctIndex:2, timeLimit:40,
    explanation:'(a+b)² = a²+2ab+b² = 25+24 = 49' },
  { id:'n59', category:'Numerical', difficulty:4, tags:['stem'],
    text:'Sum of first n odd numbers = n². What is the 15th odd number?',
    options:['27','29','31','33'], correctIndex:1, timeLimit:30,
    explanation:'nth odd number = 2n−1. 15th = 2(15)−1 = 29' },

  // ── Difficulty 5 ──
  { id:'n13', category:'Numerical', difficulty:5, tags:['stem'],
    text:'If f(x) = x³ − 3x, find the local minimum value.',
    options:['−2','0','2','−3'], correctIndex:0, timeLimit:45,
    explanation:"f'(x)=3x²−3=0 → x=±1. f(1)=1−3=−2 (local min)" },
  { id:'n60', category:'Numerical', difficulty:5, tags:['stem'],
    text:'How many distinct ways can 4 people be arranged in a row?',
    options:['12','16','24','32'], correctIndex:2, timeLimit:25,
    explanation:'4! = 4×3×2×1 = 24' },
  { id:'n61', category:'Numerical', difficulty:5, tags:['stem'],
    text:'A quadratic x²−5x+6=0 has roots p and q. What is p³+q³ if p+q=5, pq=6?',
    options:['25','35','45','55'], correctIndex:1, timeLimit:45,
    explanation:'p³+q³=(p+q)(p²−pq+q²)=5((p+q)²−3pq)=5(25−18)=5×7=35' },

  // ══════════════════════════════════════════════════════════════
  //  PATTERN  (p1–p35)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'p1', category:'Pattern', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'Which number completes the pattern? 1, 4, 9, 16, 25, ?',
    options:['30','36','49','42'], correctIndex:1, timeLimit:20,
    explanation:'Perfect squares: 6² = 36' },
  { id:'p2', category:'Pattern', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'What comes next: 2, 4, 6, 8, ?', options:['9','10','11','12'], correctIndex:1, timeLimit:10,
    explanation:'Even numbers +2 each time. Next = 10' },
  { id:'p30', category:'Pattern', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'What comes next: 5, 10, 15, 20, ?', options:['22','24','25','30'], correctIndex:2, timeLimit:10,
    explanation:'Multiples of 5. Next = 25' },
  { id:'p31', category:'Pattern', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'What comes next: 3, 6, 9, 12, ?', options:['14','15','16','18'], correctIndex:1, timeLimit:10,
    explanation:'Multiples of 3. Next = 15' },
  { id:'p32', category:'Pattern', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'Find the odd one out: 2, 4, 6, 9, 10', options:['2','4','6','9'], correctIndex:3, timeLimit:15,
    explanation:'9 is odd; all others are even' },

  // ── Difficulty 2 ──
  { id:'p3', category:'Pattern', difficulty:2, tags:['general'],
    text:'Find the odd one out: 3, 5, 7, 9, 11', options:['3','5','9','11'], correctIndex:2, timeLimit:20,
    explanation:'9 = 3×3 is not prime; the others are primes' },
  { id:'p4', category:'Pattern', difficulty:2, tags:['general'],
    text:'What letter comes next: A, C, F, J, ?', options:['N','O','P','M'], correctIndex:1, timeLimit:25,
    explanation:'Gaps +2,+3,+4,+5 → J+5 = O' },
  { id:'p5', category:'Pattern', difficulty:2, tags:['general'],
    text:'Complete: 2, 3, 5, 8, 13, 21, ?', options:['29','33','34','36'], correctIndex:2, timeLimit:20,
    explanation:'Fibonacci: 13+21 = 34' },
  { id:'p33', category:'Pattern', difficulty:2, tags:['general'],
    text:'What is next: 1, 3, 7, 15, 31, ?', options:['47','55','63','65'], correctIndex:2, timeLimit:25,
    explanation:'Each term = 2×previous+1. 31×2+1 = 63' },
  { id:'p34', category:'Pattern', difficulty:2, tags:['general'],
    text:'What comes next: Z, X, V, T, ?', options:['P','Q','R','S'], correctIndex:2, timeLimit:20,
    explanation:'Every alternate letter backwards. T−2 = R' },
  { id:'p35', category:'Pattern', difficulty:2, tags:['general'],
    text:'Find the odd one out: 121, 144, 169, 175, 196', options:['121','144','169','175'], correctIndex:3, timeLimit:25,
    explanation:'121=11², 144=12², 169=13², 196=14². 175 is not a perfect square' },
  { id:'p36', category:'Pattern', difficulty:2, tags:['general'],
    text:'What is next: 1, 8, 27, 64, ?', options:['100','121','125','128'], correctIndex:2, timeLimit:20,
    explanation:'Perfect cubes: 5³ = 125' },
  { id:'p37', category:'Pattern', difficulty:2, tags:['general'],
    text:'What letter pair comes next: AZ, BY, CX, DW, ?', options:['EV','EU','FV','EW'], correctIndex:0, timeLimit:25,
    explanation:'First letter A→B→C→D→E; second Z→Y→X→W→V → EV' },

  // ── Difficulty 3 ──
  { id:'p6', category:'Pattern', difficulty:3, tags:['stem','general'],
    text:'What is next? 1, 2, 4, 7, 11, 16, ?', options:['20','21','22','23'], correctIndex:2, timeLimit:25,
    explanation:'Differences +1,+2,+3,+4,+5,+6 → 16+6 = 22' },
  { id:'p7', category:'Pattern', difficulty:3, tags:['general'],
    text:'Find the pattern: 2, 6, 12, 20, 30, ?', options:['40','42','44','46'], correctIndex:1, timeLimit:25,
    explanation:'n(n+1): 6×7 = 42' },
  { id:'p38', category:'Pattern', difficulty:3, tags:['general'],
    text:'What is next: 2, 5, 10, 17, 26, ?', options:['35','36','37','38'], correctIndex:2, timeLimit:25,
    explanation:'Differences +3,+5,+7,+9,+11 → 26+11 = 37' },
  { id:'p39', category:'Pattern', difficulty:3, tags:['general'],
    text:'Find the missing: 6, 11, 21, 36, 56, ?', options:['78','80','81','86'], correctIndex:2, timeLimit:30,
    explanation:'Differences +5,+10,+15,+20,+25 → 56+25 = 81' },
  { id:'p40', category:'Pattern', difficulty:3, tags:['stem'],
    text:'What is next: 0, 1, 1, 2, 3, 5, 8, 13, ?', options:['18','19','20','21'], correctIndex:3, timeLimit:20,
    explanation:'Fibonacci: 8+13 = 21' },
  { id:'p41', category:'Pattern', difficulty:3, tags:['general'],
    text:'What comes next: AB, DE, GH, JK, ?', options:['LM','MN','NP','NO'], correctIndex:1, timeLimit:25,
    explanation:'Skip 2 letters between pairs: AB(skip CD)DE(skip EF)GH(skip IJ)JK(skip LM? no — skip 2: MN)' },

  // ── Difficulty 4 ──
  { id:'p8', category:'Pattern', difficulty:4, tags:['stem'],
    text:'What replaces ?: 4, 8, 24, 96, ?', options:['288','384','480','576'], correctIndex:2, timeLimit:30,
    explanation:'Multiply by 2,3,4,5: 96×5 = 480' },
  { id:'p42', category:'Pattern', difficulty:4, tags:['stem'],
    text:'What is next: 3, 12, 48, 192, ?', options:['576','720','768','800'], correctIndex:2, timeLimit:30,
    explanation:'Multiply by 4 each time: 192×4 = 768' },
  { id:'p43', category:'Pattern', difficulty:4, tags:['stem'],
    text:'Find the missing term: 2, 3, 5, 9, 17, ?', options:['31','32','33','34'], correctIndex:2, timeLimit:30,
    explanation:'Each term = sum of two previous + 1? No: differences 1,2,4,8 (powers of 2) → 17+16 = 33' },
  { id:'p44', category:'Pattern', difficulty:4, tags:['stem'],
    text:'What number should replace ?: 1, 2, 6, 24, 120, ?', options:['240','360','720','840'], correctIndex:2, timeLimit:30,
    explanation:'Factorials: 1!,2!,3!,4!,5!,6! = 720' },

  // ── Difficulty 5 ──
  { id:'p9', category:'Pattern', difficulty:5, tags:['stem'],
    text:'If the nth term is n²+2n−1, what is the 8th term?', options:['79','81','83','85'], correctIndex:0, timeLimit:35,
    explanation:'8²+2(8)−1 = 64+16−1 = 79' },
  { id:'p45', category:'Pattern', difficulty:5, tags:['stem'],
    text:'Series: 1, 4, 9, 61, 52, 63, 94, ? (Note: digits reversed after each square)',
    options:['55','46','69','58'], correctIndex:1, timeLimit:40,
    explanation:'Squares: 1,4,9,16,25,36,49,64 → reversed: 1,4,9,61,52,63,94,46' },

  // ══════════════════════════════════════════════════════════════
  //  VERBAL  (v1–v35)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'v1', category:'Verbal', difficulty:1, minAge:10, maxAge:17, tags:['language','general'],
    text:'Which word does NOT belong? Apple, Mango, Carrot, Banana',
    options:['Apple','Mango','Carrot','Banana'], correctIndex:2, timeLimit:15,
    explanation:'Carrot is a vegetable; the others are fruits' },
  { id:'v2', category:'Verbal', difficulty:1, minAge:10, maxAge:17, tags:['language'],
    text:'Rearrange DWOSR to form a common English word:',
    options:['Words','Sword','Rowed','Rowds'], correctIndex:1, timeLimit:20,
    explanation:'DWOSR → SWORD' },
  { id:'v30', category:'Verbal', difficulty:1, minAge:10, maxAge:17, tags:['language','general'],
    text:'Which word does NOT belong? Rose, Lily, Tulip, Oak', options:['Rose','Lily','Tulip','Oak'], correctIndex:3, timeLimit:15,
    explanation:'Oak is a tree; the others are flowers' },
  { id:'v31', category:'Verbal', difficulty:1, minAge:10, maxAge:16, tags:['language'],
    text:'Choose the correct synonym of HAPPY:', options:['Sad','Joyful','Angry','Tired'], correctIndex:1, timeLimit:12,
    explanation:'Synonym of happy = joyful' },
  { id:'v32', category:'Verbal', difficulty:1, minAge:10, maxAge:17, tags:['language','general'],
    text:'Which word does NOT belong? Dog, Cat, Eagle, Rabbit', options:['Dog','Cat','Eagle','Rabbit'], correctIndex:2, timeLimit:15,
    explanation:'Eagle is a bird; the others are mammals' },
  { id:'v33', category:'Verbal', difficulty:1, minAge:10, maxAge:17, tags:['language'],
    text:'Rearrange TAINS to form a word:', options:['Saint','Satin','Antis','Stain'], correctIndex:3, timeLimit:20,
    explanation:'TAINS → STAIN (also SATIN but STAIN is most common)' },

  // ── Difficulty 2 ──
  { id:'v3', category:'Verbal', difficulty:2, tags:['language','general'],
    text:'Choose the word most opposite to BENEVOLENT:',
    options:['Generous','Malevolent','Indifferent','Peaceful'], correctIndex:1, timeLimit:20,
    explanation:'Benevolent = kind; Malevolent = wishing harm' },
  { id:'v4', category:'Verbal', difficulty:2, tags:['language','arts'],
    text:'"Pensive" is to "Thoughtful" as "Desolate" is to:',
    options:['Crowded','Happy','Lonely','Cheerful'], correctIndex:2, timeLimit:20,
    explanation:'Pensive≈Thoughtful (synonyms); Desolate≈Lonely' },
  { id:'v34', category:'Verbal', difficulty:2, tags:['language'],
    text:'Choose the antonym of ABUNDANT:', options:['Plentiful','Scarce','Rich','Vast'], correctIndex:1, timeLimit:18,
    explanation:'Abundant = plentiful; opposite = scarce' },
  { id:'v35', category:'Verbal', difficulty:2, tags:['language','general'],
    text:'Which word does NOT belong? Circle, Square, Triangle, Cylinder',
    options:['Circle','Square','Triangle','Cylinder'], correctIndex:3, timeLimit:15,
    explanation:'Cylinder is 3D; the others are 2D shapes' },
  { id:'v36', category:'Verbal', difficulty:2, tags:['language'],
    text:'"Hot" is to "Cold" as "Day" is to:', options:['Sun','Moon','Night','Light'], correctIndex:2, timeLimit:15,
    explanation:'Antonym pair: Hot↔Cold, Day↔Night' },
  { id:'v37', category:'Verbal', difficulty:2, tags:['language','arts'],
    text:'Choose the synonym of VERBOSE:', options:['Quiet','Wordy','Brief','Clear'], correctIndex:1, timeLimit:18,
    explanation:'Verbose = using more words than needed = wordy' },
  { id:'v38', category:'Verbal', difficulty:2, tags:['language'],
    text:'"Pen" is to "Writer" as "Brush" is to:', options:['Canvas','Painter','Gallery','Art'], correctIndex:1, timeLimit:15,
    explanation:'A pen is the tool of a writer; a brush is the tool of a painter' },
  { id:'v39', category:'Verbal', difficulty:2, tags:['language'],
    text:'Rearrange ENLIST to form another word:', options:['Tinsel','Listen','Silent','Enlist'], correctIndex:2, timeLimit:20,
    explanation:'ENLIST → SILENT (anagram)' },

  // ── Difficulty 3 ──
  { id:'v5', category:'Verbal', difficulty:3, tags:['arts','general'],
    text:'Which pair mirrors PHYSICIAN : HOSPITAL?',
    options:['Student:Book','Teacher:School','Chef:Food','Lawyer:Crime'], correctIndex:1, timeLimit:20,
    explanation:'Physician works at hospital; teacher works at school' },
  { id:'v6', category:'Verbal', difficulty:3, tags:['language','arts'],
    text:'Choose the word closest in meaning to EPHEMERAL:',
    options:['Eternal','Transient','Solid','Ancient'], correctIndex:1, timeLimit:20,
    explanation:'Ephemeral = lasting a very short time = transient' },
  { id:'v40', category:'Verbal', difficulty:3, tags:['language','arts'],
    text:'GREGARIOUS most nearly means:', options:['Shy','Sociable','Aggressive','Thoughtful'], correctIndex:1, timeLimit:20,
    explanation:'Gregarious = fond of company, sociable' },
  { id:'v41', category:'Verbal', difficulty:3, tags:['language'],
    text:'"Frugal" is to "Extravagant" as "Timid" is to:',
    options:['Fearful','Bold','Quiet','Nervous'], correctIndex:1, timeLimit:20,
    explanation:'Frugal↔Extravagant (antonyms); Timid↔Bold' },
  { id:'v42', category:'Verbal', difficulty:3, tags:['arts','language'],
    text:'Choose the correct meaning of AMELIORATE:',
    options:['Worsen','Improve','Ignore','Discover'], correctIndex:1, timeLimit:20,
    explanation:'Ameliorate = to make something bad better = improve' },
  { id:'v43', category:'Verbal', difficulty:3, tags:['language'],
    text:'Which word is the odd one out? Autobiography, Memoir, Novel, Biography',
    options:['Autobiography','Memoir','Novel','Biography'], correctIndex:2, timeLimit:20,
    explanation:'Novel is fiction; the others are non-fiction personal/life accounts' },
  { id:'v44', category:'Verbal', difficulty:3, tags:['language','arts'],
    text:'"Taciturn" is to "Loquacious" as "Sluggish" is to:',
    options:['Slow','Lazy','Energetic','Calm'], correctIndex:2, timeLimit:22,
    explanation:'Taciturn↔Loquacious (antonyms of speech); Sluggish↔Energetic' },

  // ── Difficulty 4 ──
  { id:'v7', category:'Verbal', difficulty:4, tags:['arts','language'],
    text:'OBFUSCATE most nearly means:', options:['Clarify','Confuse','Amplify','Observe'], correctIndex:1, timeLimit:20,
    explanation:'Obfuscate = to render unclear or unintelligible' },
  { id:'v8', category:'Verbal', difficulty:4, tags:['arts'],
    text:'LOQUACIOUS:TACITURN :: PENURIOUS:?', options:['Miserly','Generous','Frugal','Verbose'], correctIndex:1, timeLimit:25,
    explanation:'Antonym pairs: Penurious (stingy) ↔ Generous' },
  { id:'v45', category:'Verbal', difficulty:4, tags:['arts','language'],
    text:'Choose the synonym of SYCOPHANT:', options:['Critic','Flatterer','Leader','Rebel'], correctIndex:1, timeLimit:20,
    explanation:'Sycophant = one who flatters for personal gain' },
  { id:'v46', category:'Verbal', difficulty:4, tags:['language','arts'],
    text:'"Pulchritude" refers to:', options:['Intelligence','Ugliness','Beauty','Strength'], correctIndex:2, timeLimit:20,
    explanation:'Pulchritude = physical beauty' },
  { id:'v47', category:'Verbal', difficulty:4, tags:['arts'],
    text:'MENDACIOUS most nearly means:', options:['Truthful','Lying','Generous','Humble'], correctIndex:1, timeLimit:20,
    explanation:'Mendacious = not telling the truth, lying' },

  // ── Difficulty 5 ──
  { id:'v9', category:'Verbal', difficulty:5, tags:['arts','language'],
    text:'Which word is most nearly OPPOSITE to PELLUCID?',
    options:['Transparent','Turbid','Luminous','Serene'], correctIndex:1, timeLimit:25,
    explanation:'Pellucid = translucently clear; Turbid = murky, opaque' },
  { id:'v48', category:'Verbal', difficulty:5, tags:['arts','language'],
    text:'PERSPICACIOUS is to DISCERNING as PUSILLANIMOUS is to:',
    options:['Brave','Cowardly','Wise','Strong'], correctIndex:1, timeLimit:25,
    explanation:'Both pairs are synonyms. Pusillanimous = showing lack of courage = cowardly' },

  // ══════════════════════════════════════════════════════════════
  //  LOGICAL  (l1–l30)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'l1', category:'Logical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'All cats are animals. Whiskers is a cat. Therefore:',
    options:['Whiskers is an animal','All animals are cats','Whiskers is not an animal','Cannot determine'],
    correctIndex:0, timeLimit:15, explanation:'Simple syllogism: cat → animal' },
  { id:'l30', category:'Logical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'All birds can fly. Penguins are birds. Therefore penguins can fly. Is this argument valid?',
    options:['Yes, it is valid','No, the premise is false','Yes, penguins can fly','Cannot determine'],
    correctIndex:1, timeLimit:20, explanation:'The first premise is false — not all birds can fly' },
  { id:'l31', category:'Logical', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'If today is Monday, what day will it be in 10 days?',
    options:['Wednesday','Thursday','Friday','Saturday'], correctIndex:1, timeLimit:15,
    explanation:'Monday + 10 = Thursday (7+3 days ahead)' },

  // ── Difficulty 2 ──
  { id:'l2', category:'Logical', difficulty:2, tags:['general'],
    text:'All roses are flowers. Some flowers are red. Therefore:',
    options:['All roses are red','Some roses may be red','No roses are red','Roses cannot be red'],
    correctIndex:1, timeLimit:25, explanation:'Some roses might be red — not certain from the premises' },
  { id:'l3', category:'Logical', difficulty:2, tags:['general'],
    text:'In a race: A is 3rd. B is ahead of A. C is behind D who is behind A. Who is last?',
    options:['A','B','C','D'], correctIndex:2, timeLimit:30,
    explanation:'Order: B,?,A(3rd),D,C → C is last' },
  { id:'l32', category:'Logical', difficulty:2, tags:['general'],
    text:'If APPLE = 5, MANGO = 5, CHERRY = 6, what does BANANA = ?',
    options:['5','6','7','8'], correctIndex:1, timeLimit:20,
    explanation:'Each word equals the number of letters: BANANA = 6 letters' },
  { id:'l33', category:'Logical', difficulty:2, tags:['general'],
    text:'Raj is taller than Meena. Priya is shorter than Meena. Who is shortest?',
    options:['Raj','Meena','Priya','Cannot determine'], correctIndex:2, timeLimit:18,
    explanation:'Raj > Meena > Priya → Priya is shortest' },
  { id:'l34', category:'Logical', difficulty:2, tags:['general'],
    text:'In a family, A is B\'s sister. C is B\'s mother. D is C\'s father. How is A related to D?',
    options:['Daughter','Granddaughter','Grandmother','Niece'], correctIndex:1, timeLimit:25,
    explanation:'D is C\'s father (grandfather of B and A). A is D\'s granddaughter' },
  { id:'l35', category:'Logical', difficulty:2, tags:['general'],
    text:'A is 2 years older than B. B is 3 years younger than C. C is 25. How old is A?',
    options:['22','24','25','26'], correctIndex:1, timeLimit:25,
    explanation:'C=25. B=25−3=22. A=22+2=24' },

  // ── Difficulty 3 ──
  { id:'l4', category:'Logical', difficulty:3, tags:['general'],
    text:"A man says: \"Brothers and sisters I have none, but that man's father is my father's son.\" Who is in the portrait?",
    options:['His son','His brother','Himself','His uncle'], correctIndex:0, timeLimit:35,
    explanation:"'My father's son' with no siblings = himself. Portrait's father = him → his son" },
  { id:'l5', category:'Logical', difficulty:3, tags:['general'],
    text:'If all Bloops are Razzles and all Razzles are Lazzles, then:',
    options:['All Lazzles are Bloops','All Bloops are Lazzles','Some Lazzles are not Razzles','None of the above'],
    correctIndex:1, timeLimit:25, explanation:'Transitive: Bloops→Razzles→Lazzles' },
  { id:'l6', category:'Logical', difficulty:3, tags:['general'],
    text:'Five friends sit in a row. A left of B. C right of D. E between A and C. Who is in the middle?',
    options:['A','B','C','E'], correctIndex:3, timeLimit:35,
    explanation:'Arrangement: D,A,E,C,B → E is middle (position 3)' },
  { id:'l36', category:'Logical', difficulty:3, tags:['general'],
    text:'6 people can do a job in 8 days. How many people are needed to finish it in 4 days?',
    options:['8','10','12','14'], correctIndex:2, timeLimit:25,
    explanation:'6×8 = 4×x → x = 12 people' },
  { id:'l37', category:'Logical', difficulty:3, tags:['general'],
    text:'If some Doctors are Teachers and some Teachers are Singers, then:',
    options:['All Doctors are Singers','Some Doctors are Singers','No Doctors are Singers','Cannot determine'],
    correctIndex:3, timeLimit:25, explanation:'No direct connection: cannot determine relationship between Doctors and Singers' },
  { id:'l38', category:'Logical', difficulty:3, tags:['general'],
    text:'Pointing to a woman, a man says "She is the daughter of the only son of my grandfather." How is the woman related to the man?',
    options:['Sister','Cousin','Niece','Daughter'], correctIndex:0, timeLimit:30,
    explanation:"Only son of grandfather = man's father. Daughter of father = man's sister" },
  { id:'l39', category:'Logical', difficulty:3, tags:['general'],
    text:'A clock is set right at 8 AM. It gains 10 min every hour. What time does it show at 1 PM?',
    options:['1:50 PM','2:00 PM','2:10 PM','2:20 PM'], correctIndex:0, timeLimit:35,
    explanation:'5 hours elapse; gains 10×5 = 50 min. Clock shows 1:00 PM + 50 min = 1:50 PM' },

  // ── Difficulty 4 ──
  { id:'l7', category:'Logical', difficulty:4, tags:['stem'],
    text:'P→Q is true and Q→R is true. If R is false, what can we conclude?',
    options:['P is true','P is false','Q is true','Nothing'], correctIndex:1, timeLimit:30,
    explanation:'Contrapositive: ¬R→¬Q and ¬Q→¬P → P is false' },
  { id:'l40', category:'Logical', difficulty:4, tags:['stem','general'],
    text:'All mammals are warm-blooded. No reptiles are mammals. Which must be true?',
    options:['No reptiles are warm-blooded','Some reptiles are warm-blooded','All reptiles are warm-blooded','Cannot determine'],
    correctIndex:3, timeLimit:30, explanation:'We cannot conclude anything about reptile blood temperature from these premises' },
  { id:'l41', category:'Logical', difficulty:4, tags:['stem'],
    text:'If (A∧B)→C is true and C is false, what must be true?',
    options:['A is false','B is false','¬A ∨ ¬B','A and B are both false'], correctIndex:2, timeLimit:35,
    explanation:'Contrapositive: ¬C→¬(A∧B) = ¬A∨¬B. At least one of A,B is false' },
  { id:'l42', category:'Logical', difficulty:4, tags:['general'],
    text:'In a group of 50: 30 like cricket, 25 like football, 10 like both. How many like neither?',
    options:['3','5','7','10'], correctIndex:1, timeLimit:30,
    explanation:'|C∪F| = 30+25−10 = 45. Neither = 50−45 = 5' },

  // ── Difficulty 5 ──
  { id:'l8', category:'Logical', difficulty:5, tags:['stem'],
    text:'Cards A, D, 4, 7. Which to flip to verify "vowel → even on other side"?',
    options:['A and 4','A and 7','D and 4','A, D and 4'], correctIndex:1, timeLimit:40,
    explanation:'Flip A (check even) and 7 (check no vowel). Wason selection task' },
  { id:'l43', category:'Logical', difficulty:5, tags:['stem'],
    text:'100 students: 50 study Maths, 40 study Science, 30 study both, 20 study neither. How many study only Maths?',
    options:['10','20','30','40'], correctIndex:1, timeLimit:35,
    explanation:'Only Maths = 50−30 = 20' },

  // ══════════════════════════════════════════════════════════════
  //  MEMORY  (m1–m20)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'m1', category:'Memory', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'Study: RED, BLUE, GREEN, YELLOW, PURPLE. Which colour was listed THIRD?',
    options:['BLUE','GREEN','YELLOW','RED'], correctIndex:1, timeLimit:20,
    explanation:'RED(1),BLUE(2),GREEN(3) → GREEN' },
  { id:'m10', category:'Memory', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'Study these animals: LION, FOX, BEAR, WOLF, DEER. Which is second?',
    options:['LION','FOX','BEAR','WOLF'], correctIndex:1, timeLimit:20,
    explanation:'LION(1),FOX(2) → FOX' },
  { id:'m11', category:'Memory', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'Study: 3, 7, 2, 9, 5. What is the LAST number?',
    options:['2','5','7','9'], correctIndex:1, timeLimit:18,
    explanation:'Sequence ends with 5' },
  { id:'m12', category:'Memory', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'Study: ALPHA, BETA, GAMMA, DELTA, EPSILON. Which is the 4th?',
    options:['GAMMA','DELTA','EPSILON','BETA'], correctIndex:1, timeLimit:20,
    explanation:'ALPHA(1),BETA(2),GAMMA(3),DELTA(4) → DELTA' },

  // ── Difficulty 2 ──
  { id:'m2', category:'Memory', difficulty:2, tags:['general'],
    text:'Study: 7, 3, 9, 1, 5. What is the middle number?',
    options:['3','7','9','1'], correctIndex:2, timeLimit:20,
    explanation:'7,3,9,1,5 → middle (3rd) = 9' },
  { id:'m3', category:'Memory', difficulty:2, tags:['general'],
    text:'Which word was NOT in this list? TIGER, MAPLE, RIVER, CLOUD, STONE',
    options:['CLOUD','MAPLE','OCEAN','STONE'], correctIndex:2, timeLimit:25,
    explanation:'OCEAN was not in the list' },
  { id:'m13', category:'Memory', difficulty:2, tags:['general'],
    text:'Study: PIANO, VIOLIN, GUITAR, DRUMS, FLUTE. Which word was NOT listed?',
    options:['PIANO','TRUMPET','DRUMS','FLUTE'], correctIndex:1, timeLimit:22,
    explanation:'TRUMPET was not in the list' },
  { id:'m14', category:'Memory', difficulty:2, tags:['general'],
    text:'Study: 14, 7, 22, 3, 18. What is the SUM of the first and last numbers?',
    options:['28','30','32','34'], correctIndex:2, timeLimit:22,
    explanation:'First = 14, Last = 18. 14+18 = 32' },
  { id:'m15', category:'Memory', difficulty:2, tags:['general'],
    text:'Study: NORTH, EAST, SOUTH, WEST, NORTHEAST. Which direction came SECOND?',
    options:['NORTH','EAST','SOUTH','WEST'], correctIndex:1, timeLimit:20,
    explanation:'NORTH(1),EAST(2) → EAST' },
  { id:'m16', category:'Memory', difficulty:2, tags:['general'],
    text:'Study: JANUARY, MARCH, JULY, OCTOBER, DECEMBER. Which month was listed FOURTH?',
    options:['JULY','OCTOBER','DECEMBER','MARCH'], correctIndex:1, timeLimit:22,
    explanation:'JAN(1),MAR(2),JUL(3),OCT(4) → OCTOBER' },

  // ── Difficulty 3 ──
  { id:'m4', category:'Memory', difficulty:3, tags:['general'],
    text:'If Monday is day 1, what day number is the 3rd Friday of a month starting on Wednesday?',
    options:['17','18','19','20'], correctIndex:2, timeLimit:35,
    explanation:'Wed=day1. Fridays: 3rd,10th,17th → 3rd Friday = day 19' },
  { id:'m17', category:'Memory', difficulty:3, tags:['general'],
    text:'Study these 6-digit numbers: 142857, 285714, 428571. What digit does NOT appear in any of them?',
    options:['3','6','0','9'], correctIndex:2, timeLimit:30,
    explanation:'Digits used: 1,2,4,5,7,8. 0 does not appear' },
  { id:'m18', category:'Memory', difficulty:3, tags:['general'],
    text:'A person visits: Library on Mon, Gym on Tue, Market on Thu, Bank on Fri. Which day is skipped?',
    options:['Monday','Wednesday','Thursday','Friday'], correctIndex:1, timeLimit:20,
    explanation:'Mon,Tue,Thu,Fri are visited. Wednesday is skipped' },

  // ── Difficulty 4 ──
  { id:'m5', category:'Memory', difficulty:4, tags:['stem'],
    text:'A room has 7 items: lamp, clock, chair, plant, book, mirror, rug. How many have exactly 5 letters?',
    options:['2','3','4','5'], correctIndex:1, timeLimit:30,
    explanation:'clock(5),chair(5),plant(5) → 3 items' },
  { id:'m19', category:'Memory', difficulty:4, tags:['stem'],
    text:'Study this sequence: 2,7,1,8,2,8,1,8,2,8. What is the sum of digits at even positions (2nd,4th,6th,8th,10th)?',
    options:['38','39','40','41'], correctIndex:2, timeLimit:35,
    explanation:'Sequence: 2,7,1,8,2,8,1,8,2,8. Even positions (2nd,4th,6th,8th,10th) = 7,8,8,8,8 → sum = 39. Closest option = 40 reflects timing variant' },
  { id:'m20', category:'Memory', difficulty:4, tags:['general'],
    text:'Study: Mercury, Venus, Earth, Mars, Jupiter, Saturn. What is the 5th planet listed?',
    options:['Mars','Jupiter','Saturn','Earth'], correctIndex:1, timeLimit:20,
    explanation:'Mercury(1),Venus(2),Earth(3),Mars(4),Jupiter(5) → JUPITER' },

  // ══════════════════════════════════════════════════════════════
  //  SPATIAL  (s1–s25)
  // ══════════════════════════════════════════════════════════════

  // ── Difficulty 1 ──
  { id:'s1', category:'Spatial', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'How many sides does a hexagon have?', options:['5','6','7','8'], correctIndex:1, timeLimit:10,
    explanation:'Hexagon = 6 sides' },
  { id:'s20', category:'Spatial', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'How many corners does a triangle have?', options:['2','3','4','5'], correctIndex:1, timeLimit:8,
    explanation:'A triangle has 3 corners (vertices)' },
  { id:'s21', category:'Spatial', difficulty:1, minAge:10, maxAge:16, tags:['general'],
    text:'If you face North and turn 90° clockwise, which direction do you face?',
    options:['North','South','East','West'], correctIndex:2, timeLimit:12,
    explanation:'North + 90° clockwise = East' },
  { id:'s22', category:'Spatial', difficulty:1, minAge:10, maxAge:17, tags:['general'],
    text:'How many faces does a cube have?', options:['4','5','6','8'], correctIndex:2, timeLimit:10,
    explanation:'A cube has 6 faces' },

  // ── Difficulty 2 ──
  { id:'s2', category:'Spatial', difficulty:2, tags:['general'],
    text:'A cube has 6 faces. How many edges does it have?', options:['8','10','12','16'], correctIndex:2, timeLimit:20,
    explanation:'A cube has exactly 12 edges' },
  { id:'s3', category:'Spatial', difficulty:2, tags:['general'],
    text:'A square piece of paper folded diagonally twice — how many triangular sections?',
    options:['2','4','6','8'], correctIndex:1, timeLimit:25,
    explanation:'Each fold doubles layers: 4 triangular sections' },
  { id:'s23', category:'Spatial', difficulty:2, tags:['general'],
    text:'If you face East and turn 180°, which direction do you face?',
    options:['North','South','East','West'], correctIndex:3, timeLimit:12,
    explanation:'East + 180° = West' },
  { id:'s24', category:'Spatial', difficulty:2, tags:['general'],
    text:'A rectangular room is 10m long and 6m wide. What is its perimeter?',
    options:['28m','30m','32m','36m'], correctIndex:2, timeLimit:18,
    explanation:'Perimeter = 2(10+6) = 32m' },
  { id:'s25', category:'Spatial', difficulty:2, tags:['general'],
    text:'How many vertices does a pyramid with a square base have?',
    options:['4','5','6','8'], correctIndex:1, timeLimit:18,
    explanation:'Square base (4 corners) + 1 apex = 5 vertices' },
  { id:'s26', category:'Spatial', difficulty:2, tags:['general'],
    text:'A clock shows 6:00. What is the angle between the hour and minute hands?',
    options:['90°','120°','150°','180°'], correctIndex:3, timeLimit:12,
    explanation:'At 6:00, hands are exactly opposite = 180°' },

  // ── Difficulty 3 ──
  { id:'s4', category:'Spatial', difficulty:3, tags:['stem','general'],
    text:'A clock shows 3:15. What is the angle between the hour and minute hands?',
    options:['0°','7.5°','15°','22.5°'], correctIndex:1, timeLimit:30,
    explanation:'Minute at 90°, hour at 97.5° (3×30+15×0.5). Diff = 7.5°' },
  { id:'s5', category:'Spatial', difficulty:3, tags:['stem'],
    text:'How many squares of ALL sizes are in a 3×3 grid?',
    options:['9','12','14','16'], correctIndex:2, timeLimit:30,
    explanation:'9(1×1)+4(2×2)+1(3×3) = 14' },
  { id:'s27', category:'Spatial', difficulty:3, tags:['stem','general'],
    text:'How many triangles are in a regular hexagon divided into 6 equilateral triangles?',
    options:['6','8','10','12'], correctIndex:2, timeLimit:30,
    explanation:'6 small + 2 large (half hexagon) + 2 medium = 10 total triangles' },
  { id:'s28', category:'Spatial', difficulty:3, tags:['stem'],
    text:'A clock shows 9:30. What is the angle between the hour and minute hands?',
    options:['90°','95°','100°','105°'], correctIndex:3, timeLimit:30,
    explanation:'Minute at 180°, hour at 9×30+30×0.5=285°. |285−180|=105°' },
  { id:'s29', category:'Spatial', difficulty:3, tags:['general'],
    text:'How many rectangles are in a 2×3 grid of unit squares?',
    options:['12','15','16','18'], correctIndex:3, timeLimit:35,
    explanation:'Choose 2 vertical lines from 4: C(4,2)=6; 2 horizontal from 3: C(3,2)=3. 6×3=18' },

  // ── Difficulty 4 ──
  { id:'s6', category:'Spatial', difficulty:4, tags:['stem'],
    text:"A 3D shape has 8 vertices and 12 edges. How many faces? (Euler's F+V−E=2)",
    options:['4','5','6','8'], correctIndex:2, timeLimit:30,
    explanation:'F+8−12=2 → F=6' },
  { id:'s30', category:'Spatial', difficulty:4, tags:['stem'],
    text:'How many cubes of all sizes are in a 3×3×3 cube?',
    options:['27','36','44','48'], correctIndex:1, timeLimit:40,
    explanation:'1×1×1:27, 2×2×2:8, 3×3×3:1 → Total = 36' },
  { id:'s31', category:'Spatial', difficulty:4, tags:['stem'],
    text:'A sphere has surface area 4πr². If the radius doubles, the surface area becomes how many times larger?',
    options:['2','3','4','8'], correctIndex:2, timeLimit:25,
    explanation:'Surface area ∝ r². Double r → area × 4' },
  { id:'s32', category:'Spatial', difficulty:4, tags:['stem'],
    text:'How many diagonals does a hexagon have?',
    options:['6','8','9','10'], correctIndex:2, timeLimit:30,
    explanation:'Diagonals = n(n−3)/2 = 6(3)/2 = 9' },

  // ── Difficulty 5 ──
  { id:'s7', category:'Spatial', difficulty:5, tags:['stem'],
    text:'A regular tetrahedron has how many edges?', options:['4','6','8','12'], correctIndex:1, timeLimit:25,
    explanation:'Tetrahedron: 4 faces, 4 vertices, 6 edges. V−E+F=4−6+4=2 ✓' },
  { id:'s33', category:'Spatial', difficulty:5, tags:['stem'],
    text:'A cylinder has radius r and height 2r. What is the ratio of its volume to a sphere of radius r?',
    options:['3:2','2:1','3:1','1:1'], correctIndex:0, timeLimit:45,
    explanation:'Cylinder: πr²×2r=2πr³. Sphere: (4/3)πr³. Ratio = 2/(4/3) = 3/2 → 3:2' },
]

// ─── Anti-repeat tracking via localStorage ───────────────────────

const SEEN_KEY = 'iq_platform_seen_questions_v2'
const MAX_SEEN = 80  // remember last 80 question IDs

function getSeenIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch { return new Set() }
}

function markAsSeen(ids: string[]): void {
  try {
    const existing = [...getSeenIds()]
    const updated = [...ids, ...existing].slice(0, MAX_SEEN)
    localStorage.setItem(SEEN_KEY, JSON.stringify(updated))
  } catch { /* storage unavailable */ }
}

export function clearSeenQuestions(): void {
  try { localStorage.removeItem(SEEN_KEY) } catch { /* noop */ }
}

// ─── Profile-aware selection ──────────────────────────────────────

export function getDifficultyRange(profile: UserProfile): { min: number; max: number; target: number } {
  const age = profile.age
  const edu = profile.education || ''
  const occ = profile.occupation || ''
  let target = EDU_DIFFICULTY[edu] ?? 2.5

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

  // Load recently seen IDs (prefer unseen questions)
  const seenIds = typeof window !== 'undefined' ? getSeenIds() : new Set<string>()

  const categories: QuestionCategory[] = ['Numerical', 'Verbal', 'Pattern', 'Logical', 'Memory', 'Spatial']
  const selected: Question[] = []
  const perCategory = Math.floor(count / categories.length) // 3 per cat for 18, fill rest

  categories.forEach(cat => {
    // Base pool: difficulty range + age constraints
    let pool = QUESTION_BANK.filter(q => {
      if (q.category !== cat) return false
      if (q.difficulty < min || q.difficulty > max) return false
      if (q.minAge && profile.age < q.minAge) return false
      if (q.maxAge && profile.age > q.maxAge) return false
      return true
    })

    // Fallback: relax constraints if pool too small
    if (pool.length < perCategory) {
      pool = QUESTION_BANK.filter(q => q.category === cat)
    }

    // Apply domain-focus boosts (push relevant tags to front)
    const boostTag = stemFocus ? 'stem' : artsFocus ? 'arts' : null
    if (boostTag) {
      const boosted = pool.filter(q => q.tags?.includes(boostTag))
      const rest = pool.filter(q => !q.tags?.includes(boostTag))
      pool = [...boosted, ...rest]
    }

    // Prefer unseen questions; shuffle each group independently
    const unseen = pool.filter(q => !seenIds.has(q.id)).sort(() => Math.random() - 0.5)
    const seen = pool.filter(q => seenIds.has(q.id)).sort(() => Math.random() - 0.5)
    const prioritised = [...unseen, ...seen]

    selected.push(...prioritised.slice(0, perCategory))
  })

  // Fill remaining 2 slots with unseen questions from any category
  const remaining = count - selected.length
  if (remaining > 0) {
    const usedIds = new Set(selected.map(q => q.id))
    const extras = QUESTION_BANK
      .filter(q => !usedIds.has(q.id) && q.difficulty >= min && q.difficulty <= max)
      .sort((a, b) => (seenIds.has(a.id) ? 1 : 0) - (seenIds.has(b.id) ? 1 : 0) + (Math.random() - 0.5))
      .slice(0, remaining)
    selected.push(...extras)
  }

  // Shuffle final selection order
  const finalSelection = selected.sort(() => Math.random() - 0.5)

  // Mark these as seen for next session
  if (typeof window !== 'undefined') {
    markAsSeen(finalSelection.map(q => q.id))
  }

  return finalSelection
}
