import type { ImageMetadata } from 'astro'
import bathroom1 from '@/assets/images/portfolio/bathroom/1.jpeg'
import bathroom1Alt from '@/assets/images/portfolio/bathroom/1-1.jpeg'
import bathroom2 from '@/assets/images/portfolio/bathroom/2.jpeg'
import bathroom2Alt from '@/assets/images/portfolio/bathroom/2-1.jpeg'
import bathroom2Detail from '@/assets/images/portfolio/bathroom/2-2.jpeg'
import bathroom3 from '@/assets/images/portfolio/bathroom/3.jpeg'
import bathroom4 from '@/assets/images/portfolio/bathroom/4.jpeg'
import bathroom5 from '@/assets/images/portfolio/bathroom/5.jpeg'
import bathroom6 from '@/assets/images/portfolio/bathroom/6.jpeg'
import bathroom7 from '@/assets/images/portfolio/bathroom/7.jpeg'
import bathroom8 from '@/assets/images/portfolio/bathroom/8.jpeg'
import bathroom9 from '@/assets/images/portfolio/bathroom/9.jpeg'
import bathroom10 from '@/assets/images/portfolio/bathroom/10.jpeg'
import bathroom11 from '@/assets/images/portfolio/bathroom/11.jpeg'
import bathroom12 from '@/assets/images/portfolio/bathroom/12.jpeg'
import exterior1 from '@/assets/images/portfolio/exterior/1.jpeg'
import exterior2 from '@/assets/images/portfolio/exterior/2.jpeg'
import exterior2Alt from '@/assets/images/portfolio/exterior/2b435148-b141-4bdd-baa4-43cea22e3751.jpeg'
import exterior3 from '@/assets/images/portfolio/exterior/3.jpeg'
import exterior4 from '@/assets/images/portfolio/exterior/4.jpeg'
import exterior5 from '@/assets/images/portfolio/exterior/5.jpeg'
import interior1 from '@/assets/images/portfolio/interior/1.jpeg'
import interior2 from '@/assets/images/portfolio/interior/2.jpeg'
import video1 from '@/assets/images/portfolio/videos/1.mp4?url'
import video2 from '@/assets/images/portfolio/videos/2.mp4?url'
import video3 from '@/assets/images/portfolio/videos/3.mp4?url'
import video4 from '@/assets/images/portfolio/videos/4.mp4?url'

export interface PortfolioCategory {
  id: string
  label: string
  description: string
}

export interface PortfolioItem {
  src: string
  poster?: string
  width?: number
  height?: number
  category: string
  label: string
  title: string
  alt: string
  type: 'image' | 'video'
}

export interface PortfolioItemSource extends Omit<PortfolioItem, 'src' | 'poster'> {
  src: ImageMetadata | string
  poster?: ImageMetadata
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

function buildItems(): PortfolioItemSource[] {
  const sources: { category: string; src: ImageMetadata | string; poster?: ImageMetadata }[] = [
    { category: 'interior', src: interior1 },
    { category: 'interior', src: interior2 },
    { category: 'exterior', src: exterior1 },
    {
      category: 'exterior',
      src: exterior2Alt,
    },
    { category: 'exterior', src: exterior2 },
    { category: 'exterior', src: exterior3 },
    { category: 'exterior', src: exterior4 },
    { category: 'exterior', src: exterior5 },
    { category: 'bathroom', src: bathroom1 },
    { category: 'bathroom', src: bathroom1Alt },
    { category: 'bathroom', src: bathroom2 },
    { category: 'bathroom', src: bathroom2Alt },
    { category: 'bathroom', src: bathroom2Detail },
    { category: 'bathroom', src: bathroom3 },
    { category: 'bathroom', src: bathroom4 },
    { category: 'bathroom', src: bathroom5 },
    { category: 'bathroom', src: bathroom6 },
    {
      category: 'bathroom',
      src: video1,
      poster: bathroom6,
    },
    {
      category: 'bathroom',
      src: video4,
      poster: bathroom7,
    },
    { category: 'bathroom', src: bathroom7 },
    { category: 'bathroom', src: bathroom8 },
    {
      category: 'bathroom',
      src: video2,
      poster: bathroom8,
    },
    {
      category: 'bathroom',
      src: video3,
      poster: bathroom9,
    },
    { category: 'bathroom', src: bathroom9 },
    { category: 'bathroom', src: bathroom10 },
    { category: 'bathroom', src: bathroom11 },
    { category: 'bathroom', src: bathroom12 },
  ]

  const counters: Record<string, number> = {}

  return sources.map(({ category, src, poster }) => {
    const isVideo = typeof src === 'string'
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

export const galleryItems: PortfolioItemSource[] = buildItems()

export const filters = [
  { id: 'all', label: 'All Projects' },
  ...categories.map((category) => ({ id: category.id, label: category.label })),
]
