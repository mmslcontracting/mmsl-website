import { useEffect, useMemo, useState } from 'react'

const categories = [
  {
    id: 'interior',
    label: 'Interior',
    description:
      'Ambientes cálidos con materiales naturales, iluminación suave y detalles textiles.',
    accent: 'from-primary to-primary-light',
    images: ['/images/portfolio/interior/1.jpeg', '/images/portfolio/interior/2.jpeg'],
  },
  {
    id: 'exterior',
    label: 'Exterior',
    description: 'Fachadas y patios con líneas contemporáneas, paisajismo y acabados sculpturales.',
    accent: 'from-accent via-[#d4b684] to-[#f8e8c7]',
    images: [
      '/images/portfolio/exterior/1.jpeg',
      '/images/portfolio/exterior/2b435148-b141-4bdd-baa4-43cea22e3751.jpeg',
      '/images/portfolio/exterior/2.jpeg',
      '/images/portfolio/exterior/3.jpeg',
      '/images/portfolio/exterior/4.jpeg',
      '/images/portfolio/exterior/5.jpeg',
    ],
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    description: 'Baños de spa con mármoles, metal cepillado y detalles de luz tenue.',
    accent: 'from-black to-white/50',
    images: [
      '/images/portfolio/bathroom/1.jpeg',
      '/images/portfolio/bathroom/1-1.jpeg',
      '/images/portfolio/bathroom/2.jpeg',
      '/images/portfolio/bathroom/2-1.jpeg',
      '/images/portfolio/bathroom/2-2.jpeg',
      '/images/portfolio/bathroom/3.jpeg',
      '/images/portfolio/bathroom/4.jpeg',
      '/images/portfolio/bathroom/5.jpeg',
      '/images/portfolio/bathroom/6.jpeg',
      '/images/portfolio/videos/1.mp4',
      '/images/portfolio/videos/4.mp4',
      '/images/portfolio/bathroom/7.jpeg',
      '/images/portfolio/bathroom/8.jpeg',
      '/images/portfolio/videos/2.mp4',
      '/images/portfolio/videos/3.mp4',
      '/images/portfolio/bathroom/9.jpeg',
      '/images/portfolio/bathroom/10.jpeg',
      '/images/portfolio/bathroom/11.jpeg',
      '/images/portfolio/bathroom/12.jpeg',
    ],
  },
]

const galleryItems = categories.flatMap((category) =>
  category.images.map((src) => ({
    src,
    category: category.id,
    label: category.label,
    description: category.description,
  }))
)

const filters = [
  { id: 'all', label: 'All Projects' },
  ...categories.map((category) => ({ id: category.id, label: category.label })),
]

const isVideoSource = (src: string) => src.toLowerCase().endsWith('.mp4')

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return galleryItems
    }
    return galleryItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  useEffect(() => {
    if (!isModalOpen) {
      return
    }
    if (!filteredItems.length) {
      setIsModalOpen(false)
      return
    }
    if (currentIndex >= filteredItems.length) {
      setCurrentIndex(0)
    }
  }, [filteredItems, currentIndex, isModalOpen])

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const showPrev = () => {
    if (!filteredItems.length) return
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const showNext = () => {
    if (!filteredItems.length) return
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
  }

  const currentImage = filteredItems[currentIndex]

  return (
    <section className="bg-surface py-14 sm:py-20">
      <div className="container mx-auto px-5">
        <div className="flex flex-wrap justify-center gap-3 pb-8">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? 'border-black bg-black text-white'
                  : 'border-black/10 bg-white text-gray-700'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <button
              key={`${activeFilter}-${item.src}-${index}`}
              type="button"
              className="group intersect:visible intersect:animate-fade-up intersect-once animate-duration-500 invisible relative block cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white p-0 shadow-lg transition hover:shadow-2xl"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => openModal(index)}
            >
              {isVideoSource(item.src) ? (
                <div className="h-64 w-full">
                  <video
                    src={item.src}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(event) => {
                      event.currentTarget.play().catch(() => {})
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.pause()
                      try {
                        event.currentTarget.currentTime = 0
                      } catch {}
                    }}
                  />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={`${item.label} project`}
                  className="h-64 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60 opacity-0 transition duration-500 group-hover:opacity-100" />
              {isVideoSource(item.src) && (
                <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="radial-play flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-black/60 text-2xl text-white">
                    ▶
                  </span>
                </span>
              )}
              <div className="absolute right-0 bottom-0 left-0 px-5 pt-3 pb-4 text-left text-white">
                <p className="text-xs tracking-[0.4em] text-white/80 uppercase">{item.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            className="absolute top-5 right-5 cursor-pointer rounded-full border border-white/70 bg-black/60 p-2 text-white"
            onClick={closeModal}
          >
            <span className="sr-only">Cerrar imagen</span>✕
          </button>
          <button
            type="button"
            className="absolute left-5 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition hover:bg-black/70 sm:flex"
            onClick={showPrev}
          >
            ←
          </button>
          <button
            type="button"
            className="absolute right-5 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition hover:bg-black/70 sm:flex"
            onClick={showNext}
          >
            →
          </button>
          {isVideoSource(currentImage.src) ? (
            <video
              src={currentImage.src}
              className="h-full max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={currentImage.src}
              alt="Large gallery"
              className="h-full max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
            />
          )}
        </div>
      )}
    </section>
  )
}
