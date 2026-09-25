import { useEffect, useMemo, useRef, useState } from 'react'
import type { PortfolioFilter, PortfolioItem } from '@/data/portfolio'

function getFilterFromUrl(validFilters: Set<string>): string {
  if (typeof window === 'undefined') return 'all'
  const fromUrl = new URLSearchParams(window.location.search).get('filter')
  return fromUrl && validFilters.has(fromUrl) ? fromUrl : 'all'
}

interface PortfolioGalleryProps {
  initialFilter?: string
  items: PortfolioItem[]
  filters: PortfolioFilter[]
}

export default function PortfolioGallery({
  initialFilter = 'all',
  items: galleryItems,
  filters,
}: PortfolioGalleryProps) {
  const validFilters = useMemo(() => new Set(filters.map((filter) => filter.id)), [filters])
  const safeInitialFilter = validFilters.has(initialFilter) ? initialFilter : 'all'
  const [activeFilter, setActiveFilter] = useState(safeInitialFilter)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [mediaStatus, setMediaStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const closeRef = useRef<HTMLButtonElement>(null)
  const filterTriggerRef = useRef<HTMLButtonElement>(null)
  const filterCloseRef = useRef<HTMLButtonElement>(null)
  const filterDialogRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const galleryGridRef = useRef<HTMLDivElement>(null)
  const firstProjectRef = useRef<HTMLButtonElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: galleryItems.length }
    for (const item of galleryItems) {
      for (const filterId of item.filterIds) {
        map[filterId] = (map[filterId] ?? 0) + 1
      }
    }
    return map
  }, [galleryItems])

  const activeDescription = useMemo(() => {
    return filters.find((filter) => filter.id === activeFilter)?.description ?? ''
  }, [activeFilter, filters])
  const activeFilterLabel =
    filters.find((filter) => filter.id === activeFilter)?.label ?? 'All Work'

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems
    return galleryItems.filter((item) => item.filterIds.includes(activeFilter))
  }, [activeFilter, galleryItems])

  const categoryFilters = useMemo(
    () => filters.filter((filter) => filter.group === 'category'),
    [filters]
  )
  const projectFilters = useMemo(
    () => filters.filter((filter) => filter.group === 'project'),
    [filters]
  )
  const allFilter = filters.find((filter) => filter.group === 'overview')

  const scrollToGalleryStart = (focusFirstProject = false) => {
    requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      galleryGridRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
      if (focusFirstProject) firstProjectRef.current?.focus({ preventScroll: true })
    })
  }

  // Sync filter -> URL and return to the first visible project.
  const selectFilter = (id: string, focusFirstProject = false) => {
    const filterChanged = id !== activeFilter
    setActiveFilter(id)
    setCurrentIndex(0)
    setIsFilterMenuOpen(false)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      if (id === 'all') url.searchParams.delete('filter')
      else url.searchParams.set('filter', id)
      window.history.pushState(null, '', url.toString())
    }
    if (filterChanged) scrollToGalleryStart(focusFirstProject)
  }

  // Keep state in sync with browser back/forward
  useEffect(() => {
    const onPopState = () => {
      setActiveFilter(getFilterFromUrl(validFilters))
      setCurrentIndex(0)
      scrollToGalleryStart()
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [validFilters])

  // Clamp index when filter changes while modal is open
  useEffect(() => {
    if (!isModalOpen) return
    if (!filteredItems.length) {
      setIsModalOpen(false)
      return
    }
    if (currentIndex >= filteredItems.length) setCurrentIndex(0)
  }, [filteredItems, currentIndex, isModalOpen])

  // Scroll lock, focus entry and restoration for the lightbox.
  useEffect(() => {
    if (!isModalOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      requestAnimationFrame(() => previouslyFocused?.focus())
    }
  }, [isModalOpen])

  useEffect(() => {
    if (!isFilterMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    filterCloseRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFilterMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
      requestAnimationFrame(() => filterTriggerRef.current?.focus())
    }
  }, [isFilterMenuOpen])

  useEffect(() => {
    setMediaStatus('loading')
  }, [currentIndex, activeFilter])

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

  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target
    const isMediaControl = target instanceof HTMLMediaElement

    if (e.key === 'Escape') {
      e.preventDefault()
      closeModal()
      return
    }
    if (!isMediaControl && e.key === 'ArrowLeft') showPrev()
    if (!isMediaControl && e.key === 'ArrowRight') showNext()

    if (e.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), video[controls], [href], [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const onFilterDialogKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsFilterMenuOpen(false)
      return
    }
    if (event.key !== 'Tab') return

    const focusable = filterDialogRef.current?.querySelectorAll<HTMLButtonElement>('button')
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (currentImage?.type === 'video') return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return
    if (dx > 0) showPrev()
    else showNext()
  }

  const currentImage = filteredItems[currentIndex]

  const renderFilter = (filter: PortfolioFilter) => {
    const isActive = activeFilter === filter.id

    return (
      <button
        key={filter.id}
        type="button"
        aria-pressed={isActive}
        onClick={(event) => selectFilter(filter.id, event.detail === 0)}
        className={`focus-visible:ring-primary flex min-h-10 cursor-pointer touch-manipulation items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-left text-sm leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:rounded-xl ${
          isActive
            ? 'border-primary bg-primary text-white shadow-md'
            : 'hover:border-primary/50 border-black/10 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? 'bg-white' : 'bg-primary/40'}`}
          />
          {filter.label}
        </span>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 text-xs font-bold ${
            isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {counts[filter.id] ?? 0}
        </span>
      </button>
    )
  }

  return (
    <section
      id="portfolio-gallery"
      className="bg-surface scroll-mt-[13vh] py-14 sm:py-20"
      aria-label="Project gallery"
    >
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-3xl pb-8 text-center">
          <p className="text-sm font-semibold tracking-[0.4em] text-gray-500 uppercase">Our Work</p>
          <p className="mt-3 text-gray-600">{activeDescription}</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="hidden lg:sticky lg:top-[15vh] lg:block lg:w-60 lg:shrink-0 lg:self-start lg:overflow-auto">
            <div
              className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm lg:p-4"
              role="group"
              aria-label="Filter portfolio work"
            >
              <p className="px-1 text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                Browse by
              </p>
              <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                {allFilter && renderFilter(allFilter)}
              </div>

              <p className="mt-4 px-1 text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                Categories
              </p>
              <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                {categoryFilters.map(renderFilter)}
              </div>

              {projectFilters.length > 0 && (
                <>
                  <p className="mt-4 px-1 text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                    Projects
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                    {projectFilters.map(renderFilter)}
                  </div>
                </>
              )}
            </div>
          </aside>

          <div ref={galleryGridRef} className="min-w-0 flex-1 scroll-mt-[15vh]">
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => {
                const isVideo = item.type === 'video'
                return (
                  <button
                    ref={index === 0 ? firstProjectRef : undefined}
                    key={`${activeFilter}-${item.src}-${index}`}
                    type="button"
                    aria-label={`Open ${item.title}`}
                    className="group intersect:visible intersect:animate-fade-up intersect-once animate-duration-500 focus-visible:ring-primary invisible relative block cursor-pointer touch-manipulation overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg transition-shadow hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:animate-none motion-reduce:transition-none"
                    style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
                    onClick={() => openModal(index)}
                  >
                    {isVideo ? (
                      item.poster ? (
                        <img
                          src={item.poster}
                          alt={item.alt}
                          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div
                          className="flex h-64 w-full items-center justify-center bg-linear-to-br from-gray-700 to-gray-950 text-white"
                          aria-hidden="true"
                        >
                          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/50 bg-black/25 text-2xl backdrop-blur-sm">
                            ▶
                          </span>
                        </div>
                      )
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        className="h-64 w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/75 opacity-100 transition-opacity duration-500 motion-reduce:transition-none md:opacity-70 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
                    {isVideo && (
                      <span className="absolute top-4 left-4 z-20 rounded-full bg-black/70 px-3 py-2 text-xs font-bold tracking-wider text-white uppercase">
                        ▶ Video
                      </span>
                    )}
                    <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between gap-3 px-5 pt-3 pb-4 text-left text-white">
                      <div>
                        <p className="text-xs tracking-[0.4em] text-white/80 uppercase">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold opacity-100 transition-opacity duration-300 motion-reduce:transition-none md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                          {item.title}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold opacity-100 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                        View project →
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {filteredItems.length === 0 && (
              <p className="py-16 text-center text-gray-500">
                No projects found in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {!isModalOpen && (
        <button
          ref={filterTriggerRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isFilterMenuOpen}
          onClick={() => setIsFilterMenuOpen(true)}
          className="border-primary/30 focus-visible:ring-primary fixed left-1/2 z-30 flex min-h-12 max-w-[calc(100vw-2rem)] -translate-x-1/2 cursor-pointer touch-manipulation items-center gap-2 rounded-full border bg-white/95 px-4 py-2 text-[12.5px] font-semibold text-gray-800 shadow-xl backdrop-blur-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:hidden"
          style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary h-4 w-4 shrink-0"
          >
            <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4" />
          </svg>
          <span>Filter:</span>
          <span className="max-w-[52vw] truncate text-gray-600">{activeFilterLabel}</span>
          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-bold">
            {counts[activeFilter] ?? 0}
          </span>
        </button>
      )}

      {isFilterMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end bg-black/45 backdrop-blur-xs lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filter portfolio work"
          onClick={() => setIsFilterMenuOpen(false)}
        >
          <div
            ref={filterDialogRef}
            className="max-h-[78svh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pt-4 shadow-2xl"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={onFilterDialogKeyDown}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-300" aria-hidden="true" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-gray-900">Filter projects</p>
                <p className="mt-0.5 text-xs text-gray-500">Choose a category or location</p>
              </div>
              <button
                ref={filterCloseRef}
                type="button"
                aria-label="Close filters"
                onClick={() => setIsFilterMenuOpen(false)}
                className="focus-visible:ring-primary flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-gray-100 text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                Browse by
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {allFilter && renderFilter(allFilter)}
              </div>

              <p className="mt-4 text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                Categories
              </p>
              <div className="mt-2 flex flex-wrap gap-2">{categoryFilters.map(renderFilter)}</div>

              {projectFilters.length > 0 && (
                <>
                  <p className="mt-4 text-xs font-bold tracking-[0.24em] text-gray-500 uppercase">
                    Projects
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {projectFilters.map(renderFilter)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && currentImage && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentImage.title} — ${currentImage.label}`}
          onClick={closeModal}
          onKeyDown={onDialogKeyDown}
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

            <div
              className="relative flex min-h-48 min-w-64 touch-pan-y items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {mediaStatus === 'loading' && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 text-sm text-white"
                  role="status"
                >
                  Loading project…
                </div>
              )}
              {currentImage.type === 'video' ? (
                <video
                  key={currentImage.src}
                  src={currentImage.src}
                  poster={currentImage.poster}
                  aria-label={currentImage.alt}
                  className="block h-auto max-h-[75svh] w-auto max-w-[90vw] rounded-xl bg-black object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  onCanPlay={() => setMediaStatus('ready')}
                  onError={() => setMediaStatus('error')}
                />
              ) : (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width}
                  height={currentImage.height}
                  className="h-full max-h-[75vh] max-w-[90vw] rounded-xl object-contain"
                  onLoad={() => setMediaStatus('ready')}
                  onError={() => setMediaStatus('error')}
                />
              )}
              {mediaStatus === 'error' && (
                <p
                  className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/80 px-6 text-center text-sm text-white"
                  role="alert"
                >
                  This project could not be loaded. Try another item.
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                aria-label="Previous project"
                className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
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
                className="flex h-12 w-12 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
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
            className="absolute top-5 right-5 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/70 bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            onClick={closeModal}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      )}
    </section>
  )
}
