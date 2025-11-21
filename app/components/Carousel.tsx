'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselProps = {
  slides: React.ReactNode[];
  options?: {
    loop?: boolean;
    align?: 'start' | 'center' | 'end';
    slidesToScroll?: number;
  };
};

export default function Carousel({ slides, options = {} }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: options.loop ?? true,
    align: options.align ?? 'start',
    slidesToScroll: options.slidesToScroll ?? 1,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 pl-4"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
}

