import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://iq-platform-plum.vercel.app', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://iq-platform-plum.vercel.app/what-is-iq', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/how-iq-tests-work', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/types-of-intelligence', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/iq-score-guide', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/fluid-vs-crystallized', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/cognitive-psychology', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://iq-platform-plum.vercel.app/about', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://iq-platform-plum.vercel.app/contact', changeFrequency: 'yearly', priority: 0.4 },
  ]
}