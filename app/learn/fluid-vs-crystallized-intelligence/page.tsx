import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'Fluid vs Crystallized Intelligence — IQ Platform',
  description: 'Understand the difference between fluid intelligence and crystallized intelligence in cognitive psychology.',
}

export default function FluidVsCrystallizedIntelligencePage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="Fluid vs Crystallized Intelligence"
      intro="Cognitive psychology often distinguishes between fluid intelligence, which is about reasoning and adapting to novel problems, and crystallized intelligence, which reflects accumulated knowledge and experience."
      sections={[
        {
          title: 'Fluid intelligence',
          body: 'Fluid intelligence is the ability to solve unfamiliar problems, identify patterns, and think flexibly without relying on prior learning. It is often associated with mental speed and abstract reasoning.',
        },
        {
          title: 'Crystallized intelligence',
          body: 'Crystallized intelligence grows through education, culture, and experience. It includes vocabulary, factual knowledge, and the ability to use learned information effectively.',
        },
        {
          title: 'How they differ',
          body: 'Fluid intelligence is often more visible in novel situations, while crystallized intelligence tends to be stronger in familiar tasks. Both matter, and they often support one another in everyday life.',
        },
        {
          title: 'Why the distinction matters',
          body: 'This distinction helps explain why some people excel in new problem-solving situations while others show greater strength in verbal knowledge and life experience. It also reminds us that intelligence is broader than a single score.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/types-of-intelligence', label: 'Types of Intelligence', description: 'Explore several cognitive abilities that are commonly discussed in intelligence research.' },
        { href: '/learn/cognitive-psychology-articles', label: 'Cognitive Psychology Articles', description: 'Read more on memory, attention, and reasoning.' },
      ]}
      cta={{ label: 'Take the adaptive IQ test', href: '/' }}
    />
  )
}
