import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, filters, galleryItems, isVideoSource } from '@/data/portfolio'

const VALID_FILTERS = new Set(filters.map((f) => f.id))

function getInitialFilter(): string {
  if (typeof window === 'undefined') return 'all'
  const fromUrl = new URLSearchParams(window.location.search).get('filter')
  return fromUrl && VALID_FILTERS.has(fromUrl) ? fromUrl : 'all'
}

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>(() => getInitialFilter())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryItems.length }
    for (const item of galleryItems) {
      map[item.category] = (map[item.category] ?? 0) + 1
    }
    return map
  }, [])

  const activeDescription = useMemo(() => {
    if (activeFilter === 'all') return 'Browse all completed renovations across NYC & New Jersey.'
    return categories.find((c) => c.id === activeFilter)?.description ?? ''
  }, [activeFilter])

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems
    return galleryItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  // Sync filter -> URL (shareable links, no navigation)
  const selectFilter = (id: string) => {
    setActiveFilter(id)
    setCurrentIndex(0)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (id === 'all') url.searchParams.delete('filter')
      else url.searchParams.set('filter', id)
      window.history.replaceState(null, '', url.toString())
    }
  }

  // Keep state in sync with browser back/forward
  useEffect(() => {
    const onPopState = () => setActiveFilter(getInitialFilter())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Clamp index when filter changes while modal is open
  useEffect(() => {
    if (!isModalOpen) return
    if (!filteredItems.length) {
      setIsModalOpen(false)
      return
    }
    if (currentIndex >= filteredItems.length) setCurrentIndex(0)
  }, [filteredItems, currentIndex, isModalOpen])

  // Scroll lock + focus close button when modal opens
  useEffect(() => {
    if (!isModalOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
    }
  }, [isModalOpen])

  const openModal = (index: number) => {
    setCurrentIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const showPrev = () => {
    if (!filteredItems.length) return
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
  }

  const showNext = () => {
    if (!filteredItems.length) return
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isModalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isModalOpen, filteredItems.length])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 50) return
    if (dx > 0) showPrev()
    else showNext()
  }

  const currentImage = filteredItems[currentIndex]

  return (
    <section className="bg-surface py-14 sm:py-20" aria-label="Project gallery">
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-3xl pb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.4em] text-gray-500 uppercase">
            Our Work · {filteredItems.length} {filteredItems.length === 1 ? 'Project' : 'Projects'}
          </p>
          <p className="mt-3 text-gray-600">{activeDescription}</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:sticky lg:top-[15vh] lg:w-64 lg:shrink-0 lg:self-start lg:overflow-auto">
            <div
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm lg:p-5"
              role="group"
              aria-label="Filter projects by category"
            >
              <p className="px-1 text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">
                Categories
              </p>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                {filters.map((filter) => {
                  const isActive = activeFilter === filter.id
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => selectFilter(filter.id)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition lg:rounded-2xl ${
                        isActive
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-black/10 bg-white text-gray-700 hover:border-primary/50 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 rounded-full ${
                            isActive ? 'bg-white' : 'bg-primary/40'
                          }`}
                        />
                        {filter.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {counts[filter.id] ?? 0}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-4 hidden border-t border-gray-100 px-1 pt-4 text-sm leading-relaxed text-gray-500 lg:block">
                {activeDescription}
              </p>
              <p className="mt-2 hidden px-1 text-xs text-gray-400 lg:block">
                Tip: puedes compartir el filtro, la URL se actualiza sola.
              </p>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item, index) => {
            const isVideo = isVideoSource(item.src)
            const featured = index % 8 === 0
            return (
              <button
                key={`${activeFilter}-${item.src}-${index}`}
                type="button"
                aria-label={`Open ${item.title}`}
                className={`group intersect:visible intersect:animate-fade-up intersect-once animate-duration-500 invisible relative block cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white p-0 shadow-lg transition hover:shadow-2xl ${
                  featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                onClick={() => openModal(index)}
              >
                {isVideo ? (
                  <div className={`w-full ${featured ? 'h-72 sm:h-80' : 'h-64'}`}>
                    <video
                      src={item.src}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                      preload="none"
                      onMouseEnter={(event) => {
                        if (window.matchMedia('(hover: hover)').matches) {
                          event.currentTarget.play().catch(() => {})
                        }
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
                    alt={item.alt}
                    className={`w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105 ${
                      featured ? 'h-72 sm:h-80' : 'h-64'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60 opacity-0 transition duration-500 group-hover:opacity-100" />
                {isVideo && (
                  <span className="absolute top-4 left-4 z-20 rounded-full bg-black/70 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
                    ▶ Video
                  </span>
                )}
                <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 px-5 pt-3 pb-4 text-left text-white">
                  <div>
                    <p className="text-xs tracking-[0.4em] text-white/80 uppercase">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold opacity-0 transition duration-300 group-hover:opacity-100">
                      {item.title}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                    View →
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <p className="py-16 text-center text-gray-500">No projects found in this category yet.</p>
        )}
          </div>
        </div>
      </div>

      {isModalOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentImage.title} — ${currentImage.label}`}
          onClick={closeModal}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex max-h-full flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full max-w-[90vw] items-center justify-between gap-4 pb-3 text-white">
              <p className="text-sm font-semibold">
                {currentImage.title}{' '}
                <span className="font-normal text-white/70">
                  — {currentIndex + 1} / {filteredItems.length}
                </span>
              </p>
              <p className="shrink-0 text-xs tracking-[0.3em] text-white/70 uppercase">
                {currentImage.label}
              </p>
            </div>

            {isVideoSource(currentImage.src) ? (
              <video
                src={currentImage.src}
                className="h-full max-h-[75vh] max-w-[90vw] rounded-3xl object-contain"
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="h-full max-h-[75vh] max-w-[90vw] rounded-3xl object-contain"
              />
            )}

            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                aria-label="Previous project"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition hover:bg-black/70"
                onClick={showPrev}
              >
                ←
              </button>
              <span className="min-w-16 text-center text-sm text-white/80" aria-live="polite">
                {currentIndex + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                aria-label="Next project"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition hover:bg-black/70"
                onClick={showNext}
              >
                →
              </button>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            aria-label="Close gallery"
            className="absolute top-5 right-5 cursor-pointer rounded-full border border-white/70 bg-black/60 p-2 text-white"
            onClick={closeModal}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      )}
    </section>
  )
}
