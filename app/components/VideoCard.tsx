import PlayIcon from './PlayIcon';

type VideoCardProps = {
  videoSrc: string;
  text?: {
    ua: string;
    eng: string;
  };
  isActive: boolean;
  language: 'ua' | 'eng';
  onClick: () => void;
  style?: React.CSSProperties;
};

export default function VideoCard({ 
  videoSrc, 
  text, 
  isActive, 
  language, 
  onClick, 
  style 
}: VideoCardProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute transition-all duration-300 ease-in-out cursor-pointer"
      style={style}
    >
      <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 w-[280px] transition-all`}>
        <div className="relative mb-3">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              muted
              preload="metadata"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>
        {isActive && text && (
          <p 
            key={`${videoSrc}-${language}`}
            className="text-white text-sm font-medium text-left uppercase fade-in"
          >
            {language === 'ua' ? text.ua : text.eng}
          </p>
        )}
      </div>
    </button>
  );
}

