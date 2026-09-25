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
import cobbleHillVideo from '@/assets/images/portfolio/cobble-hill-brooklyn-ny/cobble-hill-interior-painting-walkthrough.mp4?url'
import greatNeckBathroomDoorway from '@/assets/images/portfolio/great-neck-ny/great-neck-bathroom-doorway-overview.jpeg'
import greatNeckBathroomVanity from '@/assets/images/portfolio/great-neck-ny/great-neck-bathroom-vanity-shower.jpeg'
import greatNeckBedroomClosets from '@/assets/images/portfolio/great-neck-ny/great-neck-bedroom-custom-closets.jpeg'
import greatNeckBedroomFloor from '@/assets/images/portfolio/great-neck-ny/great-neck-bedroom-hardwood-floor.jpeg'
import greatNeckBedroomOpenClosets from '@/assets/images/portfolio/great-neck-ny/great-neck-bedroom-open-closets.jpeg'
import greatNeckHallwayClosets from '@/assets/images/portfolio/great-neck-ny/great-neck-custom-hallway-closets.jpeg'
import greatNeckKitchen from '@/assets/images/portfolio/great-neck-ny/great-neck-galley-kitchen.jpeg'
import greatNeckHallwaySlidingClosets from '@/assets/images/portfolio/great-neck-ny/great-neck-hallway-sliding-closets.jpeg'
import greatNeckFloorDetail from '@/assets/images/portfolio/great-neck-ny/great-neck-hardwood-floor-detail.jpeg'
import greatNeckVideo from '@/assets/images/portfolio/great-neck-ny/great-neck-apartment-renovation-walkthrough.mp4?url'
import lafayetteBathroomShower from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-bathroom-shower-detail.jpg'
import lafayetteBathroomTub from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-bathroom-tub-shower.jpg'
import lafayetteBathroomVanity from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-bathroom-vanity-overview.jpg'
import lafayetteBathroomVideo from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-bathroom-walkthrough.mp4?url'
import lafayetteKitchen from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-custom-kitchen-entry.jpg'
import lafayetteDiningDivider from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-dining-room-divider.jpg'
import lafayetteEntryMillwork from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-entry-hall-millwork.jpg'
import lafayetteGrayCabinetry from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-gray-built-in-cabinetry.jpg'
import lafayetteLivingRoom from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-living-room-city-windows.jpg'
import lafayetteOpenPlan from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-open-plan-kitchen-dining.jpg'
import lafayettePinkBuiltIn from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-pink-custom-built-in.jpg'
import lafayetteRoomDivider from '@/assets/images/portfolio/lafayette-residence-nyc/lafayette-wood-glass-room-divider.jpg'
import parkSlopeBlackFixtures from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-black-fixtures-overview.jpeg'
import parkSlopeBrassFixtures from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-brass-fixtures-overview.jpeg'
import parkSlopeBrassVanity from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-brass-vanity.jpeg'
import parkSlopeBathtub from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-bathtub-overview.jpeg'
import parkSlopeGeometricVanity from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-geometric-tile-vanity.jpeg'
import parkSlopeGlassShower from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-glass-shower-entry.jpeg'
import parkSlopeHexFloor from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-hex-floor-details.jpeg'
import parkSlopePatternedFloor from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-patterned-tile-floor.jpeg'
import parkSlopeRainShower from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-rain-shower-details.jpeg'
import parkSlopeSkylight from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-skylight-overview.jpeg'
import parkSlopeWainscoting from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-wainscoting-details.jpeg'
import parkSlopeVideo1 from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-walkthrough-01.mp4?url'
import parkSlopeVideo2 from '@/assets/images/portfolio/park-slope-brooklyn-ny/park-slope-bathroom-walkthrough-02.mp4?url'
import video1 from '@/assets/images/portfolio/videos/1.mp4?url'
import video2 from '@/assets/images/portfolio/videos/2.mp4?url'
import video3 from '@/assets/images/portfolio/videos/3.mp4?url'
import video4 from '@/assets/images/portfolio/videos/4.mp4?url'

export type PortfolioFilterGroup = 'overview' | 'category' | 'project'

export interface PortfolioFilter {
  id: string
  label: string
  description: string
  group: PortfolioFilterGroup
}

export interface PortfolioItem {
  src: string
  poster?: string
  width?: number
  height?: number
  filterIds: string[]
  label: string
  title: string
  alt: string
  type: 'image' | 'video'
}

export interface PortfolioItemSource extends Omit<PortfolioItem, 'src' | 'poster'> {
  src: ImageMetadata | string
  poster?: ImageMetadata
}

interface PortfolioSource {
  src: ImageMetadata | string
  poster?: ImageMetadata
  type: 'image' | 'video'
  categoryId: string
  projectId?: string
  alt?: string
}

export const categories: PortfolioFilter[] = [
  {
    id: 'interior',
    label: 'Interior',
    description: 'Warm living spaces with natural materials, soft lighting, and textile details.',
    group: 'category',
  },
  {
    id: 'exterior',
    label: 'Exterior',
    description:
      'Facades and patios with contemporary lines, landscaping, and sculptural finishes.',
    group: 'category',
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    description: 'Bathroom renovations with considered materials, fixtures, and custom details.',
    group: 'category',
  },
]

export const projects: PortfolioFilter[] = [
  {
    id: 'lafayette-residence-nyc',
    label: 'Lafayette, NYC',
    description:
      'A featured full-apartment renovation with an open kitchen, custom millwork, refined living spaces, and a complete bathroom remodel.',
    group: 'project',
  },
  {
    id: 'park-slope-brooklyn-ny',
    label: 'Park Slope, Brooklyn, NY',
    description:
      'Three distinctive bathroom renovations completed in Park Slope, Brooklyn, New York.',
    group: 'project',
  },
  {
    id: 'great-neck-ny',
    label: 'Great Neck, NY',
    description:
      'A complete apartment renovation with a new kitchen, bathroom, hardwood floors, and custom storage.',
    group: 'project',
  },
  {
    id: 'cobble-hill-brooklyn-ny',
    label: 'Cobble Hill, Brooklyn, NY',
    description: 'Interior painting completed for a residence in Cobble Hill, Brooklyn, New York.',
    group: 'project',
  },
]

const allFilter: PortfolioFilter = {
  id: 'all',
  label: 'All Work',
  description: 'Browse all completed renovations across NYC and New Jersey.',
  group: 'overview',
}

export const filters: PortfolioFilter[] = [allFilter, ...categories, ...projects]

const categoryById = new Map(categories.map((category) => [category.id, category]))
const projectById = new Map(projects.map((project) => [project.id, project]))

const sources: PortfolioSource[] = [
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteOpenPlan,
    type: 'image',
    alt: 'Completed Lafayette Residence with an open kitchen and dining area',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteDiningDivider,
    type: 'image',
    alt: 'Lafayette Residence dining room with a custom wood and glass divider',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteLivingRoom,
    type: 'image',
    alt: 'Bright Lafayette Residence living room with city windows and custom cabinetry',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteKitchen,
    type: 'image',
    alt: 'Custom white kitchen framed by walnut millwork at the Lafayette Residence',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteGrayCabinetry,
    type: 'image',
    alt: 'Custom gray built-in cabinetry and display shelving at the Lafayette Residence',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayettePinkBuiltIn,
    type: 'image',
    alt: 'Custom pink built-in cabinet and shelving at the Lafayette Residence',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteRoomDivider,
    type: 'image',
    alt: 'Wood and ribbed-glass room divider with integrated storage at the Lafayette Residence',
  },
  {
    categoryId: 'interior',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteEntryMillwork,
    type: 'image',
    alt: 'Entry hall with warm wood millwork and custom lighting at the Lafayette Residence',
  },
  {
    categoryId: 'bathroom',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteBathroomVanity,
    type: 'image',
    alt: 'Completed Lafayette Residence bathroom with illuminated mirror and black fixtures',
  },
  {
    categoryId: 'bathroom',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteBathroomTub,
    type: 'image',
    alt: 'Lafayette Residence bathroom with a glass tub enclosure and terrazzo floor',
  },
  {
    categoryId: 'bathroom',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteBathroomShower,
    type: 'image',
    alt: 'Terrazzo shower and recessed lighting in the Lafayette Residence bathroom',
  },
  {
    categoryId: 'bathroom',
    projectId: 'lafayette-residence-nyc',
    src: lafayetteBathroomVideo,
    poster: lafayetteBathroomVanity,
    type: 'video',
    alt: 'Video walkthrough of the completed Lafayette Residence bathroom',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckKitchen,
    type: 'image',
    alt: 'Renovated galley kitchen with custom wood cabinetry in Great Neck, New York',
  },
  {
    categoryId: 'bathroom',
    projectId: 'great-neck-ny',
    src: greatNeckBathroomVanity,
    type: 'image',
    alt: 'Great Neck bathroom with wood vanity, glass shower door, and black fixtures',
  },
  {
    categoryId: 'bathroom',
    projectId: 'great-neck-ny',
    src: greatNeckBathroomDoorway,
    type: 'image',
    alt: 'Completed Great Neck bathroom renovation viewed from the doorway',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckBedroomClosets,
    type: 'image',
    alt: 'Great Neck bedroom with refinished hardwood floor and custom white closets',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckBedroomOpenClosets,
    type: 'image',
    alt: 'Custom sliding closet and storage system in a renovated Great Neck bedroom',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckBedroomFloor,
    type: 'image',
    alt: 'Refinished hardwood floor in a bright Great Neck bedroom renovation',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckFloorDetail,
    type: 'image',
    alt: 'Detailed view of refinished hardwood flooring in the Great Neck apartment',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckHallwayClosets,
    type: 'image',
    alt: 'Great Neck hallway with custom wood-panel sliding closets and hardwood flooring',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckHallwaySlidingClosets,
    type: 'image',
    alt: 'Open custom sliding closets along a renovated Great Neck hallway',
  },
  {
    categoryId: 'interior',
    projectId: 'great-neck-ny',
    src: greatNeckVideo,
    poster: greatNeckKitchen,
    type: 'video',
    alt: 'Video walkthrough of the completed Great Neck apartment renovation',
  },
  {
    categoryId: 'interior',
    projectId: 'cobble-hill-brooklyn-ny',
    src: cobbleHillVideo,
    type: 'video',
    alt: 'Video walkthrough of an interior painting project in Cobble Hill, Brooklyn',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeBlackFixtures,
    type: 'image',
    alt: 'Renovated Park Slope bathroom with black fixtures, glass shower, and hex tile floor',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeGlassShower,
    type: 'image',
    alt: 'Glass shower enclosure and restored woodwork in a Park Slope bathroom renovation',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeRainShower,
    type: 'image',
    alt: 'Black rain shower, built-in niche, and wood shelving in a Park Slope bathroom',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeBrassFixtures,
    type: 'image',
    alt: 'Park Slope bathroom with brass fixtures, dark walls, and patterned tile floor',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeBrassVanity,
    type: 'image',
    alt: 'Black vanity with brass fixtures and oval mirror in a Park Slope bathroom',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopePatternedFloor,
    type: 'image',
    alt: 'Geometric black and white tile floor in a renovated Park Slope bathroom',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeWainscoting,
    type: 'image',
    alt: 'White wainscoting and brass towel rail in a Park Slope bathroom renovation',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeGeometricVanity,
    type: 'image',
    alt: 'Compact white vanity and geometric wall tile in a Park Slope bathroom renovation',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeSkylight,
    type: 'image',
    alt: 'Park Slope bathroom with skylight, geometric wall tile, and gray hex floor tile',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeHexFloor,
    type: 'image',
    alt: 'Gray hex floor tile, white vanity, and bathtub in a renovated Park Slope bathroom',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeBathtub,
    type: 'image',
    alt: 'Bathtub and geometric wall tile in a bright Park Slope bathroom renovation',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeVideo1,
    poster: parkSlopeBlackFixtures,
    type: 'video',
    alt: 'Video walkthrough of the Park Slope bathroom renovation with black fixtures',
  },
  {
    categoryId: 'bathroom',
    projectId: 'park-slope-brooklyn-ny',
    src: parkSlopeVideo2,
    poster: parkSlopeBrassFixtures,
    type: 'video',
    alt: 'Video walkthrough of the Park Slope bathroom renovation with brass fixtures',
  },
  { categoryId: 'interior', src: interior1, type: 'image' },
  { categoryId: 'interior', src: interior2, type: 'image' },
  { categoryId: 'exterior', src: exterior1, type: 'image' },
  { categoryId: 'exterior', src: exterior2Alt, type: 'image' },
  { categoryId: 'exterior', src: exterior2, type: 'image' },
  { categoryId: 'exterior', src: exterior3, type: 'image' },
  { categoryId: 'exterior', src: exterior4, type: 'image' },
  { categoryId: 'exterior', src: exterior5, type: 'image' },
  { categoryId: 'bathroom', src: bathroom1, type: 'image' },
  { categoryId: 'bathroom', src: bathroom1Alt, type: 'image' },
  { categoryId: 'bathroom', src: bathroom2, type: 'image' },
  { categoryId: 'bathroom', src: bathroom2Alt, type: 'image' },
  { categoryId: 'bathroom', src: bathroom2Detail, type: 'image' },
  { categoryId: 'bathroom', src: bathroom3, type: 'image' },
  { categoryId: 'bathroom', src: bathroom4, type: 'image' },
  { categoryId: 'bathroom', src: bathroom5, type: 'image' },
  { categoryId: 'bathroom', src: bathroom6, type: 'image' },
  { categoryId: 'bathroom', src: video1, poster: bathroom6, type: 'video' },
  { categoryId: 'bathroom', src: video4, poster: bathroom7, type: 'video' },
  { categoryId: 'bathroom', src: bathroom7, type: 'image' },
  { categoryId: 'bathroom', src: bathroom8, type: 'image' },
  { categoryId: 'bathroom', src: video2, poster: bathroom8, type: 'video' },
  { categoryId: 'bathroom', src: video3, poster: bathroom9, type: 'video' },
  { categoryId: 'bathroom', src: bathroom9, type: 'image' },
  { categoryId: 'bathroom', src: bathroom10, type: 'image' },
  { categoryId: 'bathroom', src: bathroom11, type: 'image' },
  { categoryId: 'bathroom', src: bathroom12, type: 'image' },
]

function buildItems(): PortfolioItemSource[] {
  const categoryCounters: Record<string, number> = {}

  return sources.map(({ categoryId, projectId, src, poster, type, alt }) => {
    const category = categoryById.get(categoryId)
    const project = projectId ? projectById.get(projectId) : undefined
    const categoryLabel = category?.label ?? categoryId
    const filterIds = projectId ? [categoryId, projectId] : [categoryId]

    if (project) {
      return {
        src,
        poster,
        filterIds,
        label: categoryLabel,
        title: project.label,
        alt: alt ?? `${project.label} ${categoryLabel.toLowerCase()} renovation by MMSL`,
        type,
      }
    }

    const index = categoryCounters[categoryId] ?? 0
    categoryCounters[categoryId] = index + 1
    const title = `${categoryLabel} ${type === 'video' ? 'Walkthrough' : 'Remodel'} ${index + 1}`

    return {
      src,
      poster,
      filterIds,
      label: categoryLabel,
      title,
      alt: alt ?? `${title} by MMSL Contracting Corp in NYC and New Jersey`,
      type,
    }
  })
}

export const galleryItems: PortfolioItemSource[] = buildItems()
