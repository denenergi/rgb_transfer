'use client';

import { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';
import VideoCard from './VideoCard';

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

    const newOrder = [
      videos[clickedIndex],
      ...videos.slice(0, clickedIndex),
      ...videos.slice(clickedIndex + 1),
    ];

    setOrderedVideos(newOrder);
    onVideoChange(clickedVideoId);
  };

  const handlePrevious = () => {
    const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    handleVideoClick(videos[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = videos.findIndex((v) => v.id === currentVideoId);
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    handleVideoClick(videos[nextIndex].id);
  };

  return (
    <div className="flex flex-col items-end gap-4">
      <NavigationButtons onPrevious={handlePrevious} onNext={handleNext} />

      <div className="relative flex items-start justify-start" style={{ height: '200px', width: '300px' }}>
        {orderedVideos.map((video, index) => {
          const isActive = video.id === currentVideoId;
          const zIndex = isActive ? orderedVideos.length + 1 : orderedVideos.length - index;
          const translateX = index * 30;
          const translateY = index * 2;
          const scale = isActive ? 1 : 1 - (index * 0.11);
          
          return (
            <VideoCard
              key={video.id}
              videoSrc={video.videoSrc}
              text={video.text}
              isActive={isActive}
              language={language}
              onClick={() => handleVideoClick(video.id)}
              style={{
                left: `${translateX}px`,
                top: `${translateY}px`,
                zIndex: zIndex,
                transform: `scale(${scale})`,
                pointerEvents: 'auto',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

