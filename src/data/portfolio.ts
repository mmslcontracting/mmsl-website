export interface PortfolioCategory {
  id: string
  label: string
  description: string
}

export interface PortfolioItem {
  src: string
  poster?: string
  category: string
  label: string
  title: string
  alt: string
  type: 'image' | 'video'
}

export const categories: PortfolioCategory[] = [
  {
    id: 'interior',
    label: 'Interior',
    description: 'Warm living spaces with natural materials, soft lighting, and textile details.',
  },
  {
    id: 'exterior',
    label: 'Exterior',
    description:
      'Facades and patios with contemporary lines, landscaping, and sculptural finishes.',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    description: 'Spa-like bathrooms with marble, brushed metal, and soft light details.',
  },
]

const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id

const makeTitle = (categoryId: string, index: number, isVideo: boolean) => {
  const label = categoryLabel(categoryId)
  const kind = isVideo ? 'Walkthrough' : 'Remodel'
  return `${label} ${kind} ${index + 1}`
}

function buildItems(): PortfolioItem[] {
  const sources: { category: string; src: string; poster?: string }[] = [
    { category: 'interior', src: '/images/portfolio/interior/1.jpeg' },
    { category: 'interior', src: '/images/portfolio/interior/2.jpeg' },
    { category: 'exterior', src: '/images/portfolio/exterior/1.jpeg' },
    {
      category: 'exterior',
      src: '/images/portfolio/exterior/2b435148-b141-4bdd-baa4-43cea22e3751.jpeg',
    },
    { category: 'exterior', src: '/images/portfolio/exterior/2.jpeg' },
    { category: 'exterior', src: '/images/portfolio/exterior/3.jpeg' },
    { category: 'exterior', src: '/images/portfolio/exterior/4.jpeg' },
    { category: 'exterior', src: '/images/portfolio/exterior/5.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/1.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/1-1.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/2.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/2-1.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/2-2.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/3.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/4.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/5.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/6.jpeg' },
    {
      category: 'bathroom',
      src: '/images/portfolio/videos/1.mp4',
      poster: '/images/portfolio/bathroom/6.jpeg',
    },
    {
      category: 'bathroom',
      src: '/images/portfolio/videos/4.mp4',
      poster: '/images/portfolio/bathroom/7.jpeg',
    },
    { category: 'bathroom', src: '/images/portfolio/bathroom/7.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/8.jpeg' },
    {
      category: 'bathroom',
      src: '/images/portfolio/videos/2.mp4',
      poster: '/images/portfolio/bathroom/8.jpeg',
    },
    {
      category: 'bathroom',
      src: '/images/portfolio/videos/3.mp4',
      poster: '/images/portfolio/bathroom/9.jpeg',
    },
    { category: 'bathroom', src: '/images/portfolio/bathroom/9.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/10.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/11.jpeg' },
    { category: 'bathroom', src: '/images/portfolio/bathroom/12.jpeg' },
  ]

  const counters: Record<string, number> = {}

  return sources.map(({ category, src, poster }) => {
    const isVideo = src.toLowerCase().endsWith('.mp4')
    const n = counters[category] ?? 0
    counters[category] = n + 1
    const label = categoryLabel(category)
    const title = makeTitle(category, n, isVideo)

    return {
      src,
      poster,
      category,
      label,
      title,
      alt: `${title} by MMSL Contracting Corp in NYC / NJ`,
      type: isVideo ? 'video' : 'image',
    }
  })
}

export const galleryItems: PortfolioItem[] = buildItems()

export const filters = [
  { id: 'all', label: 'All Projects' },
  ...categories.map((category) => ({ id: category.id, label: category.label })),
]

export const isVideoSource = (src: string) => src.toLowerCase().endsWith('.mp4')
