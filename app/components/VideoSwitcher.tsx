'use client';

import { useState, useEffect } from 'react';

type VideoItem = {
  id: string;
  videoSrc: string;
  thumbnailSrc?: string;
  title: string;
  text?: {
    ua: string;
    eng: string;
  };
};

type VideoSwitcherProps = {
  videos: VideoItem[];
  currentVideoId: string;
  onVideoChange: (videoId: string) => void;
  language: 'ua' | 'eng';
};

export default function VideoSwitcher({
  videos,
  currentVideoId,
  onVideoChange,
  language,
}: VideoSwitcherProps) {
  const [orderedVideos, setOrderedVideos] = useState<VideoItem[]>(videos);

  useEffect(() => {
    const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
    if (currentIndex > 0) {
      const reordered = [
        videos[currentIndex],
        ...videos.slice(0, currentIndex),
        ...videos.slice(currentIndex + 1),
      ];
      setOrderedVideos(reordered);
    } else {
      setOrderedVideos(videos);
    }
  }, [currentVideoId, videos]);

  const handleVideoClick = (clickedVideoId: string) => {
    
    if (clickedVideoId === currentVideoId) {
      console.log('Same video, returning');
      return;
    }

    const clickedIndex = videos.findIndex((v) => v.id === clickedVideoId);
    
    if (clickedIndex === -1) {
      return;
    }

    const clickedVideo = videos[clickedIndex];

    const newOrder = [
      videos[clickedIndex],
      ...videos.slice(0, clickedIndex),
      ...videos.slice(clickedIndex + 1),
    ];

    setOrderedVideos(newOrder);
    onVideoChange(clickedVideoId);
  };

  return (
    <div className="flex flex-col items-end gap-4">
      <div className="hidden md:flex items-center gap-2 relative z-20">
        <button
          onClick={() => {
            const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
            handleVideoClick(videos[prevIndex].id);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-2xl transition-colors backdrop-blur-sm border-2 border-white/20"
          aria-label="Previous video"
        >
          <img 
            src="/arrow.svg" 
            alt="Previous" 
            className="w-3 h-3 scale-x-[-1]"
          />
        </button>
        <button
          onClick={() => {
            const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
            const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
            handleVideoClick(videos[nextIndex].id);
          }}
          className="w-12 h-12 flex items-center justify-center rounded-2xl transition-colors backdrop-blur-sm border-2 border-white/20"
          aria-label="Next video"
        >
          <img 
            src="/arrow.svg" 
            alt="Previous" 
            className="w-3 h-3 scale-x-[-1] rotate-180"
          />
        </button>
      </div>

      <div className="relative flex items-start justify-start" style={{ height: '200px', width: '300px' }}>
        {orderedVideos.map((video, index) => {
          const isActive = video.id === currentVideoId;
          const zIndex = isActive ? orderedVideos.length + 1 : orderedVideos.length - index;
          const translateX = index * 30;
          const translateY = index * 2;
          const scale = isActive ? 1 : 1 - (index * 0.11);
          
          return (
            <button
              key={video.id}
              onClick={(e) => {
                e.stopPropagation();
                handleVideoClick(video.id);
              }}
              className="absolute transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                left: `${translateX}px`,
                top: `${translateY}px`,
                zIndex: zIndex,
                transform: `scale(${scale})`,
                pointerEvents: 'auto',
              }}
            >
              <div className={`bg-white/10 backdrop-blur-md rounded-xl p-4 w-[280px] transition-all`}>
                <div className="relative mb-3">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={video.videoSrc}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-white ml-1"
                        >
                          <path
                            d="M8 5V19L19 12L8 5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {isActive && video.text && (
                  <p 
                    key={`${video.id}-${language}`}
                    className="text-white text-sm font-medium text-left uppercase fade-in"
                  >
                    {language === 'ua' ? video.text.ua : video.text.eng}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

