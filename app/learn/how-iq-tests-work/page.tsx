import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'How IQ Tests Work — IQ Platform',
  description: 'Understand how IQ tests are built, how adaptive questions work, and why scores are interpreted with context.',
}

export default function HowIQTestsWorkPage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="How IQ Tests Work"
      intro="IQ tests are structured to estimate cognitive ability through a series of timed tasks, but the way those tasks are selected and scored can strongly affect the result."
      sections={[
        {
          title: 'Adaptive testing',
          body: 'Many modern assessments use adaptive logic, which means the difficulty of later questions changes based on earlier responses. This approach helps keep the test challenging without overwhelming the person taking it.',
        },
        {
          title: 'What happens during the test',
          body: 'A typical session includes several question types that focus on pattern recognition, verbal reasoning, numeric problem solving, and short-term memory. Accuracy and speed both matter, but the balance between them is interpreted carefully.',
        },
        {
          title: 'Why scoring is more complex than a simple percentage',
          body: 'Raw scores are usually converted into a standardized score using comparison data from similar age groups. In practice, the final estimate is influenced by response quality, item difficulty, and consistency.',
        },
        {
          title: 'Why context matters',
          body: 'An IQ estimate is more meaningful when it is interpreted alongside the person’s age, educational background, and the purpose of the assessment. A single test session should never be treated as a full explanation of a person’s abilities.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/iq-score-interpretation-guide', label: 'IQ Score Interpretation Guide', description: 'Learn how to read score ranges and percentiles safely.' },
        { href: '/learn/what-is-iq', label: 'What Is IQ?', description: 'Start with the core definition and common misconceptions.' },
      ]}
      cta={{ label: 'Try the interactive test', href: '/' }}
    />
  )
}
