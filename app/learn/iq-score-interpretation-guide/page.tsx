import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'IQ Score Interpretation Guide — IQ Platform',
  description: 'Learn how IQ scores are interpreted, including percentile ranges, average scores, and caveats around overinterpreting a result.',
}

export default function IQScoreInterpretationGuidePage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="IQ Score Interpretation Guide"
      intro="IQ scores are usually standardized so that the average performance of a reference group is assigned to a defined score range. Understanding what those ranges mean helps prevent overinterpreting a single number."
      sections={[
        {
          title: 'Average range',
          body: 'Most IQ scales place the average score near 100. Scores within a moderate band around that value are common and should be seen as typical rather than exceptional.',
        },
        {
          title: 'Above-average and high scores',
          body: 'Scores that are notably above average may suggest strong performance in reasoning and problem-solving tasks, though they do not guarantee success in all domains or contexts.',
        },
        {
          title: 'Below-average scores',
          body: 'Lower scores can reflect difficulties with specific cognitive tasks or may simply be the result of test conditions, fatigue, or unfamiliar question formats. Interpretation should be cautious and contextual.',
        },
        {
          title: 'Percentiles and context',
          body: 'Percentile ranks are often easier to understand than raw scores because they show how a result compares with others in the same age group. Even then, a percentile is only one piece of information and should not be treated as a complete profile.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/what-is-iq', label: 'What Is IQ?', description: 'Review the basic concept behind IQ scores.' },
        { href: '/learn/how-iq-tests-work', label: 'How IQ Tests Work', description: 'See how the score is derived from the test mechanics.' },
      ]}
      cta={{ label: 'See your result estimate', href: '/' }}
    />
  )
}
