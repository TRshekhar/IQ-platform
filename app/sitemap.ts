import { MetadataRoute } from 'next'

const BASE = 'https://iq-platform-plum.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/learn`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/learn/what-is-iq`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/learn/how-iq-tests-work`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/learn/types-of-intelligence`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/learn/iq-score-interpretation-guide`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/learn/fluid-vs-crystallized-intelligence`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/learn/cognitive-psychology-articles`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/history`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE}/privacy-policy`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/disclaimer`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
