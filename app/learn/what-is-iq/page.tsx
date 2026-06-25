import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'What Is IQ? — IQ Platform',
  description: 'Learn what IQ means, what it measures, and why IQ scores are often misunderstood.',
}

export default function WhatIsIQPage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="What Is IQ?"
      intro="IQ is a shorthand for intelligence quotient, but in practice it refers to a score that summarizes a person’s performance on tasks that tap reasoning, pattern recognition, verbal ability, and other cognitive skills."
      sections={[
        {
          title: 'A practical definition',
          body: 'IQ is often treated as a single number, yet it is really an estimate derived from performance on a range of mental tasks. The score is most useful when it is viewed as one part of a broader picture of cognitive strengths, learning style, and problem-solving ability.',
        },
        {
          title: 'Why IQ is often misunderstood',
          body: 'Many people assume IQ reflects all forms of intelligence, but that is not accurate. It typically emphasizes reasoning and processing speed under structured conditions, not creativity, emotional awareness, practical wisdom, or real-world competence.',
        },
        {
          title: 'What IQ tests usually measure',
          body: 'Modern assessments often include items that test verbal reasoning, numerical reasoning, pattern recognition, and spatial thinking. These tasks are designed to compare a person’s performance with others of a similar age group.',
        },
        {
          title: 'What IQ does not capture',
          body: 'A score can indicate how someone performs in certain cognitive tasks, but it does not define their potential, motivation, or value. Education, life experience, health, and opportunity all shape how abilities are expressed.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/how-iq-tests-work', label: 'How IQ Tests Work', description: 'Understand the mechanics behind adaptive testing and scoring.' },
        { href: '/learn/types-of-intelligence', label: 'Types of Intelligence', description: 'Explore the different abilities that fall under the intelligence umbrella.' },
      ]}
      cta={{ label: 'Take the free IQ test', href: '/' }}
    />
  )
}
