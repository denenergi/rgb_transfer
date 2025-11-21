'use client';

import { useState, useRef, useEffect } from 'react';

type VideoBackgroundProps = {
  videoSrc: string;
  onVideoLoaded?: () => void;
};

const videoCache = new Map<string, string>();

export default function VideoBackground({ videoSrc, onVideoLoaded }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [resolvedSrc, setResolvedSrc] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setShowPreview(true);
    setResolvedSrc('');
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, [videoSrc]);

  useEffect(() => {
    let isActive = true;
    const cached = videoCache.get(videoSrc);

    if (cached) {
      setResolvedSrc(cached);
      return () => {
        isActive = false;
      };
    }

    const controller = new AbortController();

    const preloadVideo = async () => {
      try {
        const response = await fetch(videoSrc, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        videoCache.set(videoSrc, objectUrl);
        if (isActive) {
          setResolvedSrc(objectUrl);
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        console.error('Error preloading video:', error);
        if (isActive) {
          setResolvedSrc(videoSrc);
        }
      }
    };

    preloadVideo();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedSrc) return;

    let hasTriggeredLoad = false;

    const handleCanPlayThrough = () => {
      if (hasTriggeredLoad) return;
      hasTriggeredLoad = true;
      setIsLoaded(true);
      setShowPreview(false);
      if (onVideoLoaded) {
        onVideoLoaded();
      }
      video
        .play()
        .catch((error) => {
          console.error('Error playing video:', error);
        });
    };

    const handleLoadedMetadata = () => {
      if (video.readyState >= 4) {
        handleCanPlayThrough();
      }
    };

    video.preload = 'auto';
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [resolvedSrc, onVideoLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {showPreview && (
        <div className="absolute inset-0 z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/preview.png)' }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/90" />
        </div>
      )}

      {resolvedSrc && (
        <video
          ref={videoRef}
          src={resolvedSrc}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isLoaded && !showPreview ? 1 : 0 }}
        />
      )}

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/80 z-0" />
    </div>
  );
}

