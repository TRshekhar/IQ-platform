import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'Types of Intelligence — IQ Platform',
  description: 'Explore common types of intelligence, including verbal, logical, spatial, and memory-related abilities.',
}

export default function TypesOfIntelligencePage() {
  return (
    <ContentPage
      eyebrow="Educational guide"
      title="Types of Intelligence"
      intro="Human cognition is complex, and intelligence is not limited to a single skill. Different models describe various abilities, including verbal comprehension, numerical reasoning, spatial perception, and working memory."
      sections={[
        {
          title: 'Verbal intelligence',
          body: 'This involves language comprehension, vocabulary, reading, and the ability to reason with words. It often affects communication, writing, and learning from spoken or written material.',
        },
        {
          title: 'Logical and mathematical intelligence',
          body: 'This is the capacity to reason with patterns, numbers, and abstract relationships. It often appears in problem solving, sequencing, and quantitative analysis.',
        },
        {
          title: 'Spatial intelligence',
          body: 'Spatial ability relates to visualizing shapes, understanding geometry, and mentally manipulating objects. It is valuable in design, architecture, navigation, and many technical tasks.',
        },
        {
          title: 'Memory and processing speed',
          body: 'Some cognitive models also emphasize working memory, attention control, and how quickly a person can process information. These factors contribute to performance in many everyday and academic situations.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/fluid-vs-crystallized-intelligence', label: 'Fluid vs Crystallized Intelligence', description: 'Compare two influential concepts in cognitive psychology.' },
        { href: '/learn/cognitive-psychology-articles', label: 'Cognitive Psychology Articles', description: 'Read more about attention, memory, and reasoning.' },
      ]}
      cta={{ label: 'Explore the IQ test', href: '/' }}
    />
  )
}
