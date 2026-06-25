import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'Cognitive Psychology Articles — IQ Platform',
  description: 'Explore beginner-friendly articles on memory, attention, reasoning, and human cognition.',
}

export default function CognitivePsychologyArticlesPage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="Cognitive Psychology Articles"
      intro="Cognitive psychology studies how people perceive, remember, understand, and solve problems. These topics help connect IQ testing with the broader science of human thinking."
      sections={[
        {
          title: 'Attention and focus',
          body: 'Attention plays a major role in how well people perform on timed tasks. The ability to sustain focus, filter distractions, and switch between ideas can affect test performance and daily productivity.',
        },
        {
          title: 'Working memory',
          body: 'Working memory is the mental workspace used to hold and manipulate information for short periods. It is closely linked to reasoning, learning, and problem solving.',
        },
        {
          title: 'Reasoning and decision making',
          body: 'Reasoning involves drawing conclusions from evidence and applying logic to new situations. Good reasoning depends on both knowledge and flexible thinking.',
        },
        {
          title: 'Learning and knowledge formation',
          body: 'Cognitive psychology also examines how people acquire and organize knowledge over time. This is why intelligence is often best understood as a mix of innate ability, experience, and environment.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/types-of-intelligence', label: 'Types of Intelligence', description: 'See how different cognitive abilities are often classified.' },
        { href: '/learn/fluid-vs-crystallized-intelligence', label: 'Fluid vs Crystallized Intelligence', description: 'Compare two important concepts in cognitive theory.' },
      ]}
      cta={{ label: 'Return to the test', href: '/' }}
    />
  )
}
