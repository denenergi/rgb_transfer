'use client';

import { useState } from 'react';
import Header from './components/Header';
import VideoBackground from './components/VideoBackground';
import VideoSwitcher from './components/VideoSwitcher';

const videos = [
  {
    id: 'video1',
    videoSrc: '/IMG_6157.MOV',
    title: 'Video 1',
    text: {
      ua: 'НАСОЛОДЖУЙТЕСЬ ДОРОГОЮ',
      eng: 'ENJOY THE RIDE',
    },
  },
  {
    id: 'video2',
    videoSrc: '/IMG_6161.MOV',
    title: 'Video 2',
    text: {
      ua: 'КОМФОРТ ТА БЕЗПЕКА',
      eng: 'COMFORT AND SAFETY',
    },
  },
  {
    id: 'video3',
    videoSrc: '/IMG_6162.MOV',
    title: 'Video 3',
    text: {
      ua: 'ПРЕМІУМ СЕРВІС',
      eng: 'PREMIUM SERVICE',
    },
  },
];

export default function Home() {
  const [language, setLanguage] = useState<'ua' | 'eng'>('ua');
  const [currentVideoId, setCurrentVideoId] = useState(videos[0].id);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const currentVideo = videos.find((v) => v.id === currentVideoId) || videos[0];

  const handleVideoChange = (videoId: string) => {
    const foundVideo = videos.find((v) => v.id === videoId);
    setCurrentVideoId(videoId);
    setIsVideoReady(false);
  };


  const handleVideoLoaded = () => {
    setIsVideoReady(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <VideoBackground
        videoSrc={currentVideo.videoSrc}
        onVideoLoaded={handleVideoLoaded}
      />

      <Header language={language} onLanguageChange={setLanguage} />

      <main className="relative z-10 flex min-h-screen flex-col justify-end px-4 md:px-8 lg:px-16 py-20 md:py-32">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-[0.95]">
                {language === 'ua' ? 'ІНДИВДУАЛЬНІ ТРАНСФЕРИ' : 'INDIVIDUAL TRANSFERS'}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, white 0%, white 50%, #EEAF7C 100%)' }}>
                <span className='font-bold'>{language === 'ua' ? 'ПРИВАТНІСТЬ ' : 'PRIVACY '}</span>
                {language === 'ua' ? 'У КОЖНІЙ ДЕТАЛІ' : 'IN EVERY DETAIL'}
              </p>
              <button className="bg-[#EEAF7C] hover:bg-[#F19E5B] text-black px-8 py-8 rounded-3xl transition-colors text-[20px] font-medium uppercase mt-8 max-sm:text-[14px] max-sm:px-4 max-sm:w-60">
                {language === 'ua' ? 'ЗАМОВИТИ ТРАНСФЕР' : 'ORDER TRANSFER'}
              </button>
            </div>

            <div className="hidden lg:flex justify-end">
              <VideoSwitcher
                videos={videos}
                currentVideoId={currentVideoId}
                onVideoChange={handleVideoChange}
                language={language}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
