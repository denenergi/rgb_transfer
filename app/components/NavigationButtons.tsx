import Image from 'next/image';

type NavigationButtonsProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export default function NavigationButtons({ onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <div className="hidden md:flex items-center gap-2 relative z-20">
      <button
        onClick={onPrevious}
        className="w-12 h-12 flex items-center justify-center rounded-2xl transition-colors backdrop-blur-sm border-2 border-white/20 cursor-pointer"
        aria-label="Previous video"
      >
        <Image 
          src="/arrow.svg" 
          alt="Previous" 
          width={12}
          height={12}
          className="w-3 h-3 scale-x-[-1]"
        />
      </button>
      <button
        onClick={onNext}
        className="w-12 h-12 flex items-center justify-center rounded-2xl transition-colors backdrop-blur-sm border-2 border-white/20 cursor-pointer"
        aria-label="Next video"
      >
        <Image 
          src="/arrow.svg" 
          alt="Next" 
          width={12}
          height={12}
          className="w-3 h-3 scale-x-[-1] rotate-180"
        />
      </button>
    </div>
  );
}

