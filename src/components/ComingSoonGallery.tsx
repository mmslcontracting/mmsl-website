import { useMemo, useState } from 'react'

const images = [
  {
    src: '/images/coming-soon/1.jpeg',
    label: 'Concept sketch 1',
  },
  {
    src: '/images/coming-soon/2.jpeg',
    label: 'Concept sketch 2',
  },
  {
    src: '/images/coming-soon/3.jpeg',
    label: 'Concept detail 3',
  },
  {
    src: '/images/coming-soon/4.jpeg',
    label: 'Concept detail 4',
  },
]

export default function ComingSoonGallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = useMemo(() => images[currentIndex], [currentIndex])

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeGallery = () => setIsOpen(false)

  const showPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 text-sm">
      <div className="flex w-full items-center justify-between text-xs tracking-[0.3em] text-white/70 uppercase">
        <span>Project glimpses</span>
        <span>Tap to enlarge</span>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => openGallery(index)}
            className={`group hover:border-primary intersect:visible intersect-full invisible relative block overflow-hidden rounded-2xl border-2 border-white/30 transition hover:cursor-pointer ${index <= 1 ? 'intersect:animate-fade-left' : 'intersect:animate-fade-right'} intersect-once`}
          >
            <img
              src={image.src}
              alt={image.label}
              loading="lazy"
              className="h-28 w-28 object-cover transition duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-black/60 px-2 py-1 text-center text-[10px] tracking-[0.3em] text-white uppercase">
              {image.label}
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4">
          <button
            type="button"
            className="absolute top-5 right-5 rounded-full border border-white/60 bg-black/70 p-2 text-white hover:cursor-pointer"
            onClick={closeGallery}
          >
            <span className="sr-only">Close gallery</span>✕
          </button>
          <button
            type="button"
            className="absolute left-6 hidden h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/70 text-white transition hover:bg-black sm:flex"
            onClick={showPrev}
          >
            ←
          </button>
          <img
            src={currentImage.src}
            alt={currentImage.label}
            className="h-full max-h-[85vh] max-w-[90vw] rounded-3xl object-contain"
          />
          <button
            type="button"
            className="absolute right-6 hidden h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/70 text-white transition hover:bg-black sm:flex"
            onClick={showNext}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
