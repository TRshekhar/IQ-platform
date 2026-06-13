# IQ Platform — ML-Powered Cognitive Assessment

A full-stack Next.js 14 platform for IQ assessment using machine learning for decision-making and local session history.

## Features

- **ML Scoring Engine** — Weighted multi-factor linear regression across 7 features: accuracy, speed, consistency, difficulty-weighted performance, domain balance, adaptive score, and demographic norms
- **6 Cognitive Domains** — Numerical, Verbal, Pattern, Logical, Memory, Spatial
- **35+ Questions** — Stratified by difficulty (1–5) and domain, randomly sampled per session
- **Real-time Timer** — Circular SVG countdown per question, urgency alerts
- **Instant Feedback** — Correct/wrong highlighting + explanation after each answer
- **ML Feature Transparency** — Full breakdown of regression inputs shown in results
- **Session History** — All sessions stored in `localStorage` (no login, no server)
- **IQ Trend Chart** — Line graph of score progression across sessions
- **Domain Radar** — Recharts radar chart of cognitive domain performance
- **Responsive Design** — Mobile-first dark UI built with Tailwind CSS

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS |
| ML/Math | Custom weighted regression + normal distribution CDF |
| Charts | Recharts |
| Storage | Browser `localStorage` (no backend needed) |
| Animation | Framer Motion + CSS animations |

## ML Scoring Algorithm

The IQ estimate uses a weighted linear regression model:

```
rawScore = 0.42 × accuracy
         + 0.12 × speedScore
         + 0.10 × consistencyScore
         + 0.22 × difficultyWeightedScore
         + 0.08 × domainBalance
         + 0.06 × adaptiveScore

zScore = (rawScore - 0.5) × 4.2 × educationNorm × ageNorm
IQ = 100 + zScore × 15   (clamped to 70–145)
```

Features:
- **Accuracy** — proportion of correct answers
- **Speed** — average time per correct answer (faster = higher score)
- **Consistency** — low variance across categories (penalises guessing)
- **Difficulty-weighted** — correct answers on harder questions count more
- **Domain balance** — uniformly correct > spikey performance
- **Adaptive** — penalises timed-out questions
- **Education norm** — calibrates expected baseline (0.88 for high school → 1.07 for doctorate)
- **Age norm** — peak performance window (16–35) scores 1.0

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

## Project Structure

```
iq-platform/
├── app/
│   ├── page.tsx              # Home (test)
│   ├── history/page.tsx      # History page
│   ├── layout.tsx            # Root layout + metadata
│   └── globals.css           # Global styles + CSS design tokens
├── components/
│   ├── TestApp.tsx           # Phase router
│   ├── Navbar.tsx            # Navigation
│   ├── IntroScreen.tsx       # Landing / IQ scale reference
│   ├── InfoScreen.tsx        # User profile form
│   ├── TestScreen.tsx        # Question display + timer + feedback
│   ├── ResultsScreen.tsx     # ML score, radar chart, category bars
│   └── HistoryPage.tsx       # Session list, trend chart, domain averages
├── lib/
│   ├── mlScoring.ts          # ML engine (regression + normalization)
│   ├── questions.ts          # Question bank (35+ questions, 6 domains)
│   ├── history.ts            # localStorage CRUD + stats aggregation
│   └── testContext.tsx       # React Context for global test state
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Extending the Platform

### Add more questions
Edit `lib/questions.ts` and add to the `QUESTION_BANK` array following the `Question` interface. Set `difficulty` (1–5), `category`, and `timeLimit` appropriately.

### Tune the ML model
Edit `WEIGHTS` in `lib/mlScoring.ts` to adjust feature importance. The weights must ideally sum to ~1.0 for consistent scaling.

### Add new domains
1. Add the category to `QuestionCategory` union type in `lib/questions.ts`
2. Add questions with the new category
3. Add a color to `CAT_COLORS` in components

## Privacy

All data is stored exclusively in the browser's `localStorage` under the key `iq_platform_history`. Nothing is transmitted to any server. Clearing browser data or using private/incognito mode will erase the history.
