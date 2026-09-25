import { useEffect, useMemo, useRef, useState } from 'react'

interface GalleryImage {
  src: string
  width: number
  height: number
  label: string
}

interface ProjectJourneyGalleryProps {
  images: GalleryImage[]
}

export default function ProjectJourneyGallery({ images }: ProjectJourneyGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const currentImage = useMemo(() => images[currentIndex], [currentIndex])

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeGallery = () => setIsOpen(false)

  const showPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [isOpen, images.length])

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 text-sm">
      <div className="flex w-full items-center justify-between text-xs tracking-[0.25em] text-white/70 uppercase">
        <span>Project journey</span>
        <span>Select to enlarge</span>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`View ${image.label}`}
            onClick={() => openGallery(index)}
            className={`group hover:border-secondary focus-visible:ring-secondary intersect:visible intersect-full invisible relative block cursor-pointer overflow-hidden rounded-xl border-2 border-white/30 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none ${index <= 1 ? 'intersect:animate-fade-left' : 'intersect:animate-fade-right'} intersect-once`}
          >
            <img
              src={image.src}
              alt={image.label}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="h-24 w-24 object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none sm:h-28 sm:w-28"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1.5 text-center text-[9px] leading-tight tracking-[0.08em] text-white uppercase">
              {image.label}
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${currentImage.label} — project journey`}
          onClick={closeGallery}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close project journey"
            className="absolute top-5 right-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/70 text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            onClick={closeGallery}
          >
            <span aria-hidden="true">✕</span>
          </button>
          <button
            type="button"
            aria-label="Previous project stage"
            className="absolute bottom-5 left-[calc(50%_-_3.5rem)] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/70 text-white transition hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:bottom-auto sm:left-6"
            onClick={(event) => {
              event.stopPropagation()
              showPrev()
            }}
          >
            ←
          </button>
          <img
            src={currentImage.src}
            alt={currentImage.label}
            width={currentImage.width}
            height={currentImage.height}
            className="h-auto max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Next project stage"
            className="absolute right-[calc(50%_-_3.5rem)] bottom-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-black/70 text-white transition hover:bg-black focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:right-6 sm:bottom-auto"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
