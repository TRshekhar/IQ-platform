import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'

export const metadata: Metadata = {
  title: 'Cognitive Psychology — Memory, Attention, Learning & Intelligence | IQ Platform',
  description: 'A complete guide to cognitive psychology: how memory works, the role of attention, cognitive load theory, neuroplasticity, executive function, and how these connect to IQ testing.',
}

export default function CognitivePsychologyArticlesPage() {
  return (
    <ContentPage
      eyebrow="Cognitive science"
      title="Cognitive Psychology"
      intro="Cognitive psychology is the scientific study of mental processes — how people perceive, think, remember, learn, and reason. Understanding these processes explains why IQ tests are structured the way they are, what scores mean in practice, and how cognitive ability changes across the lifespan."
      sections={[
        {
          title: 'What is cognitive psychology?',
          body: 'Cognitive psychology emerged in the late 1950s as a reaction against behaviourism, which focused exclusively on observable behaviour. Researchers like George Miller, Noam Chomsky, and Ulric Neisser argued that mental processes could be studied scientifically. Today, cognitive psychology sits at the intersection of neuroscience, linguistics, computer science, and philosophy. Its findings directly inform how IQ tests are designed, scored, and interpreted.',
        },
        {
          title: 'How memory works: three systems',
          body: 'Memory is not a single system. Cognitive psychologists identify three distinct types. Sensory memory retains raw sensory input for less than a second — enough to give continuity to experience. Working memory (short-term memory) holds roughly four to seven chunks of information for 15 to 30 seconds and is the active workspace for reasoning, comprehension, and problem solving. Long-term memory stores information potentially for a lifetime with essentially unlimited capacity, covering both explicit knowledge (facts and events) and implicit knowledge (skills and habits). Working memory capacity is one of the strongest predictors of IQ test performance.',
        },
        {
          title: 'Attention and cognitive load',
          body: 'Attention is a limited resource — the brain cannot fully process all incoming information simultaneously. Cognitive Load Theory, developed by John Sweller in the 1980s, divides the mental demands of any task into three types: intrinsic load (the inherent complexity of the material), extraneous load (unnecessary effort caused by poor presentation or confusing wording), and germane load (the productive effort that creates new learning). When total cognitive load exceeds working memory capacity, performance breaks down. This is why IQ Platform calibrates question difficulty to your age and education level — presenting questions far above your level increases extraneous load without measuring genuine cognitive ability.',
        },
        {
          title: 'Executive function: the brain\'s control system',
          body: 'Executive function refers to the higher-order cognitive processes that regulate other mental activities. Located primarily in the prefrontal cortex, executive functions include inhibition (suppressing automatic responses when inappropriate), working memory updating (monitoring and refreshing information in mind), and cognitive shifting (switching flexibly between tasks or mental strategies). These three components explain a large proportion of the variance in fluid intelligence and academic achievement. Importantly, the prefrontal cortex does not fully mature until the mid-twenties, which is why IQ tests use age-specific normative samples.',
        },
        {
          title: 'Learning and neuroplasticity',
          body: 'One of the most significant discoveries of 20th-century neuroscience is that the adult brain retains the ability to change its structure and function in response to experience — a property called neuroplasticity. Learning occurs through changes in the strength of synaptic connections between neurons. Hebb\'s principle states that neurons that fire together, wire together. Spaced repetition, which involves distributing practice over time, is the most evidence-backed strategy for long-term retention. Retrieval practice — testing yourself rather than re-reading — consistently outperforms passive study, a finding known as the testing effect. Taking repeated IQ assessments with fresh questions is therefore a genuine cognitive exercise, not merely a measurement tool.',
        },
        {
          title: 'Sleep and cognitive performance',
          body: 'Sleep is perhaps the most powerful and most underestimated cognitive performance variable. During sleep, the brain performs memory consolidation — the hippocampus replays daytime experiences and transfers them to the neocortex for long-term storage. The brain\'s glymphatic clearance system, ten times more active during sleep, flushes out metabolic waste including amyloid beta. Even a single night of restricted sleep can reduce fluid intelligence scores by five to ten points on standardised assessments. Chronic mild sleep deprivation affects millions of students and professionals who are unaware of the cognitive toll. Always take cognitive assessments after a full night of sleep for the most accurate reflection of your ability.',
        },
        {
          title: 'Cognitive biases that affect test performance',
          body: 'Cognitive psychology has catalogued systematic errors in human reasoning that can influence test results. Anchoring bias leads people to over-rely on the first answer option they read. The Dunning-Kruger effect causes those with limited knowledge to overestimate their accuracy while experts tend to be more uncertain. Confirmation bias leads people to accept conclusions that align with existing beliefs, making it harder to evaluate logical arguments objectively. The availability heuristic causes systematic errors in probability estimation. Being aware of these biases helps explain why timed, structured IQ assessments are designed to minimise the opportunity for such errors.',
        },
        {
          title: 'How cognitive psychology connects to IQ',
          body: 'IQ tests are a practical application of cognitive psychology. The domains they assess — verbal comprehension, perceptual reasoning, working memory, and processing speed — map directly onto the processes that psychologists study in the laboratory. Research shows that working memory capacity correlates with IQ at approximately r = 0.50 to 0.60, processing speed at r = 0.40 to 0.50, and executive function updating at r = 0.45 to 0.55. These are among the strongest predictors of measured IQ. Understanding cognitive psychology therefore gives you the scientific framework for interpreting your own assessment results — not as a fixed label, but as a profile of specific, trainable cognitive capacities.',
        },
        {
          title: 'Practical implications for improving cognition',
          body: 'Cognitive psychology research points to several evidence-based strategies for improving measured performance. Regular aerobic exercise increases brain-derived neurotrophic factor and consistently improves working memory and executive function, with effects measurable after just eight weeks of moderate activity. Mindfulness meditation improves attentional control after as few as eight weeks of daily practice, which directly supports performance on working memory and processing speed tasks. Wide reading builds vocabulary and factual knowledge — the foundations of crystallised intelligence. Deliberate practice in a specific cognitive domain, such as numerical reasoning or spatial problem-solving, reliably improves performance in that domain and, to a lesser degree, in related domains.',
        },
      ]}
      relatedLinks={[
        { href: '/learn/types-of-intelligence', label: 'Types of Intelligence', description: 'Explore Gardner\'s multiple intelligences and Sternberg\'s triarchic theory.' },
        { href: '/learn/fluid-vs-crystallized-intelligence', label: 'Fluid vs Crystallized Intelligence', description: 'Understand how raw reasoning and accumulated knowledge differ and change with age.' },
        { href: '/learn/how-iq-tests-work', label: 'How IQ Tests Work', description: 'See how cognitive psychology principles are applied in test design and scoring.' },
        { href: '/learn/iq-score-interpretation-guide', label: 'IQ Score Interpretation Guide', description: 'Understand what every score range means in practical, everyday terms.' },
      ]}
      cta={{ label: 'Take the free IQ test', href: '/' }}
    />
  )
}
